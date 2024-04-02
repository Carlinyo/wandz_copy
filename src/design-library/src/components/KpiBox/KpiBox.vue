<template>
  <div
    class="nmg-kpi-box border-radius-medium"
    :class="{
      scrollable: wrapWithScroller,
      clickable,
      shadow,
    }"
    :style="containerStyle"
    v-bind="$attrs"
    @click="$emit('boxClick', $event)"
  >
    <div
      v-if="diagonalStripe.text"
      class="banner-container"
    >
      <div
        class="banner"
        :style="{
          backgroundColor: diagonalStripe.stripeColor,
          color: diagonalStripe.textColor,
        }"
      >
        {{ diagonalStripe.text }}
      </div>
    </div>
    <div
      class="locked"
      v-if="locked"
    >
      <img
        :src="icons.lock"
        alt=""
      />
    </div>
    <div class="top-content tw-flex tw-flex-col">
      <div
        class="top-image"
        v-if="topIconSrc && topIconSrc.length"
      >
        <img
          :src="topIconSrc"
          class="icon"
          width="40"
          height="40"
        />
      </div>

      <div
        v-if="title"
        class="title regular-title"
        :style="titleStyle"
      >
        <span
          class="txt-secondary small-label-title"
          :style="titleStyle"
          >{{ title }}</span
        >
        <span
          v-if="titleInfo"
          class="title-tooltip-container"
        >
          <Tooltip
            :position="tooltipPosition"
            :text="titleInfo"
          >
            <img :src="icons.info" />
          </Tooltip>
        </span>
      </div>

      <!-- Content slot -->
      <div class="nmg-kpi-box-content">
        <slot />
      </div>

      <div
        v-if="fatStripe || stripe"
        class="stripe"
        :class="{ fat: fatStripe }"
        :style="{ backgroundColor: stripeColor }"
      />
    </div>
    <div
      class="bottom-row"
      :class="bottomRowClass"
    >
      <slot name="cta">
        <Button
          v-if="ctaText"
          style-type="textLink"
          text-padding="0"
          @handle-click="$emit('ctaClick', $event)"
        >
          <template #iconLeft>
            <slot name="icon">
              <img
                v-if="ctaButtonIcon"
                :src="ctaButtonIcon"
                :style="iconStyle"
                class="icon"
              />
            </slot>
          </template>
          {{ ctaText }}
          <template #iconRight
            ><span v-if="ctaArrow"><CtaArrow /></span
          ></template>
        </Button>
      </slot>
      <div class="icon-container">
        <slot name="icon">
          <img
            v-if="iconSrc"
            :src="iconSrc"
            :style="iconStyle"
            class="icon"
          />
        </slot>
      </div>
    </div>
    <SkeletonLoader v-if="loading" />
  </div>
</template>

<script lang="ts">
  interface Props {
    tooltipPosition?: string;
    loading?: boolean;
    title?: string;
    titleInfo?: string;
    iconSrc?: string;
    bottomRowClass?: string;
    ctaButtonIcon?: string;
    iconStyle?: StyleValue;
    topIconSrc?: string;
    ctaText?: string;
    ctaBoxId?: string;
    stripeColor?: string;
    diagonalStripe?: IDiagonalStripe;
    stripe?: boolean;
    fatStripe?: boolean;
    ctaArrow?: boolean;
    clickable?: boolean;
    shadow?: boolean;
    textButton?: boolean;
    locked?: boolean;
    wrapWithScroller?: boolean;
    containerStyle?: StyleValue;
    titleStyle?: StyleValue;
  }
</script>

<script setup lang="ts">
  import { computed } from 'vue';
  import type { StyleValue } from 'vue';
  import LockIcon from '../../assets/icons/info/lock_grey.svg';
  import InfoIcon from '../../assets/icons/info/moreInfo.svg';
  import Tooltip from '../Tooltip/Tooltip.vue';
  import Button from '../Button/Button.vue';
  import { IDiagonalStripe } from '../../types/interfaces/diagonalStripe';
  import CtaArrow from './components/CtaArrow.vue';
  import SkeletonLoader from '../SkeletonLoader/SkeletonLoader.vue';

  import Colors from '../../styles/colors/semantic.module.scss';

  defineOptions({
    name: 'NmgKpiBox',
  });

  withDefaults(defineProps<Props>(), {
    tooltipPosition: 'bottom-center',
    loading: false,
    title: '',
    titleInfo: '',
    iconSrc: '',
    bottomRowClass: 'tw-justify-between',
    ctaButtonIcon: '',
    iconStyle: () => ({}),
    topIconSrc: '',
    ctaText: '',
    ctaBoxId: '',

    stripeColor: Colors.semanticPositive,
    diagonalStripe: () => ({
      text: '',
      textColor: '#000000',
      stripeColor: Colors.semanticPrimaryBrand,
    }),
    stripe: false,
    fatStripe: false,
    ctaArrow: false,
    clickable: false,
    shadow: true,
    textButton: true,
    locked: false,
    wrapWithScroller: false,
    titleStyle: () => ({}),
    containerStyle: () => ({}),
  });

  const icons = computed(() => {
    return {
      info: InfoIcon,
      lock: LockIcon,
    };
  });
</script>

<style lang="scss">
  .noShadow {
    .nmg-kpi-box {
      box-shadow: none !important;
    }
  }
</style>
<style lang="scss" scoped>
  @import '../../styles/colors/background.module.scss';
  @import '../../styles/colors/buttons.scss';
  @import '../../styles/borders/borders.scss';
  @import '../../styles/corners/corners.scss';
  @import '../../styles/typography/titles.scss';

  $stripe-height: 4px;
  $fat-stripe-height: 6px;
  .nmg-kpi-box {
    background-color: $bg-element;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: background-color 0.3s;
    font-family: Figtree;
    cursor: default;
    border: $border;

    &.scrollable {
      padding-right: unset;
      overflow: auto;
    }

    &.clickable {
      cursor: pointer;
    }

    .title {
      word-break: break-word;
      font-size: 14px;
      margin-bottom: 8px;

      &-tooltip-container {
        display: inline-block;
        height: 16px;
        vertical-align: middle;
        padding: 0 0 0 4px;
        transform: translateY(-1px);
      }
    }

    .main-values {
      display: flex;
      align-items: center;
      gap: 8px;

      .main-value {
        font-size: 32px;
      }

      .main-value-details {
        font-size: 14px;
      }
    }

    .stripe {
      height: $stripe-height;
      position: absolute;
      bottom: 0;
      left: -1px;
      right: 0;
      margin: auto;

      &.fat {
        height: $fat-stripe-height;
      }
    }

    .bottom-row {
      position: relative;
      display: flex;
      align-items: end;
    }

    .icon-container {
      bottom: 0;
      right: 0;
      display: flex;
    }

    .icon-before-text-container {
      display: flex;
      margin-right: 8px;
    }

    .cta {
      position: relative;

      color: #000000;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;

      .arrow {
        transform: rotate(180deg);
      }
    }

    .locked {
      position: absolute;
      top: 24px;
      right: 27px;

      img {
        height: 32px;
        width: 25px;
        left: 3px;
        border-radius: 0px;
      }
    }

    .banner-container {
      width: 250px;
      height: 120px;
      overflow: hidden;
      position: absolute;
      top: 0%;
      left: 45%;
    }

    .banner {
      background-color: #000000;
      color: $btn-primary;

      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 241px;
      height: 26px;
      left: -18px;
      top: 30px;
      transform: rotate(30deg);
      font-size: 12px;
    }
  }

  ::-webkit-scrollbar {
    width: 16px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: $bg-shapes;
    background-clip: content-box;
    border: 4px solid transparent;
  }

  ::-webkit-scrollbar-track {
    background: $bg-primary;
  }
</style>
