import { computed, watch } from "vue";
import { useRoute, useAsyncData, useError, showError, clearNuxtData, useNuxtApp, useRuntimeConfig } from "#app";
import { useT3Api } from "./useT3Api.js";
import { hasLayout, useT3Utils } from "./useT3Utils.js";
import { useT3Meta } from "./useT3Meta.js";
export const useT3Page = async (options = {
  route: useRoute(),
  fetchOnInit: true
}) => {
  const { route, fetchOnInit } = options;
  const useLegacyAsyncDataPageKey = useRuntimeConfig().public.typo3Internals?.useLegacyAsyncDataPageKey;
  const { pageData, getPage, getPageKey } = useT3Api();
  const { headData } = useT3Meta();
  const { redirect } = useT3Utils();
  const { payload } = useNuxtApp();
  const pageCacheKey = computed(() => getPageKey(route.fullPath));
  const { data, execute: getAsyncPage, error } = useAsyncData(
    useLegacyAsyncDataPageKey ? pageCacheKey.value : pageCacheKey,
    ({ signal }) => getPage(route.fullPath, { signal }),
    {
      immediate: false,
      deep: true,
      default: () => null
    }
  );
  const getPageData = async () => {
    if (import.meta.client && !payload.serverRendered) {
      clearNuxtData(pageCacheKey.value);
    }
    await getAsyncPage();
    if (error.value) {
      showError({
        ...error.value,
        unhandled: false,
        fatal: true
      });
    }
    if (data.value?.redirectUrl) {
      return redirect(data.value);
    }
    pageData.value = data.value;
    return {
      data,
      error
    };
  };
  const pageDataFallback = computed(() => {
    const error2 = useError();
    if (!error2.value || !("data" in error2.value)) {
      return void 0;
    }
    try {
      if (typeof error2.value.data === "string") {
        return JSON.parse(error2.value.data);
      }
      return error2.value.data;
    } catch {
      return void 0;
    }
  });
  if (fetchOnInit && route) {
    await getPageData();
  }
  watch(() => route.query, getPageData);
  const backendLayout = pageData.value?.appearance?.backendLayout || "default";
  const frontendLayout = hasLayout(pageData.value?.appearance?.layout) ? pageData.value?.appearance.layout : "default";
  return {
    pageDataFallback,
    pageData,
    getPageData,
    headData,
    backendLayout,
    frontendLayout
  };
};
