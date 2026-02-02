import { computed } from "vue";
import { useT3Options } from "../composables/useT3Options.js";
import { useT3PageState } from "./useT3Api.js";
import { useT3i18n } from "./useT3i18n.js";
export const useT3Meta = () => {
  const { getCurrentLocaleData } = useT3i18n();
  const currentLocale = getCurrentLocaleData();
  const data = useT3PageState();
  const { currentSiteOptions } = useT3Options();
  const metaData = computed(() => data.value?.meta);
  const twitter = computed(() => {
    const { twitterTitle, twitterDescription, twitterImage, twitterCard, title, description, ogImage } = metaData.value;
    return [
      {
        id: "twitter:title",
        name: "twitter:title",
        content: twitterTitle || title
      },
      {
        id: "twitter:description",
        name: "twitter:description",
        content: twitterDescription || description
      },
      {
        id: "twitter:image",
        name: "twitter:image",
        content: twitterImage?.publicUrl || ogImage?.publicUrl || void 0
      },
      {
        id: "twitter:card",
        name: "twitter:card",
        content: twitterCard || "summary"
      }
    ];
  });
  const openGraph = computed(() => {
    const { ogTitle, ogDescription, ogImage, title, description } = metaData.value;
    return [
      {
        id: "og:title",
        property: "og:title",
        content: ogTitle || title
      },
      {
        id: "og:description",
        property: "og:description",
        content: ogDescription || description
      },
      {
        id: "og:type",
        property: "og:type",
        content: "website"
      },
      {
        id: "og:image",
        property: "og:image",
        content: ogImage?.publicUrl || void 0
      }
    ];
  });
  const base = computed(() => {
    return [
      {
        id: "generator",
        name: "generator",
        content: "TYPO3 CMS x T3Headless"
      },
      {
        id: "description",
        name: "description",
        content: metaData?.value?.description
      },
      {
        id: "robots",
        name: "robots",
        content: Object.keys(metaData.value?.robots || {}).filter((key) => metaData.value?.robots[key]).join(", ")
      }
    ];
  });
  const links = computed(() => {
    const link = [];
    const baseUrl = currentSiteOptions.value?.baseUrl;
    const canonical = {
      rel: "canonical",
      href: metaData.value?.canonical?.href || ""
    };
    if (baseUrl) {
      data.value?.i18n.forEach((item) => {
        if (item.active) {
          canonical.href = baseUrl + (canonical.href || item.link);
        }
        if (item.languageId === 0) {
          link.push({
            rel: "alternate",
            hreflang: "x-default",
            href: baseUrl + item.link
          });
        }
        if (item.available) {
          link.push({
            rel: "alternate",
            hreflang: item.hreflang,
            href: baseUrl + item.link
          });
        }
      });
    }
    if (canonical.href) {
      link.push(canonical);
    }
    return link;
  });
  const headData = computed(() => {
    if (!metaData.value) {
      return {};
    }
    const meta = Array.prototype.concat(base.value, twitter.value, openGraph.value);
    return {
      title: metaData?.value?.title,
      htmlAttrs: {
        lang: currentLocale?.twoLetterIsoCode,
        dir: currentLocale?.direction
      },
      bodyAttrs: {
        class: bodyClassString
      },
      meta: metaFilter(meta),
      link: links
    };
  });
  const bodyClassString = computed(() => {
    const classPrefixes = {
      pid: data.value?.id,
      layout: data.value?.appearance?.layout
    };
    const classStringArray = [];
    for (const prefix in classPrefixes) {
      if (classPrefixes[prefix] !== void 0) {
        classStringArray.push(`${prefix}-${classPrefixes[prefix]}`);
      }
    }
    const classString = classStringArray.join(" ");
    return classString;
  });
  const metaFilter = (meta) => {
    return meta.filter(
      ({ content }) => !!content && (Object.keys(content).length > 0 || typeof content === "string" && content.length > 0)
    );
  };
  return {
    metaData,
    headData,
    twitter,
    base,
    opengraph: openGraph,
    openGraph
  };
};
