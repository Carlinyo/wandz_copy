<template>
  <div class="basic-configuration-container">
    <basic-details-section
      v-on:[WandzCommonEmits.IS_VALID_SECTION_EVENT]="
        (isValidSection: boolean) => {
          validSections.basicDetails = isValidSection;
        }
      "
    />
    <prediction-target-section
      v-on:[WandzCommonEmits.IS_VALID_SECTION_EVENT]="
        (isValidSection: boolean) => {
          validSections.predictionTarget = isValidSection;
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watchEffect } from 'vue';
  import BasicDetailsSection from '../WizardSections/BasicDetailsSection.vue';
  import PredictionTargetSection from '../WizardSections/PredictionTargetSection.vue';
  import { WandzCommonEmits } from '@/components/Wandz/types';

  const emit = defineEmits([WandzCommonEmits.IS_VALID_STEP_EVENT]);

  const validSections = ref({
    basicDetails: false,
    predictionTarget: false,
  });

  const isValid = computed(() => Object.values(validSections.value).every((value) => value));

  watchEffect(() => {
    emit(WandzCommonEmits.IS_VALID_STEP_EVENT, isValid.value);
  });
</script>

<style scoped lang="scss">
  .basic-configuration-container {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
</style>
