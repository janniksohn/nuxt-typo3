import type { T3CeHeaderProps } from '../../../module.js';
/**
 * Provides headerLevel and headerClass computed values based on provided props
 * @param props
 */
export declare function useT3CeHeader(props: T3CeHeaderProps): {
    headerLevel: import("vue").ComputedRef<number>;
    headerClass: import("vue").ComputedRef<string>;
};
