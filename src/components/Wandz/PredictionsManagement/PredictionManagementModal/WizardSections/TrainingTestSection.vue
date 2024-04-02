<template>
  <div>
    <section-header
      :title="MODEL_STEP3_STRINGS.TRAINING_TEST_CONTROL_HEADER"
      :tooltip="MODEL_STEP3_STRINGS.TRAINING_TEST_CONTROL_HEADER_TOOLTIP"
    />
    <basic-slider
      :min="MIN_TRAINING_PERCENTAGE"
      :min-error-message="MODEL_STEP3_STRINGS.TRAINING_TEST_CONTROL_MIN_ERR_MSG"
      :max="MAX_TRAINING_PERCENTAGE"
      :max-error-message="MODEL_STEP3_STRINGS.TRAINING_TEST_CONTROL_MAX_ERR_MSG"
      :interval="5"
      :initial-value="initialValue"
      :disabled="false"
      @change="onValueChange"
    />
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import setWith from 'lodash/setWith';

  import { usePredictionManagementStore } from '@/stores/wandz';

  import BasicSlider from '@/design-library/src/components/BasicSlider';

  import SectionHeader from '../SectionHeader';
  import { MAX_TRAINING_PERCENTAGE, MIN_TRAINING_PERCENTAGE, MODEL_STEP3_STRINGS } from '../consts';

  const predictionStore = usePredictionManagementStore();
  const { predictionModelObj } = storeToRefs(predictionStore);

  const initialValue = predictionModelObj.value?.advancedConfig?.trainingSetPercentages || MAX_TRAINING_PERCENTAGE;
  const onValueChange = (value: number) =>
    setWith(predictionModelObj.value, 'advancedConfig.trainingSetPercentages', value);
</script>

<style scoped lang="scss"></style>
