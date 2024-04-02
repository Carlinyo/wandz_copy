<template>
  <div
    class="text-box-wrapper"
    :style="{
      width: width ? `${width}px` : '100%',
    }"
  >
    <div class="label-row">
      <div class="first-line-label body-tiny">
        {{ label }}
      </div>
      <div
        v-if="showMainIcon"
        class="first-line-icon"
        :class="{ disabled: disabled }"
        @click="clickMainIcon"
      >
        <img
          :src="mainIcon"
          alt=""
        />
      </div>
    </div>
    <div
      class="text-input-wrapper"
      :data-automation-id="dataAutoId && `${dataAutoId}-text-box-container`"
      :class="{
        focused: isFocused,
        error: error || errorCharacter,
        disabled: disabled,
      }"
    >
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
      <div
        class="input-wrapper"
        @click="focusElement"
      >
        <textarea
          ref="textarea"
          v-model="textInputData"
          class="text-input border-radius-small border"
          :maxlength="maxCharacter"
          rows="3"
          :style="`height: ${height}px;`"
          :class="{
            focused: isFocused,
            disabled: disabled,
            'error border-error': error || errorCharacter,
          }"
          :placeholder="placeholder"
          :disabled="disabled"
          @input="onTextInput"
          @focus="isFocused = true"
          @blur="onBlur"
        ></textarea>
      </div>
      <!--      <div style="width: 100%; height: 100px;" @click="focusElement" />-->
    </div>
    <div
      class="last-line"
      :style="`width: ${width}px;`"
    >
      <span
        v-if="error"
        class="error-message body-tiny"
      >
        {{ errorMessage }}</span
      >
      <span
        v-if="showNumOfChar"
        class="characters body-tiny"
        :class="{ error: errorCharacter }"
      >
        {{ textInputData.length }}/{{ maxCharacter }}
      </span>
    </div>
  </div>
</template>

<script>
  import TextEditing from '../../mixins/TextEditing';
  import moreInfo from '../../assets/icons/info/moreInfo.svg';
  import textFormat from '../../assets/icons/misc/text-format.svg';

  export default {
    name: 'NmgTextBox',
    mixins: [TextEditing],
    props: {
      dataAutoId: {
        type: String,
        default: null,
      },
      withFirstLine: {
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
      errorMessage: {
        type: String,
        default: 'Validation',
      },
      error: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      showMainIcon: {
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
      width: {
        type: Number,
        default: 364,
      },
      maxCharacter: {
        type: Number,
        default: 100,
      },
      height: {
        type: Number,
        default: 124,
      },
      showNumOfChar: {
        type: Boolean,
        default: true,
      },
      textAreaCustomStyle: {
        type: Object,
        required: false,
        default: () => ({}),
      },
      destinationKey: {
        type: String,
        required: true,
      },
      initialValue: {
        type: String,
        default: '',
      },
      endInputWith: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        textInputData: this.value,
        isFocused: false,
        moreInfo,
        textFormat,
      };
    },
    computed: {
      errorCharacter() {
        return this.textInputData.length > this.maxCharacter;
      },
      objectDisplay() {
        return {
          value: this.endInputWith
            ? this.filter(this.removeCharacterAtEnd(this.textInputData))
            : this.filter(this.textInputData),
        };
      },
    },
    emits: ['input', 'main-icon-clicked', 'secondary-icon-clicked', 'inputChangedBlur'],
    methods: {
      init() {
        this.textInputData = this.$props.initialValue;
        this.textInputData = this.endInputWith ? this.addCharacterAtEnd(this.textInputData) : this.textInputData;
      },
      focusElement() {
        this.isFocused = true;
        this.$refs.textarea.focus();
      },
      onTextInput() {
        this.textInputData = this.filter(this.textInputData);
        this.$emit('input', this.objectDisplay.value);
      },
      clickMainIcon() {
        this.$emit('main-icon-clicked');
      },
      clickSecondaryIcon() {
        this.$emit('secondary-icon-clicked');
      },
      removeCharacterAtEnd(text) {
        return text.replace(this.endInputWith, '');
      },
      async onBlur() {
        this.isFocused = false;
        this.$emit('inputChangedBlur', { [this.$props.destinationKey]: this.objectDisplay });
      },
      addCharacterAtEnd(text) {
        if (text === '') return text;
        if (!text.endsWith(this.endInputWith)) return `${text}${this.endInputWith}`;
        return text;
      },
    },
    created() {
      this.init();
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/corners/corners';
  @import '../../styles/colors/background.module';
  @import '../../styles/colors/text.module';
  @import '../../styles/colors/borders';
  @import '../../styles/colors/semantic.module';
  @import '../../styles/colors/text.module.scss';

  .text-box-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .text-input-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;

    textarea {
      //border: 0;
      outline: 0;
      color: $txt-placeholder;
      font-size: 14px;
      font-weight: 400;
      line-height: 17px;
      letter-spacing: 0em;
      text-align: left;
    }
    textarea:focus {
      outline: none !important;
    }
    textarea:focus::placeholder {
      color: transparent;
    }
    ::-webkit-input-placeholder {
      /* WebKit browsers */
      color: $txt-placeholder;
      font-size: 14px;
      font-weight: 400;
      line-height: 17px;
      letter-spacing: 0em;
      text-align: left;
    }
    z-index: 10;
    /*--------------- scrollbar design change below ---------------*/
    /* width */
    ::-webkit-scrollbar {
      width: 10px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
      border-radius: 10px;
      background: $bg-element;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: $bg-shapes;
      border-radius: 100px;
      //min-height: 44px;
    }

    .input-wrapper {
      display: flex;
      z-index: 9;
      .text-input {
        color: $txt-primary;
        background-color: $bg-primary;
        box-sizing: border-box;
        word-wrap: break-word;
        resize: none;
        //padding: 0 2px 0 0;
        padding: 8px 16px;
        width: 100%;
        //height: calc(100% - 32px);
        &.disabled {
          color: $txt-disabled;
          background-color: $bg-disabled;
        }
      }
    }
  }
  .last-line {
    display: flex;

    .error-message {
      color: $semantic-negative;
    }
    .characters {
      color: $txt-secondary;
      margin-left: auto;
      &.error {
        color: $semantic-negative;
      }
    }
  }

  .disabled {
    pointer-events: none;
    color: $txt-disabled;
    .characters {
      color: $txt-disabled;
    }
  }

  .label-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .first-line-label {
      color: $txt-placeholder;
      &.disabled {
        color: $txt-disabled;
      }
    }
    .first-line-icon {
      width: 16px;
      height: 16px;
      img {
        width: 16px;
        height: 16px;
      }
    }
  }
</style>
