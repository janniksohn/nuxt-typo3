import type { ModuleHooks } from './module.mjs'

declare module '@nuxt/schema' {
  interface NuxtHooks extends ModuleHooks {}
}

export { default } from './module.mjs'

export { type ModuleHooks, type ModuleOptions, type T3Appearance, type T3AppearanceFrameClass, type T3AppearanceSpace, type T3BackendLayout, type T3CeBaseProps, type T3CeBulletsProps, type T3CeGalleryProps, type T3CeHeaderProps, type T3CeMenuPagesProps, type T3CeTableProps, type T3CeTextProps, type T3CeUploadsProps, type T3ContentElement, type T3FetchOptions, type T3File, type T3Gallery, type T3I18N, type T3InitialData, type T3Link, type T3Menu, type T3MenuAbstract, type T3Meta, type T3Navigation, type T3Options, type T3Page, type T3PageAppearance, type T3RedirectData, type T3Robots, type T3RuntimeConfig, type T3Site, type T3Sites } from './module.mjs'
