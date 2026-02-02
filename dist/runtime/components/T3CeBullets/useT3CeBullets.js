import { computed } from "vue";
export const useT3CeBullets = (props) => {
  const listTag = computed(() => {
    return props.bulletsType === 1 ? "ol" : "ul";
  });
  const showBaseList = computed(() => {
    return props.bulletsType === 0 || props.bulletsType === 1;
  });
  return { listTag, showBaseList };
};
