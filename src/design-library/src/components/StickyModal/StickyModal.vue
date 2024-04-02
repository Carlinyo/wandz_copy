<template>
  <div
    v-if="modalOpen"
    class="sticky-modal"
  >
    <div class="background" />
    <div class="wrapper">
      <div
        class="modal shadow-bold"
        :style="modalComputedSize"
        :class="[customModalClass, 'align-left']"
      >
        <slot name="modal-overlay" />
        <div
          v-if="closeable"
          :id="`${modalContext}_modal_close`"
          class="modal-button-close"
          @click="closeModal"
        >
          <img
            alt=""
            :src="closeImg"
          />
        </div>

        <div
          v-if="showHeader"
          id="modal-header"
        >
          <div
            v-if="title"
            class="modal-title txt-primary secondary-title"
            v-html="title"
          />
          <div
            v-if="subtitle"
            class="modal-subtitle body-medium txt-secondary"
            v-html="subtitle"
          />
          <slot name="header" />
          <div
            ref="shrinkingAreaRef"
            class="shrink-while-scrolling"
          >
            <slot name="shrinkableHeader" />
          </div>
        </div>

        <div
          class="content"
          :style="{ height: contentHeight, backgroundColor: contentBgColor }"
        >
          <div
            ref="modalContentWrapperRef"
            class="modal-content-wrapper"
            :style="{ backgroundColor: contentBgColor }"
            :class="{ 'wrapper-with-right-section': $slots['right-section'] }"
            @scroll="scrollEvent"
          >
            <div
              ref="modalContentRef"
              class="modal-content"
              :style="modalContentStylesOverride"
            >
              <slot name="content" />
            </div>
          </div>
          <div
            v-if="$slots['right-section']"
            class="right-section"
          >
            <slot name="right-section" />
          </div>
        </div>

        <div
          v-if="showFooter"
          id="modal-footer"
          :style="{ ...footerStylesOverride }"
        >
          <div class="footer-slot">
            <slot name="footer" />
          </div>
          <div
            class="bottom-block"
            :style="bottomBlockStyle"
          >
            <slot name="notice-banner" />
            <div class="modal-footer-buttons">
              <nmg-mai-button
                v-if="secondaryButtonText"
                :style-type="secondaryButtonStyleType"
                class="secondary-button"
                v-bind="secondaryButtonProps"
                @handle-click="() => $emit('secondary-button-clicked')"
              >
                {{ secondaryButtonText }}
              </nmg-mai-button>
              <nmg-tooltip :title="buttonTooltip">
                <nmg-mai-button
                  v-if="primaryButtonText"
                  :style-type="primaryButtonStyleType"
                  :disabled="disableButton"
                  class="primary-button"
                  v-bind="primaryButtonProps"
                  @handle-click="handlePrimaryClick"
                >
                  {{ primaryButtonText }}
                </nmg-mai-button>
              </nmg-tooltip>
            </div>
          </div>
        </div>
        <!-- <overlay-prompt
          v-if="shouldShowConfirmation"
          :title="overlayText"
          :description="overlayDescription"
          :primary-button-text="overlayPrimaryButtonText"
          :secondary-button-text="overlaySecondaryButtonText"
          @primaryButtonClick="closeConfirmation"
          @secondaryButtonClick="onKeepEditClick"
        /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
  import { directive as vOnClickAway } from 'vue3-click-away';
  import { MODAL_SIZES, SIDE_MENU_TOGGLE_ID } from '../../const';
  import NmgTooltip from '../Tooltip/Tooltip.vue';
  // import OverlayPrompt from '../OverlayPrompt/OverlayPrompt.vue';

  import closeImg from '../../assets/icons/close-icons/newX.svg';
  import NmgMaiButton from '../Button/Button.vue';
  import BGColors from '../../styles/colors/background.module.scss';

  defineOptions({
    name: 'StickyModal',
  });

  const props = defineProps({
    contentBgColor: {
      type: String,
      default: BGColors.BackgroundPrimary,
    },
    modalOpen: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
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
    showConfirmOverlay: {
      type: Boolean,
      default: false,
    },
    triggerOverlay: {
      type: Boolean,
      default: false,
    },
    closeOnClickAway: {
      type: Boolean,
      default: true,
    },
    closeable: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    customModalClass: {
      type: [String, Array],
      default: '',
    },
    modalSize: {
      type: String,
      default: 'regular',
      validator: (value) => Object.keys(MODAL_SIZES).indexOf(value) !== -1,
    },
    dynamicSize: {
      type: Boolean,
      default: false,
    },
    overlayText: {
      type: String,
      default: 'Your work won’t be saved. Are you sure you want to exit?',
    },
    overlayPrimaryButtonText: {
      type: String,
      default: 'Yes, leave',
    },
    overlaySecondaryButtonText: {
      type: String,
      default: 'No, keep editing',
    },
    overlayDescription: {
      type: String,
      default: '',
    },
    secondaryButtonStyleType: {
      type: String,
      default: 'secondary',
    },
    secondaryButtonProps: {
      type: Object,
      default: () => ({}),
    },
    primaryButtonStyleType: {
      type: String,
      default: '',
    },
    primaryButtonProps: {
      type: Object,
      default: () => ({}),
    },
    primaryButtonCloseModal: {
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    disableButton: {
      type: Boolean,
      default: false,
    },
    buttonTooltip: {
      type: String,
      default: '',
    },
    updatedProp: {
      type: Number,
      default: 1,
    },
    shrinkWhileScrolling: {
      type: Boolean,
      default: false,
    },
    temporarilyStopWatchingScroll: {
      type: Boolean,
      default: false,
    },
    modalContext: {
      type: String,
      default: 'general',
    },
    footerStylesOverride: {
      type: Object,
      default: () => ({}),
    },
    modalContentStylesOverride: {
      type: Object,
      default: () => ({}),
    },
    showBottomBanner: {
      /** should show the banner at the bottom aligned to the buttons- affects the flex positioning*/
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['modal-close', 'secondary-button-clicked', 'keep-edit', 'primary-button-clicked']);

  const modalContentRef = ref(null);
  const modalContentWrapperRef = ref(null);
  const shrinkingAreaRef = ref(null);

  const showConfirm = ref(false);
  const contentHeight = ref('100%');
  const contentHeightInPx = ref(0);
  const contentWrapperInPx = ref(0);
  const prevScrollFromTop = ref(0);
  const currentScrollFromTop = ref(0);
  const localTemporarilyStopWatchingScroll = ref(props.temporarilyStopWatchingScroll);

  const modalComputedSize = computed<string | null>(() => {
    return props.dynamicSize ? null : props.modalSize ? MODAL_SIZES[props.modalSize] : undefined;
  });

  const shouldShowConfirmation = computed<boolean>(() => {
    return props.showConfirmOverlay && showConfirm.value;
  });

  const bottomBlockStyle = computed(() => {
    return { justifyContent: props.showBottomBanner ? 'space-between' : 'flex-end' };
  });

  const updateHeight = (shrinkAreaHeight = 0) => {
    // Calc the content's height depending footer's and header's height

    const footerHeight = document.getElementById('modal-footer');
    const headerHeight = document.getElementById('modal-header');

    let height = '100%';
    const footerBottomPadding = 0;
    if (footerHeight) {
      height = `calc(${height} - ${footerHeight.clientHeight + footerBottomPadding}px)`;
    }

    if (headerHeight) {
      height = `calc(${height} - ${headerHeight.clientHeight - shrinkAreaHeight}px)`;
    }

    contentHeight.value = height;
    if (modalContentRef.value && modalContentWrapperRef.value) {
      contentHeightInPx.value = (modalContentRef.value as Element).clientHeight;
      contentWrapperInPx.value = (modalContentWrapperRef.value as Element).clientHeight;
    }
  };

  const closeModal = () => {
    if (!props.showConfirmOverlay) {
      emit('modal-close', !props.modalOpen);
    } else {
      showConfirm.value = true;
    }
  };

  const onKeepEditClick = () => {
    showConfirm.value = false;
    emit('keep-edit');
  };

  const closeConfirmation = () => {
    emit('modal-close', !props.modalOpen);
  };

  const closeModalOnClickAway = (pe /**: PointerEvent*/) => {
    if (
      props.closeable &&
      props.closeOnClickAway &&
      !props.showConfirmOverlay &&
      // && !pe?.target?.closest(`#${SIDE_MENU_TOGGLE_ID}`)
      !pe?.target?.closest(`#side-bar-menu-toggle`)
    ) {
      closeModal();
    }
  };

  const handlePrimaryClick = () => {
    if (props.primaryButtonCloseModal) {
      closeModal();
    } else {
      emit('primary-button-clicked');
    }
  };

  const scrollEvent = (event) => {
    if (props.shrinkWhileScrolling && !props.temporarilyStopWatchingScroll) {
      const vertical = event.target.scrollTop;

      const closeToBottom = contentHeightInPx.value - contentWrapperInPx.value - vertical < 50;

      currentScrollFromTop.value = vertical;

      // User is scrolling down
      if (
        currentScrollFromTop.value > prevScrollFromTop.value &&
        modalContentRef.value &&
        modalContentWrapperRef.value
      ) {
        // Checking the ratio between modalContentHeight to modalContentWrapperHeight
        // in order to avoid situations where we don't have enough scroll space after the shrinking
        const modalContentHeight = (modalContentRef.value as Element).clientHeight;
        const modalContentWrapperHeight = (modalContentWrapperRef.value as Element).clientHeight;
        if (modalContentHeight / modalContentWrapperHeight > 1.2 && !closeToBottom) {
          localTemporarilyStopWatchingScroll.value = true;
          setTimeout(() => {
            localTemporarilyStopWatchingScroll.value = false;
          }, 100);
          if (shrinkingAreaRef.value) {
            // First calculate the current height of the shrinking area
            const currentShrinkAreaHeight = (shrinkingAreaRef.value as Element).clientHeight;
            // then recalculate the height of the main section without the shrinking area
            // then (simultaneously) actually shrink the shrinking area
            (shrinkingAreaRef.value as Element).classList.add('shrink');
            updateHeight(currentShrinkAreaHeight);
          }
        }
        // User is scrolling up
      } else {
        if (shrinkingAreaRef.value) (shrinkingAreaRef.value as Element).classList.remove('shrink');
        updateHeight();
      }
      prevScrollFromTop.value = vertical;
    }
  };

  const cancelShrink = () => {
    if (shrinkingAreaRef.value) {
      (shrinkingAreaRef.value as Element).classList.remove('shrink');
    }
  };

  onMounted(() => {
    updateHeight();
    window.addEventListener('resize', () => {
      updateHeight();
    });
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', () => updateHeight);
  });

  watch(
    () => props.triggerOverlay,
    (value) => {
      if (value) showConfirm.value = true;
    },
  );

  watch(
    () => props.updatedProp,
    () => {
      updateHeight();
    },
  );

  defineExpose({
    MODAL_SIZES,
    SIDE_MENU_TOGGLE_ID,
    // bgLight,
    closeImg,
  });
</script>

<style lang="scss" scoped>
  @import '../../styles/colors/background.module';
  @import '../../styles/colors/text.module';
  @import '../../styles/colors/borders';

  .background,
  .sticky-modal {
    position: fixed;
    z-index: 200;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;

    .background {
      background-color: $bg-overlay;
    }

    .wrapper {
      z-index: 260;

      .modal {
        line-height: 30px;
        z-index: 60;
        box-sizing: border-box;
        background-color: $bg-element;
        position: relative;
        overflow: hidden !important;
        border-radius: 16px;

        .modal-button-close {
          width: 18px;
          height: 18px;
          cursor: pointer;
          z-index: 5;
          right: 24px;
          top: 24px;
          position: absolute;
        }

        #modal-header,
        #modal-footer {
          box-sizing: border-box;
        }

        #modal-header {
          background: $bg-element;
          border-bottom: $border-ui-color 1px solid;
          //padding: 32px 24px 16px 32px;
          padding: 0 32px;
          display: flex;
          gap: 8px;
          height: 59px;
          align-items: center;

          .modal-title {
          }

          .modal-subtitle {
            padding-top: 8px;
          }
        }

        .content {
          display: flex;
          flex-direction: row;
          transition: height 200ms ease-in;

          .modal-content-wrapper {
            overflow-y: scroll;
            position: relative;
            width: calc(100% - 6px);

            &.wrapper-with-right-section {
              width: calc(100% - 6px - 328px);
            }

            .modal-content {
              padding: 16px 16px 16px 32px;
              box-sizing: border-box;
            }
          }

          .right-section {
            position: relative;
            width: 328px;
            margin: 24px 8px 24px;
            border-left: $border-ui-color 1px solid;
          }
        }

        #modal-footer {
          background: $bg-element;
          border-top: $border-ui-color 1px solid;
          height: fit-content;
          min-height: 48px;
          width: 100%;
          //display: flex;
          //justify-content: flex-end;
          //padding: 24px;
          box-sizing: border-box;
          position: absolute;
          bottom: 0;
          z-index: 100;

          .footer-slot {
            flex-grow: 100;
          }

          .bottom-block {
            display: flex;
            padding-left: 32px;

            .modal-footer-buttons {
              padding: 16px 32px;

              min-height: 48px;
              //width: 100%;
              display: flex;
              align-items: center;
              justify-content: flex-end;

              .secondary-button {
                margin-right: 16px;
              }
            }
          }
        }
      }
    }
  }

  .shrink-while-scrolling {
    max-height: 500px;
    height: 100%;
    transition: all 400ms ease-in-out;
    opacity: 1;

    &.shrink {
      max-height: 0;
      opacity: 0;
    }
  }

  /* width */
  ::-webkit-scrollbar {
    width: 12px;
    cursor: grab !important;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: $bg-shapes;
    cursor: grab !important;
    background-clip: padding-box;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    cursor: grab !important;
  }
</style>
