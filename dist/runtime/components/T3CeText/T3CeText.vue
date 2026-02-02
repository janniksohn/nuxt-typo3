<template>
  <div class="t3-ce-text">
    <T3CeHeader v-bind="props" />
    <T3HtmlParser
      v-if="bodytext"
      :content="bodytext"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  bodytext: { type: String, required: false },
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
