<script setup>
import { h } from "vue";
import { useT3DynamicCe, useT3DynamicComponent } from "../../composables/useT3DynamicComponent";
defineProps({
  content: { type: Array, required: false, default: () => [] },
  frame: { type: Boolean, required: false, default: true }
});
const renderComponent = (element, index) => {
  const { id, type, appearance, content } = element;
  const component = useT3DynamicCe(type);
  return h(component, {
    ...{
      uid: id,
      appearance,
      index
    },
    id: appearance.frameClass === "none" ? `c${id}` : null,
    ...content
  });
};
const renderFrame = (element, index) => {
  const component = useT3DynamicComponent({
    prefix: "T3",
    type: "Frame",
    mode: ""
  });
  return h(
    component,
    {
      ...element.appearance,
      id: `c${element.id}`
    },
    {
      default: () => renderComponent(element, index)
    }
  );
};
</script>

<template>
  <component
    :is="frame && component.appearance.frameClass !== 'none' ? renderFrame(component, index) : renderComponent(component, index)"
    v-for="(component, index) in content"
    :key="index"
  />
</template>
