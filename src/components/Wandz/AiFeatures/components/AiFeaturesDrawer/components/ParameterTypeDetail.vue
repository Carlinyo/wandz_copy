<template>
  <div
    class="txt-secondary body-tiny-bold"
    v-text="'Parameter Type'"
  />
  <dropdown
    v-if="editing"
    class="type-drop-down"
    :items="AI_FEATURES_TYPES_ITEMS"
    :selected-items="selectedItems"
    :formatter="LogicFilters.dropDownOptionsFormatter"
    bold-selected-item
    @dropdown-click="doOnChangeDataType"
    type="regular"
    size="small"
    :use-search="false"
  />
  <div
    v-else
    class="body-small"
    v-text="AI_FEATURES_TYPES[item.dataType]"
  />
</template>

<script setup lang="ts">
  import { type IAiFeaturesBasicConfig } from '@wandzai/wandz-interfaces';
  import { computed, type PropType } from 'vue';

  import Dropdown from '@/design-library/src/components/Dropdown';

  import { AI_FEATURES_TYPES, AI_FEATURES_TYPES_ITEMS } from '@/components/Wandz/AiFeatures/consts';
  import LogicFilters from '@/design-library/src/utils/filters/formatters';

  import type { IDropdownItem } from '@/design-library/src/types/interfaces/IDropdownItem';
  import { WandzCommonEmits } from '@/components/Wandz/types';

  defineOptions({
    name: 'ParameterTypeDetail',
  });

  const props = defineProps({
    item: {
      type: Object as PropType<IAiFeaturesBasicConfig>,
      default: () => ({}),
    },
    editing: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits([WandzCommonEmits.AI_FEATURE_DATA_TYPE_UPDATED]);

  const doOnChangeDataType = (item: IDropdownItem) => {
    emit(WandzCommonEmits.AI_FEATURE_DATA_TYPE_UPDATED, item.value);
  };

  const selectedItems = computed(() => {
    return [
      {
        value: props.item.dataType,
        text: AI_FEATURES_TYPES[props.item.dataType],
      },
    ];
  });
</script>

<style scoped lang="scss">
  @import '@/design-library/src/styles/spacing/spacing';

  .type-drop-down {
    padding-right: $SP32;
  }
</style>
