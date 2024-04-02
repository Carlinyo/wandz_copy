<template>
  <div
    :id="dropdownId"
    v-on-clickaway="closeListDisplay"
    class="filter-dropdown"
    :title="staticTextHeader || selectionText.selected"
    :class="{
      disabled,
      underline: underlineLabel,
      'is-fetching': isFetching,
      static: staticPosition,
      'item-ellipsis': isMenuEllipsis,
    }"
  >
    <template v-if="underlineLabel">
      <tooltip
        :text="underlineLabelSelectedText.tooltipText"
        :show-tooltip="!!underlineLabelSelectedText.tooltipText"
        :tooltip-content-custom-style="tooltipContentCustomStyle"
        :class="wordBreak ? 'word-break' : ''"
        tooltip-type="info"
        position="top-start"
        allow-overflow
      >
        <div
          :class="{
            'filter-dropdown-head': true,
            'underline-label': true,
            'selected-items-label': true,
            'disabled-underline': disabled,
            unselected: !selectedItems.length,
            'only-single-option': !multipleItems,
          }"
          :style="underlineLabelStyles"
          @click="toggleListDisplay"
        >
          <div
            v-if="isFetching"
            class="fetching-line"
          />
          {{ underlineLabelSelectedText.text }}
          <img
            v-if="((items && items.length) || categories) && showMenuArrow"
            class="arrow-icon"
            :class="{ open: showList }"
            :src="icons.arrow"
          />
        </div>
      </tooltip>
    </template>
    <div
      v-else
      :style="headStyle"
      class="filter-dropdown-head"
      @click="toggleListDisplay"
    >
      <div
        class="label"
        :class="{ horizontal: horizontalLabel }"
      >
        {{ label }}
      </div>
      <div
        :class="{
          [selectedItemStyle]: selectedItemStyle,
          'selected-items-label': true,
          'only-single-option': !multipleItems,
        }"
      >
        <div
          v-if="staticImageHeader"
          class="static-dropdown-header"
          :class="{ disabled }"
        >
          <img :src="staticImageHeader" />
        </div>
        <div
          v-else
          style="display: contents"
        >
          <span
            class="selection-text"
            :class="{
              'bold-selection': boldSelectedItem,
            }"
            >{{ staticTextHeader || selectionText.selected }}</span
          >
          <span class="selection-text additional">{{ selectionText.additional }}</span>
        </div>
        <img
          v-if="((items && items.length) || categories) && showMenuArrow"
          class="arrow-icon"
          :class="{ open: showList }"
          :src="icons.arrow"
        />
      </div>
    </div>
    <div
      v-if="showList && (multipleItems || categories)"
      class="list"
      :class="selectedItemStyle"
      :style="listCustomStyles"
      @mouseover="$emit('on-dropdown-hover')"
      @mouseleave="$emit('on-dropdown-hover-leave')"
    >
      <MultiChoices
        v-if="multiChoice"
        :style="{ 'max-height': this.maxMultiChoiceHeight }"
        class="multi-choices"
        :searchable="searchable"
        :search-auto-focus="searchAutoFocus"
        :items="items"
        @on-item-click="onItemClick"
        @on-select-all="onSelectAll"
      />
      <CategoryMenu
        v-else-if="categories && categories.length"
        :is-menu-open="showList"
        :ignore-click-out-side="ignoreClickOutSide"
        :selected-items="[selectedItem]"
        :use-search="searchable"
        :categories="categories"
        :use-vue-scroll="true"
        :cta-btn-title="ctaBtnTitle"
        :is-font="isFont"
        @menu-click="onCategoryItemClick($event, { closeList: true })"
        @on-cta-btn-click="$emit('on-cta-btn-click')"
        @onItemLeave="$emit('onItemLeave', $event)"
        @onItemOver="$emit('onItemOver', $event)"
      />
      <Menu
        v-else
        ref="menuRef"
        is-open
        :with-description="withDescription"
        :menu-header="menuHeader"
        :searchable="searchable"
        :search-auto-focus="searchAutoFocus"
        :items="items"
        :list-style="menuListStyle"
        :menu-style="menuStyle"
        :is-font="isFont"
        :is-menu-ellipsis="isMenuEllipsis"
        @on-item-click="(item, idx) => onItemClick(item, idx, { closeList: true })"
        @on-search="listStatusHasChanged"
      />
    </div>
  </div>
</template>
<script lang="ts">
  import { directive as onClickaway } from 'vue3-click-away';
  import { PropType } from 'vue';
  import Menu from '../Menu/Menu.vue';
  import Tooltip from '../Tooltip/Tooltip.vue';
  import MultiChoices from '../MultiChoices/MultiChoices.vue';
  import CategoryMenu from '../CategoryMenu/CategoryMenu.vue';
  import ThinArrowIcon from '../../assets/icons/arrows/chevron-16x16.svg';
  import FilledArrowIcon from '../../assets/icons/arrows/arrowRight.svg';
  // import { CategoryItem } from '../../types/enums/CategoryMenu';
  import addIcon from '../../assets/icons/actions/Add.svg';

  export default {
    name: 'FilterDropdown',
    components: {
      Menu,
      Tooltip,
      MultiChoices,
      CategoryMenu,
    },
    directives: {
      onClickaway,
    },
    props: {
      withDescription: {
        type: Boolean,
        default: false,
      },
      ignoreClickOutSide: {
        type: Boolean,
        default: false,
      },
      label: {
        type: String,
        required: false,
        default: '',
      },
      countryFilter: {
        type: Boolean,
        default: true,
      },
      /** in-case we want to have a static selectedItem icon/image. */
      staticImageHeader: {
        type: String,
        required: false,
        default: '',
      },
      staticTextHeader: {
        type: String,
        default: '',
      },
      showMenuArrow: {
        type: Boolean,
        default: true,
      },
      menuHeader: {
        type: String,
        default: '',
      },
      underlineLabel: {
        type: Boolean,
        default: false,
      },
      underlineLabelStyles: {
        type: Object,
        default: () => ({}),
      },
      selectedItem: {
        type: String, // selected item description or text to appear when nothing is selected
        default: '',
      },
      allSelectedText: {
        type: String,
        default: 'All',
      },
      items: {
        type: Array,
        default: () => [], // NOTE: [{ text:'', iconSrc: '', iconSrcAdditional: '', isSelected: false }]
      },
      multiChoice: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      customListStyle: {
        type: Object,
        required: false,
        default: () => ({}),
      },
      menuStyle: {
        type: Object,
        required: false,
        default: () => ({}),
      },
      multiChoicesWithBorder: {
        type: Boolean,
        default: false,
      },
      searchable: {
        type: Boolean,
        default: false,
      },
      searchAutoFocus: {
        type: Boolean,
        default: false,
      },
      menuListStyle: {
        type: Object,
        default: () => ({ maxHeight: '204px' }),
      },
      /* boolean for styling the selected item bold */
      boldSelectedItem: {
        type: Boolean,
        default: false,
      },
      maxMultiChoiceHeight: {
        type: String,
        default: '125px',
      },
      /* if the items are "..." */
      isMenuEllipsis: {
        type: Boolean,
        default: false,
      },
      headStyle: {
        type: Object,
        default: () => ({}),
      },
      isFetching: {
        type: Boolean,
        default: false,
      },
      maxValueChars: {
        type: Number,
        default: 30,
      },
      tooltipContentCustomStyle: {
        // deprecated, please do not use
        type: Object,
        default: () => ({}),
      },
      wordBreak: {
        type: Boolean,
        default: false,
      },
      staticPosition: {
        type: Boolean,
        default: false,
      },
      categories: {
        type: Array as PropType<{ title: string; items: { name: string; additionalData?: unknown }[] }[]>,
        default: null,
      },
      ctaBtnTitle: {
        type: String,
        default: null,
      },
      isFont: {
        type: Boolean,
        default: false,
      },
      horizontalLabel: {
        type: Boolean,
        default: false,
      },
      dropdownId: {
        type: String,
        default: '',
      },
      // Supported arrow styles:
      // 1. thin
      // 2. filled
      arrowStyle: {
        type: String,
        default: 'thin',
      },
      // Supported arrow styles:
      // 1. regular
      // 2. heading-h4
      selectedItemStyle: {
        type: String,
        default: 'regular',
      },
      menuListPosition: {
        type: String, // 'left' or 'right
        default: 'right',
      },
    },
    data() {
      return {
        addIcon,
        showList: false,
      };
    },
    computed: {
      arrowIcon() {
        switch (this.arrowStyle) {
          case 'thin':
            return ThinArrowIcon;
          case 'filled':
            return FilledArrowIcon;
          default:
            return ThinArrowIcon;
        }
      },
      multipleItems() {
        return this.items && this.items.length > 1;
      },
      icons() {
        return {
          arrow: this.arrowIcon,
        };
      },
      showMenu() {
        return this.showList && this.items.length;
      },
      listCustomStyles() {
        const additionalStyles = this.multiChoicesWithBorder && this.multiChoice ? { border: '1px solid black' } : {};
        additionalStyles[this.menuListPosition] = 0;

        return {
          ...this.customListStyle,
          ...additionalStyles,
        };
      },
      selectedItems() {
        return this.items.filter((item) => item.isSelected).map((item) => item.header ?? item.text);
      },
      underlineLabelSelectedText() {
        // returns <text,tooltipText(if required)>
        let text;

        if (this.multiChoice) {
          text =
            this.selectedItems.length > 1
              ? `Selected ${this.selectedItems.length}`
              : this.selectedItems.length
                ? this.selectedItems[0]
                : this.selectedItem;
        } else {
          text = this.selectedItems.length ? this.selectedItems[0] : this.selectedItem;
        }

        if (text.length > this.maxValueChars) {
          return {
            text: this.lengthHandler(text, this.maxValueChars),
            tooltipText: text, // On tooltip we'll have the full string
          };
        }
        return { text };
      },
      selectionText() {
        if (this.categories) {
          return { selected: this.selectedItem };
        }
        if ((!this.multiChoice && this.selectedItems.length) || this.selectedItems.length === 1) {
          return { selected: this.selectedItems[0] };
        }
        if (this.selectedItems.length === 0) {
          return { selected: this.selectedItem };
        }
        if (this.selectedItems.length === this.items.length) {
          return { selected: this.allSelectedText };
        }
        return { selected: this.selectedItems[0], additional: `+${this.selectedItems.length - 1}` };
      },
    },
    watch: {
      showList(newVal) {
        this.listStatusHasChanged(newVal);
      },
    },
    methods: {
      categoryItemsForDisplay(items) {
        return this.searchable && this.searchText
          ? items.filter((item) => item.country.toLowerCase().includes(this.searchText.toLowerCase()))
          : items;
      },
      lengthHandler(input, maxLength) {
        return input.length > maxLength ? `${input.substring(0, maxLength)}...` : input;
      },
      toggleListDisplay() {
        this.showList = !this.showList;
      },
      closeListDisplay() {
        if (!this.ignoreClickOutSide) {
          this.showList = false;
        }
      },
      onItemClick(clickedItem, clickedIdx, { closeList = false } = {}) {
        if (closeList) {
          this.closeListDisplay();
        }
        this.$emit('on-item-click', clickedItem, clickedIdx);
      },
      onCategoryItemClick(eventData, { closeList = false } = {}) {
        if (closeList) {
          this.closeListDisplay();
        }
        this.$emit('on-category-item-click', eventData);
      },
      onSelectAll() {
        this.$emit('on-select-all');
      },
      listStatusHasChanged(isOpen) {
        this.$nextTick(() => {
          /* eslint-disable */
          const listHeight =
            (this.$refs.menuRef &&
              this.$refs.menuRef.$el &&
              this.$refs.menuRef.$el.children &&
              this.$refs.menuRef.$el.children[2] &&
              this.$refs.menuRef.$el.children[2].clientHeight) ||
            0;
          /* eslint-enable */
          this.$emit('on-open-menu', { isOpen: isOpen || this.showList, listHeight });
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import '../../styles/colors/text.module';
  @import '../../styles/colors/background.module';
  @import '../../styles/colors/semantic.module.scss';

  .filter-dropdown {
    display: flex;
    position: relative;
    z-index: 10;

    &.static {
      position: static;
    }

    &.is-fetching {
      opacity: 0.55;
      pointer-events: none;
    }

    &.underline {
      flex-direction: column;
      border-bottom: 1px solid $txt-primary;
    }

    .selected-items-label {
      font-size: 14px;
      color: $txt-primary;
      cursor: pointer;
      display: flex;
      align-items: center;

      &.only-single-option {
        cursor: default;
      }

      .selection-text {
        user-select: none;
      }

      .static-dropdown-header {
        align-items: center;
        display: flex;
        padding: 0 10px 0 0;
      }
    }

    .word-break {
      word-break: break-word;
    }

    .underline-label {
      color: $txt-primary;
      position: relative;
      z-index: 1;
      cursor: pointer;

      &.unselected {
        color: $txt-placeholder;
      }

      &.disabled-underline {
        color: $txt-disabled;
        text-decoration-color: $txt-disabled;
      }

      @keyframes loadingBottomBar {
        0% {
          transform: scaleX(0);
          transform-origin: left;
        }

        45% {
          transform: scaleX(1);
          transform-origin: left;
        }

        50% {
          transform: scaleX(1);
          transform-origin: right;
        }

        100% {
          transform: scaleX(0);
          transform-origin: right;
        }
      }

      .fetching-line {
        width: 100%;
        content: '';
        background-color: rgba(255, 223, 90, 1);
        height: 2px;
        animation: loadingBottomBar 1000ms cubic-bezier(0.57, 0, 0.44, 1) infinite alternate;
        position: absolute;
        bottom: 2px;
      }

      &:hover {
        color: $txt-primary;
        text-decoration-color: $semantic-primary-brand;
      }
    }

    .list {
      position: absolute;
      top: 20px;
      z-index: 10;

      &.heading-h4 {
        top: 28px;
      }
    }

    &-head {
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: default;

      .label {
        font-size: 10px;
        line-height: 10px;
        font-family: Figtree;
        color: $txt-secondary;

        &.horizontal {
          position: relative;
          bottom: 23px;
          left: 61px;
        }
      }

      .heading-h4 {
        font-size: 18px !important;
        font-weight: 400;
      }

      .arrow-icon {
        margin-left: 4px;
        transform: rotate(90deg);
        transition: transform 0.25s ease-in-out;
        height: 16px;
        width: 16px;

        &.open {
          transform: rotate(-90deg);
        }
      }
    }
  }

  .disabled {
    pointer-events: none;
    cursor: not-allowed;

    &:not(.underline) {
      opacity: 0.55;
    }
  }
</style>
<style lang="scss">
  .underline {
    .list {
      .multi-choices {
        .list-container {
          .list-item {
            margin-right: 0px !important;

            .checkbox {
              width: 16px;
              height: 16px;

              .checkbox-container {
                .cbx-cont {
                  .checkbox-content {
                    &.selected {
                      background-color: #000000;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .underline {
    .list {
      .multi-choices {
        .list-item {
          margin-right: 0px !important;

          &.all {
            .checkbox {
              width: 16px;
              height: 16px;

              .checkbox-container {
                .cbx-cont {
                  .checkbox-content {
                    &.selected {
                      background-color: #000000;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .bold-selection {
    font-weight: 600;
  }

  .item-ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
