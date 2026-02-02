import type { DefineComponent } from 'vue';
import type { T3BackendLayout, T3CeBaseProps } from '../../module.js';
interface DynamicComponentParams {
    type?: string;
    prefix?: 'T3' | 'T3Ce' | 'T3Bl' | string;
    mode?: 'Lazy' | '';
}
export declare const useT3DynamicComponent: <T>({ type, prefix, mode }?: DynamicComponentParams) => DefineComponent<T>;
export declare const useT3DynamicBl: <T = T3BackendLayout>(type?: string) => DefineComponent<T>;
export declare const useT3DynamicCe: <T extends T3CeBaseProps = T3CeBaseProps>(type?: string) => DefineComponent<T>;
export {};
