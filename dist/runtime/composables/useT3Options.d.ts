import type { Ref } from 'vue';
import type { T3Site, T3Options } from '../../module.js';
export declare const useT3OptionsState: () => Ref<T3Site | null, T3Site | null>;
export declare const useT3Options: () => {
    /**
     * Get all module options
     */
    options: T3Options;
    /**
     * Get site settings
     */
    getSiteOptions: (domain?: string) => T3Site;
    /**
     * Get current site options computed value
     */
    currentSiteOptions: Ref<T3Site>;
};
