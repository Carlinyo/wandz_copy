<template>
  <div>
    <section-header :title="MODEL_STEP3_STRINGS.MODEL_MODIFY_ATTRIBUTES" />
    <template
      v-for="(item, idx) in MODEL_ATTRIBUTES_OPTIONS"
      :key="idx"
    >
      <div class="radio-wrapper">
        <radio
          :checked="selectedModelAttribute === idx"
          @select="onSelectModelAttribute(idx)"
        />
        <span
          class="radio-label txt-primary regular-title"
          v-text="item"
        />
      </div>
    </template>
    <div
      class="input-wrapper"
      v-if="selectedModelAttribute === ModelAttributes.EXCLUDE"
    >
      <wdz-dropdown
        :use-search="false"
        :items="excludeCategoriesItems"
        :selected-items="selectedCategories"
        :size="'small'"
        @dropdown-click="onSelectExcludeCategories"
        @pill-delete="onSelectExcludeCategories"
        :formatter="LogicFilters.dropDownOptionsFormatter"
        :show-first-line-label="true"
        :sub-title="MODEL_STEP3_STRINGS.CATEGORIES_TO_EXCLUDE"
        :width="346"
        :error-message="MODEL_STEP3_STRINGS.EXCLUDE_CATEGORIES_ERR_MSG"
        :error="!selectedCategories.length"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onBeforeMount, ref, watchEffect } from 'vue';
  import { storeToRefs } from 'pinia';
  import setWith from 'lodash/setWith';

  import Radio from '@/design-library/src/components/Radio/Radio.vue';
  import WdzDropdown from '@/design-library/src/components/Dropdown/Dropdown.vue';
  import LogicFilters from '@/design-library/src/utils/filters/formatters';
  import type { IDropdownItem } from '@/design-library/src/types/interfaces/IDropdownItem';

  import { ExcludeCategories } from '@wandzai/wandz-interfaces';
  import { usePredictionManagementStore } from '@/stores/wandz';
  import SectionHeader from '../SectionHeader';

  import { EXCLUDE_CATEGORIES_OPTIONS, MODEL_ATTRIBUTES_OPTIONS, MODEL_STEP3_STRINGS } from '../consts';

  import { ModelAttributes } from '../types';
  import { WandzCommonEmits } from '@/components/Wandz/types';

  const predictionModalStore = usePredictionManagementStore();
  const { predictionModelObj } = storeToRefs(predictionModalStore);

  const emit = defineEmits([WandzCommonEmits.IS_VALID_SECTION_EVENT]);
  const selectedModelAttribute = ref(
    predictionModelObj.value?.advancedConfig?.excludedCategories ? ModelAttributes.EXCLUDE : ModelAttributes.ALL,
  );

  const buildExcludeCategoriesItems = (items: string[] | null): IDropdownItem[] =>
    (items &&
      items.map((key) => ({
        value: key,
        text: EXCLUDE_CATEGORIES_OPTIONS[key as unknown as ExcludeCategories],
      }))) ||
    [];

  const excludeCategoriesItems = buildExcludeCategoriesItems(Object.keys(EXCLUDE_CATEGORIES_OPTIONS));
  const selectedCategories = ref(
    buildExcludeCategoriesItems(predictionModelObj.value?.advancedConfig?.excludedCategories) || [],
  );

  const onSelectModelAttribute = (option: ModelAttributes) => {
    selectedModelAttribute.value = option;
    if (option === ModelAttributes.ALL)
      return setWith(predictionModelObj.value, 'advancedConfig.excludedCategories', null);
    onSelectExcludeCategories(selectedCategories.value);
  };
  const onSelectExcludeCategories = (items: IDropdownItem[]) => {
    selectedCategories.value = items;
    setWith(
      predictionModelObj.value,
      'advancedConfig.excludedCategories',
      items.map((item) => item.value),
    );
  };

  const isValidSection = computed(
    () =>
      !!(
        !predictionModelObj.value?.advancedConfig?.excludedCategories ||
        predictionModelObj.value?.advancedConfig?.excludedCategories?.length
      ),
  );

  onBeforeMount(() => {
    emit(WandzCommonEmits.IS_VALID_SECTION_EVENT, isValidSection.value);
  });

  watchEffect(() => {
    emit(WandzCommonEmits.IS_VALID_SECTION_EVENT, isValidSection.value);
  });
</script>

<style scoped lang="scss">
  .radio-wrapper {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .input-wrapper {
    margin-top: 16px;
    margin-left: 31px;
  }
</style>
