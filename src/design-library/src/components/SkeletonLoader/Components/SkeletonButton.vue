<template>
  <div
    class="tw-flex bg-skeleton border-radius-small tw-animate-pulse border-radius-medium"
    :class="[size === 'small' ? 'tw-h-8' : 'tw-h-10', block ? 'tw-w-full' : 'tw-w-32']"
  ></div>
</template>

<script setup>
  defineOptions({
    name: 'SkeletonButton',
  });
  const props = defineProps({
    size: {
      type: String,
      default: 'small',
    },
    block: {
      type: Boolean,
      default: false,
    },
  });
</script>

<style scoped lang="scss"></style>
