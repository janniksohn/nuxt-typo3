<script setup>
import { useT3CeBullets } from "./useT3CeBullets";
const props = defineProps({
  bodytext: { type: Array, required: false, default: () => [] },
  bulletsType: { type: Number, required: false, default: 0 },
  header: { type: String, required: false },
  headerLayout: { type: Number, required: false },
  headerPosition: { type: String, required: false },
  headerLink: { type: [Object, String], required: false },
  subheader: { type: String, required: false },
  uid: { type: Number, required: false },
  index: { type: Number, required: false },
  appearance: { type: Object, required: false }
});
const { listTag, showBaseList } = useT3CeBullets(props);
</script>

<template>
  <div class="t3-ce-bullets">
    <T3CeHeader
      v-if="props.header"
      v-bind="props"
    />
    <component
      :is="listTag"
      v-if="showBaseList"
    >
      <li
        v-for="(el, i) in bodytext"
        :key="i"
      >
        {{ el }}
      </li>
    </component>
    <dl v-else>
      <!-- eslint-disable-next-line vue/no-v-for-template-key -->
      <template
        v-for="(el, i) in bodytext"
        :key="`${i}-0`"
      >
        <dt>
          {{ el[0] }}
        </dt>
        <dd
          v-if="el[1]"
          :key="`${i}-1`"
        >
          {{ el[1] }}
        </dd>
      </template>
    </dl>
  </div>
</template>
