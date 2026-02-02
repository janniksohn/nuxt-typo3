<template>
  <component
    :is="useT3DynamicBl(name)"
    :content="content"
    v-bind="$attrs"
  />
</template>

<script setup>
import { useT3DynamicBl } from "../../composables/useT3DynamicComponent";
defineProps({
  name: { type: String, required: true },
  content: { type: Object, required: true }
});
</script>
