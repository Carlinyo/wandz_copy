<template>
  <div class="element-container rocaucskeleton">
    <div class="rocaucskeleton-header">
      <skeleton-heading class="skeleton-header" />
    </div>
    <div class="rocaucskeleton-chart">
      <div
        class="rocaucskeleton-chart-text"
        v-for="item in 6"
        :key="item"
      >
        <skeleton-heading class="skeleton-thickLine" />
        <skeleton-heading class="skeleton-line" />
      </div>
      <div class="rocaucskeleton-chart-line">
        <div><img :src="RocAuc" /></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import SkeletonHeading from '@/design-library/src/components/SkeletonLoader/Components/SkeletonHeading.vue';
  import RocAuc from '@/design-library/src/assets/unique/RocAucGraph/rocAuc.svg';

  defineOptions({
    name: 'rocauc-skeleton',
  });
</script>

<style lang="scss" scoped>
  .rocaucskeleton {
    width: 100% !important;
    height: 100% !important;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;

    &-header {
      width: 104px;
      height: 20px;
    }

    &-chart {
      height: 100%;
      padding-left: 19px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 9px;
    }

    &-line {
      position: absolute;
      top: -35px;
      right: 0;
    }
  }
  .skeleton {
    &-header {
      width: 105px;
      height: 20px;
    }
    &-thickLine {
      width: 29px;
      height: 10px;
    }
    &-line {
      width: 415px;
      height: 1px;
    }
  }

  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
