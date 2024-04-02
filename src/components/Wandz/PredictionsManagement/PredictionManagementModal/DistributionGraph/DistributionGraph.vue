<template>
  <div class="distribution-graph-wrapper">
    <div class="distribution-graph-container">
      <div class="graph-header">
        <div class="bold-title graph-title">{{ DISTRIBUTION_GRAPH_LABELS.GRAPH_TITLE }}</div>
      </div>
      <div class="graph-content">
        <div
          v-if="isLoading"
          class="loading-wrapper"
        >
          <lottie-player
            :width="300"
            :height="200"
            :animation-data="WandzGraphLoading"
          />
        </div>
        <div
          v-else
          class="graph-double-bar-wrapper"
          :class="{ 'real-graph-mode': showGraph }"
        >
          <double-bars
            v-if="showGraph"
            :isPercentsGraph="false"
            :averageLine="500"
            :averageLineText="DISTRIBUTION_GRAPH_LABELS.AVERAGE_LINE"
            :width-percentage="100"
            :height="300"
            :left-bar-gradient-colors="GRAPH_COLORS.LEFT"
            :right-bar-gradient-colors="GRAPH_COLORS.RIGHT"
            :is-color-gradient="true"
            :add-axis-bold-first-line="true"
            :value="graphValue"
          />
          <empty-state-graph v-else />
        </div>
      </div>
      <div
        class="graph-kpis"
        :class="showGraph ? 'long-margin' : 'short-margin'"
      >
        <div
          v-for="(kpi, k) of kpis"
          :key="k"
          class="section-wrapper"
        >
          <div class="kpi-wrapper">
            <div class="kpi-title small-label-title">
              {{ kpi.title }}
            </div>
            <div
              v-if="showGraph"
              class="kpi-value bold-title"
            >
              <span>{{ kpi.value }}</span>
              <span
                v-if="kpi.subValue"
                class="subValue"
                >{{ kpi.subValue }}</span
              >
            </div>
            <div
              v-else
              class="kpi-value"
            >
              -
            </div>
          </div>
          <div
            v-if="k === 0"
            class="separator"
          />
        </div>
      </div>
      <div
        v-if="showWarning"
        class="warning-message"
      >
        <div class="title bold-title">
          <img :src="AlertIcon" />
          <span>{{ DISTRIBUTION_GRAPH_LABELS.WARNING_TITLE }}</span>
        </div>
        <div class="message small-label-title">{{ DISTRIBUTION_GRAPH_LABELS.WARNING_MESSAGE }}</div>
      </div>
    </div>
    <overlay-message v-if="completeAllFields" />
  </div>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue';
  import type { IPredictionModel } from '@wandzai/wandz-interfaces';
  import { computed, reactive, ref } from 'vue';
  import {
    DISTRIBUTION_GRAPH_LABELS,
    GRAPH_COLORS,
  } from '@/components/Wandz/PredictionsManagement/PredictionManagementModal/consts';
  import DoubleBars from '@/design-library/src/components/DoubleBars/DoubleBars.vue';
  import EmptyStateGraph from '@/components/Wandz/PredictionsManagement/PredictionManagementModal/DistributionGraph/EmptyStateGraph.vue';
  import OverlayMessage from '@/components/Wandz/PredictionsManagement/PredictionManagementModal/DistributionGraph/OverlayMessage.vue';
  import AlertIcon from '@/design-library/src/assets/icons/info/alert.svg';
  import type { ITitleAndValues } from '@/components/Wandz/Common/interfaces';
  import LottiePlayer from '@/design-library/src/components/LottiePlayer/LottiePlayer.vue';
  import WandzGraphLoading from '@/design-library/src/assets/animations/wandz-graph-loading.json';
  import { IColumnData } from '@/design-library/src/interfaces/qualityFunctions';

  const props = defineProps({
    // Might be changed according to the new Multi PredictionTargetRules
    prediction: {
      type: Object as PropType<IPredictionModel>,
      default: () => {
        return {
          intent: 'purchase',
          name: 'Purchase Prediction',
          targetRules: [
            {
              type: 'url',
              operator: 'contains',
              value: 'thankyou',
            },
          ],
          description: 'Purchase Prediction',
          trainedAudiences: {
            excludeBots: true,
            audiences: null,
          },
          optimizationFunction: 'roc_auc',
          reTrainInterval: '7',
          trainingPeriod: {
            startDate: '2030-11-11',
            endDate: '2030-12-11',
          },
          advancedConfig: {
            excludedCategories: [],
            trainingSetPercentages: 30,
          },
        };
      },
    },
    // Placeholder for some data. should we do prop or make the call from here ?
    kpis: {
      type: Array<ITitleAndValues>,
      default: () => [
        { title: DISTRIBUTION_GRAPH_LABELS.TOTAL_AUDIENCE_SIZE, value: '100K' },
        { title: DISTRIBUTION_GRAPH_LABELS.AUDIENCE_HITTING_TARGET, value: '250.3K ', subValue: '(36.14%)' },
      ],
    },
    graphValue: {
      type: Array as PropType<IColumnData[]>,
      default: () => [
        { value: 500, name: 'True' },
        { value: 200, name: 'False' },
      ],
    },
  });

  const isLoading = ref(false);
  const showGraph = computed(() => !isLoading.value && true);
  const completeAllFields = computed(() => !isLoading.value && false);
  const showWarning = computed(() => !isLoading.value && false);
</script>

<style scoped lang="scss">
  @import '@/design-library/src/styles/colors/text.module';
  @import '@/design-library/src/styles/colors/borders';
  @import '@/design-library/src/styles/colors/semantic.module';
  @import '@/design-library/src/styles/colors/background.module';

  .distribution-graph-wrapper {
    position: relative;
    padding-top: 16px;
    width: 100%;
    height: 100%;

    .distribution-graph-container {
      .graph-header {
        .graph-title {
          text-align: center;
        }
      }

      .graph-content {
        .loading-wrapper {
        }

        .graph-double-bar-wrapper {
          margin-top: 32px;
          display: flex;
          justify-content: center;
        }

        .real-graph-mode {
          margin-left: -56px;
        }
      }

      .graph-kpis {
        display: flex;
        column-gap: 12px;
        justify-content: center;

        &.long-margin {
          margin-top: -24px;
        }

        &.short-margin {
          margin-top: 24px;
        }

        .section-wrapper {
          display: flex;

          .separator {
            height: 100%;
            width: 1px;
            margin-left: 12px;
            background-color: $border-ui-color;
          }
        }

        .kpi-wrapper {
          white-space-collapse: break-spaces;

          .kpi-title {
            text-align: center;
            color: $txt-secondary;
          }

          .kpi-value {
            text-align: center;
            margin-top: 8px;
          }

          .subValue {
            color: $txt-secondary;
          }
        }
      }

      .warning-message {
        margin-top: 48px;
        width: 100%;

        .title {
          display: flex;
          gap: 4px;
          justify-content: center;
          color: $semantic-negative;
          margin-bottom: 8px;
        }

        .message {
          display: flex;
          text-align: center;
          color: $txt-secondary;
          white-space-collapse: break-spaces;
          justify-content: center;
        }
      }
    }
  }
</style>
