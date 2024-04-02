<template>
  <div
    class="confusion-matrix element-container"
    v-if="!loading"
  >
    <div class="confusion-matrix-header">
      <div class="container-title">{{ title }}</div>
      <tooltip
        :text="titleTooltip"
        :position="'right'"
      >
        <img :src="InfoIcon" />
      </tooltip>
    </div>
    <confusion-matrix-table
      v-if="!error"
      :data="data"
    />
    <div
      class="empty-states-container"
      v-if="error"
    >
      <div class="empty-states">
        <div><img :src="EmptyStates" /></div>
        <div class="small-label-title">{{ title }} {{ CONFUSION_MATRIX_STRINGS.PREDICTED_VALUE }}</div>
      </div>
    </div>
  </div>
  <confusion-matrix-skeleton v-if="loading" />
</template>

<script lang="ts" setup>
  import InfoIcon from '../../assets/icons/info/moreInfo.svg';
  import EmptyStates from '../../assets/icons/empty-states/empty-states.svg';
  import Tooltip from '../Tooltip';
  import ConfusionMatrixTable from './Components/ConfusionMatrixTable.vue';
  import ConfusionMatrixSkeleton from './Components/ConfusionMatrixSkeleton.vue';
  import { CONFUSION_MATRIX_STRINGS } from './consts';
  import type { IConfusionMatrix } from '../../types/interfaces/ConfusionMatrix';

  defineOptions({
    name: 'confusion-matrix',
  });
  withDefaults(defineProps<IConfusionMatrix>(), {
    data: () => ({
      truePositives: { value: '123456', tooltip: '1' },
      falsePositives: { value: '123456', tooltip: '2' },
      falseNegatives: { value: '123456', tooltip: '3' },
      trueNegatives: { value: '123456', tooltip: '4' },
    }),
    loading: false,
    error: false,
    title: 'Confusion Matrix',
    titleTooltip: 'Confusion Matrix',
  });
</script>

<style lang="scss" scoped>
  @import '../../styles/spacing/spacing';

  .confusion-matrix {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: $SP24;
    &-header {
      display: flex;
      align-items: center;
      gap: $SP4;
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
    }

    .skeleton-loading-container {
      width: 100%;
      height: 100%;
    }
  }
</style>
