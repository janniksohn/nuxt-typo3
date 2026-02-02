import type { RouteLocationNormalized } from 'vue-router';
/**
 * Middleware entry point
 * Nuxt 4: Uses callOnce to ensure initial data is fetched only once per navigation
 * This prevents duplicate requests and ensures consistent state
 */
export declare function t3initialDataMiddleware(to: RouteLocationNormalized): Promise<void>;
