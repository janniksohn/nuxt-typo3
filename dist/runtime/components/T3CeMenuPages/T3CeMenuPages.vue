<template>
  <div class="t3-ce-menu">
    <T3CeHeader v-bind="props" />
    <ul v-if="props.menu">
      <li
        v-for="(menuItem, key) in menu"
        :key="key"
      >
        <NuxtLink
          :to="menuItem.link"
          :target="menuItem.target || null"
          :title="menuItem.title"
        >
          {{ menuItem.title }}
        </NuxtLink>
        <slot
          name="link"
          :link="menuItem"
        />
        <T3CeMenuPagesList
          v-if="menuItem.children"
          :children="menuItem.children"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import T3CeMenuPagesList from "./T3CeMenuPagesList.vue";
const props = defineProps({
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
