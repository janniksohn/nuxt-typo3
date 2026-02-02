import type { T3ContentElement, T3CeBaseProps } from '../../../module.js';
type __VLS_Props = {
    /**
     * Array of content elements - colPos[x] from contentData
     */
    content?: T3ContentElement<T3CeBaseProps>[];
    /**
     * Control frame component displaying
     */
    frame?: boolean;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    content: T3ContentElement<T3CeBaseProps>[];
    frame: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
