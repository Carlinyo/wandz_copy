<template>
  <div
    class="nmg-menu-chips"
    :class="{
      open: isMenuOpen,
      error,
    }"
    :data-automation-id="dataAutoId && `${dataAutoId}-container`"
    tabindex="0"
    @focusout="clickOutside"
  >
    <div
      v-if="isMenuOpen"
      class="popup"
      :class="{ error }"
    >
      <div
        v-if="useSearch"
        class="sticky-header"
      >
        <div class="search-wrapper-div">
          <nmg-search
            v-model="searchText"
            placeholder="Search fonts"
          />
        </div>
        <Button
          v-if="ctaBtnTitle"
          class="cta-btn-wrapper"
          style-type="buttonImageSmall"
          :button-image="ctaBtnIcon"
          :button-image-hovered="ctaBtnIcon"
          @handle-click="$emit('on-cta-btn-click')"
        >
          <span style="font-weight: 400">
            {{ ctaBtnTitle }}
          </span>
        </Button>
      </div>
      <div
        class="parent-element"
        :class="{ open: isMenuOpen }"
      >
        <div
          class="child-element list"
          style="width: 100%"
          :data-automation-id="dataAutoId && `${dataAutoId}-select-box`"
        >
          <component
            :is="scrollableContainerElement"
            ref="vs"
            class="vue-scroll-wrapper"
            :ops="ops"
          >
            <div
              v-for="(category, categoryInd) in categories"
              :key="categoryInd"
            >
              <div v-if="category.items.length">
                <div class="category-title body-micro">{{ category.title }}:</div>
                <div
                  v-for="(item, itemInd) in categoryItemsForDisplay(category.items)"
                  :key="`item-${itemInd}`"
                  class="list-item"
                  :class="{ selected: isSelected(item) }"
                  @click.stop="handleItemClick($event, { category: category.title, categoryInd, item, itemInd })"
                  @mouseover="handleItemHover($event, true, { category: category.title, categoryInd, item, itemInd })"
                  @mouseleave="handleItemHover($event, false, { category: category.title, categoryInd, item, itemInd })"
                >
                  <span
                    v-if="isFont"
                    :style="`font-family: ${item.name}`"
                    >{{ item.name }}</span
                  >
                  <span v-else>{{ item.name }}</span>
                </div>
              </div>
            </div>
          </component>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { directive as onClickaway } from 'vue3-click-away';
  // import VueScroll from 'vuescroll/dist/vuescroll-native';
  import { PropType } from 'vue';
  import searchIcon from '../../assets/icons/search/dropdown-search.svg';
  import VueScrollConfig from '../../utils/vue-scroll';
  import { CategoryItem, SelectedCategoryItem } from '../../types/enums/CategoryMenu';
  import Button from '../Button/Button.vue';
  import addIcon from '../../assets/icons/actions/Add.svg';
  import NmgSearch from '../Search/Search.vue';

  export default {
    name: 'CategoryMenu',
    directives: {
      onClickaway,
    },
    components: {
      // VueScroll,
      Button,
      NmgSearch,
    },
    props: {
      useSearch: {
        type: Boolean,
        default: true,
      },
      useVueScroll: {
        type: Boolean,
        default: false,
      },
      selectedItems: {
        type: Array, //  array with 1 element for single
        default: () => [],
        required: false,
      },
      error: {
        type: Boolean,
        default: false,
      },
      width: {
        type: Number,
        default: 364,
      },
      dataAutoId: {
        type: String,
        default: '',
      },
      isMenuOpen: {
        type: Boolean,
        default: false,
      },
      categories: {
        type: Array as PropType<CategoryItem[]>,
        default: null,
      },
      ctaBtnTitle: {
        type: String,
        default: null,
      },
      ctaBtnIcon: {
        type: String,
        default: addIcon,
      },
      isFont: {
        type: Boolean,
        default: false,
      },
      ignoreClickOutSide: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        addIcon,
        searchIcon,
        searchText: '',
        selectedItemsList: [],
        ops: {
          maxHeight: 44,
          ...VueScrollConfig,
        },
      };
    },
    computed: {
      scrollableContainerElement() {
        // if (this.useVueScroll) return VueScroll;
        return 'div';
      },
      allItemsSelected() {
        return this.items.length === this.selectedItemsList.length;
      },
      centeredTitle() {
        return !this.selectedItemsList.length && !this.subTitle;
      },
    },
    watch: {
      selectedItems: {
        immediate: true,
        handler(newVal) {
          this.selectedItemsList = newVal;
        },
      },
    },
    methods: {
      categoryItemsForDisplay(items) {
        return this.useSearch && this.searchText
          ? items.filter((item) => item.name.toLowerCase().includes(this.searchText.toLowerCase()))
          : items;
      },
      clickOutside(e) {
        // We don't want to close if the click is on the scroll or search
        const isScrollClick =
          e &&
          e.target &&
          (e.target.classList.contains('__bar-is-vertical') || e.target.classList.contains('__vuescroll'));
        const isSearchClick = e && e.relatedTarget && e.relatedTarget.classList.contains('search-input');
        const isChipsClicked =
          e &&
          e.relatedTarget &&
          e.relatedTarget.classList.contains('nmg-menu-chips') &&
          e.relatedTarget.classList.contains('open');
        const isCheckboxClicked = e && e.relatedTarget && e.relatedTarget.classList.contains('checkbox');

        if (isScrollClick || isSearchClick || isChipsClicked || isCheckboxClicked || this.ignoreClickOutSide) {
          return;
        }
        this.close();
      },
      close() {
        this.isMenuOpen = false;
      },
      toggleDropdownOpen(val = undefined) {
        this.isMenuOpen = val || !this.isMenuOpen;
      },
      isSelected(item) {
        return item === this.selectedItemsList[0] || item.name === this.selectedItemsList[0];
      },
      handleItemClick(e, data: SelectedCategoryItem) {
        e.preventDefault();
        e.stopPropagation();
        this.selectedItemsList = [];
        this.selectedItemsList.push(data.item);
        this.$emit('menu-click', data);
        this.toggleDropdownOpen();
        this.$emit('menu-toggle', this.selectedItemsList);
      },
      updateSelectedItem(item) {
        this.selectedItemsList = item || [];
      },
      handleItemHover(e, isHover: boolean, data: SelectedCategoryItem) {
        e.preventDefault();
        e.stopPropagation();
        this.$emit(isHover ? 'onItemOver' : 'onItemLeave', data);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/colors/borders.scss';
  @import '../../styles/colors/semantic.module.scss';
  @import '../../styles/colors/text.module.scss';
  @import '../../styles/colors/background.module.scss';
  @import '../../styles/borders/borders.scss';
  @import '../../styles/corners/corners.scss';
  @import '../../styles/typography/body.scss';

  .nmg-menu-chips {
    position: relative;
    width: 260px;
    border: $border;
    border-radius: $border-radius-medium;

    &::before {
      content: '';
      position: absolute;
      top: -6.5px;
      left: 20px;
      width: 10px;
      height: 10px;
      border: 1px solid $border-ui-color;
      border-top: transparent;
      border-left: transparent;
      border-bottom-right-radius: 1.5px;
      z-index: 1;
      transform: rotate(225deg) skew(5deg, 5deg);
      background: white;
    }

    &.open {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    &.error {
      border: 1.5px solid $semantic-negative;
    }

    .parent-element {
      overflow-y: hidden;

      .vue-scroll-wrapper {
        width: 100% !important;
      }

      .list {
        max-height: 200px;
        overflow-x: hidden;
        overflow-y: auto;

        .category-title {
          height: 32px;
          display: flex;
          box-sizing: border-box;
          align-items: center;
          justify-content: flex-start;
          gap: 15px;
          margin: 0 !important;
          padding: 0 16px;
        }

        .cta-btn-wrapper {
          border-bottom: $border;
          height: 44px;
          padding-top: 4px;

          :deep(.buttonImageSmall) {
            padding-left: 16px !important;
          }
        }

        .list-item {
          &:not(:first-child) {
            margin-top: 3px !important;
          }

          border-radius: 0;

          .radio {
          }
        }
      }
    }

    .list {
      background-color: $bg-secondary;

      &-item {
        cursor: pointer;
        color: #10111b;
        font-size: 14px;
        display: flex;
        box-sizing: border-box;
        align-items: center;
        justify-content: flex-start;
        background-color: $bg-secondary;
        height: 50px;
        gap: 15px;
        margin: 0 !important;
        padding: 0 16px;

        &:hover {
          background-color: $bg-element-hover;
        }

        &.selected {
          background-color: $bg-element-active;
        }
      }
    }
  }

  .bottom-border {
    border-bottom: $border;
  }

  .search-input-container {
    position: relative;
    height: 64px;

    ::placeholder {
      font-family: Figtree, sans-serif;
      color: $txt-placeholder;
      opacity: 1;
    }

    .search-input {
      font-family: Figtree, sans-serif;
      color: $txt-placeholder;
      height: 64px;
      width: 100%;
      border: 0;
      outline: 0;
      padding: 8px 16px;
      box-sizing: border-box;

      &:focus {
        outline: 0;
      }
    }

    .search-icon {
      position: absolute;
      right: 16px;
      display: flex;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }
  }

  .popup {
    z-index: 100;
    width: 100%;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #000000;
  }

  .sticky-header {
    border-top-left-radius: $border-radius-medium;
    border-top-right-radius: $border-radius-medium;
    background-color: white;
    border-bottom: $border;

    .search-wrapper-div {
      padding: 8px 16px;
    }
  }
</style>
