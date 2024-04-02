<template>
  <div class="element-container model-strength-container">
    <div
      v-if="!loading"
      class="container-title"
    >
      {{ MODEL_STRENGTH_CONTAINER_DATA.title }}
    </div>
    <div
      class="analytic-items"
      v-if="data && data.length && !loading"
    >
      <div class="analytic-items-container">
        <div
          v-for="(chart, index) of bigChartsData"
          :key="index"
        >
          <model-strength-score
            variant="big-line"
            :columns-data="columnData"
            :score="chart.score"
            :name="chart.name"
          />
        </div>
      </div>
      <div class="analytic-items-container">
        <div
          v-for="(bar, index) of mediumChartsData"
          :key="index"
          class="medium-strength-score"
        >
          <model-strength-score
            :name="bar.name"
            :columns-data="columnData"
            :index="index"
            :score="bar.score"
            variant="medium-line"
          />
        </div>
      </div>
    </div>
    <div v-else-if="loading">
      <skeleton-model-strength />
    </div>
    <div
      v-else
      class="empty-container"
    >
      <img :src="EmptyStates" />
      <div class="container-title">{{ MODEL_STRENGTH_CONTAINER_DATA.emptyContainerTitle }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, PropType } from 'vue';
  import { MODEL_STRENGTH_CONTAINER_DATA } from './consts';
  import { IAnalyticsData } from '@/design-library/src/types/interfaces/Analytics';
  import EmptyStates from '@/design-library/src/assets/icons/empty-states/empty-states.svg';
  import ModelStrengthScore from '@/design-library/src/components/ModelStrengthScore/ModelStrengthScore.vue';
  import SkeletonModelStrength from './SkeletonModelStrength.vue';
  import { QUALITY_FUNCTIONS_COLUMNS } from '@/design-library/src/types/enums/QualityFunctions';

  const { POOR, SPACE, FAIR, GOOD, EXCELLENT } = QUALITY_FUNCTIONS_COLUMNS;

  const props = defineProps({
    loading: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Array as PropType<IAnalyticsData[]>,
      required: true,
    },
  });

  const bigChartsData = computed(() => {
    return props.data.filter((el) => el.variant === 'big-line');
  });

  const columnData = [
    { name: POOR, value: 0 },
    { name: SPACE, value: '' },
    { name: FAIR, value: 0.5 },
    { name: SPACE, value: '' },
    { name: GOOD, value: 0.6 },
    { name: SPACE, value: '' },
    { name: EXCELLENT, value: 0.8 },
    { name: SPACE, value: 1 },
  ];

  const mediumChartsData = computed(() => {
    return props.data.filter((el) => el.variant === 'medium-line');
  });

  defineExpose({
    EmptyStates,
  });
</script>

<style lang="scss" scoped>
  @import '@/design-library/src/styles/spacing/spacing';
  .analytic-items {
    display: flex;
    align-items: center;
    gap: $SP16;
  }

  .model-strength-container {
    width: 100%;
    height: 290px !important;
    display: flex;
    flex-direction: column;
    gap: $SP24;
  }

  .analytic-items-container {
    display: flex;
    flex-direction: column;
    gap: $SP16;
    width: 100%;
  }

  .empty-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin: 70px 0;
  }
</style>
