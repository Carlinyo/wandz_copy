<template>
  <div
    :id="item.customId || ''"
    :key="index"
    class="nmg-menu-item-with-secondary-text"
    :class="{
      selected: item.isSelected,
      disabled: item.isDisabled,
    }"
    @click.stop="$emit('item-clicked', item)"
  >
    <div
      class="item-container"
      :class="{ selected: item.isSelected }"
    >
      <div
        class="nmg-menu-item-with-secondary-text-inner"
        :class="{ selected: item.isSelected }"
      >
        <div class="primary-text">{{ item.text }}</div>
        <div class="secondary-text">{{ item.secondaryText }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MenuItemWithSecondaryText',
    props: {
      item: {
        type: Object,
        required: true,
      },
      index: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/typography/body.scss';
  @import '../../styles/colors/text.module.scss';
  @import '../../styles/colors/background.module.scss';
  @import '../../styles/colors/buttons.scss';

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nmg-menu-item-with-secondary-text {
    cursor: pointer;

    .primary-text {
      font-size: 14px;
      font-weight: 500;
      padding: 16px 16px 8px 16px;
      line-height: 18px;
    }

    .secondary-text {
      font-size: 12px;
      color: $txt-secondary;
      line-height: 16px;
      padding: 0px 16px 16px 16px;
    }

    &:not(.selected):not(.disabled):hover .nmg-menu-item-with-secondary-text-inner {
      background-color: $bg-element-hover;
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .item-container {
      height: 100%;
      width: 100%;

      &:not(.selected):not(.disabled):hover {
        background-color: $btn-primary-hover;
      }

      &.selected {
        background-color: $btn-primary;
      }
    }

    &-inner {
      height: fit-content;
      width: 100%;
      margin: auto;

      &.selected {
        background-color: $btn-primary;
      }

      &.disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  }
</style>
