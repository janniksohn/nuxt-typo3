<script>
export default {
  name: "T3Frame",
  props: {
    /**
     * Frame main css class
     */
    frameClass: {
      type: String,
      default: "default"
    },
    /**
     * Layout name
     */
    layout: {
      type: String,
      default: "default"
    },
    /**
     * Top space
     */
    spaceBefore: {
      type: String,
      default: "default"
    },
    /**
     * Bottom space
     */
    spaceAfter: {
      type: String,
      default: "default"
    }
  }
};
</script>

<template>
  <div
    :class="[
  't3-ce-frame',
  `frame-${frameClass}`,
  `layout-${layout}`,
  `space-before-${spaceBefore.length ? spaceBefore : 'default'}`,
  `space-after-${spaceAfter.length ? spaceAfter : 'default'}`
]"
  >
    <slot />
  </div>
</template>
