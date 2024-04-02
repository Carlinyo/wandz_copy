<template>
  <div class="perdiction-made border-radius-medium element-container">
    <div class="perdiction-made-header">
      <div class="container-title">{{ title }}</div>
      <Tooltip
        :text="'tooltip'"
        :position="'right'"
      >
        <img :src="InfoIcon" />
      </Tooltip>
    </div>
    <div
      class="perdiction-made-chart"
      v-if="!error"
    >
      <div class="perdiction-made-chart-line">
        <two-line-comparison-graph :data="data" />
      </div>
      <div class="perdiction-made-chart-footer">
        <div class="perdiction-made-chart-footer-colors body-micro">
          <div class="perdiction-made-chart-footer-colors-true"></div>
          True
        </div>
        <div class="perdiction-made-chart-footer-colors body-micro">
          <div class="perdiction-made-chart-footer-colors-false"></div>
          False
        </div>
      </div>
    </div>
    <div
      class="empty-states-container"
      v-else
    >
      <div class="empty-states">
        <div><img :src="EmptyStates" /></div>
        <div class="small-label-title empty-states-title">{{ title }} {{ PREDICTION_MADE_TEXTS.IS_UNAVAILABLE }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import TwoLineComparisonGraph from '@/design-library/src/components/TwoLineComparisonGraph/TwoLineComparisonGraph.vue';
  import InfoIcon from '@/design-library/src/assets/icons/info/moreInfo.svg';
  import EmptyStates from '@/design-library/src/assets/icons/empty-states/empty-states.svg';
  import Tooltip from '@/design-library/src/components/Tooltip/Tooltip.vue';
  import type { IData, IPredictionMade } from '@/design-library/src/types/interfaces/predictionMade';
  import { PREDICTION_MADE_TEXTS } from './consts';

  defineOptions({
    name: 'prediction-made-chart',
  });
  withDefaults(defineProps<IPredictionMade>(), {
    data: () => [] as IData[],
    title: 'no title',
    error: false,
  });
</script>

<style lang="scss" scoped>
  @import '@/design-library/src/styles/borders/borders';
  @import '@/design-library/src/styles/colors/data.module';
  @import '@/design-library/src/styles/colors/text.module';
  @import '@/design-library/src/styles/spacing/spacing';
  @import '@/design-library/src/styles/corners/corners';
  @import '@/design-library/src/styles/shadows/shadows';

  .perdiction-made {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    gap: $SP24;

    &-header {
      display: flex;
      align-items: center;
      gap: $SP4;
    }

    &-chart {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: $txt-secondary;
      position: relative;
      width: calc(100% + $SP24);
      &-line {
        width: 100%;
        height: 210px;
      }

      &-footer {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: $SP16;
        color: $txt-secondary;
        padding-left: $SP32;

        &-colors {
          display: flex;
          align-items: center;
          gap: $SP8;

          &-true {
            background: $data-purple-eggplant;
            height: $border-radius-medium;
            width: $border-radius-medium;
          }

          &-false {
            background: $data-orange-carrot;
            height: $border-radius-medium;
            width: $border-radius-medium;
          }
        }
      }
    }
    .empty-states-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .empty-states {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: $SP24;

      &-title {
        color: $txt-primary;
      }
    }
  }
  @media screen and (max-width: 1230px) {
    .perdiction-made {
      max-width: 800px;
      width: 80vw;
    }
  }
</style>
