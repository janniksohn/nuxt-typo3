import { parseURL, parseQuery, withQuery, withoutTrailingSlash } from "ufo";
import { showError, callOnce } from "#app";
import { useT3Api } from "../composables/useT3Api.js";
import { useT3Options } from "../composables/useT3Options.js";
import { useT3i18n } from "../composables/useT3i18n.js";
async function fetchInitialData(to) {
  const { initialData, getInitialData } = useT3Api(to.fullPath);
  const { currentSiteOptions } = useT3Options();
  const { getPathWithLocale } = useT3i18n(to.fullPath);
  const initialDataEndpoint = currentSiteOptions.value.api.endpoints?.initialData;
  const initialDataFallback = currentSiteOptions.value.api.endpoints?.initialDataFallback;
  const buildInitialDataPath = (endpoint, fullPath) => {
    const { pathname: endpointPathname, search: endpointSearch } = parseURL(endpoint);
    const staticConfigEndpointQuery = parseQuery(endpointSearch);
    if (fullPath && endpoint.startsWith("?")) {
      const { pathname: fullPathPathname, search: baseSearch } = parseURL(fullPath);
      const baseQuery = parseQuery(baseSearch);
      const mergedQuery = { ...baseQuery, ...staticConfigEndpointQuery };
      return withQuery(withoutTrailingSlash(fullPathPathname), mergedQuery);
    }
    return withQuery(getPathWithLocale(endpointPathname), staticConfigEndpointQuery);
  };
  const buildDefaultInitialDataPath = (endpoint, routeQuery) => {
    const { pathname, search } = parseURL(endpoint);
    const endpointQuery = parseQuery(search);
    const mergedQuery = { ...endpointQuery, ...routeQuery };
    return withQuery(getPathWithLocale(pathname), mergedQuery);
  };
  const getInitialDataPath = (endpoint) => {
    if (endpoint.startsWith("?")) {
      return buildInitialDataPath(endpoint, to.fullPath);
    }
    const routeQuery = to.query;
    if (!Object.keys(routeQuery).length) {
      return buildInitialDataPath(endpoint);
    }
    if (Object.keys(routeQuery).some((key) => key.includes("[controller]"))) {
      return withQuery(to.fullPath, routeQuery);
    }
    return buildDefaultInitialDataPath(endpoint, routeQuery);
  };
  try {
    let data;
    try {
      data = await getInitialData(getInitialDataPath(initialDataEndpoint));
    } catch {
      data = await getInitialData(getInitialDataPath(initialDataFallback));
    }
    initialData.value = data;
  } catch (error) {
    showError({
      fatal: true,
      unhandled: false,
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage,
      data: error.response?._data,
      message: `Initial Data is unavailable: ${error.message}`
    });
  }
}
export async function t3initialDataMiddleware(to) {
  await callOnce("t3:initialData", async () => await fetchInitialData(to));
}
