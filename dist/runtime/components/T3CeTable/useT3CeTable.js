import { computed } from "vue";
export const useT3CeTable = (props) => {
  const thead = computed(() => {
    return props.tableHeaderPosition === 1 && [...props.bodytext].shift() || [];
  });
  const tbody = computed(() => {
    const tbody2 = [...props.bodytext];
    if (thead?.value?.length) {
      tbody2.shift();
    }
    if (tfoot?.value?.length) {
      tbody2.pop();
    }
    return tbody2;
  });
  const tfoot = computed(() => {
    return props.tableTfoot === "1" && [...props.bodytext].pop() || [];
  });
  return { thead, tbody, tfoot };
};
