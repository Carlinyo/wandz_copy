<template>
  <div
    v-if="!hideByTimer"
    class="snackbar-wrapper border-radius-small shadow-bold"
    :class="[type, onlyText]"
  >
    <div
      v-if="showIcon"
      class="snackbar-icon-wrapper"
    >
      <img
        v-if="type === 'positive'"
        :src="alertPositive"
        alt=""
      />
      <img
        v-if="type === 'info'"
        :src="alertInfo"
        alt=""
      />
      <img
        v-if="type === 'negative'"
        :src="alertNegative"
        alt=""
      />
    </div>
    <div
      class="snackbar-text-wrapper"
      :class="onlyText"
    >
      <span class="snackbar-text body-small">{{ text }}</span>
    </div>
    <div
      v-if="showButtonOne || showButtonTwo"
      class="snackbar-button-wrapper"
      :class="{ 'button-padding': buttonPadding }"
    >
      <nmg-button
        v-if="showButtonOne"
        class="button-one"
        :small-size="true"
        :style-type="buttonOneType"
        :text-padding="buttonOneTextPadding"
        @click="onClick('Button1')"
      >
        {{ buttonOneText }}
      </nmg-button>
      <nmg-button
        v-if="showButtonTwo"
        class="button-two"
        :small-size="true"
        :style-type="buttonTwoType"
        :text-padding="buttonTwoTextPadding"
        @click="onClick('Button2')"
      >
        {{ buttonTwoText }}
      </nmg-button>
    </div>
    <div
      v-if="showXIcon"
      class="snackbar-x-icon-wrapper border-radius-tiny"
      :class="type"
      @click="onClick('ButtonX')"
    >
      <img
        :src="whiteX"
        alt=""
      />
    </div>
  </div>
</template>

<script>
  import alertPositive from '../../assets/icons/check-marks/positive.svg';
  import alertNegative from '../../assets/icons/info/alert.svg';
  import alertInfo from '../../assets/icons/info/info.svg';
  import whiteX from '../../assets/icons/close-icons/x-small.svg';
  import nmgButton from '../Button';

  export default {
    name: 'NmgSnackbar',
    components: {
      nmgButton,
    },
    props: {
      text: {
        type: String,
        default: 'You can have only one campaign live at a time',
      },
      type: {
        type: String,
        default: 'positive' /** or negative / info */,
      },
      showIcon: {
        type: Boolean,
        default: true,
      },
      showXIcon: {
        type: Boolean,
        default: true,
      },
      buttonOneType: {
        type: String,
        default: 'primary',
      },
      buttonTwoType: {
        type: String,
        default: 'secondary',
      },
      buttonOneText: {
        type: String,
        default: 'Button 1',
      },
      buttonTwoText: {
        type: String,
        default: 'Button 2',
      },
      buttonOneTextPadding: {
        type: String,
        default: '24',
      },
      buttonTwoTextPadding: {
        type: String,
        default: '24',
      },
      showButtonOne: {
        type: Boolean,
        default: false,
      },
      showButtonTwo: {
        type: Boolean,
        default: false,
      },
      timerToDisappear: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        alertPositive,
        alertNegative,
        alertInfo,
        whiteX,
        hideByTimer: false,
      };
    },
    computed: {
      onlyText() {
        return !this.showIcon && !this.showButtonOne && !this.showButtonTwo && !this.showXIcon ? 'only-text' : '';
      },
      buttonPadding() {
        return this.showButtonOne && this.showButtonTwo ? 'two-button' : '';
      },
    },
    mounted() {
      if (this.timerToDisappear) {
        setTimeout(() => {
          this.hideByTimer = true;
          this.$emit('hide-by-timer');
        }, this.timerToDisappear * 1000);
      }
    },
    methods: {
      onClick(event) {
        console.log(event);
        this.$emit(`snackbarClick${event}`);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/colors/semantic.module';

  .snackbar-wrapper {
    height: 40px;
    padding-left: 24px;
    padding-right: 24px;
    align-items: center;
    display: inline-flex;
    flex-wrap: wrap;
    cursor: auto;
    gap: 16px;
    z-index: 1000;
    position: fixed;
    bottom: 32px;
    right: 48px;
    &.only-text {
      min-width: 276px;
      justify-content: center;
    }
    &.positive {
      background-color: $semantic-positive;
    }
    &.negative {
      background-color: $semantic-negative;
    }
    &.info {
      background-color: $semantic-info;
    }

    .snackbar-text-wrapper {
      align-items: center;
      .snackbar-text {
        color: #fff;
      }
    }
    .snackbar-icon-wrapper {
      cursor: pointer;
      img {
        height: 16px;
        width: 16px;
      }
    }
    .snackbar-button-wrapper {
      display: flex;
      &.button-padding {
        gap: 16px;
      }
    }

    .snackbar-x-icon-wrapper {
      cursor: pointer;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;

      &.positive:hover {
        background-color: $semantic-positive-dark;
      }
      &.negative:hover {
        background-color: $semantic-negative-hover;
      }
      &.info:hover {
        background-color: $semantic-info-dark;
      }

      img {
        width: 8px;
        height: 8px;
        cursor: pointer;
      }
    }
  }
</style>
