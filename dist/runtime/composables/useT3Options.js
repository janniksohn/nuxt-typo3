import { useRuntimeConfig, useRequestHeaders, useState } from "#app";
import { getRawHost } from "../lib/url.js";
export const useT3OptionsState = () => {
  const options = useState("T3:Options");
  return options;
};
export const useT3Options = () => {
  const options = useRuntimeConfig().public.typo3;
  const currentSiteOptions = useT3OptionsState();
  const getSiteOptions = (domain) => {
    const { sites } = options;
    if (!sites || !sites.length) {
      return options;
    }
    const host = domain || useRequestHeaders()?.host || window?.location.origin;
    const rawHost = getRawHost(host);
    const site = sites.find(({ hostname }) => {
      if (rawHost && Array.isArray(hostname)) {
        return hostname.includes(rawHost);
      }
      return hostname === rawHost;
    });
    if (!site) {
      throw new Error(`Hostname: ${host} not found in sites configuration`);
    }
    return site;
  };
  if (!currentSiteOptions.value) {
    currentSiteOptions.value = getSiteOptions();
  }
  return { options, getSiteOptions, currentSiteOptions };
};
