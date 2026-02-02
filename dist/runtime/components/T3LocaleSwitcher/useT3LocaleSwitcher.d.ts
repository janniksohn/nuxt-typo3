import type { ComputedRef, Ref } from 'vue';
import type { T3I18N } from '../../../module.js';
declare const useT3LocaleSwitcher: () => {
    /**
     * List of available locales for current page
     */
    locales: ComputedRef<T3I18N[]>;
    /**
     * Current locale code
     */
    currentCode: Ref<string>;
    /**
     * Current locale T3I18N object
     */
    currentLocale: ComputedRef<T3I18N | undefined>;
};
export default useT3LocaleSwitcher;
