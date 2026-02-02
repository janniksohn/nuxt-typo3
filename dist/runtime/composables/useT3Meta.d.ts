export declare const useT3Meta: () => {
    metaData: import("vue").ComputedRef<import("../../types/index.js").T3Meta | undefined>;
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
    twitter: import("vue").ComputedRef<{
        id: string;
        name: string;
        content: string | undefined;
    }[]>;
    base: import("vue").ComputedRef<{
        id: string;
        name: string;
        content: string | undefined;
    }[]>;
    opengraph: import("vue").ComputedRef<{
        id: string;
        property: string;
        content: string | undefined;
    }[]>;
    openGraph: import("vue").ComputedRef<{
        id: string;
        property: string;
        content: string | undefined;
    }[]>;
};
