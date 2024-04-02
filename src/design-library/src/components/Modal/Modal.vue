<template>
  <div
    v-if="modalOpen"
    class="content shadow-bold"
    :class="{ sticky }"
  >
    <div class="wrapper">
      <div
        v-on-clickaway="closeModalOnClickAway"
        class="modal"
        :style="{ ...modalComputedSize, 'background-color': color }"
        :class="[customModalClass, 'align-' + contentAlign, buttonSpace ? 'button-space' : '']"
      >
        <div
          v-if="closeable"
          class="modal-button-close"
          @click="onCloseModalClick"
        >
          <img
            alt=""
            :src="closeImg"
          />
        </div>

        <div
          class="body"
          :class="customBodyClass"
          :style="{ gap: `${contentGap}px` }"
        >
          <div class="modal-header-container">
            <div
              v-if="hasTitle"
              class="modal-title"
            >
              <slot name="title">
                <div v-html="title" />
              </slot>
            </div>
            <div
              v-if="subtitle"
              class="modal-subtitle"
              v-html="subtitle"
            ></div>
          </div>
          <div class="modal-content-container">
            <div
              v-if="hasContent"
              class="modal-content"
            >
              <slot>
                {{ content }}
              </slot>
            </div>
          </div>

          <div
            v-if="hasButtons"
            class="modal-button-container"
          >
            <div class="modal-button">
              <slot name="actions">
                <div
                  v-if="!showPostActionValidation"
                  class="modal-action-buttons"
                  style="display: flex"
                >
                  <nmg-mai-button
                    v-if="secondaryButtonText"
                    :style-type="secondaryButtonStyleType"
                    class="secondary-button"
                    v-bind="secondaryButtonProps"
                    @click="() => $emit('secondary-button-clicked')"
                  >
                    {{ secondaryButtonText }}
                  </nmg-mai-button>
                  <Tooltip :text="primaryButtonTooltipText">
                    <nmg-mai-button
                      v-if="primaryButtonText"
                      :id="primaryButtonId"
                      :style-type="primaryButtonStyleType"
                      class="primary-button"
                      v-bind="primaryButtonProps"
                      @click="ctaClick"
                    >
                      {{ primaryButtonText }}
                    </nmg-mai-button>
                  </Tooltip>
                </div>
                <div
                  v-else
                  class="modal-post-action-validation"
                  :style="{ flexDirection: postActionValidation.up ? 'column' : 'row' }"
                >
                  <span>{{ postActionValidation.warning }}</span>
                  <div class="confirmation-buttons">
                    <nmg-mai-button
                      style-type="textLink"
                      @handle-click="() => (showPostActionValidation = false)"
                    >
                      {{ postActionValidation.back }}
                    </nmg-mai-button>
                    <img :src="dividerBlack" />
                    <nmg-mai-button
                      style-type="textLink"
                      @handle-click="ctaClick"
                    >
                      {{ postActionValidation.next }}
                    </nmg-mai-button>
                  </div>
                </div>
              </slot>
            </div>
            <div
              v-if="hasSecondaryActions"
              class="secondary-actions-container"
            >
              <slot name="secondary-actions">
                <div
                  class="secondary-actions-content"
                  v-html="secondaryActionsContent"
                />
              </slot>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="shouldShowConfirmation"
        class="overlay"
      >
        <div class="overlay-content">
          <div class="overlay-text">
            {{ overlayText }}
          </div>
          <div
            v-if="overlaySubText"
            class="overlay-sub-text"
          >
            {{ overlaySubText }}
          </div>
          <div class="overlay-actions">
            <nmg-mai-button
              style-type="secondary"
              @handle-click="onKeepEditClick"
            >
              {{ overlayReturnCta }}
            </nmg-mai-button>
            <nmg-mai-button
              style-type="primary"
              @handle-click="closeConfirmation"
            >
              {{ overlayExitCta }}
            </nmg-mai-button>
          </div>
        </div>
      </div>
    </div>
    <div class="background" />
  </div>
</template>

<script lang="ts">
  import { directive as onClickaway } from 'vue3-click-away';
  import closeImg from '../../assets/icons/close-icons/x-small-black.svg';
  import NmgMaiButton from '../Button/Button.vue';
  import { IModalProps } from '../../types/interfaces/modal';
  /* img: */
  import dividerBlack from '../../assets/icons/misc/dividerBlack.svg';
  import { MODAL_SIZES } from '../../const';
  import Tooltip from '../Tooltip';

  export default {
    name: 'NmgMaiModal',
    components: { NmgMaiButton, Tooltip },
    directives: {
      onClickaway,
      NmgMaiButton,
    },
    props: {
      color: {
        type: String,
        default: '#ffffff',
      },
      contentAlign: {
        type: String,
        default: 'center',
        validator: (value) => ['left', 'center', 'right'].indexOf(value) !== -1,
      },
      contentGap: {
        type: Number,
        default: 0,
      },
      buttonSpace: {
        type: Boolean,
        default: false,
      },
      modalOpen: Boolean,
      customModalClass: [String, Array],
      customBodyClass: String,
      closeOnClickAway: Boolean,
      closeable: {
        type: Boolean,
        default: true,
      },
      sticky: {
        type: Boolean,
        default: false,
      },
      title: String,
      subtitle: String,
      content: String,
      primaryButtonText: {
        type: String,
        default: '',
      },
      primaryButtonTooltipText: {
        type: String,
        default: '',
      },
      primaryButtonId: {
        type: String,
        default: '',
      },
      primaryButtonProps: {
        type: Object,
        default: () => ({}),
      },
      secondaryButtonProps: {
        type: Object,
        default: () => ({}),
      },
      primaryButtonStyleType: {
        type: String,
        default: 'primary',
      },
      secondaryButtonText: {
        type: String,
        default: '',
      },
      secondaryButtonStyleType: {
        type: String,
        default: 'secondary',
      },
      secondaryActionsContent: {
        type: String,
        default: '',
      },
      modalSize: {
        type: String,
        default: 'regular',
        validator: (value) => Object.keys(MODAL_SIZES).indexOf(value) !== -1,
      },
      width: {
        type: Number,
        default: 0,
      },
      height: {
        type: Number,
        default: 0,
      },
      dynamicSize: {
        type: Boolean,
        default: false,
      },
      showConfirmOverlay: {
        type: Boolean,
        default: false,
      },
      overlayText: {
        type: String,
        default: 'Your work won’t be saved. Are you sure you want to exit?',
      },
      overlaySubText: {
        type: String,
        default: '',
      },
      overlayReturnCta: {
        type: String,
        default: 'No, keep editing',
      },
      overlayExitCta: {
        type: String,
        default: 'Yes, exit',
      },
      /**
       * Object that looks like:
       * { back: ''(back to previous state button text), next: ''(activating main button callback),
       * warning: ''(warning text next to buttons), up: true/false (if the warning is above the buttons or not) };
       * */
      postActionValidation: {
        type: Object,
        default: () => ({}),
      },
    } as IModalProps,
    data() {
      return {
        closeImg,
        dividerBlack,
        showConfirm: false,
        modalStyle: MODAL_SIZES,
        showPostActionValidation: false,
      };
    },
    computed: {
      hasTitle() {
        return !!this.$slots.title || this.title;
      },
      shouldShowConfirmation() {
        return this.showConfirmOverlay && this.showConfirm;
      },
      hasContent() {
        return !!this.$slots.default || this.content;
      },
      hasButtons() {
        return !!this.$slots.actions || this.primaryButtonText || this.secondaryButtonText;
      },
      hasSecondaryActions() {
        return !!this.$slots['secondary-actions'] || this.secondaryActionsContent;
      },
      modalComputedSize() {
        let size;

        if (this.dynamicSize) {
          return null;
        }
        if (this.modalSize) {
          size = this.modalStyle[this.modalSize];
        }

        if (this.width) {
          size.width = `${this.width}px`;
        }

        if (this.height) {
          size.height = `${this.height}px`;
        }

        return size;
      },
    },
    watch: {
      showConfirmOverlay() {
        this.showConfirm = this.showConfirmOverlay ?? false;
      },
    },
    methods: {
      closeModal() {
        if (!this.showConfirmOverlay) {
          this.$emit('modal-close', !this.modalOpen);
        } else {
          this.showConfirm = true;
        }
      },
      closeConfirmation() {
        this.$emit('modal-close', !this.modalOpen);
        this.showConfirm = false;
      },
      onKeepEditClick() {
        this.showConfirm = false;
      },
      closeModalOnClickAway() {
        if (this.closeable && this.closeOnClickAway && !this.showConfirmOverlay) {
          this.closeModal();
        }
      },
      onCloseModalClick() {
        if (this.closeable) {
          this.closeModal();
        }
      },
      ctaClick() {
        const condition =
          Object.keys(this.postActionValidation) &&
          Object.keys(this.postActionValidation).length &&
          !this.showPostActionValidation;
        if (condition) this.showPostActionValidation = true;
        else {
          this.showPostActionValidation = false;
          this.$emit('primary-button-clicked');
        }
      },
    },
  };
</script>
<style scoped lang="scss">
  @import '../../styles/colors/background.module';
  @import '../../styles/colors/text.module';
  @import '../../styles/colors/borders';
  @import '../../styles/corners/corners';

  .background,
  .content {
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

    &.sticky {
      background-color: rgba(14, 46, 56, 0.8);
    }

    .wrapper {
      position: relative;

      .modal {
        line-height: 30px;
        z-index: 210;
        box-sizing: border-box;
        background-color: $bg-element;
        position: relative;
        padding: 24px;
        border-radius: $border-radius-large;
        border: 1px solid $border-ui-color;

        .modal-content-container {
          font-size: 14px;
          line-height: 1.25em;
        }

        &.align-left {
          .modal-header-container {
            text-align: left;
          }

          .modal-button-container {
            padding-top: 32px;

            .modal-button {
              justify-content: flex-end;
            }
          }
        }

        &.align-center {
          .modal-header-container {
            text-align: center;
          }

          .modal-content-container {
            text-align: center;
          }
        }

        &.align-right {
          .modal-header-container {
            text-align: right;
          }

          .modal-button-container {
            padding-top: 32px;

            .modal-button {
              justify-content: flex-start;
            }
          }
        }

        &.button-space {
          .modal-button-container {
            padding-top: 32px;

            .modal-button {
              .modal-action-buttons {
                width: 100%;
                justify-content: space-between;
              }
            }
          }
        }

        .modal-button-close {
          width: 20px;
          height: 20px;
          cursor: pointer;
          z-index: 5;
          //padding: 16px;
          right: 16px;
          top: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
        }

        .body {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .modal-header-container {
          padding-bottom: 4px;

          .modal-title {
            font-size: 18px;
            font-weight: 600;
            line-height: 22px;
            letter-spacing: 0em;
            color: #131f3c;
          }

          .modal-subtitle {
            color: $txt-primary;
            font-size: 14px;
            line-height: 20px;
            padding-top: 16px;
          }

          .modal-content-container {
            height: 100%;

            .modal-content {
              height: 100%;
              //padding-bottom: 32px;
              min-height: 60px;
              //width: 364px;
              color: #303030;
            }
          }
        }

        .modal-content-container {
          height: 100%;

          .modal-content {
            height: 100%;
            //padding-bottom: 32px;
            //min-height: 60px;
            //width: 364px;
            color: #303030;
            font-size: 14px;
            line-height: 20px;
          }
        }

        .modal-button-container {
          display: flex;
          flex-direction: column;
          padding-top: 32px;
          gap: 8px;

          .modal-button {
            width: 100%;
            justify-content: center;
            display: flex;
            text-align: right;

            .secondary-button {
              margin-right: 16px;
            }
          }
        }

        .secondary-actions-container {
          font-size: 14px;
          line-height: 1.25em;
          display: flex;
          text-align: center;
          margin-top: 8px;
          justify-content: center;

          .secondary-actions-content {
            width: 100%;
          }
        }

        :deep(a) {
          text-decoration: none;
          color: $txt-primary;
        }
      }

      .overlay {
        position: absolute;
        background-color: rgba(255, 255, 255, 0.9);
        top: 0;
        height: 100%;
        width: 100%;
        z-index: 100000;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        border-radius: 8px;

        .overlay-content {
          position: relative;
          height: auto;
          margin: 0 auto;
          padding: 0 61px;

          .overlay-text {
            font-style: normal;
            font-weight: 500;
            font-size: 20px;
            line-height: 26px;
            text-align: center;
          }

          .overlay-sub-text {
            font-size: 14px;
            text-align: center;
            margin-top: 8px;
          }

          .overlay-actions {
            display: flex;
            justify-content: center;
            margin-top: 24px;
            gap: 15px;
          }
        }
      }
    }
  }

  .background {
    //opacity: 0.7;
    background: rgba(2, 13, 46, 0.7);
  }

  .modal-post-action-validation {
    display: flex;
    font-size: 14px;
    justify-content: flex-end;
    align-items: center;

    .confirmation-buttons {
      display: flex;
      align-items: center;
    }
  }
</style>
