<template>
  <div
    v-if="isOpen || menuOpen"
    v-click-outside="onClickOutside"
    class="nmg-menu shadow border-radius-medium"
    :class="{ wide: isWider, 'dynamic-width': dynamicWidth, searchable: searchable }"
    :style="menuStyle"
    @click.stop="() => {}"
  >
    <div
      v-if="menuHeader"
      class="nmg-menu-header"
    >
      <span>{{ menuHeader }}</span>
    </div>
    <div
      v-if="searchable"
      class="search-container"
    >
      <nmg-search
        v-model="searchText"
        :auto-focus="searchAutoFocus"
        :placeholder="searchPlacheholder"
      />
    </div>
    <div
      v-if="!withDescription"
      class="list-container"
      :style="listStyle"
    >
      <template v-for="(item, index) in filteredItems">
        <slot
          name="item"
          v-bind="{ item, index }"
        >
          <menu-item
            :id="item.id"
            :key="index"
            :item="item"
            :index="index"
            v-bind="$props"
            @item-clicked="onClick(item)"
          />
        </slot>
      </template>
      <!-- @slot item: entire row item slot -->
      <slot name="no-results">
        <div
          v-if="!filteredItems.length && !hideNoResultsMessage"
          class="nmg-menu-item tw-px-4 tw-py-2 body-small txt-primary"
        >
          <div class="nmg-menu-item-text">No results found</div>
        </div>
      </slot>
    </div>
    <div
      v-else
      class="list-container"
      :style="listStyle"
    >
      <menu-with-description
        :items="filteredItems"
        @on-item-click="onClick"
      />
    </div>
  </div>
</template>
<script lang="ts">
  import MenuItem from './MenuItem.vue';
  import MenuWithDescription from '../MenuWithDescription/MenuWithDescription.vue';
  import NmgSearch from '../Search/Search.vue';
  import vClickOutside from 'click-outside-vue3';
  import { IMenuItem } from '@/types/interfaces/IMenuItem';
  import { PropType } from 'vue';

  export default {
    name: 'Menu',
    components: {
      NmgSearch,
      MenuItem,
      MenuWithDescription,
    },
    directives: {
      clickOutside: vClickOutside.directive,
    },
    props: {
      withDescription: {
        type: Boolean,
        default: false,
      },
      items: {
        type: Array as PropType<IMenuItem[]>,
        required: true,
        default: () => [],
      },
      listStyle: {
        type: Object,
        required: false,
        default: () => ({}),
      },
      isMenuEllipsis: {
        type: Boolean,
        default: false,
      },
      menuStyle: {
        type: Object,
        required: false,
        default: () => ({}),
      },
      menuHeader: {
        type: String,
        default: '',
      },
      searchable: {
        type: Boolean,
        default: false,
      },
      searchAutoFocus: {
        type: Boolean,
        default: false,
      },
      dynamicWidth: {
        type: Boolean,
        default: false,
      },
      isOpen: {
        type: Boolean,
        default: false,
      },
      isWider: {
        type: Boolean,
        default: false,
      },
      isFont: {
        type: Boolean,
        default: false,
      },
      countryFilter: {
        type: Boolean,
        default: false,
      },
      hideNoResultsMessage: {
        type: Boolean,
        default: false,
      },
      searchPlacheholder: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        searchText: '',
        menuOpen: false,
      };
    },
    computed: {
      filteredItems() {
        if (this.searchText) {
          return this.items.filter((item) => item.text.toLowerCase().includes(this.searchText.toLowerCase()));
        }
        return this.items;
      },
    },
    watch: {
      searchText() {
        this.$emit('on-search');
      },
    },
    methods: {
      onClick(clickedItem) {
        if (!clickedItem.isDisabled) {
          const clickedIdx = this.items.findIndex((item) => item.text === clickedItem.text);
          this.$emit('on-item-click', clickedItem, clickedIdx);
        }
      },
      onOpenItems(value) {
        this.itemsOpen = value === null ? false : !this.itemsOpen;
        this.menuOpen = this.itemsOpen;
      },
      onClickOutside() {
        this.menuOpen = false;
        this.$emit('clickOutside');
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/colors/background.module';
  @import '../../styles/colors/borders';
  @import '../../styles/colors/text.module.scss';
  @import '../../styles/corners/corners';

  $edges-padding: 16px;
  $icon-size: 16px;
  $inner-text-padding: 8px;

  .nmg-menu {
    width: 252px;
    background-color: $bg-element;
    border: 1px solid $border-ui-color;

    &.wide {
      width: 262px;
    }

    &.dynamic-width {
      width: fit-content;
    }

    .list-container {
      overflow-x: auto;
      overflow-y: overlay;
      $scroller-width: 10px;
      border-bottom-left-radius: $border-radius-medium;

      &::-webkit-scrollbar-track {
        border-radius: $scroller-width;
      }

      &::-webkit-scrollbar {
        width: $scroller-width;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: $scroller-width;
        background-color: $bg-shapes;
      }
    }

    .nmg-menu-header {
      padding-left: 20px;
      padding-top: 8px;
      padding-bottom: 8px;
      color: $txt-placeholder;
      font-size: 12px;
      line-height: 16px;
    }
  }

  .search-container {
    padding: 8px 16px;
  }

  :deep(.nmg-menu-item:last-of-type) {
    border-bottom-left-radius: $border-radius-medium;
    border-bottom-right-radius: $border-radius-medium;
    overflow: hidden;
  }

  .nmg-menu:not(.searchable) :deep(.nmg-menu-item:first-of-type) {
    border-top-left-radius: $border-radius-medium;
    border-top-right-radius: $border-radius-medium;
    overflow: hidden;
  }
</style>
