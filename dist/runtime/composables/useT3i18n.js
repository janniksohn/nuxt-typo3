import { computed } from "vue";
import { parseURL, withoutTrailingSlash } from "ufo";
import { useNuxtApp, useRoute, useState } from "#app";
import { useT3Api, useT3InitialDataState } from "./useT3Api.js";
import { useT3Options } from "./useT3Options.js";
export const useT3i18nState = () => {
  const i18nState = useState("T3:i18n");
  return i18nState;
};
export const useT3i18n = (path) => {
  const { callHook } = useNuxtApp();
  const defaultPath = path;
  const { currentSiteOptions } = useT3Options();
  const { i18n } = currentSiteOptions.value;
  const currentLocale = useT3i18nState();
  const getLocale = (path2) => {
    const fullPath = path2 ?? (defaultPath || useRoute().fullPath);
    const { pathname: slugs } = parseURL(fullPath);
    const localeCode = slugs?.split("/")[1];
    if (i18n.locales && i18n.locales?.find((locale) => locale === localeCode)) {
      return localeCode;
    }
    return i18n.default;
  };
  const setLocale = async (localeCode) => {
    const path2 = defaultPath || useRoute().fullPath;
    const { getInitialData, initialData } = useT3Api(path2);
    const oldLocale = currentLocale.value;
    currentLocale.value = localeCode;
    await callHook("t3:i18n", localeCode, oldLocale);
    initialData.value = await getInitialData(getPathWithLocale());
  };
  const initLocale = async () => {
    currentLocale.value = getLocale();
    await callHook("t3:i18n", currentLocale.value, i18n.default);
  };
  const getPathWithLocale = (path2 = "") => {
    return withoutTrailingSlash(
      currentLocale.value === i18n.default ? path2 : `/${currentLocale.value}${path2}`
    );
  };
  const getCurrentLocaleData = () => {
    const initialData = useT3InitialDataState();
    if (!initialData.value) {
      return null;
    }
    const locales = computed(() => initialData.value.i18n);
    return locales.value?.find((t3locale) => {
      const twoLettterCurrentLocale = currentLocale.value.split("-")[0];
      return t3locale.twoLetterIsoCode === twoLettterCurrentLocale;
    }) || null;
  };
  return {
    currentLocale,
    getLocale,
    setLocale,
    initLocale,
    getPathWithLocale,
    getCurrentLocaleData
  };
};
