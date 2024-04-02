<template>
  <div class="tooltip-container">
    <Dropdown
      :placement="position"
      :shown="shown"
      :popover-class="[
        `custom-tooltip-design-library-tooltip bg-secondary border-radius-small shadow-bold txt-primary tooltip-type-${tooltipType}`,
        customClassName,
        extendedHoverClass,
      ]"
      popover-arrow-class="custom-tooltip-arrow-new-ui"
      popover-inner-class="custom-tooltip-inner"
      :triggers="[trigger]"
      :disabled="!showTooltip || (!hasText && !hasTitle)"
      @show="onShow"
    >
      <slot />

      <template #popper>
        <div
          v-if="hasTitle"
          class="tooltip-title body-small"
        >
          <slot name="tooltip-title">
            <span v-html="title" />
          </slot>
        </div>

        <hr
          v-if="titleSeparator"
          class="tooltip-separator"
        />

        <div
          v-if="hasText"
          :style="tooltipContentCustomStyle"
          class="tooltip-content body-small"
          :class="wordBreak ? 'word-break' : ''"
        >
          <slot name="tooltip-icon">
            <img
              v-if="tooltipIcon"
              :src="tooltipIcon"
              class="tooltip-icon"
            />
          </slot>
          <slot name="tooltip-content"><span v-html="text" /></slot>
        </div>

        <div class="tooltip-actions-wrapper">
          <slot
            v-if="hasSecondaryButton"
            name="tooltip-secondary-action"
          >
            <nmg-button
              class="tooltip-actions"
              style-type="secondaryWhite"
              small-size
              @click="$emit('secondary-button-clicked')"
            >
              {{ secondaryButtonText }}
            </nmg-button>
          </slot>
          <slot
            v-if="hasPrimaryButton"
            name="tooltip-primary-action"
          >
            <nmg-button
              class="tooltip-actions"
              style-type="secondaryWhite"
              small-size
              @click="$emit('primary-button-clicked')"
            >
              {{ primaryButtonText }}
            </nmg-button>
          </slot>
          <div
            v-if="copyText"
            class="copy-section"
            @click="copyClicked"
          >
            <hr class="tooltip-separator" />
            <div class="copy-text">
              <img
                :src="CopyIcon"
                class="copy-icon"
              />
              {{ copyText }}
            </div>
          </div>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<script lang="ts">
  import { Dropdown } from 'floating-vue';
  import nmgButton from '../Button';
  import CopyIcon from '../../assets/icons/actions/copy.svg';

  const TOOLTIP_TYPE = {
    REGULAR: 'regular',
    ICON: 'icon',
    INFO: 'info',
    ACTION: 'action',
  };

  export default {
    name: 'NmgTooltip',
    components: {
      Dropdown,
      nmgButton,
    },
    props: {
      title: {
        type: String,
        default: '',
      },
      titleSeparator: {
        type: Boolean,
        default: false,
      },
      text: {
        type: String,
        default: '',
      },
      tooltipType: {
        type: String,
        default: TOOLTIP_TYPE.REGULAR,
        validator: (value) =>
          [TOOLTIP_TYPE.REGULAR, TOOLTIP_TYPE.ICON, TOOLTIP_TYPE.INFO, TOOLTIP_TYPE.ACTION].indexOf(value) !== -1,
      },
      position: {
        type: String,
        default: 'top',
      },
      shown: {
        type: Boolean,
        required: false,
        default: false,
      },
      allowOverflow: {
        type: Boolean,
        default: false,
      },
      trigger: {
        type: String,
        default: 'hover',
      },
      showTooltip: {
        type: Boolean,
        default: true,
      },
      customClassName: {
        type: String,
        default: '',
      },
      primaryButtonText: {
        type: String,
        default: '',
      },
      secondaryButtonText: {
        type: String,
        default: '',
      },
      tooltipContentMaxWidth: {
        type: String,
        default: '306px',
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
      extendedHover: {
        type: Boolean,
        default: false,
      },
      copyText: {
        type: String,
        default: '',
      },
      tooltipIcon: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        CopyIcon,
      };
    },
    computed: {
      extendedHoverClass() {
        return this.extendedHover ? `extended-hover-${this.position}` : null;
      },
      hasTitle() {
        return !!this.$slots['tooltip-title'] || this.title;
      },
      hasText() {
        return !!this.$slots['tooltip-content'] || this.text;
      },
      hasPrimaryButton() {
        return !!this.$slots['tooltip-primary-action'] || this.primaryButtonText;
      },
      hasSecondaryButton() {
        return !!this.$slots['tooltip-primary-action'] || this.secondaryButtonText;
      },
      popperOptions() {
        if (this.allowOverflow) {
          return {
            modifiers: {
              preventOverflow: {
                enabled: false,
              },
            },
          };
        }
        return null;
      },
    },
    methods: {
      onShow() {
        document.documentElement.style.setProperty('--tooltip-content-max-width', this.tooltipContentMaxWidth);
        this.$emit('show');
      },
      async copyClicked() {
        await navigator.clipboard.writeText(this.text);
        this.$emit('tooltip-copy-clicked');
      },
    },
  };
</script>

<style lang="scss">
  @import '../../styles/borders/borders.scss';
  @import '../../styles/corners/corners.scss';

  .extended-hover-top,
  .extended-hover-top-start,
  .extended-hover-top-center,
  .extended-hover-top-end,
  .extended-hover-bottom,
  .extended-hover-bottom-start,
  .extended-hover-bottom-center,
  .extended-hover-bottom-end {
    &::before {
      content: '';
      position: absolute;
      top: -15px;
      height: 15px;
      width: 100%;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -15px;
      height: 15px;
      width: 100%;
    }
  }

  .extended-hover-left,
  .extended-hover-right {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -15px;
      width: 15px;
      height: 100%;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: -15px;
      width: 15px;
      height: 100%;
    }
  }

  .custom-tooltip-design-library-tooltip {
    display: block !important;
    z-index: 10000;
    border: 1px solid $border-ui-color;

    .custom-tooltip-inner {
      background-color: white;
      z-index: 2;
      border-radius: $border-radius-small;
      padding: 16px;
      max-width: var(--tooltip-content-max-width, 306px);

      .word-break {
        word-break: break-word;
      }
    }

    &.tooltip-type-icon {
      .custom-tooltip-inner {
        padding: 8px;
      }

      .custom-tooltip-arrow {
        border-color: transparent;
      }
    }

    .custom-tooltip-arrow-new-ui {
      width: 10px;
      height: 10px;
      border: 1px solid #d8dbe0;
      border-top: transparent;
      border-left: transparent;
      border-bottom-right-radius: 1.5px;
      position: absolute;
      z-index: 1;
      transform: rotate(45deg) skew(5deg, 5deg);
      background: white;
    }

    &[x-placement^='top-start'],
    &[x-placement^='top-end'],
    &[x-placement^='top'] {
      margin-bottom: 14px;

      .custom-tooltip-arrow-new-ui {
        bottom: -5px;
      }
    }

    &[x-placement^='left'] {
      margin-right: 14px;

      .custom-tooltip-arrow-new-ui {
        right: -5px;
        transform: rotate(-45deg) skew(5deg, 5deg);
      }
    }

    &[x-placement^='right'] {
      margin-right: 14px;

      .custom-tooltip-arrow-new-ui {
        left: -5px;
        transform: rotate(135deg) skew(5deg, 5deg);
      }
    }

    &[x-placement^='bottom-start'],
    &[x-placement^='bottom-end'],
    &[x-placement^='bottom'] {
      margin-top: 14px;

      .custom-tooltip-arrow-new-ui {
        top: -5px;
        transform: rotate(225deg) skew(5deg, 5deg);
      }
    }

    .custom-tooltip-arrow {
      width: 0;
      height: 0;
      border-style: solid;
      position: absolute;
      margin: 10px;
      border-color: $border-ui-color;
      z-index: 1;
    }

    &[x-placement^='top'] {
      margin-bottom: 14px;

      .custom-tooltip-arrow {
        border-width: 1px 10px 0 10px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        bottom: -10px;
        left: calc(50% + 8px);
        margin-top: 0;
        margin-bottom: 0;
      }
    }

    &[x-placement^='top-start'] {
      margin-bottom: 14px;

      .custom-tooltip-arrow {
        bottom: -10px;
        left: calc(50%);
        margin-top: 0;
        margin-bottom: 0;
      }
    }

    &[x-placement^='top-end'] {
      margin-bottom: 14px;

      .custom-tooltip-arrow {
        border-width: 10px 10px 0 10px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        left: calc(50% - 10px);
        bottom: -10px;
        margin-top: 0;
        margin-bottom: 0;
      }
    }

    &[x-placement^='bottom'] {
      margin-top: 14px;

      .custom-tooltip-arrow {
        border-width: 0 10px 10px 10px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-top-color: transparent !important;
        top: -10px;
        left: calc(50% - 10px);
        margin-top: 0;
        margin-bottom: 0;
      }
    }

    &[x-placement^='bottom-start'] {
      margin-top: 14px;

      .custom-tooltip-arrow {
        border-width: 0 10px 10px 10px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-top-color: transparent !important;
        top: -10px;
        left: calc(50% - 10px);
        margin-top: 0;
        margin-bottom: 0;
      }
    }

    &[x-placement^='bottom-end'] {
      margin-top: 14px;

      .custom-tooltip-arrow {
        border-width: 0 10px 10px 10px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-top-color: transparent !important;
        top: -10px;
        left: calc(50% - 10px);
        margin-top: 0;
        margin-bottom: 0;
      }
    }

    &[x-placement^='right'] {
      margin-left: 14px;

      .custom-tooltip-arrow {
        border-width: 10px 10px 10px 0;
        border-left-color: transparent !important;
        border-top-color: transparent !important;
        border-bottom-color: transparent !important;
        left: -10px;
        top: calc(50% - 10px);
        margin-left: 0;
        margin-right: 0;
      }
    }

    &[x-placement^='left'] {
      margin-right: 14px;

      .custom-tooltip-arrow {
        border-width: 10px 0 10px 10px;
        border-top-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        top: calc(50% - 10px);
        right: -10px;
        margin-left: 0;
        margin-right: 0px;
      }
    }

    &[aria-hidden='true'] {
      visibility: hidden;
      opacity: 0;
      transition:
        opacity 0.15s,
        visibility 0.15s;
    }

    &[aria-hidden='false'] {
      visibility: visible;
      opacity: 1;
      transition: opacity 0.15s;
    }

    .tooltip-separator {
      border-top: 1px solid $border-ui-color;
      width: 100%;
      margin-top: 16px;
      margin-bottom: 16px;
      height: 0px;
    }

    .tooltip-actions-wrapper {
      display: flex;
      justify-content: flex-end;
    }

    .tooltip-actions {
      margin-top: 10px;
      margin-left: 10px;
    }

    &.tooltip-type-overIcon .custom-tooltip-inner {
      padding: 8px;
    }
  }

  .copy-section {
    width: 100%;
    cursor: pointer;

    .copy-text {
      display: flex;

      .copy-icon {
        margin-right: 8px;
      }
    }
  }

  .tooltip-content {
    padding: 16px;
    border: $border;
    border-radius: $border-radius-small;
  }

  .v-popper__arrow-container {
    z-index: 10;
  }
  .v-popper__popper {
    &[data-popper-placement='top-start'] {
      left: -9px !important;
      .v-popper__arrow-container {
        margin-left: 10px !important;
      }
    }
    &[data-popper-placement='top-end'] {
      left: 11px !important;
      .v-popper__arrow-container {
        margin-left: -10px !important;
      }
    }
    &[data-popper-placement='bottom-start'] {
      left: -9px !important;
      .v-popper__arrow-container {
        margin-left: 10px !important;
      }
    }
    &[data-popper-placement='bottom-end'] {
      left: 11px !important;
      .v-popper__arrow-container {
        margin-left: -10px !important;
      }
    }
  }

  .tooltip-icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    display: inline;
  }
</style>
