<template>
  <div class="training-schedule-container">
    <section-header :title="MODEL_STEP3_STRINGS.TRAINING_SCHEDULE" />
    <div class="container-wrapper">
      <Dropdown
        class="schedule-dropdown"
        :title="'Training Period'"
        :items="trainingPeriodItems"
        :selected-items="[selectedTrainingPeriod]"
        bold-selected-item
        :formatter="LogicFilters.dropDownOptionsFormatter"
        @dropdown-click="onTrainingPeriodChange"
        type="regular"
        size="small"
        :use-search="false"
        :width="258"
      />
      <Dropdown
        class="schedule-dropdown"
        :title="'Automated Training'"
        :items="RETRAIN_OPTIONS"
        :formatter="LogicFilters.dropDownOptionsFormatter"
        :selected-items="selectedRetrainOption"
        bold-selected-item
        @dropdown-click="onRetrainChange"
        type="regular"
        size="small"
        :use-search="false"
        :width="258"
      />
    </div>
    <calendar
      v-show="isDatePickerOpen"
      class="range-date-picker"
      :should-open-date-picker="isDatePickerOpen"
      inline
      @popover-will-hide="onCalendarClose"
      @date-change="onRangeChange"
      :disable-date-input-field-editing="true"
      :is-range="true"
      :for-table="true"
      :show-input-line="false"
      component-type="double"
      :disable-hours="true"
      timezone="UTC"
      mode="date"
      :min-date="new Date(new Date().setMonth(new Date().getMonth() - 1))"
      :max-date="new Date()"
      :withInput="false"
      :date-start="selectedTimeFrame.startDate"
      :date-end="selectedTimeFrame.endDate"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import setWith from 'lodash/setWith';

  import Dropdown from '@/design-library/src/components/Dropdown';
  import LogicFilters from '@/design-library/src/utils/filters/formatters';
  import Calendar from '@/design-library/src/components/Calendar';

  import { DaysRanges } from '@wandzai/wandz-interfaces/src/enums';
  import type { ITrainingPeriod } from '@wandzai/wandz-interfaces';

  import { usePredictionManagementStore } from '@/stores/wandz';
  import SectionHeader from '../SectionHeader';

  import { CUSTOM_RANGE_KEY, MODEL_STEP3_STRINGS, RETRAIN_OPTIONS, TIME_FRAME_DROPDOWN_ITEMS } from '../consts';

  const predictionStore = usePredictionManagementStore();
  const { predictionModelObj } = storeToRefs(predictionStore);
  const trainingPeriod = computed(() => predictionModelObj.value.trainingPeriod);

  const isDatePickerOpen = ref(false);
  const selectedRetrainOption = ref([
    RETRAIN_OPTIONS.find((option) => option.value === predictionModelObj.value?.reTrainInterval) || RETRAIN_OPTIONS[0],
  ]);

  const selectedTrainingPeriod = computed(() => {
    return trainingPeriodItems.value.find(
      (item) => item.value === predictionModelObj.value?.trainingPeriod || item.key,
    );
  });

  const lastPeriodSelected = selectedTrainingPeriod;

  const selectedTimeFrame = ref(
    trainingPeriod.value?.startDate ? (trainingPeriod.value as ITrainingPeriod) : CUSTOM_RANGE_KEY,
  );

  const trainingPeriodItems = computed(() => {
    return TIME_FRAME_DROPDOWN_ITEMS.map((item) =>
      item.value === CUSTOM_RANGE_KEY && selectedTimeFrame.value?.startDate
        ? {
            ...item,
            text: `${dateFormatter(selectedTimeFrame.value.startDate)} - ${dateFormatter(
              selectedTimeFrame.value.endDate,
            )}`,
          }
        : item,
    );
  });

  const dateFormatter = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const onTrainingPeriodChange = ({ value }: { value: ITrainingPeriod | DaysRanges }) => {
    if (value === CUSTOM_RANGE_KEY) {
      isDatePickerOpen.value = true;
      setWith(predictionModelObj.value, 'trainingPeriod', selectedTimeFrame.value);
      return;
    }
    setWith(predictionModelObj.value, 'trainingPeriod', value);
  };

  const onRangeChange = (date: { start: string; end: string }) => {
    isDatePickerOpen.value = false;
    selectedTimeFrame.value = {
      startDate: dateFormatter(date.start),
      endDate: dateFormatter(date.end),
    };
    onTrainingPeriodChange(selectedTimeFrame);
  };

  const onRetrainChange = ({ value }: { value: DaysRanges }) => {
    predictionModelObj.value.reTrainInterval = value;
  };

  const onCalendarClose = () => {
    isDatePickerOpen.value = false;
    // if(selectedTimeFrame.value === CUSTOM_RANGE_KEY && !selectedTimeFrame.value.startDate) {
    //   onTrainingPeriodChange(lastPeriodSelected)
    // }
  };
</script>

<style scoped lang="scss">
  .container-wrapper {
    display: flex;
    gap: 24px;
  }
</style>
