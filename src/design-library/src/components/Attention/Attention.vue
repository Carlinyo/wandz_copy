<template>
  <div
    class="attention-wrapper"
    :class="borderRadius"
    :style="wrapperStyle"
  >
    <div
      class="attention-top-wrapper"
      :class="type"
      :style="boxStyleWidth"
    >
      <div
        class="attention-icon-wrapper"
        :class="type"
      >
        <slot name="icon">
          <img
            class="attention-icon"
            :src="getImgSrc"
            alt=""
          />
        </slot>
      </div>
      <img
        v-if="doOnClose"
        class="close-icon"
        :src="closeIcon"
        @click="doOnClose"
        alt=""
      />
      <div
        class="attention-text-wrapper"
        :class="type"
        :style="boxStyleSpanWidth"
      >
        <span
          class="attention-text body-small"
          :class="type"
          v-html="text"
        ></span>
      </div>
    </div>
    <div
      v-if="btnText"
      class="attention-bottom-wrapper"
    >
      <nmg-button
        class="attention-btn"
        small-size
        :class="{ withSubText: btnType === AttentionBtnTypes.WITH_TEXT }"
        :on-click="onClick"
        v-bind="btnProps"
      >
        {{ btnText }}
      </nmg-button>
      <div
        v-if="btnSubText"
        class="sub-text"
      >
        {{ btnSubText }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { PropType } from 'vue';
  import closeIcon from '../../assets/icons/close-icons/smallX.svg';
  import attentionInfo from '../../assets/icons/info/alert-information-circle.svg';
  import alertTriangle from '../../assets/icons/info/alert.svg';
  import { AttentionBtnTypes } from '../../types/enums/Attention';
  import NmgButton from '../Button';
  import { AttentionType } from '../../types/enums/AttentionType';
  import colors from '../../styles/colors/data.module.scss';
  const alertBg = colors.dataRedTomatoLight;
  const infoBg = colors.dataBlueOrchidLight;

  export default {
    name: 'NmgAttention',
    components: { NmgButton },
    props: {
      text: {
        type: String,
        default: 'You can have only one campaign live at a time',
      },
      // optional types: 'line', 'multi-line'
      type: {
        type: String,
        default: 'line',
      },
      width: {
        type: Number,
        default: 364,
      },
      onClick: {
        type: Function,
        required: false,
        default: () => {},
      },
      doOnClose: {
        type: Function,
        required: false,
        default: null,
      },
      btnText: {
        type: String,
        required: false,
        default: '',
      },
      btnType: {
        type: String as PropType<AttentionBtnTypes>,
        default: AttentionBtnTypes.ACTION,
      },
      attentionType: {
        type: String as PropType<AttentionType>,
        default: AttentionType.ALERT_INFO,
      },
      btnSubText: {
        type: String,
        required: false,
        default: '',
      },
    },
    data() {
      return {
        attentionInfo,
        AttentionBtnTypes,
        AttentionType,
        alertTriangle,
        closeIcon,
      };
    },
    computed: {
      borderRadius() {
        if (this.btnText) {
          return 'border-radius-medium';
        }

        return 'border-radius-small';
      },
      boxStyleWidth() {
        return this.type === 'box' ? `width:${this.width}px` : '';
      },
      boxStyleSpanWidth() {
        return this.type === 'box' ? `width:${this.width - 64}px` : '';
      },
      buttonStyle(): string {
        return this.btnType === AttentionBtnTypes.ACTION ? 'secondary' : 'textLink';
      },
      wrapperStyle() {
        const res = {};
        if (this.btnText) {
          res['align-items'] = this.btnType === AttentionBtnTypes.ACTION ? 'center' : 'flex-start';
        }
        res['--background-color'] = this.getBGColor;
        return res;
      },
      btnProps() {
        return this.btnType === AttentionBtnTypes.ACTION
          ? { styleType: 'secondary' }
          : {
              styleType: 'textLink',
              textPadding: 0,
              justifyContent: 'flex-start',
            };
      },
      getBGColor() {
        return this.attentionType === AttentionType.WARNING ? alertBg : infoBg;
      },
      getImgSrc() {
        return this.attentionType === AttentionType.WARNING ? this.alertTriangle : this.attentionInfo;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/colors/text.module';
  .close-icon {
    cursor: pointer;
    margin-top: 12px;
  }
  .attention-wrapper {
    display: inline-flex;
    flex-direction: column;
    background-color: var(--background-color);
    padding: 16px;
    gap: 16px;

    .attention-top-wrapper {
      display: flex;
      gap: 16px;
      &.line {
        height: 48px;
      }
      &.multi-line {
        height: auto;
      }
      .attention-text-wrapper {
        &.multi-line {
          width: calc(100% - 80px);
          padding: 10px 0 10px 0;
        }
        .attention-text {
          color: $txt-primary;
          &.box {
            word-wrap: break-word;
          }
        }
      }
      .attention-icon-wrapper {
        flex-shrink: 0;
        .attention-icon {
          width: 16px;
          height: 16px;
        }
      }
    }

    .attention-bottom-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: baseline;
      justify-content: flex-end;

      .attention-btn {
        &.withSubText {
          padding-right: 4px;
        }

        // make sure we can have the button and the sub-text close to each other
        :deep(.nmg-button) {
          min-width: auto !important;
        }
      }

      .sub-text {
        color: $txt-primary;
      }
    }
  }
</style>
