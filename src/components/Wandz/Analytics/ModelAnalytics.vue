<template>
  <div class="model-container">
    <grid-layout
      :items="items.topBar"
      v-if="!isModal"
    >
      <template #top-bar-actions>
        <top-bar-actions
          :back-button-text="MODEL_ANALYTICS_TEXTS.BACK_TO_MODELS_MANAGEMENT"
          :export-csv-text="MODEL_ANALYTICS_TEXTS.EXPORT_TO_CSV"
          :published="isPublished"
          :in-training="inTraining"
          :status="propertiesData.status"
        />
      </template>
    </grid-layout>
    <grid-layout :items="items.info">
      <template #info-part>
        <div class="element-container full-size">
          <prediction-flatted-info
            :name="propertiesData.title"
            :status="propertiesData.status"
            :data="propertiesData.dateData"
            :extra-info="infoData"
          />
        </div>
      </template>
      <template #treshold>
        <treshold-recalculation
          :score="score"
          :title="tresholdData.title"
          :subtitle="tresholdData.subtitle"
          @change-score="changeScore"
          @cancel="changeScore"
        />
      </template>
    </grid-layout>
    <grid-layout :items="items.strengthModel">
      <template #strength-model>
        <model-strength-score-container
          :data="ModelStrengthScore"
          :loading="isLoading"
        />
      </template>
    </grid-layout>
    <grid-layout :items="items.prediction">
      <template #prediction-chart>
        <prediction-destribution
          v-if="!isPublished"
          :data="PredictionDistributionData"
          :loading="isLoading"
        />
        <prediction-made
          v-else
          :data="PredictionMadeData"
          :loading="isLoading"
          :title="'Prediction Made'"
        />
      </template>
    </grid-layout>
    <grid-layout
      :items="items.matrix"
      class="matrix-rocauc"
    >
      <template #matrix>
        <confusion-matrix :loading="isLoading" />
      </template>
      <template #rocauc>
        <roc-auc-graph
          :data="RocAucData"
          :loading="isLoading"
        />
      </template>
    </grid-layout>
    <grid-layout
      :items="items.featureImportance"
      v-if="!isModal"
      ><template #feature-importance>
        <feature-importance />
      </template>
    </grid-layout>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import TopBarActions from './AnalyticsTopBar.vue';
  import TresholdRecalculation from './components/TresholdRecalculation/TresholdRecalculation.vue';
  import PredictionFlattedInfo from '../Common/PredictionFlattedInfo/PredictionFlattedInfo.vue';
  import ModelStrengthScoreContainer from './components/ModelStrengthScoreContainer/ModelStrengthScoreContainer.vue';
  import PredictionDestribution from './components/PredictionDistribution/PredictionDistribution.vue';
  import PredictionMade from './components/PredictionMade/PredictionMadeChart.vue';
  import ConfusionMatrix from '@/design-library/src/components/ConfusionMatrix/ConfusionMatrix.vue';
  import RocAucGraph from './components/RocAucGraph/RocAucGraph.vue';
  import GridLayout from '@/design-library/src/components/Layout/GridLayout.vue';
  import FeatureImportance from './components/FeatureImportance/FeatureImportance.vue';
  import { MODEL_ANALYTICS_TEXTS } from '@/design-library/src/types/enums/AnalyticsTopBar';
  import { ModelStatuses } from '@wandzai/wandz-interfaces';

  defineProps({
    isModal: {
      type: Boolean,
      required: true,
      default: false,
    },
  });
  const items = {
    topBar: [
      {
        gridColumnStart: 1,
        gridColumnEnd: 12,
        name: 'top-bar-actions',
      },
    ],
    info: [
      {
        gridColumnStart: 1,
        gridColumnEnd: 8,
        name: 'info-part',
      },
      {
        gridColumnStart: 9,
        gridColumnEnd: 12,
        name: 'treshold',
      },
    ],
    strengthModel: [
      {
        gridColumnStart: 1,
        gridColumnEnd: 12,
        name: 'strength-model',
      },
    ],
    prediction: [
      {
        gridColumnStart: 1,
        gridColumnEnd: 12,
        name: 'prediction-chart',
      },
    ],
    matrix: [
      {
        gridColumnStart: 1,
        gridColumnEnd: 6,
        name: 'matrix',
      },
      {
        gridColumnStart: 7,
        gridColumnEnd: 12,
        name: 'rocauc',
      },
    ],
    featureImportance: [
      {
        gridColumnStart: 1,
        gridColumnEnd: 12,
        name: 'feature-importance',
      },
    ],
  };

  const score = ref(0.75);

  const isLoading = ref(false);

  const changeScore = (e) => {
    score.value = e;
  };

  const ModelStrengthScore = [
    { name: 'F1 Score', score: 0.85, variant: 'big-line' },
    { name: 'Accuracy', score: 0.85, variant: 'medium-line' },
    { name: 'Precision', score: 0.65, variant: 'medium-line' },
    { name: 'Recall', score: 0.4, variant: 'medium-line' },
    { name: 'ROC/AUC', score: 0.55, variant: 'medium-line' },
  ];

  const RocAucData = ref([
    {
      truePositive: 0,
      falsePositive: 0,
    },
    {
      truePositive: 0.41,
      falsePositive: 1,
    },
    {
      truePositive: 0.71,
      falsePositive: 2,
    },
    {
      truePositive: 0.92,
      falsePositive: 3,
    },
    {
      truePositive: 1.05,
      falsePositive: 4,
    },
    {
      truePositive: 1.12,
      falsePositive: 5,
    },
    {
      truePositive: 1.16,
      falsePositive: 6,
    },
    {
      truePositive: 1.17,
      falsePositive: 7,
    },
    {
      truePositive: 1.16,
      falsePositive: 8,
    },
    {
      truePositive: 1.14,
      falsePositive: 9,
    },
    {
      truePositive: 1.12,
      falsePositive: 10,
    },
  ]);

  const PredictionDistributionData = ref([
    {
      predicted: 0,
      frequency: 0,
    },
    {
      predicted: 0.05,
      frequency: 10,
    },
    {
      predicted: 0.1,
      frequency: 30,
    },
    {
      predicted: 0.15,
      frequency: 50,
    },
    {
      predicted: 0.2,
      frequency: 80,
    },
    {
      predicted: 0.25,
      frequency: 115,
    },
    {
      predicted: 0.3,
      frequency: 160,
    },
    {
      predicted: 0.35,
      frequency: 205,
    },
    {
      predicted: 0.4,
      frequency: 260,
    },
    {
      predicted: 0.45,
      frequency: 305,
    },
    {
      predicted: 0.5,
      frequency: 350,
    },
    {
      predicted: 0.55,
      frequency: 380,
    },
    {
      predicted: 0.6,
      frequency: 400,
    },
    {
      predicted: 0.65,
      frequency: 390,
    },
    {
      predicted: 0.7,
      frequency: 330,
    },
    {
      predicted: 0.75,
      frequency: 180,
    },
    {
      predicted: 0.8,
      frequency: 110,
    },
    {
      predicted: 0.85,
      frequency: 75,
    },
    {
      predicted: 0.9,
      frequency: 45,
    },
    {
      predicted: 0.95,
      frequency: 20,
    },
    {
      predicted: 1,
      frequency: 0,
    },
  ]);

  const PredictionMadeData = ref([
    {
      dateTrue: 'Nov 1',
      valueTrue: 150000,
      dateFalse: 'Nov 1',
      valueFalse: 350000,
    },
    {
      dateTrue: 'Nov 2',
      valueTrue: 130000,
      dateFalse: 'Nov 2',
      valueFalse: 330000,
    },
    {
      dateTrue: 'Nov 3',
      valueTrue: 150000,
      dateFalse: 'Nov 3',
      valueFalse: 350000,
    },
    {
      dateTrue: 'Nov 4',
      valueTrue: 190000,
      dateFalse: 'Nov 4',
      valueFalse: 390000,
    },
    {
      dateTrue: 'Nov 5',
      valueTrue: 170000,
      dateFalse: 'Nov 5',
      valueFalse: 370000,
    },
    {
      dateTrue: 'Nov 6',
      valueTrue: 200000,
      dateFalse: 'Nov 6',
      valueFalse: 400000,
    },
    {
      dateTrue: 'Nov 7',
      valueTrue: 180000,
      dateFalse: 'Nov 7',
      valueFalse: 380000,
    },
    {
      dateTrue: 'Nov 8',
      valueTrue: 150000,
      dateFalse: 'Nov 8',
      valueFalse: 350000,
    },
    {
      dateTrue: 'Nov 9',
      valueTrue: 120000,
      dateFalse: 'Nov 9',
      valueFalse: 320000,
    },
    {
      dateTrue: 'Nov 10',
      valueTrue: 170000,
      dateFalse: 'Nov 10',
      valueFalse: 370000,
    },
    {
      dateTrue: 'Nov 10',
      valueTrue: 170000,
      dateFalse: 'Nov 10',
      valueFalse: 370000,
    },
    {
      dateTrue: 'Nov 11',
      valueTrue: 140000,
      dateFalse: 'Nov 11',
      valueFalse: 340000,
    },
    {
      dateTrue: 'Nov 12',
      valueTrue: 100000,
      dateFalse: 'Nov 12',
      valueFalse: 300000,
    },
    {
      dateTrue: 'Nov 13',
      valueTrue: 170000,
      dateFalse: 'Nov 13',
      valueFalse: 370000,
    },
    {
      dateTrue: 'Nov 14',
      valueTrue: 220000,
      dateFalse: 'Nov 14',
      valueFalse: 420000,
    },
    {
      dateTrue: 'Nov 15',
      valueTrue: 180000,
      dateFalse: 'Nov 15',
      valueFalse: 380000,
    },
    {
      dateTrue: 'Nov 16',
      valueTrue: 120000,
      dateFalse: 'Nov 16',
      valueFalse: 320000,
    },
    {
      dateTrue: 'Nov 17',
      valueTrue: 160000,
      dateFalse: 'Nov 17',
      valueFalse: 360000,
    },
    {
      dateTrue: 'Nov 18',
      valueTrue: 140000,
      dateFalse: 'Nov 18',
      valueFalse: 340000,
    },
    {
      dateTrue: 'Nov 19',
      valueTrue: 190000,
      dateFalse: 'Nov 19',
      valueFalse: 390000,
    },
    {
      dateTrue: 'Nov 20',
      valueTrue: 200000,
      dateFalse: 'Nov 20',
      valueFalse: 400000,
    },
  ]);

  const tresholdData = {
    title: 'Change Model “True” Threshold',
    subtitle: 'Change the ‘true’ threshold, in order to refine your prediction quality',
  };

  const propertiesData = ref({
    title: 'Prediction to Purchase_15.10.23',
    status: ModelStatuses.TRAINING_COMPLETED,
    dateData: [
      {
        title: 'Target:',
        value: 'Event > Click on Cart',
      },
      {
        title: 'Trained on:',
        value: 'Oct 12, 2023, 10:49 am',
      },
      {
        title: 'Training date range:',
        value: 'Oct 12 - Oct 25, 2023',
      },
      {
        title: 'Audience:',
        value: 'All',
      },
    ],
    CompletedInfoData: [
      {
        title: 'Total Audience Size',
        value: '1.08M',
      },
      {
        title: 'Training Set Size',
        value: '800,500',
        subValue: '80% of total',
      },
      {
        title: 'Test Set Size',
        value: '199,580',
        subValue: '20% of total',
      },
    ],
    PublishedInfoData: [
      {
        title: 'Total Predictions Made',
        value: '1.08M',
      },
    ],
  });

  const isPublished = computed(() => {
    return propertiesData.value.status === ModelStatuses.PUBLISHED;
  });

  const inTraining = computed(() => {
    return propertiesData.value.status === ModelStatuses.IN_TRAINING;
  });

  const infoData = computed(() => {
    return isPublished.value ? propertiesData.value.PublishedInfoData : propertiesData.value.CompletedInfoData;
  });
</script>

<style lang="scss" scoped>
  .model-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 3%;
    gap: 24px;
  }

  .matrix-rocauc {
    width: 100%;
  }

  .full-size {
    width: 100%;
    height: 233px;
  }
</style>
