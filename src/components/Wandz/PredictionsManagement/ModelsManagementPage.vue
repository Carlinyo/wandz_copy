<template>
  <grid-layout
    :items="[
      { gridColumnStart: 1, gridColumnEnd: 12, gridRowStart: 1, name: 'header' },
      { gridColumnStart: 1, gridColumnEnd: 12, gridRowStart: 2, name: 'models' },
    ]"
  >
    <template #header>
      <div class="header-container">
        <span class="secondary-title header-title">Prediction Models</span>
        <WandzButton
          class="new-model-btn"
          @handle-click="onCreateNewModel"
          >Create New Model
        </WandzButton>
      </div>
    </template>
    <template #models>
      <div class="element-container">
        <wandz-table
          :tabStyling="{ boxStyle: false }"
          :headers="MODELS_TABLE_COLUMNS"
          :items="groupedItems"
          :row-height="56"
          :expandedRowsIndexes="expandedRowsIndexes"
          :itemsPerPage="20"
          with-pagination
          sortable
          clickable-row
          highlight-on-hover
          show-expand-arrow
          @row-click="(item, index) => toggleRowExpand(index)"
        >
          <template v-slot:[ModelsColumns.PREDICTION_TARGET]="{ item: modelItem }">
            <div
              v-if="modelItem?.targetRules"
              class="multi-items-cell"
            >
              <div class="multi-items-cell-row column">
                <span
                  v-html="TARGET_LABELS_MAP[modelItem.targetRules[0].type]"
                  class="regular-title"
                >
                </span>
                <span
                  v-html="STRING_OPERATORS_LABELS_MAP[modelItem.targetRules[0].operator]"
                  class="txt-secondary small-label-title"
                >
                </span>
              </div>
              <span
                v-html="modelItem.targetRules[0].value"
                class="txt-secondary small-label-title target-rule-value"
              >
              </span>
            </div>
          </template>
          <template v-slot:[ModelsColumns.STATUS]="{ item: modelItem }">
            <status
              :size="Sizes.SMALL"
              :status="modelItem.status"
              :is-archived="modelItem.isArchived"
            />
          </template>
          <template v-slot:[ModelsColumns.OPTIMIZATION_FUNCTION]="{ item: modelItem }">
            <div v-html="FUNCTION_LABELS_MAP[modelItem.optimizationFunction as OptimizationFunctions]"></div>
          </template>
          <template v-slot:[ModelsColumns.LAST_UPDATED]="{ item: modelItem }">
            <div
              v-if="modelItem?.lastUpdated"
              class="multi-items-cell"
            >
              <span
                v-html="`${getTimeProperties(modelItem.lastUpdated).date},`"
                class="regular-title txt-primary"
              >
              </span>
              <span
                v-html="getTimeProperties(modelItem.lastUpdated).time"
                class="regular-title txt-primary"
              >
              </span>
            </div>
          </template>
          <!--          <template v-slot:[ModelsColumns.MODEL_STRENGTH]="{ item: modelItem }">-->
          <!--            <model-strength-score-->
          <!--                :score="modelItem.modelStrength"-->
          <!--                :name="'name'"-->
          <!--                :variant="'small-line'"-->
          <!--                :index="1"-->
          <!--            />-->
          <!--          </template>-->
          <template v-slot:[ModelsColumns.ACTIONS]="{ item: modelItem }">
            <div class="multi-items-cell-row">
              <div @click="navigateToAnalytics(modelItem)">
                <img
                  class="more-options-image"
                  :src="analyticsNav"
                />
              </div>
              <table-menu
                v-if="!modelItem.isArchived && STATUS_ACTIONS_MAP[modelItem.status as ModelStatuses].length"
                :items="getItemActionsByStatus(modelItem.status)"
                class="table-menu-container"
                menu-header=""
                :menuPlacement="'bottom-end'"
                :menuOffsetX="0"
                :menuOffsetY="10"
                :dynamic-width="true"
                @on-item-click="
                  (itemAction: ITableMenuItem) => handleActionClick(modelItem, <PredModelActions>itemAction.key)
                "
              />
            </div>
          </template>
        </wandz-table>
      </div>
    </template>
  </grid-layout>
  <prediction-management-modal v-if="openedModal == PredictionModalTypes.PREDICTION_FLOW" />
  <publish-model
    v-if="openedModal == PredictionModalTypes.PUBLISH"
    :prediction-model-obj="predictionModelObj"
    @close-modal="handleActionCanceled"
    @on-publish="predictionModelStore[PredictionModalTypes.PUBLISH]"
  />
  <submit-modal
    v-if="openedModal == PredictionModalTypes.CONFIRMATION"
    :modal-props="ACTIONS_MODAL_PROPS[currentAction as PredModelActions]?.modalProps"
    @[CommonEmits.CANCEL_ACTION]="handleActionCanceled"
    @[CommonEmits.APPROVE_ACTION]="handleSubmitApproved"
    @modal-close="handleActionCanceled"
  />
  <rename-modal
    v-else-if="openedModal == PredictionModalTypes.RENAME"
    v-bind="ACTIONS_MODAL_PROPS[currentAction as PredModelActions]"
    :current-prediction-model="predictionModelObj"
    @[CommonEmits.CANCEL_ACTION]="handleActionCanceled"
    @[CommonEmits.APPROVE_ACTION]="handleRenameApproved"
    @modal-close="handleActionCanceled"
  >
  </rename-modal>
  <snack-bar
    v-if="snackBarMsg"
    :text="snackBarMsg"
    :timerToDisappear="3"
    @hide-by-timer="predictionModelStore.updateSnackBar"
    @snackbar-click-button-x="predictionModelStore.updateSnackBar"
  />
</template>

<script setup lang="ts">
  import type { ITableMenuItem } from '@/design-library/src/types/interfaces/table-menu';

  import WandzTable from '@/design-library/src/components/Table/Table.vue';
  import GridLayout from '@/design-library/src/components/Layout/GridLayout.vue';
  import TableMenu from '@/design-library/src/components/TableMenu/TableMenu.vue';
  import WandzButton from '@/design-library/src/components/Button/Button.vue';
  import analyticsNav from '@/design-library/src/assets/icons/misc/analyticsNav.svg';
  import PredictionManagementModal from '@/components/Wandz/PredictionsManagement/PredictionManagementModal/PredictionManagementModal.vue';
  import { computed, reactive, ref, onBeforeMount } from 'vue';
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  // do not remove this import ModelsColumns
  import { ModelsManagementTabs, PredictionModalTypes, ModelsColumns } from './types';
  import { type IPredictionModel, ModelStatuses, PredModelActions } from '@wandzai/wandz-interfaces';
  import {
    ACTIONS_LABELS_MAP,
    ACTIONS_MODAL_PROPS,
    FUNCTION_LABELS_MAP,
    MODELS_TABLE_COLUMNS,
    SNACK_BAR_TEXTS,
    STATUS_ACTIONS_MAP,
    STRING_OPERATORS_LABELS_MAP,
    TARGET_LABELS_MAP,
  } from '@/components/Wandz/PredictionsManagement/const';
  import PublishModel from '@/components/Wandz/PredictionsManagement/PublishModal/PublishModal.vue'; //this is only for testing till we have stored items
  import { usePredictionManagementStore } from '@/stores/wandz';
  import { OptimizationFunctions } from '@wandzai/wandz-interfaces/src/enums/pred-model';
  import Status from '@/components/Common/Status/Status.vue';
  import SubmitModal from '@/components/Common/SubmitModal.vue';
  import { Sizes } from '@/design-library/src/types/enums/Sizes';
  import LogicFilters from '@/design-library/src/utils/filters/formatters';
  import RenameModal from '@/components/Wandz/PredictionsManagement/ActionModals/RenameModal.vue';
  import ModelStrengthScore from '@/design-library/src/components/ModelStrengthScore/ModelStrengthScore.vue';
  import SnackBar from '@/design-library/src/components/Snackbars/Snackbars.vue';
  import { CommonEmits } from '@/components/Common/types';
  const router = useRouter();

  const predictionModelStore = usePredictionManagementStore();
  const { predictions, predictionModelObj, openedModal, currentAction, currentStep, snackBarMsg } =
    storeToRefs(predictionModelStore);

  defineOptions({
    name: 'ModelsManagementPage',
  });

  onBeforeMount(async () => {
    await predictionModelStore.initStore();
  });

  const expandedRowsIndexes = reactive([] as number[]);

  const initialMap: Record<ModelsManagementTabs, IPredictionModel[]> = Object.values(ModelsManagementTabs).reduce(
    (acc, curr) => {
      acc[curr] = [];
      return acc;
    },
    {} as Record<ModelsManagementTabs, IPredictionModel[]>,
  );

  const groupedItems = computed(() => {
    if (!predictions.value.length) return [];

    return predictions.value.reduce((accumulator, currentItem: IPredictionModel) => {
      if (currentItem.isArchived) {
        accumulator[ModelsManagementTabs.ARCHIVED].push(currentItem);
      } else {
        accumulator[ModelsManagementTabs.ONGOING].push(currentItem);
      }
      return accumulator;
    }, initialMap);
  });

  const getTimeProperties = (lastUpdatedDate: Date | string): { date: string; time: string } => {
    const parsedDate = typeof lastUpdatedDate == 'string' ? new Date(lastUpdatedDate) : lastUpdatedDate;
    return {
      date: LogicFilters.dateFormatter(parsedDate),
      time: LogicFilters.timeFormatter(parsedDate),
    };
  };

  const getItemActionsByStatus = (status: ModelStatuses): ITableMenuItem[] => {
    return STATUS_ACTIONS_MAP[status].map(
      (action) =>
        ({
          key: action,
          text: ACTIONS_LABELS_MAP[action].label,
          iconSrc: ACTIONS_LABELS_MAP[action].iconPath,
          iconSrcAdditional: '',
          isSelected: false,
          style: { color: ACTIONS_LABELS_MAP[action].color },
        }) as ITableMenuItem,
    );
  };

  const toggleRowExpand = (index: number): void => {
    const indexInArray = expandedRowsIndexes.indexOf(index);
    if (indexInArray > -1) {
      expandedRowsIndexes.splice(indexInArray, 1);
    } else {
      expandedRowsIndexes.push(index);
    }
  };

  const onCreateNewModel = () => {
    predictionModelStore.resetAfterAction();
    openedModal.value = PredictionModalTypes.PREDICTION_FLOW;
  };

  const handleActionClick = (model: IPredictionModel, action: PredModelActions): void => {
    predictionModelObj.value = model;
    currentAction.value = action;
    openedModal.value = ACTIONS_MODAL_PROPS[currentAction.value].predictionModalToOpen as PredictionModalTypes;
    currentStep.value = ACTIONS_MODAL_PROPS[currentAction.value]?.modalProps?.step;
  };

  const handleSubmitApproved = () => {
    const storeCallback = predictionModelStore[currentAction.value];
    storeCallback().then(() => {});
  };

  const handleRenameApproved = (newName: string) => {
    const storeCallback = predictionModelStore[PredModelActions.RENAME];
    storeCallback(newName);
  };

  const handleActionCanceled = () => {
    predictionModelStore.resetAfterAction();
  };

  const navigateToAnalytics = (model: IPredictionModel) => {
    predictionModelObj.value = model;
    router.push('/analytics'); // TODO make all routes as consts
  };
</script>

<style scoped lang="scss">
  @import '@/design-library/src/styles/colors/semantic.module.scss';
  @import '@/design-library/src/styles/colors/background.module.scss';
  @import '@/design-library/src/styles/borders/borders.scss';
  @import '@/design-library/src/styles/corners/corners.scss';
  @import '@/design-library/src/styles/shadows/shadows.scss';

  .multi-items-cell {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    max-width: 100%;
  }

  .multi-items-cell-row {
    display: inline-flex;
    gap: 8px;
    min-width: fit-content;

    &.column {
      flex-direction: row;
      align-items: center;
    }
  }

  .status-title {
    width: min-content;
  }

  .element-container {
    width: 100%;
    height: 100%;
    padding: 24px;
    background-color: $bg-element;
    border: $border;
    border-radius: $border-radius-medium;
    box-shadow: $default-shadow;
  }

  .target-rule-value {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

  .header-container {
    display: flex;
    justify-content: space-between;
  }

  .header-title {
    width: fit-content;
    margin-left: 24px;
  }
</style>
