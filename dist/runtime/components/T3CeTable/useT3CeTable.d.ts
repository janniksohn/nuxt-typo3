import type { T3CeTableProps } from '../../../module.js';
export type BodyTextType = string[][];
export declare const useT3CeTable: (props: T3CeTableProps) => {
    thead: import("vue").ComputedRef<string[]>;
    tbody: import("vue").ComputedRef<string[][]>;
    tfoot: import("vue").ComputedRef<string[]>;
};
