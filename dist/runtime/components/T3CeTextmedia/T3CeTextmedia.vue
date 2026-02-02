<template>
  <T3CeTextpic
    v-bind="props"
    class="t3-ce-textmedia"
  />
</template>

<script setup>
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
