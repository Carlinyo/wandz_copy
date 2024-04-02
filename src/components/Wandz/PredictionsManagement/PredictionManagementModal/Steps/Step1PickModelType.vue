<template v-if="predictionTemplates.length">
  <div class="cards-wrapper grid-container">
    <section-header title="Choose a pre-built model" />
    <grid-layout :items="gridItems">
      <template
        v-for="(item, idx) in predictionTemplates"
        v-slot:[idx]="slotData"
        :key="idx"
      >
        <category-card
          :title="item.name"
          :description="item.description"
          :icon="item.imageSource"
          :is-selected="predictionModelObj.intent === item.intent"
          class="grid-item"
          @click="
            () => {
              onSelectModelType(item);
            }
          "
        />
      </template>
    </grid-layout>
    <line-split-with-text
      text="OR"
      class="split-line"
    />
    <grid-layout
      :items="[
        {
          gridColumnStart: 5,
          gridColumnEnd: 8,
          name: 'custom',
        },
      ]"
    >
      <template v-slot:custom>
        <category-card
          :title="customModelType.modelType.name"
          :description="customModelType.modelType.description"
          :icon="CartIcon"
          :is-selected="predictionModelObj.name === customModelType.modelType.name"
          class="grid-item"
          @click="
            () => {
              onSelectModelType(customModelType.modelType);
            }
          "
          v-bind="customModelType.props"
        />
      </template>
    </grid-layout>
    <submit-modal
      v-if="isShowChangeIntentModal"
      v-bind="CHANGE_PREDICTION_MODAL_PROPS"
      @[CommonEmits.CANCEL_ACTION]="
        () => {
          isShowChangeIntentModal = false;
        }
      "
      @[CommonEmits.APPROVE_ACTION]="onNextStep"
      @modal-close="
        () => {
          isShowChangeIntentModal = false;
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { storeToRefs } from 'pinia';

  import CategoryCard from '@/design-library/src/components/CategoryCard/CategoryCard.vue';
  import CartIcon from '@/design-library/src/assets/icons/misc/shoppingCartHeart.svg';
  import LineSplitWithText from '@/design-library/src/components/LineSplit/LineSplitWithText.vue';
  import GridLayout from '@/design-library/src/components/Layout/GridLayout.vue';
  import { getGridLayoutList } from '@/design-library/src/utils/layout';

  import { usePredictionManagementStore, useWandzPlatformStore } from '@/stores/wandz';
  import type { IPredictionModel } from '@wandzai/wandz-interfaces';

  import { CHANGE_PREDICTION_MODAL_PROPS, CUSTOM_MODEL_TYPE } from '../consts';
  import SectionHeader from '../SectionHeader/SectionHeader.vue';
  import SubmitModal from '@/components/Common/SubmitModal.vue';
  import { WandzCommonEmits } from '@/components/Wandz/types';
  import { CommonEmits } from '@/components/Common/types';

  const platformStore = useWandzPlatformStore();
  const predictionModelStore = usePredictionManagementStore();
  const { predictionTemplates } = storeToRefs(platformStore);
  const { predictionModelObj, currentStep } = storeToRefs(predictionModelStore);

  const emit = defineEmits([WandzCommonEmits.IS_VALID_STEP_EVENT]);

  const preChangePrediction = ref<IPredictionModel>({} as IPredictionModel);
  const isShowChangeIntentModal = ref(false);
  const gridItems = computed(() => getGridLayoutList(predictionTemplates.value, 4));
  const customModelType = CUSTOM_MODEL_TYPE;

  const onSelectModelType = (template: IPredictionModel) => {
    preChangePrediction.value = template;
    if (predictionModelObj.value.intent && predictionModelObj.value.intent !== template.intent)
      return (isShowChangeIntentModal.value = true);
    onNextStep();
  };

  const onNextStep = () => {
    if (predictionModelObj.value.intent !== preChangePrediction.value.intent)
      predictionModelStore.modelToObj(preChangePrediction.value);
    isShowChangeIntentModal.value = false;
    emit(WandzCommonEmits.IS_VALID_STEP_EVENT, true);
    currentStep.value++;
  };
</script>

<style scoped lang="scss">
  .grid-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: fit-content;
    align-items: center;
    justify-content: center;
    padding-top: 47px;
    gap: 16px;
  }

  .grid-item {
    flex: 0 0 calc(33.33% - 24px); /* Adjust as needed, considering margins and paddings */
    box-sizing: border-box;
  }
</style>
