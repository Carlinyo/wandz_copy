<template>
  <div class="tw-box-border tw-h-full tw-w-full tw-bg-white tw-top-0 tw-left-0 tw-absolute tw-p-4">
    <div class="tw-h-full tw-w-full tw-bg-white tw-flex tw-flex-col tw-gap-3 tw-justify-between">
      <SkeletonHeading />
      <SkeletonParagraph />
      <SkeletonButton />
    </div>
  </div>
</template>

<script setup>
  import SkeletonButton from './Components/SkeletonButton.vue';
  import SkeletonHeading from './Components/SkeletonHeading.vue';
  import SkeletonParagraph from './Components/SkeletonParagraph.vue';
  defineOptions({
    name: 'SkeletonLoader',
  });
  const props = defineProps({
    type: {
      type: String,
      default: 'text',
    },
  });
</script>

<style scoped lang="scss"></style>
