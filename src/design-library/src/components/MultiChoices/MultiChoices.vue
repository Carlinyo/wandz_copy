<template>
  <div
    class="multi-choices shadow-bold border-no-hover border-radius-medium"
    :class="{ flat }"
  >
    <div
      v-if="searchable"
      class="search-container"
      :class="{ flat }"
    >
      <SmallSearchInput
        v-model="searchText"
        :auto-focus="searchAutoFocus"
      />
    </div>
    <div
      class="all list-item"
      :class="{ flat }"
      @click="onSelectAll"
    >
      <div class="checkbox">
        <Checkbox :checked="isAllSelected" />
      </div>
      <div
        class="text body-small"
        :class="{ flat }"
      >
        {{ allSelectedText }}
      </div>
    </div>
    <div class="list-container">
      <transition-group name="checkbox-list">
        <div
          v-for="item in filteredItems"
          :key="item.text"
          :class="{ selected: item.isSelected, flat }"
          class="list-item bg-element body-small"
          @click="onSelect(item)"
        >
          <Checkbox
            :checked="checkboxChecked(item.isSelected)"
            :disabled="item.disabled"
          />
          <fav-icon
            v-if="item.favicon"
            class="service-icon"
            :src="item.favicon.faviconUrl"
            :strategy="item.favicon.faviconStrategy"
          />
          <div
            class="text"
            :title="item.text"
            :class="{ flat }"
          >
            {{ item.text }}
          </div>
        </div>
      </transition-group>
    </div>
    <nmg-button
      v-show="showShrinkButton"
      class="shrink-button"
      style-type="textLink"
      :text-padding="0"
      :custom-width="showWidth"
      @click="changeShowAll"
    >
      {{ showText }}
    </nmg-button>
  </div>
</template>

<script>
  import Checkbox from '../Checkbox/Checkbox.vue';
  import SmallSearchInput from '../SmallSearchInput/SmallSearchInput.vue';
  import NmgButton from '../Button';
  import FavIcon from '../FavIcon';

  import { COMMON_TEXTS } from '../../const';

  export default {
    name: 'MultiChoices',
    components: {
      Checkbox,
      SmallSearchInput,
      NmgButton,
      FavIcon,
    },
    props: {
      items: {
        type: Array,
        required: true,
        default: () => [], // NOTE:[{
        // text:'',
        // iconSrc:'',
        // favIcon: {faviconUrl: string, faviconStrategy: FaviconStrategies}},
        // iconSrcAdditional: '',
        // isSelected: false
        // }]
      },
      allSelectedText: {
        type: String,
        required: false,
        default: 'Select All',
      },
      searchable: {
        type: Boolean,
        default: false,
      },
      searchAutoFocus: {
        type: Boolean,
        default: false,
      },
      flat: {
        type: Boolean,
        default: false,
      },
      shrink: {
        type: Boolean,
        default: false,
      },
      shrinkMinimum: {
        type: Number,
        default: 5,
      },
      clearOnAll: {
        type: Boolean,
        default: false,
      },
      showWidth: {
        type: Number,
        default: 90,
      },
    },
    data() {
      return {
        searchText: '',
        showAll: false,
        COMMON_TEXTS,
        showText: COMMON_TEXTS.SHOW_ALL,
        showTexts: [COMMON_TEXTS.SHOW_ALL, COMMON_TEXTS.SHOW_LESS],
      };
    },
    computed: {
      isAllSelected() {
        return this.items.every((item) => item.isSelected);
      },
      filteredItems() {
        let items = [...this.items];
        if (this.searchText) {
          items = this.items.filter((item) => item.text.toLowerCase().includes(this.searchText.toLowerCase()));
        }
        return this.showAll || !this.shrink ? items : items.splice(0, this.shrinkMinimum);
      },
      showShrinkButton() {
        return (
          this.shrink && this.items.length > this.shrinkMinimum && this.filteredItems.length > this.shrinkMinimum - 1
        );
      },
    },
    methods: {
      onSelect(clickedItem) {
        const clickedIdx = this.items.findIndex((item) => item.text === clickedItem.text);
        if (this.clearOnAll && this.isAllSelected) this.$emit('clear-all');
        this.$emit('on-item-click', clickedItem, clickedIdx);
      },
      onSelectAll() {
        this.$emit('on-select-all', this.isAllSelected);
      },
      changeShowAll() {
        this.showAll = !this.showAll;
        this.showText = this.showTexts[this.showAll ? 1 : 0];
      },
      checkboxChecked(isChecked) {
        if (this.clearOnAll && this.isAllSelected) return false;
        return isChecked;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/colors/borders.scss';
  @import '../../styles/colors/text.module';
  @import '../../styles/colors/background.module.scss';
  @import '../../styles/corners/corners.scss';

  $horizontal-padding: 16px;

  .multi-choices {
    display: inline-block;
    width: 252px;
    color: $txt-primary;
    font-family: Figtree, sans-serif;

    &.flat {
      //display: initial;
      box-shadow: none;
      border: none;
      border-radius: 0;
    }
    .search-container {
      &.flat {
        margin-bottom: 8px;
      }
    }

    .list-container {
      overflow-y: auto;
      overflow-x: hidden;
      max-height: inherit;
      .checkbox-list-enter-active {
        transition: max-height 0.5s;
        overflow: hidden;
      }
      .checkbox-list-leave-active {
        transition: max-height 0.5s;
        overflow: hidden;
      }
      .checkbox-list-enter,
      .checkbox-list-leave-to {
        max-height: 0;
      }

      $scroller-width: 10px;

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

    .list-item {
      max-height: 40px;
      padding: 0 $horizontal-padding;
      border-radius: 2px;
      display: flex;
      cursor: pointer;
      align-items: center;
      gap: 8px;
      height: 50px;
      &.flat {
        background-color: transparent;
        height: 32px;
        padding: 0 0 0 8px;
      }

      .text:not(.flat) {
        max-width: calc(100% - #{$horizontal-padding} * 2);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &.all {
        position: relative;
        background: $bg-element;
        padding: 0 16px;

        &:after {
          content: '';
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 0;
          height: 1px;
          //background-color: $bg-shapes;
        }
      }

      &.all.flat {
        margin: 0 8px;
        background: none;
        padding: 0;
        &:after {
          left: 0;
          right: 0;
        }
      }

      //&.all {
      //  background-color: $BG-Dark;
      //  box-shadow: 0 0 12px 0 rgba(25, 16, 62, 0.12);
      //  &.flat{
      //    background-color: transparent;
      //    box-shadow: none;
      //  }
      //}

      &:hover:not(.all):not(.flat) {
        //background-color: $hover-yellow;
      }

      &.selected:not(.flat) {
        //background-color: $system-colors;
      }

      //.checkbox {
      //  box-shadow: 0 0 12px 0 rgba(25, 16, 62, 0.12);
      //}
    }
    .shrink-button {
      padding-left: 8px;
    }

    &:last-of-type {
      border-bottom-left-radius: $border-radius-medium;
      border-bottom-right-radius: $border-radius-medium;
      //overflow: hidden;
    }
  }
</style>
