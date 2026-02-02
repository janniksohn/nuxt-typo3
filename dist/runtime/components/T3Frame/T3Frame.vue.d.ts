import type { PropType } from 'vue';
import type { T3AppearanceFrameClass, T3AppearanceSpace } from '../../../module.js';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * Frame main css class
     */
    frameClass: {
        type: PropType<T3AppearanceFrameClass>;
        default: string;
    };
    /**
     * Layout name
     */
    layout: {
        type: PropType<string>;
        default: string;
    };
    /**
     * Top space
     */
    spaceBefore: {
        type: PropType<T3AppearanceSpace>;
        default: string;
    };
    /**
     * Bottom space
     */
    spaceAfter: {
        type: PropType<T3AppearanceSpace>;
        default: string;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Frame main css class
     */
    frameClass: {
        type: PropType<T3AppearanceFrameClass>;
        default: string;
    };
    /**
     * Layout name
     */
    layout: {
        type: PropType<string>;
        default: string;
    };
    /**
     * Top space
     */
    spaceBefore: {
        type: PropType<T3AppearanceSpace>;
        default: string;
    };
    /**
     * Bottom space
     */
    spaceAfter: {
        type: PropType<T3AppearanceSpace>;
        default: string;
    };
}>> & Readonly<{}>, {
    layout: string;
    frameClass: string;
    spaceBefore: string;
    spaceAfter: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
