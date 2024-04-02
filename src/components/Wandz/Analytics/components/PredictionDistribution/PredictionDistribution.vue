<template>
  <div
    v-if="!loading"
    class="distribution element-container"
  >
    <div class="distribution-header">
      <h3 class="container-title">{{ title }}</h3>
      <tooltip
        :text="titleTooltip"
        :position="'right'"
      >
        <img :src="InfoIcon" />
      </tooltip>
    </div>
    <div
      v-if="!error && data.length"
      class="chart-container"
    >
      <div class="distribution-chart">
        <div class="distribution-chart-frequency">
          <p>{{ PREDICTION_DISTRIBUTION_STRINGS.FRECUENCY }}</p>
        </div>
        <prediction-distribution-chart
          :data="data"
          :xPoint="xPoint"
        />
      </div>
      <div>
        <div class="distribution-footer">
          <div class="distribution-footer-colors">
            <div class="distribution-footer-colors-items">
              <div class="distribution-footer-colors-items-true"></div>
              {{ PREDICTION_DISTRIBUTION_STRINGS.TRUE }}
            </div>
            <div class="distribution-footer-colors-items">
              <div class="distribution-footer-colors-items-false"></div>
              {{ PREDICTION_DISTRIBUTION_STRINGS.FALSE }}
            </div>
          </div>
          <div class="distribution-footer-predicted">{{ PREDICTION_DISTRIBUTION_STRINGS.PREDICTED_VALUE }}</div>
        </div>
      </div>
    </div>
    <div
      class="empty-states-container"
      v-if="error || !data.length"
    >
      <div class="empty-states">
        <div><img :src="EmptyStates" /></div>
        <div class="small-label-title">{{ title }} {{ PREDICTION_DISTRIBUTION_STRINGS.IS_UNAVAILABLE }}</div>
      </div>
    </div>
  </div>
  <prediction-distribution-skeleton v-if="loading" />
</template>
<script setup lang="ts">
  import PredictionDistributionChart from '@/design-library/src/components/PredictionDistributionChart/PredictionDistributionChart.vue';
  import PredictionDistributionSkeleton from '@/design-library/src/components/PredictionDistributionChart/Components/PredictionDistributionSkeleton.vue';
  import InfoIcon from '@/design-library/src/assets/icons/info/moreInfo.svg';
  import EmptyStates from '@/design-library/src/assets/icons/empty-states/empty-states.svg';
  import Tooltip from '@/design-library/src/components/Tooltip';
  import type { IPredictionDistribution } from '@/design-library/src/types/interfaces/predictionDistribution';
  import { PREDICTION_DISTRIBUTION_STRINGS } from './consts';
  defineOptions({
    name: 'prediction-distribution',
  });
  withDefaults(defineProps<IPredictionDistribution>(), {
    data: () => [],
    xPoint: 0.6,
    loading: false,
    error: false,
    title: 'Prediction Distribution',
    titleTooltip: 'Prediction Distribution',
  });
</script>

<style lang="scss" scoped>
  @import '@/design-library/src/styles/colors/text.module';
  @import '@/design-library/src/styles/colors/data.module';
  .distribution {
    width: 100%;
    height: 353px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;

    &-header {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    &-chart {
      width: 100%;
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      color: $txt-secondary;

      &-frequency {
        position: relative;

        p {
          font-size: 10px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          white-space: nowrap;
          position: absolute;
          bottom: 0;
          left: -13px;
          margin-bottom: 20px;
          transform: rotate(270deg);
        }
      }
    }
    .chart-container {
      width: 100%;
    }
    &-footer {
      display: flex;
      flex-direction: row;
      color: $txt-secondary;

      &-colors {
        display: flex;
        flex-direction: row;
        gap: 15px;
        padding-left: 12px;
        width: 50%;

        &-items {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 7px;

          &-true {
            background: $data-purple-eggplant;
            height: 8px;
            width: 8px;
          }

          &-false {
            background: $data-orange-carrot;
            height: 8px;
            width: 8px;
          }
        }
      }

      &-predicted {
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        white-space: nowrap;
        text-align: center;
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
      gap: 25px;
    }

    .skeleton-loading-container {
      width: 100%;
      height: 100%;
    }
  }
</style>
