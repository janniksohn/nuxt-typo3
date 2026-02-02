<template>
  <div class="t3-ce-html">
    <T3HtmlParser :content="bodytext" />
  </div>
</template>

<script setup>
defineProps({
  bodytext: { type: String, required: true }
});
</script>
