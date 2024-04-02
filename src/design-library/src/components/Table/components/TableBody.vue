<template>
  <tbody
    ref="tbodyElem"
    :class="{
      pagination: withPagination,
      'hover-indication': highlightOnHover,
    }"
    name="table-rows"
  >
    <template
      v-for="(row, index) in items"
      :key="index"
    >
      <tr
        :ref="`table-row#${index}`"
        class="table-rows-wrapper"
        :class="{
          highlight: isHighlightedRow(row),
          expanded: openRowIndexSet.has(row.index),
          clickable: clickableRow,
          stripped: stripedRows,
          'row-clicked': clickedRowIndex === row.index,
        }"
        :style="rowCustomStyle(row)"
        :data-automation-id="`table-row-${row.index + 1}`"
        @click="rowClick(row)"
      >
        <td
          v-for="(column, columnIndex) in headers"
          :key="column.key"
          :style="column.columnStyle"
          class="row-boxes"
          :class="{
            'fixed-first': columnIndex === 0 && stickyFirstCol,
            // 'fixed-last': (columnIndex === headers!.length - 1 && stickyLastCol),
          }"
        >
          <slot
            :index="row.index"
            :name="column.key"
            :item="row.ref"
          >
            <div
              class="table-rows ellipsis txt-primary regular-title"
              :style="rowHeightStyle"
              :title="rowValue(row, column)"
            >
              {{ rowValue(row, column) }}
            </div>
          </slot>
          <img
            v-if="showExpandArrowIcon(columnIndex)"
            :src="arrowToShow(index)"
            class="arrow-icon"
          />
        </td>
      </tr>
      <TransitionExpand
        v-if="$slots['expanded-row'] && openRowIndexSet.has(row.index)"
        :key="row.index + items!.length"
      >
        <tr :class="{ 'expended-row-border-bottom': shouldUseBorderBottom(index, row.index) }">
          <slot
            v-bind="{ index: row.index, item: row.ref }"
            name="expanded-row"
          />
        </tr>
      </TransitionExpand>
    </template>
  </tbody>
</template>
<script lang="ts">
  interface Props {
    items?: Array<any>;
    headers?: Array<any>;
    rowHeight?: number;
    withPagination?: boolean;
    transition?: boolean;
    highlightOnHover?: boolean;
    expandedRowsIndexes?: Array<any>;
    clickableRow?: boolean;
    showExpandArrow?: boolean;
    stripedRows?: boolean;
    stickyFirstCol?: boolean;
    stickyLastCol?: boolean;
  }
</script>
<script setup lang="ts">
  import { highlightSymbol } from '../utils';
  import TransitionExpand from '../../../enhancements/ExpandTransition/index.vue';
  import type { ITableHeader } from '@/types/interfaces/table';
  import ChevronUpIcon from '../../../assets/icons/arrows/ChevronUp.svg';
  import ChevronDownIcon from '../../../assets/icons/arrows/ChevronDown.svg';
  import { computed, nextTick, onMounted, ref, watch } from 'vue';
  defineOptions({
    name: 'TBody',
  });

  const props = withDefaults(defineProps<Props>(), {
    /* An array of table items */
    items: () => [],
    headers: () => [],
    rowHeight: 100,
    withPagination: false,
    transition: false,
    highlightOnHover: false,
    expandedRowsIndexes: () => [],
    clickableRow: false,
    showExpandArrow: false,
    stripedRows: true,
    stickyFirstCol: false,
    stickyLastCol: false,
  });

  const scrollbarVisible = ref(false);
  const clickedRowIndex = ref(null);
  const tbodyElem = ref<any>(null);
  const openRowIndexSet = computed(() => {
    return new Set(props.expandedRowsIndexes);
  });

  const emit = defineEmits(['scrollbarVisible', 'row-click']);
  const checkScrollbar = () => {
    nextTick(() => {
      scrollbarVisible.value = tbodyElem.value && tbodyElem.value.clientHeight < tbodyElem.value.scrollHeight;
      if (scrollbarVisible.value) emit('scrollbarVisible');
    });
  };
  watch(
    () => props.items,
    (newVal) => {
      checkScrollbar();
    },
    { immediate: true },
  );
  onMounted(() => {
    checkScrollbar();
  });
  const rowCustomStyle = (row) => {
    return { ...{ height: `${props.rowHeight}px` }, ...row[highlightSymbol] };
  };
  const rowHeightStyle = () => {
    return { 'line-height': `${props.rowHeight}px` };
  };
  const isHighlightedRow = (row) => {
    return row[highlightSymbol];
  };
  const shouldUseBorderBottom = (index, rowIndex) => {
    return index !== props.items.length - 1 && !openRowIndexSet.value.has(rowIndex + 1);
  };

  const rowValue = (row, column: ITableHeader) => {
    if (column.valueToString) {
      return column.valueToString(row.ref[column.key], this /** sending component */);
    }
    return row.ref[column.key];
  };
  const arrowToShow = (index) => {
    return openRowIndexSet.value.has(index) ? ChevronUpIcon : ChevronDownIcon;
  };
  const showExpandArrowIcon = (columnIndex) => {
    /** append arrow chevron to the last column */
    return props.showExpandArrow && columnIndex + 1 === props.headers.length;
  };
  const rowClick = (row) => {
    if (props.clickableRow && props.showExpandArrow) {
      /** Scrolling to row on case of clickable row */
      const eleToScrollTo = document.querySelector(`[data-ref="table-row#${row.index}"]`);
      if (eleToScrollTo) {
        eleToScrollTo.scrollIntoView({
          block: 'start' /** Vertical alignment */,
          behavior: 'smooth',
        });
      }
    }
    emit('row-click', row.ref, row.index);
    clickedRowIndex.value = row.index;
  };
</script>

<style scoped lang="scss">
  @import '../../../styles/colors/background.module.scss';
  @import '../../../styles/colors/borders.scss';

  tbody {
    overflow: auto;
    height: 100%;
    width: 100%;
    background-color: $bg-primary;
    max-height: 505px;
    display: table;

    &.pagination {
      max-height: initial;
      overflow: initial;
    }

    &.hover-indication .table-rows-wrapper:hover:not(.expanded) {
      background-color: $bg-element-hover !important;
    }

    .table-rows-wrapper {
      height: 100px;
      box-shadow: 0 0 1px 0 rgba(25, 16, 62, 0.12);
      padding-bottom: 1px;
      background: $bg-element;
    }

    .table-rows-wrapper:first-of-type {
      border: none;
    }

    .table-rows-wrapper.stripped:nth-of-type(even) {
      background-color: $bg-secondary-element;
    }

    .table-rows {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: calc(100% - 8px);
    }

    td:first-child {
      padding-left: 16px;
    }

    tr {
      line-height: 42px;
      display: flex;
      border-top: 1px solid $border-ui-color;

      &.clickable {
        cursor: pointer;
      }

      &.highlight {
        background-color: $bg-secondary;
      }

      &.expanded {
        background-color: $bg-element-active;
      }

      &.expanded + tr {
        box-shadow:
          inset 0px 11px 8px -10px #618ec730,
          inset 0px -11px 8px -10px #618ec730;
      }
    }

    tr td {
      display: flex;
      width: 100%;
      align-items: center;
    }

    .box-table {
      margin: 4px 0;
    }
  }

  ::-webkit-scrollbar {
    width: 18px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    width: 10px;
    background: $bg-shapes;
    background-clip: content-box;
    border: 4px solid transparent;
  }

  .ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .table-rows-enter-active,
  .table-rows-leave-active {
    transition: all 1s;
  }

  .table-rows-enter,
  .table-rows-leave-to {
    opacity: 0;
    transform: translateX(30px);
    //transform: scale(0.8);
  }

  .expended-row-border-bottom {
    //border-bottom: solid 1px #000000;
    //margin-bottom: -1px;
  }
  .arrow-icon {
    width: 16px;
    padding-right: 16px;
  }
  .row-boxes {
    padding: 0 16px;
  }
  .row-boxes.fixed-first {
    position: sticky;
    left: 0;
    background: inherit;
    z-index: 1;
  }

  .row-boxes.fixed-last {
    position: sticky;
    right: 0;
    background: inherit;
    z-index: 1;
  }

  /*
 * This fixes the overlapping menu issue when the rows after the clicked one are
 * on top of the menu button flyout. The z-index of the active row should be higher
 * than any other row's.
 */
  .row-clicked .fixed-first,
  .row-clicked .fixed-last {
    z-index: 10;
  }
</style>
