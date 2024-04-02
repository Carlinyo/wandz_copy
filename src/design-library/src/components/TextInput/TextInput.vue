<template>
  <div
    class="text-input-container"
    :style="{ width: `${widthStyle}` }"
    :data-automation-id="dataAutoId && `${dataAutoId}-text-input-container`"
    :class="styleType"
  >
    <div
      class="text-input-wrapper"
      :class="{}"
      @click="focusElement"
    >
      <div
        class="top-section-wrapper"
        v-if="label || showSecondaryIcon"
      >
        <div
          v-if="label"
          class="label-wrapper"
          :class="{ focused: isFocused }"
        >
          <div
            class="first-line-label body-tiny"
            :class="{ disabled: disabled, 'view-only-mode': viewOnlyMode }"
          >
            <div v-if="mandatory">
              <span v-text="label" />
              <span
                class="mandatory-char"
                v-text="'*'"
              />
            </div>
            <div
              v-else
              v-text="label"
            />
          </div>
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
          v-if="showSecondaryIcon"
          class="first-line-text-format"
          @click="clickSecondaryIcon"
        >
          <img
            :src="secondaryIcon"
            alt=""
          />
        </div>
      </div>

      <div class="input-wrapper">
        <input
          ref="input"
          v-model="textInputData"
          class="text-input body-small border"
          :maxlength="maximumLength"
          :style="{ height: `${height}px`, ...customInputStyle }"
          :class="{
            focused: isFocused,
            disabled: disabled,
            error: error,
            'view-only-mode': viewOnlyMode,
            valid: validState,
            'has-input-icon': inputIcon || validState || $slots['input-icon'],
          }"
          :placeholder="contentPlaceholder || placeholder"
          :disabled="disabled"
          v-bind="$attrs"
          @input="onTextInput"
          @focus="onFocus"
          @blur="onBlur"
        />
        <div class="input-icon">
          <slot
            class="input-icon"
            name="input-icon"
          >
            <img
              v-if="inputIcon"
              :src="inputIcon"
              alt=""
            />
            <img
              :src="semanticPositive"
              v-if="validState && !error && !inputIcon"
              class="valid-icon"
              alt=""
            />
          </slot>
        </div>
      </div>
    </div>
    <div
      class="bottom-section-wrapper body-tiny"
      v-if="error || showNumOfChar"
    >
      <div
        v-if="error"
        class="error-message"
      >
        {{ errorMessage }}
      </div>
      <span
        v-if="showNumOfChar"
        class="charCounter"
        :class="{ error: textInputData.length > maximumLength }"
      >
        {{ textInputData.length }}/{{ maximumLength }}
      </span>
    </div>
  </div>
</template>

<script>
  import TextEditing from '../../mixins/TextEditing';

  import moreInfo from '../../assets/icons/info/moreInfo.svg';
  import semanticPositive from '../../assets/icons/check-marks/semantic-positive.svg';
  import textFormat from '../../assets/icons/misc/text-format.svg';
  import Tooltip from '../Tooltip';

  export default {
    name: 'NmgTextInput',
    components: {
      Tooltip,
    },
    mixins: [TextEditing],
    model: {
      prop: 'value',
      event: 'input',
    },
    props: {
      styleType: {
        type: String, // 'line-style'
        default: null,
      },
      customInputStyle: {
        type: Object,
        default: () => {},
      },
      dataAutoId: {
        type: String,
        default: null,
      },
      label: {
        type: String,
        default: '',
      },
      autoFocus: {
        type: Boolean,
        default: false,
      },
      placeholder: {
        type: String,
        default: 'Placeholder',
      },
      contentPlaceholder: {
        type: String,
        default: null,
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
      showSecondaryIcon: {
        type: Boolean,
        default: false,
      },
      secondaryIcon: {
        type: String,
        default: textFormat,
      },
      inputIcon: {
        type: String,
        default: '',
      },
      width: {
        type: Number,
        default: 302,
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
      viewOnlyMode: {
        type: Boolean,
        default: false,
      },
      showNumOfChar: {
        type: Boolean,
        default: false,
      },
      mandatory: {
        type: Boolean,
        default: false,
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
      maximumLength() {
        return Number(this.$props.maxLength);
      },
      widthOffset() {
        return this.styleType ? 0 : 54;
      },
      widthStyle() {
        if (this.width) {
          return `${this.width}px`;
        }

        return '100%';
      },
    },
    watch: {
      value(newValue) {
        this.textInputData = this.filter(newValue);
        // this.value = this.textInputData;
      },
      textInputData(newValue) {
        if (this.endInputWith) {
          this.textInputData = this.filter(newValue);
        }
      },
    },
    mounted() {
      if (this.autoFocus) {
        this.$nextTick(() => this.$refs.input.focus());
      }
    },
    methods: {
      onTextInput() {
        this.$emit('input', this.textInputData);
        //TODO REMOVE 'INPUT' custom event duo the double event emits
        this.$emit('text-input', this.textInputData);
      },
      onBlur(event) {
        this.isFocused = false;
        this.$emit('input-blur', this.textInputData, event);
      },
      onFocus() {
        this.isFocused = true;
        this.$emit('input-focus');
      },
      clickSecondaryIcon() {
        this.$emit('secondary-icon-clicked');
      },
      focusElement() {
        this.isFocused = true;
        this.$refs.input.focus();
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
</style>
<style lang="scss" scoped>
  @import '../../styles/typography/body.scss';
  @import '../../styles/colors/background.module.scss';
  @import '../../styles/colors/text.module';
  @import '../../styles/colors/semantic.module.scss';
  @import '../../styles/borders/borders.scss';
  @import '../../styles/corners/corners.scss';

  .text-input-container {
    position: relative;
    width: fit-content;

    .text-input-wrapper {
      display: flex;
      flex-direction: column;
      outline: none;
      gap: 4px;
      z-index: 10;

      &.disabledTotal {
        border: 0;
        border-bottom: 1px solid #ebebeb;
        background-color: transparent;

        .text-input {
          background-color: transparent !important;
        }
      }

      &.view-only-mode {
        border-bottom: none;
        margin-bottom: -16px;
      }

      .first-line-text-format {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        z-index: 10;

        img {
          width: 16px;
          height: 16px;
        }
      }

      .text-input {
        width: 100%;
        box-sizing: border-box;
        padding: 8px 16px;
        border-radius: $border-radius-small;

        color: $txt-primary;
        background-color: $bg-element;
        font-size: 14px;
        line-height: 18px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        height: 40px;

        &.has-input-icon {
          padding-right: 34px;
        }

        &.disabled {
          color: $txt-disabled;
          background-color: $bg-disabled;
        }

        &.view-only-mode {
          color: $txt-primary;
          padding-left: 0;
        }

        &::placeholder {
          color: $txt-placeholder;
          font-size: 14px;
          line-height: 18px;
        }

        &:focus {
          outline: none;
        }

        &:not(.disabled).focused {
          border: $border-focus;
        }

        &.error {
          border: $border-error;
        }
      }

      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px white inset !important;
      }

      .valid-icon {
        font-size: 16px;
        color: $semantic-positive;
      }
    }

    .valid:not(.error) {
      border: 1px $semantic-positive solid;

      &:hover {
        border: 1px $semantic-positive-dark solid;
      }
    }
  }

  .line-style {
    .text-input-wrapper {
      height: auto;
      border-left: 0;
      border-right: 0;
      border-top: 0;

      &.focused,
      &.error {
        border-left: 0;
        border-right: 0;
        border-top: 0;
      }

      .input-wrapper {
        height: auto;
        line-height: 32px;
        padding: 0;

        input:focus {
          outline: none !important;
        }

        input:focus::placeholder {
          color: transparent;
        }

        border-left: 0;
        border-right: 0;
        border-top: 0;

        &.focused {
          border: none;
        }
      }

      .first-line-wrapper.focused {
        display: none;
      }
    }
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    appearance: none;
  }

  .label-wrapper {
    color: $txt-primary;
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1 0 0;
    height: 16px;
  }

  .top-section-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .input-wrapper {
    position: relative;
  }

  .input-icon {
    position: absolute;
    width: 16px;
    height: 16px;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bottom-section-wrapper {
    margin-top: 4px;
    display: flex;
    justify-content: space-between;
    color: $txt-secondary;
    position: absolute;

    .error-message {
      color: $semantic-negative;
      text-wrap: normal;
    }
  }

  .charCounter {
    margin-left: auto;
  }

  .mandatory-char {
    color: $semantic-negative;
  }

  .first-line-icon {
    width: 16px;
    height: 16px;

    img {
      width: 16px;
      height: 16px;
    }
  }
</style>
