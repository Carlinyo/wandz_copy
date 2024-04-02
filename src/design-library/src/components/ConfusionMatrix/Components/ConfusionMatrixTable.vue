<template>
  <div class="matrix">
    <div class="matrix-actual-values body-micro">{{ CONFUSION_MATRIX_STRINGS.ACTUAL_VALUES }}</div>
    <div class="matrix-actual-true small-label-title">{{ CONFUSION_MATRIX_STRINGS.TRUE }}</div>
    <div class="matrix-actual-false small-label-title">{{ CONFUSION_MATRIX_STRINGS.FALSE }}</div>
    <div class="matrix-predicted-values">
      <div class="body-micro">{{ CONFUSION_MATRIX_STRINGS.PREDICTED_VALUE }}</div>
    </div>
    <div class="matrix-predicted-true small-label-title">{{ CONFUSION_MATRIX_STRINGS.TRUE }}</div>
    <div class="matrix-predicted-false small-label-title">{{ CONFUSION_MATRIX_STRINGS.FALSE }}</div>
    <div
      v-for="(key, index) in Object.keys(data)"
      :key="index"
      :class="getClassName(key)"
    >
      <KpiBox
        :title="getTitle(key)"
        :titleInfo="data[key].tooltip"
        :containerStyle="{ backgroundColor: 'transparent', border: 'none', alignItems: 'center' }"
      >
        <KpiBoxUpliftContent
          :mainValueText="data[key].value"
          :mainValueColor="key.includes('true') ? semanticPositive : semanticNegative"
          :upliftBackgroundColor="'transparent'"
          :tagBackgroundColor="'TagBackgroundColor'"
        />
      </KpiBox>
    </div>
  </div>
</template>

<script setup lang="ts">
  import KpiBox from '../../KpiBox/KpiBox.vue';
  import KpiBoxUpliftContent from '../../KpiBox/KpiBoxUpliftContent.vue';
  import { semanticPositive, semanticNegative } from '../../../styles/colors/semantic.module.scss';
  import { CONFUSION_MATRIX_STRINGS } from '../consts';
  import type { IMatrix } from '../../../types/interfaces/ConfusionMatrix';
  defineOptions({
    name: 'confus-matrix',
  });
  withDefaults(defineProps<IMatrix>(), {
    data: () => ({
      truePositives: { value: '123456', tooltip: '1' },
      falsePositives: { value: '123456', tooltip: '2' },
      falseNegatives: { value: '123456', tooltip: '3' },
      trueNegatives: { value: '123456', tooltip: '4' },
    }),
  });

  const getClassName = (key: string) =>
    `matrix-kpi-box-${key.includes('true') ? 'green' : 'red'} matrix-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
  const getTitle = (key: string) =>
    key
      .replace(/([A-Z])/g, ' $1')
      .charAt(0)
      .toUpperCase() + key.replace(/([A-Z])/g, ' $1').slice(1);
</script>

<style lang="scss" scoped>
  @import '../../../styles/colors/text.module';
  @import '../../../styles/spacing/spacing';

  .matrix {
    width: 100%;
    color: $txt-secondary;
    display: grid;
    grid-template-columns: 5% 10% repeat(2, 37%);
    grid-template-rows: repeat(2, 3%) repeat(2, 29%);
    grid-column-gap: $SP16;
    grid-row-gap: $SP16;
    text-align: center;
    background: transparent;

    &-actual-values {
      text-align: center;
      grid-area: 1 / 3 / 2 / 5;
    }

    &-kpi-box-green {
      border-radius: 8px;
      background: linear-gradient(180deg, #e7f9dd 0%, #f8fef4 100%);
    }

    &-true-positives {
      grid-area: 3 / 3 / 4 / 4;
    }

    &-true-negatives {
      grid-area: 4 / 4 / 5 / 5;
    }

    &-kpi-box-red {
      border-radius: 8px;
      background: linear-gradient(180deg, #fce6e6 0%, #fff6f6 100%);
    }

    &-false-positives {
      grid-area: 3 / 4 / 4 / 5;
    }

    &-false-negatives {
      grid-area: 4 / 3 / 5 / 4;
    }

    &-actual-true {
      text-align: center;
      grid-area: 2 / 3 / 3 / 4;
    }

    &-actual-false {
      text-align: center;
      grid-area: 2 / 4 / 3 / 5;
    }

    &-predicted-values {
      position: relative;
      grid-area: 3 / 1 / 5 / 2;

      div {
        text-align: center;
        white-space: nowrap;
        position: absolute;
        bottom: 0;
        left: 0;
        margin-bottom: 40px;
        transform: rotate(270deg);
        transform-origin: 0 0;
      }
    }

    &-predicted-true {
      display: flex;
      align-items: center;
      grid-area: 3 / 2 / 4 / 3;
    }

    &-predicted-false {
      display: flex;
      align-items: center;
      grid-area: 4 / 2 / 5 / 3;
    }
  }
</style>
