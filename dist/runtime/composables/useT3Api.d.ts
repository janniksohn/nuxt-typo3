import type { FetchOptions } from 'ofetch';
import type { Ref } from 'vue';
import type { T3InitialData, T3Page, T3FetchOptions } from '../../module.js';
import type { T3Api } from '../lib/apiClient.js';
/**
 * Get page data state
 * Nuxt 4: Using undefined-safe initialization pattern
 * @returns {Ref<T3Page | null>}
 */
export declare const useT3PageState: () => Ref<T3Page | null, T3Page | null>;
/**
 * Get initial data state
 * Nuxt 4: Using undefined-safe initialization pattern
 * @returns {Ref<T3InitialData>}
 */
export declare const useT3InitialDataState: () => Ref<T3InitialData, T3InitialData>;
/**
 * Use API client as composable
 * Nuxt 4 compatible with abort signal support
 * @param {String} path
 * @param {T3FetchOptions} options
 */
export declare const useT3Api: (path?: string, options?: T3FetchOptions) => {
    /**
     * TYPO3 Page Data
     */
    pageData: Ref<T3Page | null>;
    /**
     * TYPO3 Initial Data
     */
    initialData: Ref<T3InitialData>;
    /**
     * Sharable $fetch client for TYPO3 API
     */
    $fetch: T3Api["$fetch"];
    /**
     * Get TYPO3 Page data
     * Supports abort signal for request cancellation (Nuxt 4)
     */
    getPage(path: string, options?: T3FetchOptions): Promise<T3Page>;
    /**
     * Get unique cache key for TYPO3 page data based on route full path.
     * Falls back to a static key if Nuxt version < 3.17.0 (changed useAsyncData implementation).
     */
    getPageKey(fullPath?: string): string;
    /**
     * Get TYPO3 Initial data
     * Supports abort signal for request cancellation (Nuxt 4)
     */
    getInitialData(path?: string, options?: T3FetchOptions): Promise<T3InitialData>;
    /**
     * Set API Headers
     */
    setHeaders(headers: Record<string, string>): void;
    /**
     * Set API Client global options
     */
    setOption<T extends keyof FetchOptions<"json">>(key: T, value: FetchOptions<"json">[T]): void;
};
