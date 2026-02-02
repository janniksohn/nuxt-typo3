<script setup>
import { h, resolveComponent } from "vue";
const props = defineProps({
  children: { type: Array, required: true, default: () => [] }
});
const renderItems = () => {
  return props.children.map((el) => {
    return h("li", {}, [
      h(
        resolveComponent("NuxtLink"),
        {
          to: el.link,
          target: el.target || null,
          title: el.title
        },
        () => [el.title]
      ),
      el.children ? h(resolveComponent("T3CeMenuPagesList"), { children: el.children }) : null
    ]);
  });
};
const T3CeMenuPagesList = () => {
  return h(
    "ul",
    {},
    {
      default: () => renderItems()
    }
  );
};
</script>

<template>
  <T3CeMenuPagesList />
</template>
