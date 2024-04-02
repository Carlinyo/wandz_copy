<template>
  <div class="element-container audiences-table">
    <wandz-table
      :headers="AUDIENCES_TABLE_COLUMNS"
      :items="items"
    >
      <template v-slot:[AudiencesTableColumns.CREATION_DATE]="{ item }">
        <div v-text="formatters.dateFormatter(item[AudiencesTableColumns.CREATION_DATE])" />
      </template>

      <template v-slot:[AudiencesTableColumns.CREATED_BY]="{ item }">
        <div v-text="item.isCustom ? item.createdBy : APP_NAME" />
      </template>

      <template v-slot:[AudiencesTableColumns.ACTIONS]="{ item }">
        <table-menu
          :items="ACTIONS_MAPPED_TAB_ITEMS[item.isCustom]"
          class="table-menu-container"
          menu-header=""
          :menuPlacement="'bottom-end'"
          :menuOffsetX="0"
          :menuOffsetY="10"
          :dynamic-width="true"
          @on-item-click="
            (itemAction: ITableMenuItem) => {} /**handleActionClick(modelItem, <PredModelActions>itemAction.key)*/
          "
        />
      </template>
    </wandz-table>
  </div>
</template>

<script setup lang="ts">
  import WandzTable from '@/design-library/src/components/Table/Table.vue';
  import TableMenu from '@/design-library/src/components/TableMenu/TableMenu.vue';
  import formatters from '@/design-library/src/utils/filters/formatters';

  import type { ITableMenuItem } from '@/design-library/src/types/interfaces/table-menu';
  import { AudiencesTableColumns, type IUiAudience } from '../types';
  import { defineProps, type PropType } from 'vue';

  import { APP_NAME } from '@/const';
  import { ACTIONS_MAPPED_TAB_ITEMS, AUDIENCES_TABLE_COLUMNS } from '@/components/Wandz/Audiences/consts';

  defineOptions({
    name: 'AudiencesTable',
  });

  const props = defineProps({
    items: {
      type: Array as PropType<IUiAudience[]>,
      default: {},
    },
  });
</script>

<style scoped lang="scss">
  .audiences-table {
    height: calc(100vh - 164px);
  }
</style>
