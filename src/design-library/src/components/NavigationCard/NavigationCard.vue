<template>
  <div
    class="card border border-radius-medium shadow"
    :class="[
      {
        'tw-items-center': alignContent === 'center',
        'tw-items-start': alignContent === 'left',
        'tw-items-end': alignContent === 'right',
      },
      `card-content-${alignContent}`,
    ]"
    :style="{
      ...(position ? { position } : {}),
      width: width ? `${width}px` : '',
      height: `${height}px`,
    }"
    @click="onClick"
  >
    <div
      v-if="closeCb"
      class="modal-button-close"
      @click="closeCb"
    >
      <img
        alt=""
        :src="closeImg"
      />
    </div>
    <div
      class="lock-icon"
      v-if="isLocked"
    >
      <img
        :src="lockTxtDisabled"
        alt="lock"
      />
    </div>
    <slot name="content" />
    <tooltip
      v-if="tooltipLabel"
      :text="tooltipContent"
      class="tooltip"
    >
      <img
        :src="attentionInfo"
        class="tooltip-img"
        alt="info"
      />
      <span
        v-if="tooltipLabel"
        class="tooltip-label"
        >{{ tooltipLabel }}</span
      >
    </tooltip>
    <img
      :src="getImg"
      alt=""
    />
    <div class="tw-flex tw-items-center tw-gap-2">
      <h1
        v-if="text"
        class="header-text container-title txt-primary"
      >
        {{ text }}
      </h1>
      <tags
        class="tags"
        v-if="tagText"
        :type="tagType"
        :text="tagText"
      ></tags>
    </div>
    <template v-if="subText">
      <tooltip
        class="sub-text-tooltip"
        :text="subText"
        :show-tooltip="isOverflow"
        tooltip-type="info"
        position="top-start"
        allow-overflow
      >
        <p
          ref="sub-text"
          v-html="subText"
          class="sub-text txt-primary body-small"
        />
      </tooltip>
    </template>
    <div
      v-if="comingSoon"
      class="card-coming-soon"
    >
      <img
        :src="comingSoonIcon"
        class="img-coming-soon"
        alt="No Data Icon"
      />
    </div>
    <nmg-mai-button
      v-else-if="hasCta"
      :button-id="buttonId"
      class="card-btn"
      @handle-click="onClick"
    >
      {{ buttonText }}
    </nmg-mai-button>
  </div>
</template>

<script>
  import NmgMaiButton from '../Button/Button.vue';
  import Tooltip from '../Tooltip/Tooltip.vue';
  import attentionInfo from '../../assets/icons/info/alert-information-circle.svg';
  import comingSoonIcon from '../../assets/icons/misc/coming-soon-stamp.svg';
  import closeImg from '../../assets/icons/close-icons/newX.svg';
  import Tags from '../Tags/Tags.vue';
  import lockTxtDisabled from '../../assets/icons/info/lock-txt-disabled.svg';

  export default {
    name: 'NavigationCard',
    components: {
      Tags,
      NmgMaiButton,
      Tooltip,
    },
    props: {
      closeCb: {
        type: Function,
        default: null,
      },
      hasCta: {
        type: Boolean,
        default: true,
      },
      text: {
        type: String,
        required: false,
      },
      subText: {
        type: String,
        required: false,
      },
      buttonText: {
        type: String,
        required: false,
      },
      buttonId: {
        type: String,
        required: false,
      },
      tooltipLabel: {
        type: String,
        required: false,
      },
      tooltipContent: {
        type: String,
        required: false,
      },
      img: {
        type: String,
        required: true,
      },
      comingSoon: {
        type: Boolean,
        default: false,
      },
      position: {
        type: String,
        default: null,
      },
      width: {
        type: Number,
        default: 440,
      },
      height: {
        type: Number,
        default: 320,
      },
      alignContent: {
        type: String,
        default: 'center',
      },
      tagText: {
        type: String,
        default: '',
      },
      tagType: {
        type: String,
        default: 'green',
      },
      isLocked: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        attentionInfo,
        comingSoonIcon,
        closeImg,
        lockTxtDisabled,
        isOverflow: false,
      };
    },
    computed: {
      getImg() {
        return require(`../../assets/icons/cardsIcons/${this.img}`);
      },
    },
    updated() {
      this.$nextTick(() => {
        this.checkOverflow();
      });
    },
    methods: {
      checkOverflow() {
        const subtextRef = this.$refs['sub-text'];
        if (subtextRef) {
          const { clientWidth, clientHeight, scrollWidth, scrollHeight } = subtextRef;
          this.isOverflow = scrollHeight > clientHeight || scrollWidth > clientWidth;
          return;
        }
        this.isOverflow = false;
      },
      onClick() {
        this.$emit('cardClicked');
      },
    },
  };
</script>

<style scoped lang="scss">
  .card {
    position: relative;
    background: #ffffff;
    //border: 1.5px solid #000000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: all 350ms cubic-bezier(0.21, 0.67, 0.56, 1);
    //box-shadow: 4px 4px 0 #000000;
    cursor: pointer;
    padding: 32px;
    box-sizing: border-box;
    text-align: center;
    gap: 16px;

    .card-btn {
      opacity: 0;
      margin-bottom: -34px;
      transition: all 350ms cubic-bezier(0.21, 0.67, 0.56, 1) 50ms;
    }

    &:hover {
      .card-btn {
        opacity: 1;
        margin-bottom: 0;
      }
    }

    &.freeze-card {
      .card-btn {
        opacity: 1;
        margin-bottom: 0;
      }
    }
    .card-coming-soon {
      width: 100%;
      height: 100%;
      //background: rgba(255, 255, 255, 0.85);
      position: absolute;
      right: 0;
      top: 0;
      z-index: 1;
      margin: 0 auto;
      text-align: center;
      display: flex;
      align-items: start;
      justify-content: start;
      flex-direction: column;
      border-radius: 8px;

      .img-coming-soon {
        margin: 16px 0 0 16px;
      }
    }
  }

  .sub-text {
    text-align: center;
  }

  .tooltip {
    :deep(.trigger) {
      margin-bottom: 5px;
      display: flex !important;
      align-items: center !important;
    }
    :deep(.tooltip-label) {
      margin-left: 4px;
    }
  }
  .sub-text-tooltip {
    :deep(.trigger) {
      max-width: calc(100% + 2px);
    }
    max-width: 100%;
  }
  .modal-button-close {
    transform: scale(0.75);
    cursor: pointer;
    z-index: 5;
    top: 12px;
    right: 12px;
    position: absolute;
  }

  .card-content-left .sub-text {
    text-align: left;
  }

  .card-content-right .sub-text {
    text-align: right;
  }

  .lock-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 16px;
    height: 16px;
  }
</style>
