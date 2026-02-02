<template>
  <T3Renderer
    v-if="content?.colPos0"
    :content="content.colPos0"
  />
</template>

<script setup>
defineProps({
  content: { type: Object, required: true }
});
</script>
