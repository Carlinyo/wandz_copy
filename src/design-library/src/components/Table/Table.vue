<template>
  <div class="table-wrapper">
    <div
      class="border-radius-small table-scroll-wrapper"
      style="min-width: 400px; overflow: auto"
    >
      <table :style="tableStyle">
        <TopTabs
          v-if="supportTabs"
          class="tabs-component"
          :tabs="Object.keys(items).map((key) => ({ name: key, itemsCount: items[key].length }))"
          :tab-index="Object.keys(items).indexOf(selectedTab!)"
          v-bind="tabStyling"
          :border="false"
          showCount
          @on-tab-click="
            (tab) => {
              switchTab(tab.name);
            }
          "
        />
        <div
          :class="{ shadow: withShadow, 'box-table': withBorder }"
          style="width: 100%"
          :style="{
            'max-height': tableMaxHeight ? `${tableMaxHeight}px` : '100%',
          }"
        >
          <div
            class="table-header"
            :class="[{ sticky: true }]"
          >
            <TableHeaders
              :style="tableContentStyle"
              :headers="tableHeaders"
              :active-header="activeHeader"
              :sortable="sortable"
              :size="size"
              :thead-style="theadStyle"
              :extended-hover="extendedHover"
              :sticky-first-col="stickyFirstCol"
              :sticky-last-col="stickyLastCol"
              @header-click="onHeaderClick"
            />
          </div>
          <TableBody
            ref="tableBody"
            :items="tableData"
            :headers="tableHeaders"
            :row-height="targetRowHeight"
            :with-pagination="withPagination || useVueScroll"
            :highlight-on-hover="highlightOnHover"
            :clickable-row="clickableRow"
            :expanded-rows-indexes="expandedRowsIndexes"
            :style="tableContentStyle"
            style="width: 100%; min-width: 100%; overflow: auto"
            :transition="transition"
            :show-expand-arrow="showExpandArrow"
            :striped-rows="stripedRows"
            :sticky-first-col="stickyFirstCol"
            :sticky-last-col="stickyLastCol"
            @row-click="(item, index) => $emit('row-click', item, index)"
          >
            <template
              v-for="(_, name) in $slots"
              v-slot:[name]="slotData"
            >
              <slot
                :name="name"
                v-bind="slotData"
              />
            </template>
          </TableBody>
        </div>
      </table>
    </div>
    <div
      v-if="withPagination"
      class="pagination-container"
    >
      <div
        v-if="showArrows"
        class="numbers"
        @click="onPageBack"
      >
        <img
          class="chevron-icon"
          :src="leftChevronIcon"
          alt=""
        />
      </div>
      <div
        v-for="number in paginationNumbers"
        :key="number"
        class="numbers border-radius-small body-small"
        :class="{ selected: number === currentPage }"
        @click="changePage(number)"
      >
        {{ number }}
      </div>
      <div
        v-if="showArrows"
        class="numbers"
        @click="onPageForward"
      >
        <img
          class="chevron-icon"
          :src="rightChevronIcon"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import TopTabs from '../TopTabs/TopTabs.vue';
  import TableHeaders from './components/TableHeaders.vue';
  import TableBody from './components/TableBody.vue';
  import leftChevronIcon from '../../assets/icons/arrows/left-chevron.svg';
  import rightChevronIcon from '../../assets/icons/arrows/right-chevron.svg';
  import { getSorterByData, DIRECTIONS, highlightSymbol } from './utils';
  import { SIZES, SIZE_TO_ROW_HEIGHT } from './consts';

  import VueScrollConfig from '../../utils/vue-scroll';

  import type { ITopTabStylingObject } from '../../types/interfaces/ITopTabStylingObject.ts';
  import type { PropType } from 'vue';

  export default {
    name: 'NmgMaiTable',
    components: {
      TableHeaders,
      TableBody,
      TopTabs,
    },
    props: {
      tabStyling: {
        type: Object as PropType<ITopTabStylingObject>,
        default: () => ({
          boxStyle: true,
          backgroundColor: false,
          spacedTabs: true,
        }),
      },
      loading: {
        type: Boolean,
        default: false,
      },
      /** headers holds one of the following:
     1. An array of table headers.
     2. Map between tab name to headers array.
     */
      headers: {
        type: [
          Array /** Array as PropType<ITableHeader[]> */,
          Object /** Object as PropType<Record<string (tab name), ITableHeader[]>> */,
        ],
        default: () => [],
      },
      /** items holds one of the following:
     1. An array of table items. each item is an object that its keys are the table headers.
     2. Map between tab name to items.
     */
      items: {
        type: [
          Array /** Array as PropType<object[]> */,
          Object /** Object as PropType<Record<string/** (tab name), object[]>> */,
        ],
        default: () => [],
      },
      /* An object of indexes to highlight: {index: key, styleObj: value}
       * or a function which takes an index and returns a styleObj */
      highlightRows: {
        type: [Object, Function],
        default: () => ({}),
      },
      withPagination: {
        type: Boolean,
        default: true,
      },
      itemsPerPage: {
        type: Number,
        default: 5,
      },
      sortable: {
        type: Boolean,
        default: false,
      },
      tableWidth: {
        type: [Number, Boolean],
        default: false,
      },
      /** We will show horizontal scroll based on this value */
      tableMinWidth: {
        type: [Number, Boolean],
        default: 800,
      },
      useVueScroll: {
        type: Boolean,
        default: true,
      },
      rowHeight: {
        type: Number,
        default: SIZE_TO_ROW_HEIGHT[SIZES.medium],
      },
      enableOverFlow: {
        type: Boolean,
        default: false,
      },
      withShadow: {
        type: Boolean,
        default: false,
      },
      withBorder: {
        type: Boolean,
        default: true,
      },
      transition: {
        type: Boolean,
        default: false,
      },
      highlightOnHover: {
        type: Boolean,
        default: false,
      },
      expandedRowsIndexes: {
        type: Array,
        default: () => [],
      },
      size: {
        type: String,
        default: SIZES.medium,
        validator: (value) => Object.keys(SIZES).includes(value),
      },
      theadStyle: {
        type: Object,
        default: () => ({}),
      },
      clickableRow: {
        type: Boolean,
        default: false,
      },
      extendedHover: {
        type: Boolean,
        default: false,
      },
      showExpandArrow: {
        type: Boolean,
        default: false,
      },
      stripedRows: {
        type: Boolean,
        default: true,
      },
      stickyFirstCol: {
        type: Boolean,
        default: false,
      },
      stickyLastCol: {
        type: Boolean,
        default: false,
      },
      tableMaxHeight: {
        type: Number,
        default: 605,
      },
    },
    data() {
      return {
        /** Relevant only while using multiple tabs tables */
        selectedTab: null,
        currentPage: 1,
        leftChevronIcon,
        rightChevronIcon,
        activeHeader: {
          key: '',
          direction: null,
          customSort: null,
          unsortable: false,
        },
        ops: {
          ...VueScrollConfig,
          scrollPanel: {
            scrollingX: true,
            scrollingY: true,
            maxHeight: this.tableMaxHeight,
          },
        },
        slots: [],
      };
    },
    computed: {
      // maxHeight: {
      //   if (!tableMaxHeight) return '100%';
      // },
      // pagination() {
      //   return pagination
      // },
      targetRowHeight() {
        return this.$options?.propsData?.rowHeight || SIZE_TO_ROW_HEIGHT[this.size];
      },
      paginationNumbers() {
        const baseArray = [1, 2, 3, 4];
        let result;
        if (this.pageNumbers <= 4) {
          result = baseArray.slice(0, this.pageNumbers);
        } else {
          result = [1, 2, 3, '...', this.pageNumbers];
        }
        if (this.currentPage > result[2] && this.pageNumbers > 4)
          result = [this.currentPage - 2, this.currentPage - 1, this.currentPage, '...', this.pageNumbers];
        if (this.currentPage + 2 > this.pageNumbers && this.pageNumbers > 4)
          result = [1, '...', this.pageNumbers - 2, this.pageNumbers - 1, this.pageNumbers];
        return result;
      },
      pageNumbers() {
        return Math.ceil(this.tableItems.length / this.itemsPerPage);
      },
      supportTabs() {
        return !Array.isArray(this.items);
      },
      differentHeadersInTabs() {
        return !Array.isArray(this.headers);
      },
      tableHeaders() {
        if (this.supportTabs && this.differentHeadersInTabs) {
          return this.headers[this.selectedTab];
        }
        return this.headers;
      },
      tableItems(): Array<unknown> {
        return this.supportTabs ? this.items[this.selectedTab] : this.items;
      },
      tableData() {
        if (!this.tableItems) return [];

        const hlRowsWithFunction = typeof this.highlightRows === 'function';
        let items = this.tableItems.map((item, idx) => ({
          ref: item,
          index: idx,
        }));
        const sortingFn = getSorterByData(items, this.activeHeader);
        if (sortingFn) {
          items.sort(sortingFn);
        }

        items = items.map((item, index) => ({
          ...item,
          [highlightSymbol]: hlRowsWithFunction ? this.highlightRows(index) : this.highlightRows[index],
        }));

        if (!this.withPagination) return items;
        return items.slice(
          (this.currentPage - 1) * this.itemsPerPage,
          (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage,
        );
      },
      showArrows() {
        return this.pageNumbers > 1;
      },
      // eslint-disable-next-line vue/return-in-computed-property
      tableStyle(): any {
        return this.tableWidth ? `width: ${this.tableWidth}px` : 'width: 100%';
      },
      tableContentStyle() {
        return {
          overflow: this.enableOverFlow ? 'initial' : undefined,
          minWidth: this.tableMinWidth ? `${this.tableMinWidth}px` : '100%',
        };
      },
    },
    watch: {
      itemsPerPage() {
        this.currentPage = 1;
      },
      supportTabs(newValue) {
        if (newValue) {
          /** on case we have tabs, we'll start with first one */
          this.selectedTab = Object.keys(this.items)[0];
        }
      },
    },
    created() {
      if (this.supportTabs) {
        /** on case we have tabs, we'll start with first one */
        this.selectedTab = Object.keys(this.items)[0];
      }
      window.addEventListener('scroll', this.actionScroll);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.actionScroll);
    },
    methods: {
      actionScroll(event) {
        const scroll = window.scrollY;
        console.log(scroll); // shows pixel position of window scroll
        // You can also perform any action while using this method
      },
      onHeaderClick({ key, customSort, unsortable }) {
        const { direction } = this.activeHeader;
        if (this.activeHeader.key === key && direction) {
          if (direction === DIRECTIONS.DESC) {
            this.activeHeader = {
              key: '',
              direction: null,
              customSort: null,
              unsortable: false,
            };
          } else {
            this.activeHeader.direction = DIRECTIONS.DESC;
          }
        } else {
          this.activeHeader = {
            key,
            direction: DIRECTIONS.ASC,
            customSort,
            unsortable,
          };
        }
        this.$emit('header-click', this.activeHeader);
      },
      onPageBack() {
        if (this.currentPage > 1) {
          this.currentPage -= 1;
        }
      },
      onPageForward() {
        if (this.currentPage < this.pageNumbers) {
          this.currentPage += 1;
        }
      },
      changePage(id) {
        console.log(id);
        if (Number.isInteger(id)) {
          this.currentPage = id;
        }
      },
      switchTab(tab: string) {
        this.selectedTab = tab;
        /** Resetting to page - 1 */
        this.currentPage = 1;
        this.$emit('table-tab-changed', tab);
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../styles/borders/borders';
  @import '../../styles/corners/corners';
  @import '../../styles/colors/background.module';
  @import '../../styles/colors/buttons';
  @import '../../styles/colors/text.module';

  .table-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }

  table {
    border-spacing: 0 10px;
    text-align: left;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-width: 800px;
    gap: 24px;
  }

  .box-table {
    border-spacing: 0;
    border: 1px solid $border-ui-color;
    border-radius: $border-radius-small;
    overflow: hidden;
  }

  .pagination-container {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    padding-top: 16px;
    justify-content: center;
    gap: 14px;

    .numbers {
      width: 32px;
      height: 32px;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: center;
      align-items: center;
      color: $txt-secondary;

      &:hover {
        background-color: $bg-element-hover;
      }

      &.selected {
        background-color: $btn-primary;
        color: $txt-inverted;
      }

      .chevron-icon {
        width: 16px;
        height: 16px;
      }
    }
  }

  .tabs-component {
    margin-left: 8px;
    margin-top: 8px;
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

  .table-scroll-wrapper {
    width: 100%;
  }

  .table-header.sticky {
    position: sticky;
    top: 0;
    z-index: 9;
    border-bottom: 1px solid $border-ui-color;
  }

  :deep(.__rail-is-vertical) {
    z-index: 20 !important;
    top: 45px !important;
  }

  :deep(.__bar-is-vertical) {
    left: -4px !important;
  }

  :deep(.__rail-is-horizontal) {
    z-index: 10 !important;
  }

  :deep(.hasHBar .__panel::-webkit-scrollbar) {
    display: none;
  }

  :deep(.hasHBar .__panel) {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
