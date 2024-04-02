<template>
  <div>
    <prediction-target-rules
      v-on:[WandzCommonEmits.IS_VALID_SECTION_EVENT]="
        (isValidSection: boolean) => emit(WandzCommonEmits.IS_VALID_SECTION_EVENT, isValidSection)
      "
    />
  </div>
</template>

<script setup lang="ts">
  import PredictionTargetRules from '../PredictionTargetRules/PredictionTargetRules.vue';
  import { WandzCommonEmits } from '@/components/Wandz/types';

  const emit = defineEmits([WandzCommonEmits.IS_VALID_SECTION_EVENT]);
</script>

<style scoped lang="scss">
  .question-list-container {
    display: inline-flex;
    flex-direction: column;
    gap: 24px;

    .question-row-container {
      display: flex;
      flex-direction: row;
      gap: 16px;
      align-items: center;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;

      .logic-operator-container {
        max-width: 105px;
      }
    }

    .actions-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .cta-buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
        flex: 1;
        justify-content: end;
      }
    }
  }
</style>
