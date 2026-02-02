import { computed } from "vue";
export const useT3MediaGallery = (gallery) => {
  const galleryClassList = computed(() => {
    return [
      `t3-ce-gallery--horizontal-${gallery.position.horizontal}`,
      `t3-ce-gallery--vertical-${gallery.position.vertical}`,
      { "t3-ce-gallery--no-wrap": gallery.position.noWrap },
      { "t3-ce-gallery--border": gallery.border.enabled }
    ];
  });
  return {
    galleryClassList
  };
};
