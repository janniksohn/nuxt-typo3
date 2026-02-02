<template>
  <div class="t3-ce-image">
    <T3MediaGallery :gallery="props.gallery" />
    <T3CeHeader v-bind="props" />
  </div>
</template>

<script setup>
import T3CeHeader from "../T3CeHeader/T3CeHeader.vue";
const props = defineProps({
  bodytext: { type: String, required: false },
  gallery: { type: Object, required: true },
  header: { type: String, required: false },
  headerLayout: { type: Number, required: false },
  headerPosition: { type: String, required: false },
  headerLink: { type: [Object, String], required: false },
  subheader: { type: String, required: false },
  uid: { type: Number, required: false },
  index: { type: Number, required: false },
  appearance: { type: Object, required: false }
});
</script>
