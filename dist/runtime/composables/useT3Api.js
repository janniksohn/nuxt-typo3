import { useState, useNuxtApp, useRoute, useRuntimeConfig } from "#app";
import { hash } from "ohash";
export const useT3PageState = () => {
  const pageState = useState("T3:Page", () => null);
  return pageState;
};
export const useT3InitialDataState = () => {
  const initialDataState = useState("T3:InitialData", () => ({
    navigation: [],
    i18n: []
  }));
  return initialDataState;
};
export const useT3Api = (path, options) => {
  const app = useNuxtApp();
  const { $typo3, callHook } = app;
  const defaultPath = path || useRoute().fullPath;
  const defaultOptions = options ?? {};
  const pageData = useT3PageState();
  const initialData = useT3InitialDataState();
  const useLegacyAsyncDataPageKey = useRuntimeConfig().public.typo3Internals?.useLegacyAsyncDataPageKey;
  const $fetch = async (path2 = defaultPath, options2 = defaultOptions) => {
    return await $typo3.api.$fetch(path2, options2);
  };
  const getPage = async (path2 = defaultPath, options2 = defaultOptions) => {
    const pageData2 = await $typo3.api.getPage(path2, options2);
    await callHook("t3:page", pageData2);
    return pageData2;
  };
  const getPageKey = (fullPath = defaultPath) => {
    return useLegacyAsyncDataPageKey ? "t3:page" : `t3:page:${hash(fullPath)}`;
  };
  const getInitialData = async (path2 = defaultPath, options2 = defaultOptions) => {
    const initialData2 = await $typo3.api.getInitialData(path2, options2);
    await callHook("t3:initialData", initialData2);
    return initialData2;
  };
  const setHeaders = (headers) => {
    $typo3.api.setHeaders(headers);
  };
  const setOption = (key, value) => {
    $typo3.api.fetchOptions[key] = value;
  };
  return {
    pageData,
    initialData,
    $fetch,
    getPage,
    getPageKey,
    getInitialData,
    setHeaders,
    setOption
  };
};
