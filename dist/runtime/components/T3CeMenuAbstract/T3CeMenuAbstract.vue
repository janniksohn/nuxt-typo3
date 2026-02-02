<template>
  <T3CeMenuPages
    v-bind="$props"
    class="t3-ce-menu-abstract"
  >
    <template #link="{ link }">
      {{ link.title }}
      <T3HtmlParser
        v-if="link.abstract"
        :content="link.abstract"
      />
    </template>
  </T3CeMenuPages>
</template>

<script setup>
import T3CeMenuPages from "../T3CeMenuPages/T3CeMenuPages.vue";
import T3HtmlParser from "../T3HtmlParser/T3HtmlParser.vue";
defineProps({
  menu: { type: Array, required: true },
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
