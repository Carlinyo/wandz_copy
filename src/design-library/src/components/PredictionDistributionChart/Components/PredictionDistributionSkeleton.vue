<template>
  <div class="element-container distributionSkeleton">
    <div class="distribution-header">
      <skeleton-heading class="skeleton-header" />
    </div>
    <div class="chart">
      <skeleton-heading
        class="skeleton-line"
        v-for="item in 6"
        :key="item"
      />
      <div class="line">
        <div class="line-container">
          <img :src="Line" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Line from '../../../assets/unique/PredictionDistribution/line.svg';
  import SkeletonHeading from '../../SkeletonLoader/Components/SkeletonHeading.vue';

  defineOptions({
    name: 'prediction-distribution-skeleton',
  });
</script>

<style lang="scss" scoped>
  .distributionSkeleton {
    height: 355px !important;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 65px;

    .chart {
      padding-left: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 36px;
      width: 100%;
      position: relative;

      .line {
        width: 100%;
        position: absolute;
        left: 25px;

        &-container {
          display: flex;
          position: relative;
          transform: scaleX(1.02);
          width: 100%;

          img {
            width: 93%;
          }
        }
      }
    }
  }

  .skeleton {
    &-header {
      width: 210px;
      height: 20px;
    }

    &-line {
      width: 95%;
      height: 1px;
    }
  }

  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
