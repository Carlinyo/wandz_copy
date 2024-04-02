<template>
  <div
    :id="item.customId || ''"
    :key="index"
    class="nmg-menu-item"
    :class="{
      selected: item.isSelected,
      disabled: item.isDisabled,
      'locked-feature': item.isLockedFeature,
    }"
    @click.stop="$emit('item-clicked', item)"
  >
    <div
      class="item-tooltip-container"
      :class="{ selected: item.isSelected }"
    >
      <div
        :title="item.text"
        class="nmg-menu-item-inner tw-gap-2"
        :class="{ selected: item.isSelected }"
      >
        <div
          v-if="item.iconSrc && !item.isLockedFeature"
          class="main-img-cont center tw-shrink-0"
        >
          <img :src="item.iconSrc" />
        </div>

        <div
          class="tw-flex tw-justify-start tw-items-center tw-grow tw-gap-2 header-wrapper body-small txt-primary"
          :class="{ 'item-ellipsis': isMenuEllipsis }"
        >
          <!-- @slot itemText: only text in the row, keeping icons -->
          <slot
            name="itemText"
            v-bind="{ item, index }"
          >
            <span
              v-if="isFont"
              class=""
              :style="`font-family: ${item.text}`"
              :class="{ 'item-ellipsis': isMenuEllipsis }"
              >{{ item.text }}</span
            >
            <span
              v-else
              :style="{ color: item.style && item.style.color ? item.style.color : null }"
              :class="{ 'item-ellipsis': isMenuEllipsis }"
              >{{ item.text }}</span
            >
          </slot>
          <tooltip
            v-if="item.tooltipContent"
            :text="item.tooltipContent"
            :show-tooltip="Boolean(item.tooltipContent)"
            position="bottom"
          >
            <img
              :src="InfoIcon"
              class="tw-rotate-180"
            />
          </tooltip>
        </div>
        <div
          v-if="item.iconSrcAdditional"
          class="additional-img-cont center"
        >
          <img :src="item.iconSrcAdditional" />
        </div>
        <div
          v-else-if="item.isLockedFeature"
          class="main-img-cont center tw-shrink-0"
        >
          <img :src="LockIcon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Tooltip from '../Tooltip';
  import LockIcon from '../../assets/icons/info/lock_grey.svg';
  import InfoIcon from '../../assets/icons/info/moreInfo.svg';

  export default {
    name: 'MenuItem',
    components: {
      Tooltip,
    },
    props: {
      item: {
        type: Object,
        required: true,
      },
      index: {
        type: Number,
        required: true,
      },
      isFont: {
        type: Boolean,
        default: false,
      },
      isMenuEllipsis: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        LockIcon,
        InfoIcon,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/colors/background.module';
  @import '../../styles/borders/borders';

  $edges-padding: 16px;
  $icon-size: 16px;
  $inner-text-padding: 8px;

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nmg-menu-item {
    cursor: pointer;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &:not(.selected):not(.disabled) .nmg-menu-item-inner {
      border-right: 2px solid transparent;
      border-left: 2px solid transparent;
    }
    &:not(.selected):not(.disabled):hover .nmg-menu-item-inner {
      background-color: $bg-element-hover;
      border-right: $border;
      border-left: $border;
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    &.locked-feature {
      cursor: pointer;
      opacity: 0.5;
      // WHEN DESIGN AVAILABLE - Decide how locked features will be look like
    }

    .item-tooltip-container {
      //position: absolute;
      height: 100%;
      width: 100%;

      &:not(.selected):not(.disabled):hover {
        background-color: $bg-element-hover;
        border-right: $border;
        border-left: $border;
      }

      &.selected {
        background-color: $bg-element-active;
        border-right: $border;
        border-left: $border;
      }
    }

    &-inner {
      display: flex;
      align-items: center;
      height: 48px;
      margin: auto;
      padding: 0px 16px;

      &.selected {
        background-color: $bg-element-active;
        border-right: $border;
        border-left: $border;
      }

      &.disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .main-img-cont {
        width: $icon-size;
        height: $icon-size;
      }

      .additional-img-cont {
        width: $icon-size;
        height: $icon-size;
        margin-left: auto;
      }
    }
  }

  .item-ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
