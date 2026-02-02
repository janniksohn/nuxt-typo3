import { $fetch } from "ofetch";
import { cleanDoubleSlashes, parseQuery, parseURL } from "ufo";
import { defu } from "defu";
export class T3ApiClient {
  _$fetch;
  initialDataEndpoint;
  fetchOptions = {
    headers: {}
  };
  constructor(siteOptions) {
    this.siteOptions = siteOptions;
    this.initialDataEndpoint = siteOptions.api.endpoints.initialData;
    this.apiHeaders = {};
    this.fetchOptions = {
      baseURL: this.siteOptions.api.baseUrl,
      headers: this.siteOptions.api.headers,
      credentials: this.siteOptions.api.credentials,
      retry: false
    };
    this._$fetch = $fetch.create(this.fetchOptions);
  }
  apiHeaders;
  siteOptions;
  /**
   * Generic fetch method
   * Nuxt 4: Supports abort signal for request cancellation
   */
  $fetch(request, options) {
    return this._$fetch(request, this.getOptions(options));
  }
  /**
   * Get TYPO3 Page data
   * Nuxt 4: Supports abort signal for request cancellation during navigation
   * @param {string} path
   * @param {T3FetchOptions} options - includes optional abort signal
   * @returns {Promise<T3Page>} pageData promise
   */
  getPage(path = "/", options) {
    return this.$fetch(this.filterQuery(path), this.getOptions(options));
  }
  /**
   * Get initial data
   * Nuxt 4: Supports abort signal for request cancellation during navigation
   * @param {string} path
   * @param {T3FetchOptions} options - includes optional abort signal
   * @returns {Promise<T3InitialData>} initialData promise
   */
  getInitialData(path = "/", options) {
    const { pathname, search } = parseURL(path);
    const queryFromPath = parseQuery(search);
    const mergedQuery = { ...queryFromPath, ...options?.query ?? {} };
    return this.$fetch(
      this.filterQuery(cleanDoubleSlashes(pathname)),
      {
        ...this.getOptions(options),
        query: mergedQuery
      }
    );
  }
  /**
   * Set options
   * @returns void
   */
  setHeaders(fetchOptions) {
    this.fetchOptions.headers = defu(fetchOptions, this.fetchOptions.headers);
  }
  /**
   * Merge fetch options with TYPO3 client setup
   * Nuxt 4: Preserves abort signal from options for request cancellation
   * @param {T3FetchOptions} options - includes optional abort signal
   * @returns {T3FetchOptions} merged options
   */
  getOptions(options) {
    return defu(options, {
      onResponse: (context) => {
        if (this.fetchOptions.onResponse) {
          this.fetchOptions.onResponse(context);
        }
        if (import.meta.server && Array.isArray(this.siteOptions.api?.proxyHeaders) && context.response.headers) {
          this.apiHeaders = this.mapResponseHeaders(context.response.headers);
        }
      }
    }, this.fetchOptions);
  }
  /**
   * Trim not whitelisted queries defined in api options
   * @param {String} path Page path
   * @returns {String} trimmed path
   */
  filterQuery(path) {
    const { baseUrl, allowQuery } = this.siteOptions.api;
    if (allowQuery && allowQuery === true) {
      return path;
    }
    const url = new URL(path, baseUrl);
    if (!allowQuery) {
      return url.pathname;
    }
    const params = url.searchParams;
    const defaultAcceptedQuery = "type";
    if (allowQuery && Array.isArray(allowQuery)) {
      Array.from(params).forEach(([key]) => {
        if (allowQuery.includes(key) || key === defaultAcceptedQuery) {
          return;
        }
        params.delete(key);
      });
      return url.pathname + url.search;
    }
    return path;
  }
  /**
   * Map API Headers to setup on Response
   * @param resHeaders
   * @returns {Headers} headers
   */
  mapResponseHeaders(resHeaders) {
    const proxyHeaders = this.siteOptions.api?.proxyHeaders;
    if (!proxyHeaders || !proxyHeaders.length) {
      return {};
    }
    let headers = Array.from(resHeaders.entries());
    headers = headers.filter((header) => proxyHeaders.includes(header[0]));
    return Object.fromEntries(new Headers(headers));
  }
}
