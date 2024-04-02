<template>
  <div class="prediction-target-item-wrapper">
    <dropdown
      v-if="showConditionOptions"
      type="regular"
      size="small"
      :width="74"
      :items="conditionOptionsList"
      :selectedItems="[{ text: TARGET_RULES_CONDITION_OPTIONS[ruleObj.condition] }]"
      :use-search="false"
      :show-first-line-label="false"
      @dropdown-click="(value) => onSelectionCondition(value)"
      :formatter="LogicFilters.dropDownOptionsFormatter"
    />

    <dropdown
      type="regular"
      size="small"
      :width="158"
      :items="TARGET_RULES_TARGET_OPTIONS(predictionModelObj.intent as IntentTypes)"
      :selectedItems="[getSelectedTargetType(ruleObj.type)]"
      :use-search="false"
      :show-first-line-label="false"
      @dropdown-click="(value) => onSelectionTarget(value)"
      :formatter="LogicFilters.dropDownOptionsFormatter"
      :error="!ruleObj.type?.length"
      :error-message="WANDZ_STRINGS.FIELD_IS_REQUIRED"
    />
    <dropdown
      v-if="ruleObj.type === PredictionTarget.EVENT"
      type="regular"
      size="small"
      :width="301"
      :items="eventsOptionsList"
      :selectedItems="eventsList[ruleObj.value] && [{ text: eventsList[ruleObj.value] || '' }]"
      :use-search="false"
      :show-first-line-label="true"
      @dropdown-click="(value) => onSelectedValue(value)"
      :formatter="LogicFilters.dropDownOptionsFormatter"
      :sub-title="TARGET_RULES_CONFIGURATIONS[PredictionTarget.EVENT].placeHolder"
      :error="!ruleObj.value?.length"
      :error-message="WANDZ_STRINGS.FIELD_IS_REQUIRED"
    />
    <dropdown
      v-if="ruleObj.type === PredictionTarget.TIME_TO_RETURN"
      type="regular"
      size="small"
      :width="301"
      :items="timeToReturnOptionsList"
      :selectedItems="
        (TIME_TO_RETURN_OPTIONS[ruleObj.value] && [{ text: TIME_TO_RETURN_OPTIONS[ruleObj.value] || '' }]) || []
      "
      :use-search="false"
      :show-first-line-label="true"
      @dropdown-click="(value) => onSelectedValue(value)"
      :formatter="LogicFilters.dropDownOptionsFormatter"
      :sub-title="TARGET_RULES_CONFIGURATIONS[PredictionTarget.TIME_TO_RETURN].placeHolder"
      :error="!ruleObj.value?.length"
      :error-message="WANDZ_STRINGS.FIELD_IS_REQUIRED"
    />
    <template v-if="ruleObj.type === PredictionTarget.URL">
      <dropdown
        type="regular"
        size="small"
        :width="160"
        :items="targetUrlOperatorsOptionsList"
        :selectedItems="[{ text: TARGET_URL_OPERATORS[ruleObj.operator] || '' }]"
        :use-search="false"
        :show-first-line-label="false"
        @dropdown-click="(operator) => onSelectedOperator(operator)"
        :formatter="LogicFilters.dropDownOptionsFormatter"
        :error="!ruleObj.operator?.length"
        :error-message="WANDZ_STRINGS.FIELD_IS_REQUIRED"
      />
      <text-input
        type="regular"
        :placeholder="TARGET_RULES_CONFIGURATIONS[PredictionTarget.URL].placeHolder"
        :value="ruleObj.value"
        @text-input="(value: string) => onSelectedValue({ value } as IDropdownItem)"
        :height="40"
        :error="!ruleObj.value?.length"
        :error-message="WANDZ_STRINGS.FIELD_IS_REQUIRED"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
  import {
    TARGET_RULES_CONDITION_OPTIONS,
    TARGET_RULES_CONFIGURATIONS,
    TARGET_RULES_TARGET_OPTIONS,
    TARGET_URL_OPERATORS,
    TIME_TO_RETURN_OPTIONS,
    UNIQUE_INTENT_TYPES,
    WANDZ_STRINGS,
  } from '../consts';
  import LogicFilters from '@/design-library/src/utils/filters/formatters';
  import { PredictionTarget } from '@wandzai/wandz-interfaces/src/enums/pred-model';
  import Dropdown from '@/design-library/src/components/Dropdown';
  import TextInput from '@/design-library/src/components/TextInput/TextInput.vue';
  import { computed, shallowRef, watch } from 'vue';
  import { usePredictionManagementStore, useWandzPlatformStore } from '@/stores/wandz';
  import { storeToRefs } from 'pinia';
  import type { IDropdownItem } from '@/design-library/src/types/interfaces/IDropdownItem';
  import { objectToDropdownArray } from '@/design-library/src/utils/globalMap/dropdownUtil';
  import type { IntentTypes, ITargetRule } from '@wandzai/wandz-interfaces';
  import { WandzCommonEmits } from '@/components/Wandz/types';

  const emit = defineEmits([WandzCommonEmits.RULE_CHANGED]);
  const props = defineProps({
    rule: {
      type: Object as () => ITargetRule,
      required: true,
    },
    idx: {
      type: Number,
      required: true,
    },
  });

  const predictionModelStore = usePredictionManagementStore();
  const { predictionModelObj } = storeToRefs(predictionModelStore);

  const ruleObj = computed(() => props.rule);

  const wandzStore = useWandzPlatformStore();
  const { eventsList } = storeToRefs(wandzStore);

  const eventsOptionsList = shallowRef(objectToDropdownArray(eventsList.value as unknown as { [key: string]: string }));

  const targetUrlOperatorsOptionsList = objectToDropdownArray(TARGET_URL_OPERATORS);

  const timeToReturnOptionsList = objectToDropdownArray(TIME_TO_RETURN_OPTIONS);

  const conditionOptionsList = objectToDropdownArray(TARGET_RULES_CONDITION_OPTIONS);

  const showConditionOptions = computed(
    () => props.idx > 0 && !UNIQUE_INTENT_TYPES.includes(predictionModelObj.value.intent),
  );
  const getSelectedTargetType = (type: string) => TARGET_RULES_CONFIGURATIONS[type];

  const onSelectedValue = ({ value }: IDropdownItem) => {
    ruleObj.value.value = value;
  };

  const onSelectionTarget = ({ value }: IDropdownItem) => {
    delete ruleObj.value.value;
    ruleObj.value.type = value;
  };

  const onSelectedOperator = ({ value }: IDropdownItem) => {
    ruleObj.value.operator = value;
  };

  const onSelectionCondition = ({ value }: IDropdownItem) => {
    ruleObj.value.condition = value;
  };

  watch(ruleObj.value, () => {
    emit(WandzCommonEmits.RULE_CHANGED, ruleObj.value);
  });
</script>

<style scoped lang="scss">
  .prediction-target-item-wrapper {
    width: 95%;
    display: flex;
    gap: 8px;
    margin-bottom: 6px;
  }
</style>
