import type { FetchOptions } from 'ofetch';
import type { T3Site, T3Page, T3InitialData, T3FetchOptions } from '../../module.js';
/**
 * T3Api interface
 * Nuxt 4: Updated to support abort signals for request cancellation
 */
export interface T3Api {
    $fetch: <T>(request: RequestInfo, options?: T3FetchOptions) => Promise<T>;
    siteOptions: T3Site;
    apiHeaders: Record<string, string>;
    initialDataEndpoint: string;
    fetchOptions?: FetchOptions<'json'>;
    filterQuery: (path: string) => string;
    mapResponseHeaders: (headers: Headers) => Record<string, string>;
    getPage(path: string, options?: T3FetchOptions): Promise<T3Page>;
    getInitialData(path: string, options?: T3FetchOptions): Promise<T3InitialData>;
}
export declare class T3ApiClient implements T3Api {
    private _$fetch;
    initialDataEndpoint: string;
    fetchOptions: FetchOptions<'json'>;
    constructor(siteOptions: T3Site);
    apiHeaders: Record<string, string>;
    siteOptions: T3Site;
    /**
     * Generic fetch method
     * Nuxt 4: Supports abort signal for request cancellation
     */
    $fetch<T>(request: RequestInfo, options?: T3FetchOptions): Promise<T>;
    /**
     * Get TYPO3 Page data
     * Nuxt 4: Supports abort signal for request cancellation during navigation
     * @param {string} path
     * @param {T3FetchOptions} options - includes optional abort signal
     * @returns {Promise<T3Page>} pageData promise
     */
    getPage(path?: string, options?: T3FetchOptions): Promise<T3Page>;
    /**
     * Get initial data
     * Nuxt 4: Supports abort signal for request cancellation during navigation
     * @param {string} path
     * @param {T3FetchOptions} options - includes optional abort signal
     * @returns {Promise<T3InitialData>} initialData promise
     */
    getInitialData(path?: string, options?: T3FetchOptions): Promise<T3InitialData>;
    /**
     * Set options
     * @returns void
     */
    setHeaders(fetchOptions: Record<string, string>): void;
    /**
     * Merge fetch options with TYPO3 client setup
     * Nuxt 4: Preserves abort signal from options for request cancellation
     * @param {T3FetchOptions} options - includes optional abort signal
     * @returns {T3FetchOptions} merged options
     */
    getOptions(options?: T3FetchOptions): T3FetchOptions;
    /**
     * Trim not whitelisted queries defined in api options
     * @param {String} path Page path
     * @returns {String} trimmed path
     */
    filterQuery(path: string): string;
    /**
     * Map API Headers to setup on Response
     * @param resHeaders
     * @returns {Headers} headers
     */
    mapResponseHeaders(resHeaders: Headers): Record<string, string>;
}
