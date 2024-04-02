<template>
  <div class="training-configuration-container">
    <div>
      <select-audience
        :title="MODEL_STEP3_STRINGS.AUDIENCE_FOR_TRAINING"
        :title-tooltip="MODEL_STEP3_STRINGS.AUDIENCE_FOR_TRAINING_TOOLTIP"
        :prediction-model-obj="predictionModelObj"
        @segment-selected="handleSegmentSelected"
        @on-select-exclude-bots="handleSelectExcludeBots"
        :error="showAudiencesError"
      />
    </div>
    <training-schedule-section />
    <model-quality-section />
    <model-attributes-section
      @[WandzCommonEmits.IS_VALID_SECTION_EVENT]="(valid: boolean) => (validSections.modelAttributes = valid)"
    />
    <training-test-section />
  </div>
</template>

<script setup lang="ts">
  import { SelectAudience } from '../../../Common';
  import { MODEL_STEP3_STRINGS, WANDZ_STRINGS } from '../consts';

  import {
    TrainingScheduleSection,
    ModelQualitySection,
    ModelAttributesSection,
    TrainingTestSection,
  } from '../WizardSections';
  import setWith from 'lodash/setWith';
  import { usePredictionManagementStore } from '@/stores/wandz';
  import { storeToRefs } from 'pinia';
  import { type IBaseAudiencesConfig } from '@wandzai/wandz-interfaces';
  import { watch, computed, ref } from 'vue';
  import { WandzCommonEmits } from '@/components/Wandz/types';
  const predictionModelStore = usePredictionManagementStore();
  const { predictionModelObj } = storeToRefs(predictionModelStore);

  const emit = defineEmits([WandzCommonEmits.IS_VALID_STEP_EVENT]);

  const handleSegmentSelected = (data: IBaseAudiencesConfig) => {
    setWith(predictionModelObj.value, 'trainedAudiences.audiences', data);
  };
  const handleSelectExcludeBots = (isSelected: Boolean) => {
    setWith(predictionModelObj.value, 'trainedAudiences.excludeBots', isSelected);
  };

  const showAudiencesError = computed(() =>
    predictionModelObj.value?.trainedAudiences?.audiences &&
    !Object.values(predictionModelObj.value.trainedAudiences.audiences).some((arr) => arr.length)
      ? WANDZ_STRINGS.FIELD_IS_REQUIRED
      : '',
  );

  const validSections = ref({
    audiences: !showAudiencesError.value.length,
    modelAttributes: false,
  });

  const isValid = computed(() => Object.values(validSections.value).every((value) => value));

  watch(showAudiencesError, () => {
    validSections.value.audiences = !showAudiencesError.value.length;
  });

  watch(validSections.value, () => {
    emit(WandzCommonEmits.IS_VALID_STEP_EVENT, isValid.value);
  });
</script>

<style scoped lang="scss">
  .training-configuration-container {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
</style>
