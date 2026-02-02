import { computed } from "vue";
import { useT3PageState } from "../../composables/useT3Api.js";
import { useT3i18nState } from "../../composables/useT3i18n.js";
const useT3LocaleSwitcher = () => {
  const data = useT3PageState();
  const locale = useT3i18nState();
  const locales = computed(() => data.value?.i18n || []);
  const currentLocale = computed(
    () => locales.value?.find(
      (t3locale) => t3locale.twoLetterIsoCode === locale.value
    )
  );
  return {
    locales,
    currentCode: locale,
    currentLocale
  };
};
export default useT3LocaleSwitcher;
