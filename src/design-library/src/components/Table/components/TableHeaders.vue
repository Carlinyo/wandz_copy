<template>
  <thead
    :class="[size]"
    class="bg-primary"
    :style="theadStyle"
  >
    <tr>
      <th
        v-for="(header, index) in headers"
        :key="header.key"
        :class="{
          'fixed-first': index === 0 && stickyFirstCol,
          // 'fixed-last': (index === headers.length - 1 && stickyLastCol),
        }"
        :style="header.columnStyle"
        @click="onHeaderClick(header)"
      >
        <div class="column-container">
          <div class="span-wrapper">
            <span
              class="table-header bold-title"
              :class="{ 'header-padding': header.searchable, 'header-ellipsis': header.ellipsis }"
            >
              {{ header.value }}
            </span>
          </div>
          <Tooltip
            v-if="header.info"
            class="tooltip"
            position="bottom-center"
            :extended-hover="extendedHover"
            :text="header.info"
          >
            <img :src="icons.info" />
          </Tooltip>
          <div
            v-if="sortable && !header.unsortable"
            class="sort-icon"
            :class="getIconClasses(header)"
          >
            <ArrowIcon :fill="getIconFill(header)" />
          </div>
          <div
            v-if="header.subHeader"
            class="sub-header"
          >
            {{ header.subHeader }}
          </div>
        </div>
      </th>
    </tr>
  </thead>
</template>

<script lang="ts">
  import type { PropType } from 'vue';
  import InfoIcon from '../../../assets/icons/info/moreInfo.svg';
  import Tooltip from '../../Tooltip/Tooltip.vue';
  import ArrowIcon from './ArrowIcon.vue';
  import { DIRECTIONS } from '../utils';
  import type { ITableHeader } from '../../../types/interfaces/table';

  export default {
    name: 'THeaders',
    components: {
      ArrowIcon,
      Tooltip,
    },
    props: {
      /* An array of table headers */
      headers: {
        type: Array as PropType<ITableHeader[]>,
        default: () => [],
      },
      sortable: {
        type: Boolean,
        default: false,
      },
      activeHeader: {
        type: Object,
        default: () => ({
          key: '',
          direction: null,
          sort: null,
        }),
      },
      size: {
        type: String,
        required: true,
      },
      theadStyle: {
        type: Object,
        default: () => ({}),
      },
      extendedHover: {
        type: Boolean,
        default: false,
      },
      stickyFirstCol: {
        type: Boolean,
        default: false,
      },
      stickyLastCol: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      icons() {
        return { info: InfoIcon };
      },
    },
    methods: {
      onHeaderClick(header) {
        if (!this.sortable || header.unsortable) return;
        this.$emit('header-click', header);
      },
      getIconFill(header) {
        return this.activeHeader.key === header.key ? '#303030' : '#808080';
      },
      getIconClasses(header) {
        const active = this.activeHeader.key === header.key;
        return {
          down: active && DIRECTIONS.DESC === this.activeHeader.direction,
          active,
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../styles/typography/titles.scss';

  $small-column-height: 20px;
  $medium-column-height: 40px;

  thead {
    display: flex;
    flex-direction: row;
    &.small {
      tr {
        line-height: $small-column-height !important;
        th {
          .column-container {
            height: $small-column-height;
          }
          .table-header {
            font-size: 12px;
            line-height: 18px;
          }
        }
      }
    }
    tr {
      display: flex;
      flex-direction: row;
      width: 100%;
      line-height: $medium-column-height !important;

      th {
        width: 100%;
        .column-container {
          height: $medium-column-height;
          align-items: center;
          display: flex;
        }
        .span-wrapper {
          display: flex;
          align-items: flex-end;
        }
        .tooltip-style {
          line-height: normal !important;
          padding-left: 8px;
        }
      }
      th:first-child {
        padding-left: 16px;
      }
      .table-header {
        //font-size: 12px;
        //line-height: 12px;
        pointer-events: none;
        position: relative;
      }
      .header-padding {
        padding-left: 20px;
      }
    }
  }
  .header-ellipsis {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .sort-icon {
    opacity: 0;
    height: 12px;
    width: 20px;
    display: flex;
    transform: rotate(180deg);
    padding: 0 4px;

    &.active {
      opacity: 1;
    }

    &.down {
      transform: initial;
    }
  }

  .column-container:hover {
    .sort-icon:not(.active) {
      opacity: 0.55;
    }
  }

  .tooltip {
    padding: 0 0 0 4px;
    :deep(.v-popover .trigger) {
      display: flex !important;
    }
  }

  .sub-header {
    position: absolute;
    top: 15px;
    font-size: 10px;
    color: #585961;
  }
  th {
    padding: 0 16px;
  }
  th.fixed-first {
    position: sticky;
    left: 0;
    background: #f3f5f8;
    z-index: 1;
  }

  th.fixed-last {
    position: sticky;
    right: 0;
    background: #f3f5f8;
    z-index: 1;
  }
</style>
