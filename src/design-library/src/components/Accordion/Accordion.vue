<template>
  <transition
    appear
    name="rowIn"
  >
    <div
      class="expand-container border-radius-medium"
      :class="{
        flat,
        list: inList,
        upwards: openUpwards,
        shadow: withShadow,
        selected,
        border: !flat,
      }"
    >
      <div
        class="expand-positioner"
        :class="{
          upwards: openUpwards,
          'expand-background': lightBackgroundColor,
        }"
        :style="{
          ...(backgroundColor ? { backgroundColor } : {}),
          ...(customWidth ? { width: `${customWidth}px` } : {}),
        }"
      >
        <div
          class="row-container"
          :class="{
            /** will take value of the prop called: 'type'
             *  as a class (therefore always - true) */
            [type]: true,
            disabled,
            disableHover,
          }"
          @click.prevent="toggleExpandedState"
        >
          <!-- Used for adding a component to be near by the title -->
          <slot
            name="title-left-content"
            class="title-left-content"
          />
          <slot name="title">
            <span
              class="row-title"
              :class="{
                /** will take value of the prop called: 'type'
                 * as a class (therefore always - true) */
                [type]: true,
                disabled,
                flat,
                'body-small': type === 'small',
                'container-title tw-mb-0': type === 'large',
              }"
              v-text="title"
            />
          </slot>
          <div class="error-message-container">
            <transition name="error-separate-line-animation">
              <div
                v-if="errorMessage"
                class="separate-line"
              />
            </transition>
            <transition name="error-message-animation">
              <div
                v-if="errorMessage"
                class="error-message"
              >
                {{ errorMessage }}
              </div>
            </transition>
          </div>
          <div
            class="items-container"
            :class="type"
          >
            <div
              v-if="expandable"
              class="arrow-closed"
              :class="{ 'arrow-opened': rowExpanded && !disabled, disabled }"
            >
              <img :src="chevron" />
            </div>
          </div>
        </div>
        <transition name="fade">
          <div
            v-show="expandable && rowExpanded && !disabled"
            class="content-container"
            :class="[
              type,
              { 'align-left': alignLeft },
              {
                'max-height-transition': maxHeightTransition,
                'padding-bottom': changePaddingBottom,
              },
            ]"
          >
            <slot name="content" />
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>
<script>
  import chevron from '../../assets/icons/arrows/chevron.svg';

  export default {
    name: 'NmgAccordion',
    props: {
      title: {
        type: String,
        required: false,
        default: '',
      },
      type: {
        type: String,
        default: 'large' /** large | small */,
      },
      expandable: {
        type: Boolean,
        default: true,
      },
      maxHeightTransition: {
        type: Boolean,
        default: false,
        required: false,
      },
      errorMessage: {
        type: String,
        default: '',
      },
      disabled: {
        type: Boolean,
        default: false,
        required: false,
      },
      isOpen: {
        type: Boolean,
        default: false,
      },
      alignLeft: {
        type: Boolean,
        default: false,
      },
      flat: {
        type: Boolean,
        default: false,
      },
      withShadow: {
        type: Boolean,
        default: true,
      },
      inList: {
        type: Boolean,
        default: false,
      },
      /*  No longer in use */
      disableHover: {
        type: Boolean,
        default: false,
      },
      openUpwards: {
        type: Boolean,
        default: false,
      },
      backgroundColor: {
        type: String,
        default: '',
      },
      lightBackgroundColor: {
        type: Boolean,
        default: false,
      },
      changePaddingBottom: {
        type: Boolean,
        default: false,
      },
      customWidth: {
        type: Number,
        /** by default custom width is falsy and then will use the type (small/large) default */
        default: 0,
      },
      manageUiStateFromOutside: {
        type: Boolean,
        /** true if want want to expand and collapse only from outside of component */
        default: false,
      },
      selected: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        rowExpanded: false,
        chevron,
      };
    },
    watch: {
      isOpen: {
        immediate: true,
        handler(value) {
          if (this.expandable) this.rowExpanded = value;
        },
      },
    },
    methods: {
      toggleExpandedState() {
        if (!this.expandable) return;
        /** on that case we'll not change ui state.. we'll only notify about change occurred */
        if (!this.manageUiStateFromOutside) {
          this.rowExpanded = !this.rowExpanded;
        }
        this.$emit('row-expanded', this.rowExpanded);
      },
      explicitToggle() {
        if (!this.expandable) return;
        this.rowExpanded = !this.rowExpanded;
      },
      expand() {
        if (!this.expandable) return;
        this.rowExpanded = true;
      },
      narrow() {
        if (!this.expandable) return;
        this.rowExpanded = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/colors/background.module';
  @import '../../styles/colors/borders';
  @import '../../styles/colors/text.module';
  @import '../../styles/colors/semantic.module';
  @import '../../styles/corners/corners.scss';
  @import '../../styles/borders/borders.scss';

  .max-height-transition {
    max-height: 10000px;
    padding: 0 !important;
  }

  .fade-enter-active {
    transition: all 450ms cubic-bezier(0.07, 0.75, 0.2, 1);
  }

  .fade-leave-active {
    transition: all 350ms cubic-bezier(0.07, 0.75, 0.2, 1);
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(-50px);
    opacity: 0;

    &.max-height-transition {
      max-height: 0;
    }
  }

  .rowIn-enter-active,
  .custom-appear-class {
    transition: all 450ms cubic-bezier(0.07, 0.75, 0.2, 1);
  }

  .rowIn-leave-active,
  .custom-appear-active-class {
    transition: all 350ms cubic-bezier(0.07, 0.75, 0.2, 1);
    transform: translateY(100px);
    opacity: 0;
  }

  .rowIn-enter, .custom-appear-to-class /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(100px);
    opacity: 0;
  }

  .rowIn-leave-to {
    opacity: 0;
  }

  .expand-container {
    position: relative;

    &.selected {
      border-color: $border-ui-selected-color;
    }

    .expand-positioner {
      width: 100%;
      background-color: $bg-element;
      border-radius: $border-radius-medium;
    }

    .expand-background {
      background-color: $bg-secondary-element;
    }

    .upwards {
      position: relative;
      bottom: 0;
      left: 0;
    }

    &.flat {
      border-left: 0;
      border-right: 0;
      border-radius: 0;
      border-top: $border;
    }

    &.list {
      border: 0;

      .content-container {
        padding: 0;
      }

      .row-container:hover {
        background-color: initial;
      }
    }

    .padding-bottom {
      padding-bottom: 24px !important;
    }

    .content-container {
      margin: 0;
      padding: 0px 24px 16px 24px;
      flex-direction: column;
      align-items: center;

      &.max-height-transition {
        max-height: 10000px;
        padding: 0 !important;
      }

      &.align-left {
        align-items: start;
        padding: 0 24px 16px 0;

        &.small {
          padding: 0 8px 16px 0;
        }
      }
    }

    .row-container {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      position: relative;
      z-index: 2;
      gap: 8px;
      padding: 0 16px;

      &:not(.disableHover):hover {
        //background-color: red;
      }

      &.disableHover {
        background: transparent;
      }

      &.large {
        height: 56px;
      }

      &.small {
        //width: 360px;
        height: 48px;
      }

      &.disabled {
        background-color: $bg-disabled;
        //outline: solid 1px $disable-gray !important;
        pointer-events: none;
      }

      .row-title {
        color: $txt-primary;

        //padding-left: 16px;
        //padding-right: 16px;
        &.large {
        }

        &.small {
        }

        &.disabled {
          color: $txt-disabled;
        }

        &.flat {
          //margin: 16px 0 16px 8px;
        }
      }

      .items-container {
        margin-left: auto;
        margin-right: 0;
        position: relative;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;

        .arrow-closed {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 16px;
          width: 16px;
          //margin: 0 16px 0 0;
          transition: all 0.5s;

          &.disabled {
            opacity: 0.3;
          }
        }

        .arrow-opened {
          transform: rotate(-180deg);
          bottom: 0;
        }
      }

      .error-message-container {
        position: relative;
        color: $semantic-negative;
        align-self: center;
        font-size: 14px;
        //margin-left: 8px;
        overflow: hidden;

        .separate-line {
          position: absolute;
          height: 20px;
          border-right: 1px solid $border-layout-color;
        }

        .error-message {
          font-size: 12px;
          padding-left: 8px;
        }
      }
    }

    // error message separate line animation
    .error-separate-line-animation-enter {
      transition: all 350ms cubic-bezier(0.03, 0.54, 0.51, 1);
      opacity: 0;
    }

    .error-separate-line-animation-leave-to {
      transition: all 250ms cubic-bezier(0.03, 0.54, 0.51, 1) 300ms;
      opacity: 0;
    }

    .error-separate-line-animation-leave,
    .error-separate-line-animation-enter-to {
      transition: all 350ms cubic-bezier(0.03, 0.54, 0.51, 1);
      opacity: 1;
    }

    // error message animation
    .error-message-animation-enter,
    .error-message-animation-leave-to {
      transition: all 500ms cubic-bezier(0.03, 0.54, 0.51, 1);
      margin-left: -100%;
      opacity: 0;
      width: calc(100% + 8px);
    }

    .error-message-animation-leave,
    .error-message-animation-enter-to {
      transition: all 500ms cubic-bezier(0.03, 0.54, 0.51, 1) 100ms;
      margin-left: 0;
      width: calc(100% + 8px);
      opacity: 1;
    }
  }
</style>
