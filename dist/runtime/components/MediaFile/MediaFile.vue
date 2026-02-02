<script setup>
import { useMediaFile } from "./useMediaFile";
const props = defineProps({
  file: { type: Object, required: true }
});
const { mediaTypeComponent } = useMediaFile(props.file);
</script>

<template>
  <component
    :is="mediaTypeComponent"
    :file="file"
  />
</template>
