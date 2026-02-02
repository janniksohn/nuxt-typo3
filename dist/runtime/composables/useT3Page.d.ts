import type { RouteLocationNormalized } from '#vue-router';
import type { T3Page } from '../../module.js';
export declare const useT3Page: (options?: {
    route: RouteLocationNormalized;
    fetchOnInit?: boolean;
}) => Promise<{
    pageDataFallback: import("vue").ComputedRef<T3Page | undefined>;
    pageData: import("vue").Ref<T3Page | null, T3Page | null>;
    getPageData: () => Promise<string | false | void | import("vue-router").RouteLocationAsRelativeGeneric | import("vue-router").RouteLocationAsPathGeneric | import("vue-router").NavigationFailure | {
        data: import("vue").Ref<T3Page | null, T3Page | null>;
        error: import("vue").Ref<import("#app").NuxtError<unknown> | undefined, import("#app").NuxtError<unknown> | undefined>;
    }>;
    headData: import("vue").ComputedRef<{
        title?: undefined;
        htmlAttrs?: undefined;
        bodyAttrs?: undefined;
        meta?: undefined;
        link?: undefined;
    } | {
        title: string;
        htmlAttrs: {
            lang: string | undefined;
            dir: "ltr" | "rtl" | undefined;
        };
        bodyAttrs: {
            class: import("vue").ComputedRef<string>;
        };
        meta: Meta[];
        link: import("vue").ComputedRef<{
            rel: string;
            hreflang?: string;
            href: string;
        }[]>;
    }>;
    backendLayout: string;
    frontendLayout: string | undefined;
}>;
