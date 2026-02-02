import type { T3RedirectData } from '../../module.js';
export declare const useT3Utils: () => {
    redirect: (redirectData: T3RedirectData) => Promise<string | false | void | import("vue-router").RouteLocationAsRelativeGeneric | import("vue-router").RouteLocationAsPathGeneric | import("vue-router").NavigationFailure>;
    localePath: (path?: string) => string;
};
export declare const hasLayout: (name?: string) => boolean;
