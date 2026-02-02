<template>
  <!-- /* eslint-disable @typescript-eslint/no-unused-vars */ -->
  <!-- eslint-disable vue/no-v-html -->
  <div
    ref="htmlparser"
    class="t3-ce-rte"
    v-html="content"
  />
</template>

<script setup>
import { navigateTo, nextTick, ref, onMounted, onBeforeUnmount } from "#imports";
const links = ref();
defineProps({
  content: { type: String, required: true }
});
onMounted(() => {
  nextTick(addListeners);
});
onBeforeUnmount(() => {
  removeListeners();
});
const htmlparser = ref();
function addListeners() {
  links.value = htmlparser.value?.getElementsByTagName("a");
  if (links.value) {
    for (let i = 0; i < links.value.length; i++) {
      links.value[i]?.addEventListener("click", navigate, false);
    }
  }
}
function removeListeners() {
  if (links.value) {
    for (let i = 0; i < links.value.length; i++) {
      links.value[i].removeEventListener("click", navigate, false);
    }
    links.value = [];
  }
}
function navigate(e) {
  let target = e.target;
  let i = 0;
  while (i < 5 && !(target instanceof HTMLAnchorElement) && target && target.parentNode) {
    target = target.parentNode;
    i++;
  }
  if (!(target instanceof HTMLAnchorElement)) {
    return;
  }
  return redirect(e, target);
}
function redirect(e, target) {
  const href = target.getAttribute("href");
  const hrefTarget = target.getAttribute("target");
  const isCtrlKeyPressed = e.ctrlKey || e.metaKey;
  const openInNewTab = hrefTarget && hrefTarget === "_blank" || isCtrlKeyPressed;
  if (href && href[0] === "/" && !openInNewTab) {
    e.preventDefault();
    navigateTo(href);
  }
}
</script>
