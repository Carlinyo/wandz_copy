<template>
  <div
    class="skeleton border-radius-medium"
    :class="[block ? 'full' : 'default']"
  ></div>
</template>

<script setup>
  defineOptions({
    name: 'SkeletonKpiBox',
  });
  defineProps({
    block: {
      type: Boolean,
      default: false,
    },
  });
</script>

<style scoped lang="scss">
  @import '../../../styles/corners/corners.scss';
  .skeleton {
    animation: skeleton-loading 1s linear infinite alternate;
  }

  @keyframes skeleton-loading {
    0% {
      background-color: hsl(200, 20%, 92%);
    }
    100% {
      background-color: hsl(200, 20%, 98%);
    }
  }
  .full {
    width: 100%;
    height: 100%;
  }

  .default {
    width: 128px;
    height: 80px;
  }
</style>
