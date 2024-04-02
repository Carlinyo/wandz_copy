<template>
  <div
    class="rocauc element-container"
    v-if="!loading"
  >
    <div class="rocauc-header">
      <div class="container-title">{{ title }}</div>
      <Tooltip
        :text="titleTooltip"
        :position="'right'"
      >
        <img :src="InfoIcon" />
      </Tooltip>
    </div>
    <div
      v-if="!error"
      class="rocauc-chart-container"
    >
      <div class="rocauc-chart">
        <div class="rocauc-chart-frequency">
          <div class="body-micro">{{ ROC_AUC_STRINGS.TRUE_POSITIVE_RATE }}</div>
        </div>
        <div class="rocauc-chart-line">
          <RocAuc :data="data" />
        </div>
        <div class="rocauc-chart-auc">
          <div class="body-small-bold txt-primary">{{ ROC_AUC_STRINGS.AUC }}</div>
          <div class="body-tiny txt-primary">{{ aucValue }}</div>
        </div>
        <div class="rocauc-chart-roc">
          <div class="body-small-bold txt-primary">{{ ROC_AUC_STRINGS.ROC }}</div>
        </div>
      </div>
      <div>
        <div class="rocauc-footer">
          <div class="body-micro">{{ ROC_AUC_STRINGS.FALSE_POSITIVE_RATE }}</div>
        </div>
      </div>
    </div>
    <div
      class="empty-states-container"
      v-if="error"
    >
      <div class="empty-states">
        <div><img :src="EmptyStates" /></div>
        <div class="empty-states-title">{{ title }} {{ ROC_AUC_STRINGS.IS_UNAVAILABLE }}</div>
      </div>
      <RocAucSkeleton v-if="loading" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import RocAuc from '@/design-library/src/components/RocAucGraph/RocAuc.vue';
  import RocAucSkeleton from './Components/RocAucSkeleton.vue';
  import InfoIcon from '@/design-library/src/assets/icons/info/moreInfo.svg';
  import EmptyStates from '@/design-library/src/assets/icons/empty-states/empty-states.svg';
  import Tooltip from '@/design-library/src/components/Tooltip';
  import type { IRocAucGraph, IDataPositive } from '@/design-library/src/types/interfaces/rocAuc';
  import { ROC_AUC_STRINGS } from './consts';
  defineOptions({
    name: 'roc-auc-graph',
  });
  withDefaults(defineProps<IRocAucGraph>(), {
    data: () => [] as IDataPositive[],
    aucValue: 0.55,
    loading: false,
    error: false,
    title: 'ROC/AUC',
    titleTooltip: 'ROC/AUC',
  });
</script>

<style lang="scss" scoped>
  @import '@/design-library/src/styles/colors/text.module';
  @import '@/design-library/src/styles/corners/corners';
  @import '@/design-library/src/styles/borders/borders';
  .rocauc {
    width: 100%;
    height: 300px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;

    &-header {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    &-chart {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      color: $txt-secondary;
      position: relative;
      height: 100%;

      &-container {
        width: 100%;
        height: 100%;
      }

      &-auc {
        display: flex;
        flex-direction: column;
        padding: 8px;
        width: 48px;
        height: 48px;
        background: $txt-inverted;
        position: absolute;
        right: 60px;
        bottom: 60px;
        border-radius: $border-radius-small;
        line-height: normal;
        font-style: normal;
        border: $border;
      }

      &-roc {
        position: absolute;
        left: 150px;
        top: 20px;
        border-radius: $border-radius-small;
      }

      &-frequency {
        position: relative;
        div {
          white-space: nowrap;
          position: absolute;
          bottom: 0;
          left: -25px;
          bottom: -10px;
          transform: rotate(270deg);
        }
      }

      &-line {
        width: 100%;
        height: 100%;
      }
    }

    &-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      color: $txt-secondary;
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

      &-title {
        color: $txt-primary;
      }
    }
  }
</style>
