import * as _nuxt_schema from '@nuxt/schema';
import { FetchOptions, $Fetch } from 'ofetch';
import { T3ApiClient } from '../dist/runtime/lib/apiClient.js';

interface T3ContentElement<T extends T3CeBaseProps> {
    id: number;
    type: string;
    colPos: number;
    categories: string;
    appearance: T3Appearance;
    content: T;
}

interface T3CeBaseProps {
    /**
     * Header content / TYPO3 header
     */
    header?: string;
    /**
     * Header Type / TYPO3 header_layout
     */
    headerLayout?: number;
    /**
     * Header alignment / TYPO3 header_position
     */
    headerPosition?: string;
    /**
     * Header link / TYPO3 header_link
     */
    headerLink?: T3Link | string;
    /**
     * Subheader / TYPO3 subheader
     */
    subheader?: string;
    /**
     * Content Element ID
     */
    uid?: number;
    /**
     * Index in the Renderer
     */
    index?: number;
    /**
     * Appearance setup
     */
    appearance?: T3Appearance;
}

interface T3CeTextProps extends T3CeBaseProps {
    bodytext?: string;
}

interface T3CeHeaderProps extends T3CeBaseProps {
    /**
     * Header content / TYPO3 header
     */
    header?: string;
    /**
     * Header Type / TYPO3 header_layout
     */
    headerLayout?: number;
    /**
     * Header alignment / TYPO3 header_position
     */
    headerPosition?: string;
    /**
     * Header link / TYPO3 header_link
     */
    headerLink?: T3Link | string;
    /**
     * Subheader / TYPO3 subheader
     */
    subheader?: string;
}

interface T3CeGalleryProps extends T3CeBaseProps {
    bodytext?: string;
    gallery: T3Gallery;
}

interface T3CeBulletsProps extends T3CeBaseProps {
    bodytext?: string[] | [][];
    bulletsType?: number;
}

interface T3CeMenuPagesProps extends T3CeBaseProps {
    menu: T3MenuAbstract[];
}

interface T3CeTableProps extends T3CeBaseProps {
    tableCaption: string;
    tableHeaderPosition: number;
    tableClass: string;
    tableTfoot: string;
    bodytext: string[][];
}

interface T3CeUploadsProps extends T3CeBaseProps {
    media?: T3File[];
    target: '_blank' | '_parent' | '_self' | '_top' | (string & {}) | null;
    displayFileSizeInformation?: string;
    displayDescription?: string;
    displayInformation?: string;
}

interface T3Link {
    class?: string;
    href: string;
    linkText?: string;
    target?: string;
    title?: string;
    additionalAttributes?: string[];
}

interface T3File {
    publicUrl: string;
    properties: {
        title: string | null;
        alternative: string | null;
        description: string | null;
        mimeType: string;
        type: string;
        filename: string;
        originalUrl: string;
        fileReferenceUid: number;
        size: string;
        link: string | null;
        linkData: T3Link;
        uidLocal?: number;
        dimensions: {
            width: number;
            height: number;
        };
        cropDimensions: {
            width: number;
            height: number;
        };
        autoplay: string | null;
        extension: string;
    };
}

interface T3Gallery {
    position: {
        horizontal: string;
        vertical: string;
        noWrap: boolean;
    };
    width: number;
    count: {
        files: number;
        columns: number;
        rows: number;
    };
    columnSpacing: number;
    border: {
        enabled: boolean;
        width: number;
        padding: number;
    };
    rows: {
        [key: string]: {
            columns: Record<string, T3File>;
        };
    };
}

interface T3Menu {
    title: string;
    link: string;
    target: string;
    active: number;
    current: number;
    spacer: number;
    hasSubpages: number;
    children?: T3Menu[];
}

interface T3MenuAbstract extends T3Menu {
    abstract?: string;
}

type T3AppearanceSpace = 'default' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | string;
type T3AppearanceFrameClass = 'default' | 'ruler-before' | 'ruler-after' | 'indent' | 'indent-left' | 'indent-right' | 'none' | string;
interface T3Appearance {
    frameClass: T3AppearanceFrameClass;
    layout: string;
    spaceAfter: T3AppearanceSpace;
    spaceBefore: T3AppearanceSpace;
    background?: string;
}

interface T3BackendLayout {
    content: {
        [key: string]: T3ContentElement<any>[];
    };
}

/**
 * Extended fetch options with abort signal support
 * Nuxt 4: useAsyncData handler receives an abort signal for request cancellation
 * This allows proper cleanup when navigation occurs during a pending request
 */
interface T3FetchOptions extends FetchOptions<'json'> {
    /**
     * AbortSignal for request cancellation
     * Passed automatically by useAsyncData in Nuxt 4 for navigation handling
     */
    signal?: AbortSignal;
}
interface T3Site {
    /**
       * Base app url for handling default canonical links
    */
    baseUrl?: string;
    api: {
        /**
         * TYPO3 headless API base url
         * @default 'https://api.t3pwa.com'
         */
        baseUrl: string;
        /**
         * Initial headers for TYPO3 Client
         * @default: {}
         */
        headers?: Record<string, string>;
        /**
         * Should use Fetch credentails?
         * @default 'omit'
         */
        credentials?: 'include' | 'omit' | 'same-origin';
        /**
         * Should proxy headers on SSR?
         * @default false
         */
        proxyReqHeaders?: false | Array<string>;
        proxyHeaders?: false | Array<string>;
        /**
         * Should API make calls for each query param?
         * provide whitelist as array of string or disable
         * @default true
         */
        allowQuery?: Boolean | Array<string>;
        /**
         * Provide custom endpoints
         */
        endpoints?: {
            /**
             * initialData GET param or page
             * @default ?type=834
             */
            initialData?: string;
            /**
             * InitialData fallback, eg. for static pages
             * @default /?type=834
             */
            initialDataFallback?: string;
        };
    };
    /**
     * Internationalization settings
     */
    i18n: {
        /**
         * Default locale code
         * @default 'en'
         */
        default: string;
        /**
         * Array of available locale codes
         * @default ['en']
         */
        locales: Array<string>;
    };
    /**
     *
     */
    features?: {
        /**
         * fetch initial data before each page render
         * @default true
         */
        initInitialData?: boolean;
        /**
         * use built middleware to detect language changes
         * * @default true
         */
        i18nMiddleware?: boolean;
        /**
         * show content element data on each frontend component
         */
        debug?: boolean;
    };
}
declare type T3Sites = {
    hostname: string | Array<string>;
} & T3Site;
interface T3Options extends T3Site {
    sites?: T3Sites[];
}
interface T3RedirectData {
    redirectUrl: string;
    statusCode: number;
}
interface T3Navigation {
    title: string;
    link: string;
    target: string;
    active: number;
    current: number;
    spacer: number;
    hasSubpages: number;
    children?: T3Navigation[];
}
interface T3I18N {
    languageId: number;
    locale: string;
    title: string;
    navigationTitle: string;
    twoLetterIsoCode: string;
    hreflang: string;
    direction: 'ltr' | 'rtl';
    flag: string;
    link: string;
    active: number;
    current: number;
    available: number;
}
interface T3Robots {
    noIndex: boolean;
    noFollow: boolean;
    [key: string]: any;
}
interface T3Meta {
    title: string;
    subtitle: string;
    abstract: string;
    description: string;
    keywords: string;
    canonical: T3Link;
    robots: T3Robots;
    author: string;
    authorEmail: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: T3File | null;
    twitterTitle: string;
    twitterDescription: string;
    twitterCard: string;
    twitterImage: T3File | null;
}
interface T3PageAppearance {
    layout: string;
    backendLayout: string;
    [key: string]: any;
}
interface T3Page extends T3RedirectData {
    id: number;
    type: string;
    slug: string;
    media: any[];
    meta: T3Meta;
    categories: string;
    breadcrumbs: any[];
    appearance: T3PageAppearance;
    content: {
        [key: string]: T3ContentElement<T3CeBaseProps>[];
    };
    i18n: T3I18N[];
}
interface T3InitialData {
    navigation: T3Navigation[];
    i18n: T3I18N[];
    [key: string]: any;
}
interface ModuleOptions extends Partial<T3Options> {
    fallback?: {
        useLegacyAsyncDataPageKey?: boolean;
    };
}
interface T3RuntimeConfig {
    public?: {
        typo3?: ModuleOptions;
        typo3Internals?: {
            useLegacyAsyncDataPageKey?: boolean;
        };
    };
}
declare module '@nuxt/schema' {
    interface ConfigSchema {
        runtimeConfig: T3RuntimeConfig;
    }
}

interface ModuleHooks {
    't3:initialData': (initialData: T3InitialData) => Promise<void> | void;
    't3:page': (pageData: T3Page) => Promise<void> | void;
    't3:i18n': (newLocale: string, oldLocale: string) => Promise<void> | void;
    't3:redirect': (redirectData: T3RedirectData) => Promise<void> | void;
}
declare const _default: _nuxt_schema.NuxtModule<ModuleOptions, ModuleOptions, false>;

declare module '#app' {
    interface NuxtApp {
        $typo3: {
            api: T3ApiClient;
            $fetch: $Fetch;
        };
    }
    interface RuntimeNuxtHooks extends ModuleHooks {
    }
}
declare module '@nuxt/schema' {
    interface NuxtHooks extends ModuleHooks {
    }
    interface ConfigSchema {
        runtimeConfig: T3RuntimeConfig;
    }
}

export { _default as default };
export type { ModuleHooks, ModuleOptions, T3Appearance, T3AppearanceFrameClass, T3AppearanceSpace, T3BackendLayout, T3CeBaseProps, T3CeBulletsProps, T3CeGalleryProps, T3CeHeaderProps, T3CeMenuPagesProps, T3CeTableProps, T3CeTextProps, T3CeUploadsProps, T3ContentElement, T3FetchOptions, T3File, T3Gallery, T3I18N, T3InitialData, T3Link, T3Menu, T3MenuAbstract, T3Meta, T3Navigation, T3Options, T3Page, T3PageAppearance, T3RedirectData, T3Robots, T3RuntimeConfig, T3Site, T3Sites };
