<template>
  <div>
    <section-header
      :title="MODEL_STEP3_STRINGS.MODEL_QUALITY_FUNCTION"
      :tooltip="MODEL_STEP3_STRINGS.MODEL_QUALITY_FUNCTION_TOOLTIP"
    />
    <dropdown
      :items="OPTIMIZATION_OPTIONS"
      :selected-items="getSelectedValue"
      :formatter="LogicFilters.dropDownOptionsFormatter"
      :type="'regular'"
      :use-search="false"
      @dropdown-click="onSelectOption"
      :size="'small'"
      :width="257"
    />
  </div>
</template>

<script setup lang="ts">
  import SectionHeader from '@/components/Wandz/PredictionsManagement/PredictionManagementModal/SectionHeader/SectionHeader.vue';
  import { MODEL_STEP3_STRINGS, OPTIMIZATION_OPTIONS } from '../consts';
  import Dropdown from '@/design-library/src/components/Dropdown/Dropdown.vue';
  import { ref } from 'vue';
  import { usePredictionManagementStore } from '@/stores/wandz';
  import { storeToRefs } from 'pinia';
  import { OptimizationFunctions } from '@wandzai/wandz-interfaces/src/enums';
  import LogicFilters from '@/design-library/src/utils/filters/formatters';

  const predictionStore = usePredictionManagementStore();
  const { predictionModelObj } = storeToRefs(predictionStore);

  const getSelectedValue = ref([
    OPTIMIZATION_OPTIONS.find((option) => option.value === predictionModelObj.value.optimizationFunction) ||
      OPTIMIZATION_OPTIONS[0],
  ]);
  const onSelectOption = ({ value }: { value: OptimizationFunctions }) => {
    predictionModelObj.value.optimizationFunction = value;
  };
</script>

<style scoped lang="scss"></style>
