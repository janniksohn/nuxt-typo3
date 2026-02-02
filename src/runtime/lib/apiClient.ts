import type { FetchContext, FetchOptions, FetchResponse } from 'ofetch'
import { $fetch } from 'ofetch'
import { cleanDoubleSlashes, parseQuery, parseURL } from 'ufo'
import { defu } from 'defu'
import type { T3Site, T3Page, T3InitialData, T3FetchOptions } from '../../module'

/**
 * T3Api interface
 * Nuxt 4: Updated to support abort signals for request cancellation
 */
export interface T3Api {
  $fetch: <T>(request: RequestInfo, options?: T3FetchOptions) => Promise<T>
  siteOptions: T3Site
  apiHeaders: Record<string, string>
  initialDataEndpoint: string
  fetchOptions?: FetchOptions<'json'>
  filterQuery: (path: string) => string
  mapResponseHeaders: (headers: Headers) => Record<string, string>
  getPage(path: string, options?: T3FetchOptions): Promise<T3Page>
  getInitialData(
    path: string,
    options?: T3FetchOptions
  ): Promise<T3InitialData>
}

export class T3ApiClient implements T3Api {
  private _$fetch: typeof $fetch
  initialDataEndpoint: string
  fetchOptions: FetchOptions<'json'> = {
    headers: {}
  }

  constructor (
    siteOptions: T3Site

  ) {
    this.siteOptions = siteOptions
    this.initialDataEndpoint = siteOptions.api.endpoints!.initialData!
    this.apiHeaders = {}

    this.fetchOptions = {
      baseURL: this.siteOptions.api.baseUrl,
      headers: this.siteOptions.api.headers,
      credentials: this.siteOptions.api.credentials,
      retry: false
    }

    this._$fetch = $fetch.create(this.fetchOptions)
  }

  apiHeaders: Record<string, string>
  siteOptions: T3Site

  /**
   * Generic fetch method
   * Nuxt 4: Supports abort signal for request cancellation
   */
  $fetch <T> (
    request: RequestInfo,
    options?: T3FetchOptions
  ): Promise<T> { return this._$fetch(request, this.getOptions(options)) }

  /**
   * Get TYPO3 Page data
   * Nuxt 4: Supports abort signal for request cancellation during navigation
   * @param {string} path
   * @param {T3FetchOptions} options - includes optional abort signal
   * @returns {Promise<T3Page>} pageData promise
   */
  getPage (path = '/', options?: T3FetchOptions): Promise<T3Page> {
    return this.$fetch(this.filterQuery(path), this.getOptions(options))
  }

  /**
   * Get initial data
   * Nuxt 4: Supports abort signal for request cancellation during navigation
   * @param {string} path
   * @param {T3FetchOptions} options - includes optional abort signal
   * @returns {Promise<T3InitialData>} initialData promise
   */
  getInitialData (
    path: string = '/',
    options?: T3FetchOptions
  ): Promise<T3InitialData> {
    const { pathname, search } = parseURL(path)
    const queryFromPath = parseQuery(search)
    const mergedQuery = { ...queryFromPath, ...(options?.query ?? {}) }

    return this.$fetch(
      this.filterQuery(cleanDoubleSlashes(pathname)),
      {
        ...this.getOptions(options),
        query: mergedQuery
      }
    )
  }

  /**
   * Set options
   * @returns void
   */
  setHeaders (fetchOptions: Record<string, string>) {
    this.fetchOptions.headers = defu(fetchOptions, this.fetchOptions.headers)
  }

  /**
   * Merge fetch options with TYPO3 client setup
   * Nuxt 4: Preserves abort signal from options for request cancellation
   * @param {T3FetchOptions} options - includes optional abort signal
   * @returns {T3FetchOptions} merged options
   */
  getOptions (options?: T3FetchOptions): T3FetchOptions {
    return defu(options, {
      onResponse: (context: FetchContext & {
        response: FetchResponse<'json'>;
    }) => {
        if (this.fetchOptions.onResponse) {
          this.fetchOptions.onResponse(context)
        }
        if (import.meta.server && Array.isArray(this.siteOptions.api?.proxyHeaders) && context.response.headers) {
          this.apiHeaders = this.mapResponseHeaders(context.response.headers)
        }
      }
    }, this.fetchOptions) as T3FetchOptions
  }

  /**
   * Trim not whitelisted queries defined in api options
   * @param {String} path Page path
   * @returns {String} trimmed path
   */
  filterQuery (path: string): string {
    const { baseUrl, allowQuery } = this.siteOptions.api

    if (allowQuery && allowQuery === true) {
      return path
    }

    const url = new URL(path, baseUrl)

    if (!allowQuery) {
      return url.pathname
    }

    const params = url.searchParams
    const defaultAcceptedQuery = 'type'

    if (allowQuery && Array.isArray(allowQuery)) {
      Array.from(params).forEach(([key]) => {
        if (allowQuery.includes(key) || key === defaultAcceptedQuery) {
          return
        }
        params.delete(key)
      })
      return url.pathname + url.search
    }

    return path
  }

  /**
   * Map API Headers to setup on Response
   * @param resHeaders
   * @returns {Headers} headers
   */
  mapResponseHeaders (resHeaders: Headers): Record<string, string> {
    const proxyHeaders = this.siteOptions.api?.proxyHeaders as string[]

    if (!proxyHeaders || !proxyHeaders.length) {
      return {}
    }

    let headers = Array.from(resHeaders.entries())
    headers = headers.filter(header => proxyHeaders.includes(header[0]))
    return Object.fromEntries(new Headers(headers))
  }
}
