<template>
  <div
    class="tw-flex bg-skeleton border-radius-small tw-animate-pulse border-radius-medium tw-h-5 tw-w-32"
    :style="customStyle"
  ></div>
</template>

<script setup>
  defineOptions({
    name: 'SkeletonDynamic',
  });
  const props = defineProps({
    customStyle: {
      type: Object,
      default: () => ({}),
    },
  });
</script>

<style scoped lang="scss"></style>
