<template>
  <div class="site-configs-wrapper element-container">
    <div class="header-container">
      <span class="container-title">{{ SITE_CONFIGURATIONS_STRINGS.SITE_CONFIGS_TITLE }}</span>
      <div class="actions-container">
        <filter-dropdown
          :label="SITE_CONFIGURATIONS_STRINGS.DOMAIN"
          :items="siteSectionsPerDomainList"
          :selected-item="selectedDomain"
          @on-item-click="handleDomainClicked"
        />
        <my-button @handle-click="handleAddNewSectionClicked"
          >{{ SITE_CONFIGURATIONS_STRINGS.ADD_NEW_SECTION }}
        </my-button>
      </div>
    </div>
    <div class="content-container">
      <my-table
        :items="siteConfigsData"
        :headers="SITE_SECTION_TABLE_HEADERS"
      >
        <template v-slot:[SiteConfigsColumns.SITE_SECTION]="{ item: modelItem }">
          <span
            v-html="modelItem.siteSection"
            class="body-tiny"
          />
        </template>
        <template v-slot:[SiteConfigsColumns.HREF]="{ item: modelItem }">
          <span class="body-tiny"> - </span>
        </template>
        <template v-slot:[SiteConfigsColumns.ACTIONS]="{ item: modelItem }">
          <TableMenu
            class="table-menu-container"
            :items="SiteConfigsTableMenuAction"
            menu-header=""
            :menuPlacement="'bottom-end'"
            :dynamic-width="true"
            @on-item-click="handleMenuItemClicked($event, modelItem)"
          />
        </template>
      </my-table>
    </div>
  </div>
  <add-new-site-section
    v-if="showModal"
    @on-save="handleSiteSectionSave"
    @close-modal="closeModal"
  />
</template>
<script setup lang="ts">
  import type { IDomainSiteConfigs, ISectionItem } from './types';
  import { SiteConfigsColumns } from './types';
  import {
    DOMAINS_LIST,
    SITE_CONFIGURATIONS_STRINGS,
    SITE_SECTION_TABLE_HEADERS,
    SiteConfigsTableMenuAction,
  } from './consts';
  import FilterDropdown from '@/design-library/src/components/FilterDropdown/FilterDropdown.vue';
  import MyButton from '@/design-library/src/components/Button/Button.vue';
  import MyTable from '@/design-library/src/components/Table/Table.vue';
  import type { PropType } from 'vue';
  import { computed, ref } from 'vue';
  import TableMenu from '@/design-library/src/components/TableMenu/TableMenu.vue';
  import type { ITableMenuItem } from '@/design-library/src/types/interfaces/table-menu';
  import Modal from '@/design-library/src/components/Modal/Modal.vue';
  import AddNewSiteSection from '@/components/Settings/TagConfigurations/AddNewSiteSection.vue';

  const props = defineProps({
    siteSectionsPerDomainList: {
      type: Array as PropType<IDomainSiteConfigs[]>,
      default: () => DOMAINS_LIST,
    },
  });

  const selectedDomain = ref(props.siteSectionsPerDomainList[0].text);
  const selectedSection = ref({});
  const siteConfigsData = computed(() => {
    return props.siteSectionsPerDomainList.filter((elem) => elem.text === selectedDomain.value)[0].siteConfigs;
  });

  const handleMenuItemClicked = (data: ITableMenuItem, section: ISectionItem) => {
    selectedSection.value = section;
    // TODO: add logic for edit and delete section when design is ready
  };

  const handleDomainClicked = (data) => {
    selectedDomain.value = data.text;
  };

  const showModal = ref(false);
  const handleAddNewSectionClicked = () => {
    // TODO: add logic for add new section when design is ready
    showModal.value = true;
  };

  const closeModal = () => {
    showModal.value = false;
  };
</script>

<style scoped lang="scss">
  @mixin flex-properties($direction) {
    display: flex;
    flex-direction: $direction;
    gap: 24px;
  }

  .site-configs-wrapper {
    width: 100%;
    @include flex-properties(column);

    .header-container {
      @include flex-properties(row);
      justify-content: space-between;

      .actions-container {
        @include flex-properties(row);
      }
    }
  }
</style>
