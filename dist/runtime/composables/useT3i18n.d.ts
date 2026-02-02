import type { Ref } from 'vue';
import type { T3I18N } from '../../module.js';
export declare const useT3i18nState: () => Ref<string, string>;
export declare const useT3i18n: (path?: string | undefined) => {
    /**
     * Get current locale code by path
     */
    getLocale: (path?: string) => string;
    /**
     * Set new locale and update initialData
     */
    setLocale: (localeCode: string) => void;
    /**
     * Initialize locale (check if different than default)
     */
    initLocale: () => void;
    /**
     * Return current locale state
     */
    currentLocale: Ref<string>;
    /**
     * Get current locale object
     */
    getCurrentLocaleData: () => T3I18N | null;
    /**
     * Return locale code for url path
     */
    getPathWithLocale: (path?: string) => string;
};
