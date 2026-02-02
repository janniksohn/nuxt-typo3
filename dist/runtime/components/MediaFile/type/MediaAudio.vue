<template>
  <audio
    v-if="file.publicUrl"
    v-bind="$attrs"
    :class="[$attrs.class, $attrs.staticClass]"
    class="t3-ce-media-audio"
    controls
  >
    <source
      :src="file.publicUrl"
      type="audio/mp3"
    >
  </audio>
</template>

<script setup>
defineProps({
  file: { type: Object, required: true }
});
</script>
