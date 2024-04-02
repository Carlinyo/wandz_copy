<template>
  <div>
    <div class="title-bar" />
    <div class="bars-container">
      <div class="tw-w-full">
        <skeleton-stacked-bar />
      </div>
      <div class="medium-bars">
        <skeleton-stacked-bar
          v-for="(item, index) of 4"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import SkeletonStackedBar from '@/design-library/src/components/QualityFunctions/SkeletonStackedBar.vue';
  export default {
    components: { SkeletonStackedBar },
  };
</script>

<style lang="scss" scoped>
  @import '@/design-library/src/styles/corners/corners';
  @import '@/design-library/src/styles/colors/background.module';

  .title-bar {
    width: 20%;
    border-radius: $border-radius-large;
    height: 40px;
    background: $bg-skeleton;
  }
  .bars-container {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 7%;
  }

  .medium-bars {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 50px;
  }
</style>
