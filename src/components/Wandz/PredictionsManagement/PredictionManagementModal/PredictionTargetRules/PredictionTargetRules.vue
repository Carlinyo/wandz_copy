<template>
  <div class="target-rules-container">
    <div
      v-for="(item, idx) in selectedTargetQuery"
      :key="idx"
    >
      <section-header
        v-if="getRuleHeader(idx)"
        :title="isCustomModel ? getRuleHeader(idx) : `How ${getRuleHeader(idx)} is defined`"
      />
      <div class="target-item-wrapper">
        <prediction-target-rules-item
          :rule="item"
          @[WandzCommonEmits.RULE_CHANGED]="(rule) => onChangeRule(rule, idx)"
          :idx="idx"
        />
        <div class="remove-rule-icon">
          <img
            :src="RemoveIcon"
            @click="onRemoveRule(idx)"
            v-if="showRemoveRuleBtn"
          />
        </div>
      </div>
    </div>
    <div class="add-new-rule-wrapper">
      <Button
        v-if="showAddRuleBtn"
        style-type="textLink"
        @handle-click="addCondition"
        :text-padding="0"
        :custom-button-style="{ height: 'unset' }"
      >
        <img
          :src="AddIcon"
          class="add-condition-icon"
        />
        Add New Condition
      </Button>
    </div>
  </div>
  <target-rules-info v-if="!isCustomModel" />
</template>

<script setup lang="ts">
  import { usePredictionManagementStore } from '@/stores/wandz';
  import { storeToRefs } from 'pinia';
  import { watch, inject, ref, computed, onBeforeMount } from 'vue';
  import { type ITargetRule } from '@wandzai/wandz-interfaces';
  import { PredictionTargetRulesItem } from '../PredictionTargetRules';
  import Button from '@/design-library/src/components/Button';
  import AddIcon from '@/design-library/src/assets/icons/actions/add-empty-24.svg';
  import RemoveIcon from '@/design-library/src/assets/icons/actions/trash.svg';
  import { clone } from 'lodash';
  import { WandzCommonEmits } from '@/components/Wandz/types';
  import { DEFAULT_RULE, INTENT_RULES_STRINGS, MAX_ALLOWED_RULES } from '../consts';
  import SectionHeader from '../SectionHeader';
  import TargetRulesInfo from './TargetRulesInfo.vue';

  const predictionModelStore = usePredictionManagementStore();
  const { predictionModelObj } = storeToRefs(predictionModelStore);

  const emit = defineEmits([WandzCommonEmits.IS_VALID_SECTION_EVENT]);
  const isCustomModel = ref(inject('isCustomModel'));

  const maxRulesAllowed = ref(MAX_ALLOWED_RULES);

  const selectedTargetQuery = ref<ITargetRule[]>(predictionModelObj.value?.targetRules || [clone(DEFAULT_RULE)]);

  const onChangeRule = (rule: ITargetRule, idx: number) => (selectedTargetQuery.value[idx] = rule);

  const addCondition = () => {
    selectedTargetQuery.value.push(clone(DEFAULT_RULE));
  };

  const onRemoveRule = (idx: number) => {
    selectedTargetQuery.value.splice(idx, 1);
  };

  const isValid = computed(() => selectedTargetQuery.value.every((item) => item.value?.length));

  const getRuleHeader = (idx: number) => INTENT_RULES_STRINGS[predictionModelObj.value?.intent]?.headers[idx];

  onBeforeMount(() => {
    if (!isCustomModel.value) maxRulesAllowed.value = predictionModelObj.value?.targetRules?.length || 1;
    emit(WandzCommonEmits.IS_VALID_SECTION_EVENT, isValid.value);
  });

  watch(selectedTargetQuery.value, () => {
    predictionModelObj.value.targetRules = selectedTargetQuery.value;
    emit(WandzCommonEmits.IS_VALID_SECTION_EVENT, isValid.value);
  });

  const showAddRuleBtn = computed(() => maxRulesAllowed.value > 1 && selectedTargetQuery.value.length === 1);
  const showRemoveRuleBtn = computed(() => selectedTargetQuery.value.length > 1);
</script>

<style scoped lang="scss">
  .target-item-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    .remove-rule-icon {
      margin-left: 6px;
      img {
        cursor: pointer;
      }
    }
  }

  .target-rules-container {
    .add-condition-icon {
      width: 24px;
      height: 24px;
    }
  }
</style>
