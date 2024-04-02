<template>
  <sticky-modal
    :modal-open="true"
    :modal-size="'mediumSmall'"
    :title="'Filter by Specific Audience'"
    :primary-button-text="'Save Changes'"
    primary-button-style-type="primary"
    :disable-button="false"
    :content-bg-color="BGColors.bgElement"
    @primary-button-clicked="() => $emit('updateFilters', getUpdatedFilters())"
    @modal-close="() => $emit('close-modal')"
  >
    <template #content>
      <div class="filters">
        <div
          class="filters-section-container"
          v-for="(elem, e) in Object.keys(SpecificAudienceFilters)"
          :key="e"
        >
          <div class="filters-section">
            <div
              class="filter-title bold-title"
              v-text="AUDIENCE_FILTERS[elem as SpecificAudienceFilters]"
            />
            <div class="filter-list-container">
              <multi-choices
                class="multi-choices-container"
                :items="localFilters.value[elem as SpecificAudienceFilters]"
                :all-selected-text="SELECT_AUDIENCE_STRINGS.ALL"
                flat
                clear-on-all
                @on-item-click="(item, index) => toggleItem(elem as SpecificAudienceFilters, index)"
                @on-select-all="() => selectAll(elem as SpecificAudienceFilters)"
              />
            </div>
          </div>
          <div class="divider" />
        </div>
      </div>
    </template>
  </sticky-modal>
</template>

<script setup lang="ts">
  import { PropType, reactive } from 'vue';
  import { SpecificAudienceFilters } from '@/components/Wandz/Common/types';
  import type { IBaseAudiencesConfig } from '@wandzai/wandz-interfaces/src/interfaces/pred-model';
  import { Channels, Devices } from '@wandzai/wandz-interfaces';
  import {
    AUDIENCE_FILTERS,
    CHANNELS_DISPLAY_NAMES,
    CHANNELS_DISPLAY_NAMES_TO_VALUE,
    DEVICES_DISPLAY_NAME,
    DEVICES_DISPLAY_NAME_TO_VALUE,
  } from '@/components/Wandz/Common/consts';
  import { SELECT_AUDIENCE_STRINGS } from '@/components/Wandz/Common/SelectAudience/consts';
  import MultiChoices from '@/design-library/src/components/MultiChoices/MultiChoices.vue';
  import BGColors from '@/design-library/src/styles/colors/background.module.scss';
  import StickyModal from '@/design-library/src/components/StickyModal/StickyModal.vue';

  interface IItem {
    text: string;
    isSelected: Boolean;
  }

  const props = defineProps({
    filters: {
      type: Object as PropType<IBaseAudiencesConfig>,
      default: () => {
        return {
          [SpecificAudienceFilters.channels]: [Channels.FB, Channels.GOOGLE],
          [SpecificAudienceFilters.devices]: [Devices.MOB],
          [SpecificAudienceFilters.segments]: [],
        };
      },
    },
  });

  const formatFilters = (list: string[], displayNamesConst?: any): IItem[] => {
    const res: IItem[] = [];
    if (displayNamesConst) {
      const selectedSet = new Set();
      list.forEach((elem) => {
        selectedSet.add(displayNamesConst[elem]);
      });
      for (let name of Object.keys(displayNamesConst)) {
        res.push({
          text: displayNamesConst[name],
          isSelected: selectedSet.has(displayNamesConst[name]),
        });
      }
    }
    return res;
  };

  const localFilters = reactive({
    value: {
      [SpecificAudienceFilters.channels]: formatFilters(props.filters?.channels ?? [], CHANNELS_DISPLAY_NAMES),
      [SpecificAudienceFilters.devices]: formatFilters(props.filters?.devices ?? [], DEVICES_DISPLAY_NAME),
      [SpecificAudienceFilters.segments]: formatFilters(props.filters?.segments ?? []),
    },
  });

  const isAllSelected = (filterType: SpecificAudienceFilters): boolean =>
    localFilters.value[filterType].every((filterItem: IItem) => filterItem.isSelected);

  const selectItem = (filterType: SpecificAudienceFilters, clickedItemIndex: number): void => {
    const allSelected = isAllSelected(filterType);
    localFilters.value[filterType] = localFilters.value[filterType].map((filterItem, index) => {
      if (index === clickedItemIndex) return { ...filterItem, isSelected: true };
      // if "All" is ticked, we want to unselect everything so the clicked item will be the only one ticked
      if (allSelected) return { ...filterItem, isSelected: false };
      return filterItem;
    });
  };

  const deselectItem = (filterType: SpecificAudienceFilters, clickedItemIndex: number): void => {
    localFilters.value[filterType] = localFilters.value[filterType].map((filterItem, index) => {
      if (index === clickedItemIndex) return { ...filterItem, isSelected: false };
      return filterItem;
    });
  };

  const toggleItem = (filterType: SpecificAudienceFilters, clickedItemIndex: number): void => {
    const allSelected = isAllSelected(filterType);
    const isItemSelected = localFilters.value[filterType][clickedItemIndex].isSelected;

    if (isItemSelected && !allSelected) {
      deselectItem(filterType, clickedItemIndex);
    } else {
      selectItem(filterType, clickedItemIndex);
    }
  };

  const selectAll = (filterType: SpecificAudienceFilters): void => {
    localFilters.value[filterType] = localFilters.value[filterType].map((filterItem: IItem) => {
      return {
        text: filterItem.text,
        isSelected: true,
      };
    });
  };

  const getFilterValues = (filterType: SpecificAudienceFilters, displayConstToValue?: any): string[] => {
    return isAllSelected(filterType)
      ? [SELECT_AUDIENCE_STRINGS.ALL]
      : localFilters.value[filterType].filter((elem) => elem.isSelected).map((elem) => displayConstToValue[elem.text]);
  };

  const getUpdatedFilters = (): IBaseAudiencesConfig => {
    return {
      [SpecificAudienceFilters.channels]: getFilterValues(
        SpecificAudienceFilters.channels,
        CHANNELS_DISPLAY_NAMES_TO_VALUE,
      ),
      [SpecificAudienceFilters.devices]: getFilterValues(
        SpecificAudienceFilters.devices,
        DEVICES_DISPLAY_NAME_TO_VALUE,
      ),
      [SpecificAudienceFilters.segments]: [SELECT_AUDIENCE_STRINGS.ALL], // TODO: update to read segments from DB
    };
  };
</script>
<style scoped lang="scss">
  @import '@/design-library/src/styles/colors/background.module';
  @import '@/design-library/src/styles/colors/borders';

  .filters {
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    gap: 20px;
    overflow: hidden;

    .filters-section-container {
      display: flex;
      flex-display: row;
    }

    .filters-section {
      display: flex;
      flex-direction: column;
      width: 240px;

      .filter-title {
        margin-bottom: 16px;
      }

      .filter-list-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
        overflow: scroll;
        overflow-x: hidden;
        height: 300px;
      }
    }

    .filter-list-container::-webkit-scrollbar {
      width: 16px;
    }

    .filter-list-container::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: 10px;
    }

    .filter-list-container::-webkit-scrollbar-thumb {
      width: 10px;
      background-color: $bg-shapes;
      border-radius: 10px;
      border: 3px solid white;
    }

    .divider {
      width: 1px;
      height: 100%;
      background-color: $border-ui-color;
    }
  }
</style>
