<template>
  <StickyModal
    :modal-open="openedModal == PredictionModalTypes.PREDICTION_FLOW"
    @modal-close="predictionModelStore.resetAfterAction"
    :modal-size="'fullScreen'"
    :title="strings.CREATE_PREDICTION_MODEL"
    :subtitle="/** hide subtitle only for step 0*/ currentStep ? modalSubtitle : ''"
    content-bg-color="#FFFFFF"
    :show-footer="currentStep > 0"
    :modal-content-styles-override="{
      padding: 0,
      height: '100%',
    }"
    @primary-button-clicked="nextStep"
    v-bind="{
      ...primaryButton,
      disableButton: isDisabledNextStep,
    }"
  >
    <template #content>
      <div class="create-prediction">
        <div class="create-prediction-container">
          <prediction-management-side-menu
            :step-index="currentStep"
            :menu-list="menuStepsList"
            :valid-steps="validSteps"
            @[CommonEmits.CHANGE_STEP]="(idx) => (currentStep = idx)"
          />
          <div class="create-model-wizard">
            <div
              class="back-btn-wrapper"
              v-if="currentStep > 0"
            >
              <Button
                style-type="textLink"
                @handle-click="previousStep"
                back-icon
                :text-padding="0"
              >
                Back
              </Button>
            </div>
            <component
              :is="COMPONENTS_STEPS_LIST[currentStep]"
              @is-valid-step="onChangeValidStep"
            />
          </div>
          <div
            v-if="currentStep > 0"
            class="distribution-graph-area"
          >
            <distribution-graph />
          </div>
        </div>
      </div>
    </template>
    <template #notice-banner>
      <div class="save-draft-btn-wrapper">
        <Button
          :style-type="'textLink'"
          :text-padding="0"
          @handle-click="onClickSaveDraft"
        >
          {{ strings.SAVE_AS_DRAFT }}
        </Button>
      </div>
    </template>
  </StickyModal>
</template>
<script setup lang="ts">
  import { computed, provide, ref } from 'vue';
  import { storeToRefs } from 'pinia';

  import StickyModal from '@/design-library/src/components/StickyModal/StickyModal.vue';
  import Button from '@/design-library/src/components/Button/Button.vue';

  import { usePredictionManagementStore } from '@/stores/wandz';

  import PredictionManagementSideMenu from './PredictionManagementSideMenu';
  import {
    WANDZ_STRINGS as texts,
    MODEL_STEPS_MENU as menuSteps,
    COMPONENTS_STEPS_LIST,
    MODAL_PRIMARY_BUTTON,
  } from './consts';
  import DistributionGraph from '@/components/Wandz/PredictionsManagement/PredictionManagementModal/DistributionGraph/DistributionGraph.vue';
  import { PredictionModalTypes } from '@/components/Wandz/PredictionsManagement/types';
  import { IntentTypes, PredModelActions } from '@wandzai/wandz-interfaces';
  import { CommonEmits } from '@/components/Common/types';

  const predictionModelStore = usePredictionManagementStore();
  const { openedModal, currentStep, predictionModelObj } = storeToRefs(predictionModelStore);
  const strings = ref(texts);
  const menuStepsList = ref<any[]>(menuSteps);
  const isCustomModel = computed(() => predictionModelObj.value.intent === IntentTypes.CUSTOM);

  provide('isCustomModel', isCustomModel);

  const modalSubtitle = computed(() =>
    isCustomModel.value ? strings.value.CUSTOM_TEMPLATE : strings.value.PRE_BUILT_MODEL,
  );
  const nextStep = () => {
    if (isNextStepValid()) currentStep.value++;
  };

  const previousStep = () => {
    if (currentStep.value > 0) currentStep.value--;
  };
  const isNextStepValid = () => {
    return currentStep.value < menuStepsList.value.length - 1;
  };

  const primaryButton = computed(() => MODAL_PRIMARY_BUTTON[currentStep.value]);

  const validSteps = ref<{
    [key: number]: boolean;
  }>(COMPONENTS_STEPS_LIST.reduce((acc, key) => ((acc[key] = false), acc), {}));
  const isDisabledNextStep = computed(() => !validSteps.value[currentStep.value]);

  const onChangeValidStep = (isValid: boolean) => {
    validSteps.value[currentStep.value] = isValid;
  };

  const onClickSaveDraft = () => {
    predictionModelStore[PredModelActions.SAVE_DRAFT]();
  };
</script>
<style scoped lang="scss">
  @import '@/design-library/src/styles/borders/borders';
  @import '@/design-library/src/styles/colors/background.module';

  .create-prediction {
    height: 100%;
  }

  .create-prediction-container {
    display: flex;
    height: 100%;
  }

  .save-draft-btn-wrapper {
    flex-grow: 100;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .modal-content {
    padding: 0 !important;
  }

  .create-model-wizard {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 25px;
    background-color: $bg-element;
    overflow-y: scroll;
    padding-bottom: 200px;
  }
  /* width */
  ::-webkit-scrollbar {
    width: 12px;
    cursor: grab !important;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: $bg-shapes;
    cursor: grab !important;
    background-clip: padding-box;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    cursor: grab !important;
  }
  .distribution-graph-area {
    border-left: $border;
    padding-left: 16px;
    background-color: $bg-element;
  }

  .back-btn-wrapper {
    margin: 16px 0;
    width: 100%;
  }
</style>
