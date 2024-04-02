<template>
  <div>
    <transition name="fadeInOut">
      <div
        v-if="showDimmer && drawerTimeout"
        key="dimScreen"
        class="dim-screen"
        @click.prevent="disableClick"
      />
    </transition>
    <transition
      :name="slideTransition"
      @after-leave="afterDrawerCloseAnimation"
    >
      <div
        v-if="drawerTimeout"
        v-click-outside="onClickOutside"
        class="drawer shadow-bold"
        :class="[displayDirection, manuallyHandlePadding && 'manually-handle-padding']"
      >
        <section
          class="top"
          :style="topSectionCustomStyle"
        >
          <slot name="title" />
          <img
            v-if="!hideX"
            :src="BannersAndModalsX"
            class="close-button"
            alt="Close"
            @click="closeDrawer"
          />
        </section>
        <slot name="header" />
        <slot name="banner" />

        <div
          ref="mainContainer"
          class="main-container"
          @scroll="handleScroll"
        >
          <slot name="main" />
        </div>
        <!--        <vue-scroll :ops="VueScrollConfig">
          <slot name="main" />
        </vue-scroll>-->
        <section
          :class="{
            'bottom-container': true,
            'top-shadow': mainContentScrolledNow,
          }"
          :style="{
            justifyContent: displayDirection === 'left' ? 'flex-end' : 'flex-start',
          }"
        >
          <slot name="bottom-override" />
          <div
            v-if="!$slots['bottom-override']"
            class="bottom-regular"
            :class="showTertiaryButton ? 'two-sided' : ''"
          >
            <div class="left-side">
              <Tooltip
                :show-tooltip="!!primaryButtonTooltipText"
                :text="primaryButtonTooltipText"
                position="top-start"
                allow-overflow
                custom-class-name="explore-disabled-primary-tooltip"
              >
                <nmg-button
                  v-if="primaryButtonText"
                  :button-id="primaryButtonId"
                  :is-loading="primaryButtonLoadingState"
                  :disabled="disabledBtn"
                  class="primary-button"
                  :icons="{
                    right: primaryButtonIcon,
                  }"
                  data-automation-id="drawer-primary-right"
                  @click="onPrimaryButtonClick"
                >
                  {{ primaryButtonText }}
                </nmg-button>
              </Tooltip>
              <nmg-button
                v-if="secondaryButtonText"
                :button-id="secondaryButtonId"
                :style-type="secondaryButtonType"
                :text-padding="secondaryButtonPadding"
                :class="{
                  'secondary-button': true,
                  'button-margin': primaryButtonText && secondaryButtonText,
                }"
                @click="onSecondaryButtonClick"
              >
                {{ secondaryButtonText }}
              </nmg-button>
            </div>
            <div class="right-side">
              <nmg-button
                v-if="showTertiaryButton"
                :button-id="tertiaryButtonId"
                :style-type="tertiaryButtonStyle"
                :text-padding="0"
                :is-loading="tertiaryButtonLoadingState"
                @click="onTertiaryButtonClick"
              >
                {{ tertiaryButtonText }}
              </nmg-button>
            </div>
          </div>
        </section>
      </div>
    </transition>
  </div>
</template>

<script>
  // import VueScroll from 'vuescroll/dist/vuescroll-native';
  // import vClickOutside from 'v-click-outside';
  import { directive as vOnClickaway } from 'vue3-click-away';
  import nmgButton from '../Button';
  import Tooltip from '../Tooltip';
  import BannersAndModalsX from '../../assets/icons/close-icons/x-medium-black.svg';
  import lockIcon from '../../assets/icons/info/lock_white.svg';
  import debounce from 'lodash/debounce';

  export default {
    name: 'Drawer',
    components: {
      nmgButton,
      Tooltip,
    },
    directives: {
      clickOutside: vOnClickaway,
    },
    props: {
      primaryButtonText: {
        type: String,
        default: '',
      },
      primaryButtonLoadingState: {
        type: Boolean,
        default: false,
      },
      secondaryButtonText: {
        type: String,
        default: '',
      },
      secondaryButtonType: {
        type: String,
        default: 'secondary',
      },
      secondaryButtonPadding: {
        type: Number,
        default: 24,
      },
      tertiaryButtonText: {
        type: String,
        default: '',
      },
      primaryButtonId: {
        type: String,
        default: '',
      },
      secondaryButtonId: {
        type: String,
        default: '',
      },
      tertiaryButtonId: {
        type: String,
        default: '',
      },
      tertiaryButtonStyle: {
        type: String,
        default: 'textLink',
      },
      tertiaryButtonLoadingState: {
        type: Boolean,
        default: false,
      },
      hideX: {
        type: Boolean,
        default: false,
      },
      shouldCloseWithClickOutside: {
        type: Boolean,
        default: true,
      },
      showTertiaryButton: {
        type: Boolean,
        default: false,
      },
      disabledBtn: {
        type: Boolean,
        default: false,
      },
      showDimmer: {
        type: Boolean,
        default: false,
      },
      displayDirection: {
        type: String,
        default: 'right',
      },
      primaryButtonLock: {
        type: Boolean,
        default: false,
      },
      primaryButtonTooltipText: {
        type: String,
        default: '',
      },
      manuallyHandlePadding: {
        type: Boolean,
        default: false,
      },
      alwaysShowScrollBar: {
        type: Boolean,
        default: false,
      },
      topSectionCustomStyle: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        debouncedScroll: null,
        mainContentScrolledNow: false,
        VueScrollConfig: {
          scrollPanel: {
            scrollingX: false,
          },
          bar: {
            onlyShowBarOnScroll: false,
            keepShow: this.alwaysShowScrollBar,
            background: '#C6CBD3',
            size: '10px',
            minSize: 0.2,
          },
          rail: {
            gutterOfSide: '8px',
            gutterOfEnds: '4px',
          },
        },
        BannersAndModalsX,
        drawerTimeout: false,
        lockIcon,
      };
    },
    computed: {
      slideTransition() {
        return this.displayDirection === 'left' ? 'slideInLeft' : 'slideInRight';
      },
      primaryButtonIcon() {
        return this.primaryButtonLock ? this.lockIcon : '';
      },
    },
    created() {
      setTimeout(() => {
        this.drawerTimeout = true;
      }, 20);
    },
    mounted() {
      setTimeout(() => {
        /** Use debounce to wait for a pause in scrolling */
        this.debouncedScroll = debounce(this.handleScrollLeave, 1000);

        /** Add a scroll event listener */
        this.$refs.mainContainer.addEventListener('scroll', this.debouncedScroll);
      }, 1000);
    },
    methods: {
      handleScroll() {
        this.mainContentScrolledNow = true;
      },
      handleScrollLeave() {
        this.mainContentScrolledNow = false;
      },
      closeDrawer() {
        this.drawerTimeout = false;
      },
      onClickOutside(pe /**: PointerEvent*/) {
        if (this.shouldCloseWithClickOutside) {
          if (!pe?.target?.closest('.modal')) {
            /** Ignoring modal clicks (modal is displayed in a higher z-index) */
            this.closeDrawer();
          }
        }
      },
      afterDrawerCloseAnimation() {
        this.$emit('closeDrawer');
      },
      onTertiaryButtonClick() {
        this.$emit('tertiaryButtonClick');
      },
      onSecondaryButtonClick() {
        this.$emit('secondaryButtonClick');
      },
      onPrimaryButtonClick() {
        this.$emit('primaryButtonClick');
      },
      handleTabChange(tabName) {
        this.$emit('clickedTab', tabName);
      },
      disableClick() {
        return false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/animation/fadeInOutTransition';
  @import '../../styles/animation/slideInTransition';
  @import '../../styles/colors/background.module';

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .drawer {
    box-sizing: border-box;
    width: 464px;
    top: 0;
    position: fixed;
    height: 100vh;
    z-index: 205;
    opacity: 1;
    background: $bg-element;
    display: flex;
    flex-direction: column;
    gap: 24px;

    &.manually-handle-padding {
      padding: 24px 0 24px 0;
    }

    .top {
      position: sticky;
      z-index: 5;
      display: flex;
      justify-content: space-between;

      .close-button {
        cursor: pointer;
        position: absolute;
        right: 32px;
      }
    }
    &.left {
      left: 0;
    }

    &.right {
      right: 0;
    }

    .scroll-area {
      height: 100%;
      position: relative;
    }

    .bottom-container {
      box-sizing: border-box;
      display: flex;
      align-items: flex-end;
      bottom: 0;
      padding-bottom: 24px;
      padding-top: 24px;
      background: $bg-element;
      z-index: 30;

      &.top-shadow {
        border-top: 1px solid #d8dbe0;
        box-shadow: 2px -2px 8px 0px rgba(97, 142, 199, 0.12);
      }

      .bottom-regular {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background: $bg-element;
        z-index: 30;

        &.two-sided {
          justify-content: space-between;
          width: 100%;
        }
        .tertiary-button {
          padding-left: 8px;
        }
        .left-side {
          display: flex;
          align-items: center;
          margin-left: 32px;
        }
        .right-side {
          margin-right: 32px;
        }
        .button-margin {
          margin-left: 16px;
        }
      }
    }
  }

  .dim-screen {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    background: $bg-overlay-light;
    right: 0;
    z-index: 200;
  }

  .__vuescroll {
    margin-bottom: 56px;
  }

  :deep(.__view) {
    min-height: 0 !important;
  }

  .main-container {
    overflow-y: scroll;
  }

  .top,
  .main-container {
    padding: 32px 0 0 32px;
  }
</style>
