<template>
  <div
    class="nmg-pill pill-wrapper"
    :style="{ ...cssVars, ...customStyle }"
    :class="[
      isHovered ? 'hovered' : '',
      border ? 'border-no-hover' : 'tw-border tw-border-transparent',
      disabled ? 'disabled' : '',
    ]"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <tooltip
      position="bottom-center"
      :text="tooltipText"
    >
      <span
        :style="customTextStyle"
        class="pill-text body-tiny-bold"
        :class="[disabled ? 'txt-disabled' : 'txt-primary']"
        >{{ text }}</span
      >
    </tooltip>
    <div
      v-if="closeable && !disabled"
      class="pill-icon-wrapper"
      @click="onClick"
    >
      <img
        class="pill-icon"
        :src="xCancelDeleteIcon"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import xCancelDeleteIcon from '../../assets/icons/close-icons/x-shape.svg';
  import Tooltip from '../Tooltip';

  export default {
    name: 'NmgPills',
    components: { Tooltip },
    props: {
      text: {
        type: String,
        default: 'Phill',
      },
      popoverDisplay: {
        type: String,
        default: 'inline-block',
      },
      tooltipText: {
        type: String,
        default: '',
      },
      closeable: {
        type: Boolean,
        default: true,
      },
      customStyle: {
        type: Object,
        default: () => ({}),
      },
      customTextStyle: {
        type: Object,
        default: () => ({}),
      },
      border: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        xCancelDeleteIcon,
        isHovered: false,
      };
    },
    computed: {
      cssVars() {
        return {
          '--popover-display': this.popoverDisplay,
        };
      },
    },
    methods: {
      onClick(event) {
        this.$emit('pillClick', event);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/colors/background.module';
  @import '../../styles/colors/text.module';

  .pill-wrapper {
    height: 24px;
    display: inline-flex;
    align-items: center;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 50px;
    background-color: $bg-element-active;
    cursor: pointer;

    &.disabled {
      background-color: $bg-secondary-element;
      cursor: not-allowed;
    }

    &:not(.disabled).hovered {
      background-color: $bg-element-hover;
    }

    .pill-text {
      //color: $text-basic;
      padding-right: 4px;
      position: relative;
      line-height: 22px;
    }
    .pill-icon-wrapper {
      display: inline-block;
      margin-left: -3px;
      position: relative;
      padding: 4px;
      left: 2px;
      cursor: pointer;
      .pill-icon {
      }
    }
  }
  .nmg-pill.pill-wrapper :deep(.v-popover .trigger) {
    display: var(--popover-display) !important;
  }
</style>
