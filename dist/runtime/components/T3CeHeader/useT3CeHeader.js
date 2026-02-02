import { computed } from "vue";
export function useT3CeHeader(props) {
  const headerLevel = computed(() => {
    return props.headerLayout === 0 ? 1 : props.headerLayout || 1;
  });
  const headerClass = computed(() => {
    return props.headerPosition ? `t3-ce-header--${props.headerPosition}` : "";
  });
  return { headerLevel, headerClass };
}
