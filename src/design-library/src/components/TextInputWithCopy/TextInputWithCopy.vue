<template>
  <div
    class="text-input-with-copy"
    :style="`width: ${width}px`"
  >
    <div
      v-if="showFirstLineLabel"
      class="label-row txt-primary body-tiny"
    >
      {{ label }}
      <div
        v-if="tooltip"
        class="first-line-icon"
      >
        <tooltip
          :position="'bottom-start'"
          custom-class-name="nmg-text-input"
          :text="tooltip"
        >
          <img
            :src="mainIcon"
            alt=""
          />
        </tooltip>
      </div>
    </div>
    <div
      class="text-input-container border border-radius-small"
      :class="{
        error: error,
        valid: validState,
        disabled: disabled,
        border,
      }"
    >
      <tooltip
        v-if="clickAnywhere"
        :text="'Copy to clipboard'"
        position="right-end"
      >
        <div
          class="click-overlay"
          @click="copyToClipboard"
        ></div>
      </tooltip>
      <div
        class="text-input-wrapper"
        :style="{ height: `${height}px` }"
        :class="{
          focused: isFocused,
        }"
        @click="focusElement"
      >
        <div
          class="input-wrapper"
          :class="{
            disabled: disabled,
          }"
        >
          <textarea
            ref="input"
            v-model="trimmedText"
            class="text-input body-tiny"
            :maxlength="maximumLength"
            :style="disabled ? '' : `color: ${textColor}`"
            :class="{
              focused: isFocused,
              disabled: disabled,
              breakAnywhere,
            }"
            :placeholder="placeholder"
            :disabled="disabled"
            v-bind="$attrs"
            :rows="rows"
            @input="onTextInput"
            @focus="onFocus"
            @blur="onBlur"
          />
        </div>

        <div
          v-if="copyIcon"
          class="copy-button-section"
        >
          <tooltip :text="'Copy to clipboard'">
            <div class="copy-section-internal-wrapper">
              <img
                :src="copyIcon"
                alt=""
                @click="copyToClipboard"
              />
              <span
                v-if="iconWithText"
                class="icon-text"
                >Copy</span
              >
            </div>
          </tooltip>
          <input
            ref="inputToCopy"
            style="opacity: 0; position: absolute; width: 1px; height: 1px"
            type="text"
            :value="textInputData"
          />
        </div>
      </div>
    </div>
    <span
      v-if="error"
      class="error-message body-tiny"
    >
      {{ errorMessage }}</span
    >
  </div>
</template>

<script>
  import semanticPositive from '../../assets/icons/check-marks/semantic-positive.svg';
  import moreInfo from '../../assets/icons/info/moreInfo.svg';
  import textFormat from '../../assets/icons/misc/text-format.svg';
  import Tooltip from '../Tooltip';
  import { buildNotificationJson } from '../../utils/notification/notificationWrapper';
  import CopyIconSrc from '@/design-library/src/assets/icons/actions/copy-to-clip.svg';

  export default {
    name: 'NmgTextInput',
    components: {
      Tooltip,
    },
    model: {
      prop: 'value',
      event: 'input',
    },
    props: {
      label: {
        type: String,
        default: '',
      },
      showFirstLineLabel: {
        type: Boolean,
        default: true,
      },
      shadow: {
        type: Boolean,
        default: true,
      },
      placeholder: {
        type: String,
        default: 'Placeholder',
      },
      value: {
        type: String,
        default: '',
      },
      tooltip: {
        type: String,
        default: '',
      },
      errorMessage: {
        type: String,
        default: 'Validation',
      },
      error: {
        type: Boolean,
        default: false,
      },
      validState: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      mainIcon: {
        type: String,
        default: moreInfo,
      },
      copyIcon: {
        type: String,
        default: CopyIconSrc,
      },
      width: {
        type: Number,
        default: 328,
      },
      height: {
        type: Number,
        default: 40,
      },
      maxLength: {
        type: [String, Number],
        required: false,
        default: Number.MAX_SAFE_INTEGER,
      },
      useEllipsis: {
        type: Boolean,
        default: true,
      },
      rows: {
        type: Number,
        default: 1,
      },
      breakAnywhere: {
        type: Boolean,
        default: false,
      },
      iconWithText: {
        type: Boolean,
        default: false,
      },
      border: {
        type: Boolean,
        default: true,
      },
      clickAnywhere: {
        type: Boolean,
        default: false,
      },
      textColor: {
        type: String,
        default: '#000000',
      },
    },
    data() {
      return {
        textInputData: this.value,
        isFocused: false,
        moreInfo,
        textFormat,
        semanticPositive,
      };
    },
    computed: {
      showFirstLine() {
        return (this.isFocused || this.textInputData) && this.showFirstLineLabel;
      },
      maximumLength() {
        return Number(this.$props.maxLength);
      },
      trimmedText() {
        return this.textInputData.length > 42 && this.useEllipsis
          ? `${this.textInputData.substr(0, 41)}...`
          : this.textInputData;
      },
    },
    watch: {
      value(newValue) {
        this.textInputData = newValue;
      },
    },
    methods: {
      onTextInput() {
        this.$emit('input', this.textInputData);
      },
      onBlur() {
        this.isFocused = false;
        this.$emit('input-blur', this.textInputData);
      },
      onFocus() {
        if (!this.disabled) {
          this.isFocused = true;
        }
        this.$emit('input-focus');
      },
      copyToClipboard() {
        const element = this.$refs.inputToCopy;
        element.select();
        document.execCommand('copy');
        if (window.getSelection) {
          window.getSelection().removeAllRanges();
        } else if (document.selection) {
          document.selection.empty();
        }
        element.blur();

        this.$chpNotifications.notify(buildNotificationJson('general', 'Copied to clipboard!', 3000));

        this.$emit('text-copied');
      },
      focusElement() {
        if (!this.disabled) {
          this.isFocused = true;
          this.$refs.input.focus();
        }
      },
    },
  };
</script>
<style lang="scss">
  .custom-tooltip[x-placement^='bottom-start'] {
    &.nmg-text-input {
      margin-top: 11px;
      margin-left: 6.5px;
    }
  }

  .text-input-container {
    .trigger {
      width: 100%;
    }
  }
</style>
<style lang="scss" scoped>
  @import '../../styles/colors/background.module';
  @import '../../styles/colors/borders';
  @import '../../styles/colors/semantic.module';
  @import '../../styles/colors/text.module';

  .text-input-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    background: $bg-element;

    &.disabled {
      color: $txt-disabled;
      background-color: $bg-disabled;
    }

    &:focus-within {
      border: 1px solid $border-focus-color;
    }

    .click-overlay {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 20;
      cursor: pointer;
    }

    .text-input-wrapper {
      display: flex;
      gap: 8px;
      flex-direction: row;
      align-items: center;
      border-radius: 4px;
      min-height: 20px;
      outline: none;
      padding: 8px 16px;

      input {
        border: 0;
        outline: 0;
      }

      input:focus::placeholder {
        color: transparent;
      }

      z-index: 10;

      &.disabled {
        pointer-events: none;
        background-color: $bg-secondary !important;
      }

      .copy-button-section {
        cursor: pointer;
        z-index: 10;

        .copy-section-internal-wrapper {
          display: flex;

          img {
            pointer-events: auto !important;
            width: 16px;
            height: 16px;
          }

          .icon-text {
            margin-left: 10px;
          }
        }
      }

      .first-line-wrapper {
        z-index: 9;
        height: 32px;
        align-items: center;
        display: flex;

        &.disabled {
          color: $txt-disabled;
          background-color: $bg-secondary !important;
        }

        .first-line-label {
          padding: 8px 0 0 16px;
          color: $txt-placeholder;
          font-size: 12px;
          line-height: 16px;

          &.disabled {
            color: $txt-disabled !important;
          }
        }

        .first-line-icon {
          padding-top: 8px;
          padding-left: 4px;
          width: 16px;
          height: 16px;

          img {
            width: 16px;
            height: 16px;
          }
        }

        .first-line-text-format {
          padding-right: 8px;
          margin-left: auto;
          margin-top: -2px;
          width: 16px;
          height: 16px;

          img {
            width: 16px;
            height: 16px;
          }
        }
      }

      .input-wrapper {
        z-index: 9;
        flex: 1;

        .text-input {
          width: 100%;
          display: flex;
          color: $txt-primary;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          border: 0;
          resize: none;

          &:focus {
            outline: none;
          }

          &.breakAnywhere {
            line-break: anywhere;
          }

          &.disabled {
            color: $txt-disabled;
          }
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px white inset !important;
        }
      }

      .valid-icon {
        padding: 0 10px;
        font-size: 20px;
        position: absolute;
        transform: translate(100%, 100%);
        top: 0;
        right: 0;
        color: $semantic-positive;
      }
    }
  }

  .error {
    border-radius: 4px;
    border: 1px solid $border-error-color;
  }

  .valid:not(.error) {
    border-radius: 4px;
    border: 1px $semantic-positive solid;
  }

  .error-message {
    color: $semantic-negative;
  }

  .text-input-with-copy {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .label-row {
    display: flex;
  }

  :deep(.trigger) {
    display: flex !important;
  }
</style>
