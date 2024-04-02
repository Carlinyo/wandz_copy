<template>
  <button
    :id="buttonId"
    ref="container"
    class="nmg-button body-small-bold"
    :class="[
      className,
      {
        'disabled-style': shouldDisable,
        small: smallSize,
        'customer-hover': hoverColor,
        loading: isLoading,
      },
    ]"
    :style="{
      ...buttonStyle,
      ...customButtonStyle,
    }"
    :disabled="shouldDisable"
    v-bind="$attrs"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    @mousedown="addRipple"
    @mouseup="purgeRipples"
    @click="onButtonClick"
  >
    <div
      class="button-slot-wrapper"
      :class="{ loading: isLoading }"
    >
      <slot name="iconLeft">
        <img
          v-if="icons.left"
          :src="icons.left"
          :style="iconsStyles.left"
          class="icon-next-to-text left"
        />
      </slot>
      <div
        v-if="showButtonIcon"
        class="button-slot-image"
        :class="{ 'reverse-image': reverseImage }"
      >
        <img
          class="button-image"
          :src="buttonIcon"
          alt=""
        />
      </div>
      <slot />
      <slot name="iconRight">
        <img
          v-if="icons.right"
          :src="icons.right"
          :style="iconsStyles.right"
          class="icon-next-to-text right"
        />
      </slot>
    </div>
    <transition-group
      class="ripples"
      name="grow"
      tag="div"
    >
      <div
        v-for="ripple in ripples"
        :key="ripple.id"
        class="ripple"
        :style="{
          top: ripple.top,
          left: ripple.left,
          width: ripple.width,
          height: ripple.height,
        }"
      ></div>
    </transition-group>
  </button>
</template>

<script setup lang="ts">
  interface Ripples {
    width: string;
    height: string;
    left: string;
    top: string;
    id: number;
  }

  import { computed, ref } from 'vue';
  import defaultButtonIcon from '../../assets/icons/arrows/back-left.svg';

  import { PropType } from 'vue';

  defineOptions({ name: 'Button' });

  const props = defineProps({
    onClick: {
      type: Function,
      required: false,
      default: () => ({}),
    },
    /**
     * optional disable
     */
    disabled: {
      type: Boolean,
      required: false,
    },
    /**
     * optional field
     * (
     * primary,
     * secondary,
     * textLink,
     * textLinkWhite
     * )
     */
    styleType: {
      type: String,
      required: false,
      default: 'primary',
    },
    buttonId: {
      type: String,
      required: false,
      default: '',
    },
    buttonImage: {
      type: String,
      required: false,
      default: defaultButtonIcon,
    },
    buttonImageHovered: {
      type: String,
      required: false,
      default: defaultButtonIcon,
    },
    justifyContent: {
      type: String,
      required: false,
      default: 'center',
    },
    smallSize: {
      type: Boolean,
      required: false,
      default: false,
    },
    customButtonStyle: {
      type: Object,
      default: () => ({}),
    },
    textPadding: {
      type: [Number, String],
      required: false,
      default: 24,
    },
    customWidth: {
      type: Number,
      required: false,
      default: 0,
    },
    customHeight: {
      type: Number,
      required: false,
      default: 0,
    },
    hoverColor: {
      type: String,
      default: '',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    reverseImage: {
      type: Boolean,
      default: false,
    },
    icons: {
      type: Object as PropType<Record<string /** location (right/left) */, string /** source*/>>,
      default: () => ({}),
    },
    iconsStyles: {
      type: Object as PropType<Record<string /** location */, object /** style json*/>>,
      default: () => ({
        right: {},
        left: {},
      }),
    },
    backIcon: {
      type: Boolean,
      default: false,
    },
  });

  const container = ref<HTMLButtonElement | null>(null);

  const emit = defineEmits(['handleClick']);

  const isHovered = ref(false);
  const ripples = ref<Ripples[]>([]);

  const className = computed(() => {
    return { [props.styleType]: true };
  });

  const showButtonIcon = computed(() => {
    return ['buttonImageLarge', 'buttonImageSmall'].includes(props.styleType) || props.backIcon;
  });

  const buttonIcon = computed(() => {
    return isHovered.value ? props.buttonImageHovered : props.buttonImage;
  });

  const buttonStyle = computed(() => {
    return {
      ...(props.customHeight ? { height: `${props.customHeight}px` } : {}),
      ...(props.textPadding
        ? {
            paddingRight: `${props.textPadding}px`,
            paddingLeft: `${props.textPadding}px`,
          }
        : {}),
      '--hoverColor': props.hoverColor,
      '--inner-loader-color': props.styleType === 'secondary' || props.styleType === 'textLink' ? '#9FA0A8' : 'white',
      width: props.customWidth ? `${props.customWidth}px` : 'fit-content !important',
    };
  });

  const shouldDisable = computed(() => {
    return props.disabled || props.isLoading;
  });

  const rippleWidth = computed(() => {
    const width: number = container.value ? container.value.offsetWidth : 0;
    const height: number = container.value ? container.value.offsetHeight : 0;
    return width > height ? width : height;
  });

  const onButtonClick = (event: Event) => {
    event.stopPropagation(); // Stop the click event from propagating
    emit('handleClick');
    props.onClick(event);
  };

  const addRipple = (e) => {
    const halfRippleWidth = rippleWidth.value / 2;
    const { left, top } = container.value ? container.value.getBoundingClientRect() : { top: 0, left: 0 };
    const rippleId = Date.now();
    ripples.value.push({
      width: `${rippleWidth.value}px`,
      height: `${rippleWidth.value}px`,
      left: `${e.clientX - left - halfRippleWidth}px`,
      top: `${e.clientY - top - halfRippleWidth}px`,
      id: rippleId,
    });
  };

  const purgeRipples = () => {
    ripples.value = [];
  };
</script>

<style scoped lang="scss">
  @import '../../styles/colors/background.module.scss';
  @import '../../styles/colors/buttons.scss';
  @import '../../styles/colors/text.module';
  @import '../../styles/colors/borders.scss';
  @import '../../styles/corners/corners.scss';
  @import '../../styles/borders/borders.scss';
  @import '../../styles/colors/semantic.module.scss';

  .nmg-button {
    cursor: pointer;
    height: 40px;
    border: none;
    box-sizing: border-box;
    border-radius: 100px;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    position: relative;
    overflow: hidden;

    &.loading {
      position: relative;
    }
    &.loading:before {
      content: '';
      box-sizing: border-box;
      position: absolute;
      top: calc(50% - 12px);
      left: calc(50% - 12px);
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: var(--inner-loader-color);
      border-bottom-color: var(--inner-loader-color);
      animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) 0s infinite normal none running;
    }
    &.primary {
      background-color: $btn-primary;
      color: $txt-inverted;
      &:not(.disabled-style):hover {
        color: $txt-inverted;
        background-color: $btn-primary-hover;
      }
      &.disabled-style {
        background-color: $btn-disabled;
        color: $txt-disabled;
        box-shadow: none;
        cursor: not-allowed;
      }
      .ripple {
        background: rgba(255, 255, 255, 0.3);
      }
    }
    &.secondary {
      background-color: $btn-secondary;
      color: $txt-primary;
      box-shadow: 0 0 0 1px $btn-secondary-border;
      &:not(.disabled-style):hover {
        background-color: $btn-secondary-hover;
        box-shadow: 0 0 0 1px $btn-secondary-border;
        color: $txt-primary;
      }
      &.disabled-style {
        background-color: $bg-disabled;
        color: $txt-disabled;
        box-shadow: 0 0 0 1px $border-hover;
        cursor: not-allowed;
      }
      .ripple {
        background: rgba(255, 255, 255, 0.3);
      }
    }
    &.textLink {
      height: 20px;
      background-color: inherit;
      border: none;
      border-radius: 0;
      color: $txt-link;
      &:not(.disabled-style):hover {
        background-color: inherit;
        color: $txt-link-hover;
      }
      &.disabled-style {
        color: $txt-disabled;
        border: none;
        cursor: not-allowed;
      }
      .ripple {
        background: rgba(255, 255, 255, 0.3);
      }
      &.loading:before {
        width: 20px;
        height: 20px;
        top: calc(50% - 10px);
        left: calc(50% - 10px);
        border-top-color: $txt-link;
        border-bottom-color: $txt-link;
      }
    }
    &.textLinkWhite {
      height: 40px;
      background-color: inherit;
      border: none;
      border-radius: 0;
      color: white;
      &:not(.disabled-style):hover {
        background-color: inherit;
        color: #f3f5f8;
      }
      &.disabled-style {
        color: $txt-disabled;
        border: none;
        cursor: not-allowed;
      }
      .ripple {
        background: rgba(255, 255, 255, 0.3);
      }
      &.loading:before {
        width: 20px;
        height: 20px;
        top: calc(50% - 10px);
        left: calc(50% - 10px);
      }
    }
    &.danger {
      background-color: $btn-danger;
      color: $txt-inverted;
      &:not(.disabled-style):hover {
        color: $txt-inverted;
        background-color: $btn-danger-hover;
      }
      &.disabled-style {
        background-color: $btn-disabled;
        color: $txt-disabled;
        box-shadow: none;
        cursor: not-allowed;
      }
      &.loading {
        background-color: $btn-danger;
      }
      .ripple {
        background: rgba(255, 255, 255, 0.3);
      }
    }
    &.textLinkDanger {
      height: 20px;
      background-color: inherit;
      border: none;
      border-radius: 0;
      color: $semantic-negative;
      &:not(.disabled-style):hover {
        background-color: inherit;
        color: $semantic-negative-hover;
      }
      &.disabled-style {
        color: $txt-disabled;
        border: none;
        cursor: not-allowed;
      }
      .ripple {
        background: rgba(255, 255, 255, 0.3);
      }
      &.loading:before {
        width: 20px;
        height: 20px;
        top: calc(50% - 10px);
        left: calc(50% - 10px);
        border-top-color: $btn-danger;
        border-bottom-color: $btn-danger;
      }
    }
    &.small {
      height: 30px;
    }
    .button-slot-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;

      &.loading {
        opacity: 0;
      }

      .button-slot-image {
        .button-image {
          height: 16px;
          width: 16px;
        }
      }

      &.reverse-image {
        flex-direction: row-reverse;
      }

      .button-slot-text {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .ripple-outer {
    position: relative;
    z-index: 1;
    overflow: hidden;
    cursor: pointer;
  }
  .ripples {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }
  .ripple {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
  }
  .grow-enter-active,
  .grow-enter-to-active {
    transition: all 1500ms ease-out;
  }
  .grow-leave-active,
  .grow-leave-to-active {
    transition: all 700ms ease-out;
  }

  .grow-enter {
    transform: scale(0);
    opacity: 1;
  }

  .grow-enter-to {
    transform: scale(4);
    opacity: 1;
  }

  .grow-leave {
    transform: scale(4);
    opacity: 1;
  }
  .grow-leave-to {
    transform: scale(4);
    opacity: 0;
  }
</style>
