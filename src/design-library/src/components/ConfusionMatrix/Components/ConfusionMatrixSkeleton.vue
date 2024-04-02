<template>
  <div class="confusion-matrix element-container">
    <div class="confusion-matrix-header">
      <skeleton-heading class="skeleton-header" />
    </div>
    <div class="matrix">
      <div class="matrix-actual-values flex">
        <skeleton-text class="skeleton-actual-values" />
      </div>
      <div class="matrix-actual-true flex">
        <skeleton-text class="skeleton-text" />
      </div>
      <div class="matrix-actual-false flex">
        <skeleton-text class="skeleton-text" />
      </div>
      <div class="matrix-predicted-values"></div>
      <div class="matrix-predicted-true flex">
        <skeleton-text class="skeleton-text" />
      </div>
      <div class="matrix-kpi-box-green matrix-true-positives">
        <skeleton-kpi-box :block="true" />
      </div>
      <div class="matrix-kpi-box-red matrix-false-positives">
        <skeleton-kpi-box :block="true" />
      </div>
      <div class="matrix-predicted-false flex">
        <skeleton-text class="skeleton-text" />
      </div>
      <div class="matrix-kpi-box-red matrix-false-negatives">
        <skeleton-kpi-box :block="true" />
      </div>
      <div class="matrix-kpi-box-green matrix-true-negatives">
        <skeleton-kpi-box :block="true" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import SkeletonHeading from '../../SkeletonLoader/Components/SkeletonHeading.vue';
  import SkeletonKpiBox from '../../SkeletonLoader/Components/SkeletonKpiBox.vue';
  import SkeletonText from '../../SkeletonLoader/Components/SkeletonText.vue';
  export default {
    name: 'confusion-matrix-skeleton',
    components: {
      SkeletonHeading,
      SkeletonKpiBox,
      SkeletonText,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../styles/colors/text.module';
  @import '../../../styles/colors/background.module';
  @import '../../../styles/borders/borders';
  @import '../../../styles/typography/titles';
  @import '../../../styles/typography/body';
  @import '../../../styles/shadows/shadows';
  @import '../../../styles/spacing/spacing';

  .confusion-matrix {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #fff;
    gap: $SP24;
    .skeleton {
      &-header {
        width: 161px;
        height: 20px;
      }

      &-actual-values {
        width: 90px;
        height: 16px;
      }

      &-text {
        width: 32px;
        height: 16px;
      }
    }
    .matrix {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 5% 10% repeat(2, 37%);
      grid-template-rows: repeat(2, 3%) repeat(2, 29%);
      grid-column-gap: $SP16;
      grid-row-gap: $SP8;
      text-align: center;
      background: transparent;

      &-actual-values {
        width: 100%;
        height: 100%;
        grid-area: 1 / 3 / 2 / 5;
      }

      &-kpi-box-green {
        border-radius: $SP8;
      }

      &-true-positives {
        grid-area: 3 / 3 / 4 / 4;
      }

      &-true-negatives {
        grid-area: 4 / 4 / 5 / 5;
      }

      &-kpi-box-red {
      }

      &-false-positives {
        grid-area: 3 / 4 / 4 / 5;
      }

      &-false-negatives {
        grid-area: 4 / 3 / 5 / 4;
      }

      &-actual-true {
        grid-area: 2 / 3 / 3 / 4;
      }

      &-actual-false {
        grid-area: 2 / 4 / 3 / 5;
      }

      &-predicted-values {
        grid-area: 3 / 1 / 5 / 2;
      }

      &-predicted-true {
        grid-area: 3 / 2 / 4 / 3;
      }

      &-predicted-false {
        grid-area: 4 / 2 / 5 / 3;
      }
    }

    .flex {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
