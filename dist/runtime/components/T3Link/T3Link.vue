<template>
  <NuxtLink
    :to="parsedLink.href"
    :target="parsedLink.target"
    :title="parsedLink.title"
    :class="parsedLink.class"
    v-bind="parsedLink.additionalAttributes"
  >
    <slot />
  </NuxtLink>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  link: { type: [String, Object], required: true }
});
const parsedLink = computed(() => {
  return typeof props.link === "string" ? { href: props.link } : props.link;
});
</script>
