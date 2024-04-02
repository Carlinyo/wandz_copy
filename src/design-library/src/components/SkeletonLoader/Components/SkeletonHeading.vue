<template>
  <div class="skeleton border-radius-rounded"></div>
</template>

<script setup>
  defineOptions({
    name: 'SkeletonHeading',
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
</style>
