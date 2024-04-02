<template>
  <transition
    name="fade"
    mode="out-in"
    appear
  >
    <div
      class="overlay-prompt"
      :class="{ flat }"
    >
      <div class="overlay-prompt-container shadow-bold">
        <div class="row">
          <slot name="title">
            <img
              v-if="iconSrc"
              :src="iconSrc"
              class="icon"
            />
            <h4
              v-if="title"
              class="overlay-prompt-title txt-primary container-title"
              :class="contentPositionClasses"
              v-html="title"
            />
          </slot>
        </div>
        <div>
          <slot name="description">
            <p
              v-if="description"
              class="description txt-primary body-small-bold"
              :class="contentPositionClasses"
              v-html="description"
            />
          </slot>
        </div>
        <slot name="content" />
        <slot name="actions">
          <div
            class="buttons-container"
            :class="buttonsContainerClasses"
          >
            <nmg-button
              v-if="secondaryButtonText"
              :id="secondaryButtonId"
              v-bind="{ styleType: 'secondary', ...secondaryButtonProps }"
              :style="{ marginRight: primaryButtonText ? '16px' : '' }"
              @click="secondaryButtonClick"
            >
              {{ secondaryButtonText }}
            </nmg-button>
            <nmg-button
              v-if="primaryButtonText"
              :id="primaryButtonId"
              v-bind="{ styleType: 'primary', ...primaryButtonProps }"
              @click="primaryButtonClick"
            >
              {{ primaryButtonText }}
            </nmg-button>
          </div>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
  import nmgButton from '../Button';

  export default {
    name: 'OverlayPrompt',
    components: {
      nmgButton,
    },
    // to use this component properly his parent should be in position relative
    props: {
      title: {
        type: String,
        required: false,
        default: '',
      },
      description: {
        type: String,
        required: false,
        default: '',
      },
      iconSrc: {
        type: String,
        default: '',
      },
      primaryButtonText: {
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
      secondaryButtonText: {
        type: String,
        default: '',
      },
      secondaryButtonId: {
        type: String,
        default: '',
      },
      secondaryButtonProps: {
        type: Object,
        default: () => ({}),
      },
      buttonsContainerClass: {
        type: String,
        default: '',
      },
      buttonsPosition: {
        type: String,
        default: 'right',
      },
      contentClass: {
        type: String,
        default: '',
      },
      contentPosition: {
        type: String,
        default: 'left',
      },
      flat: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      contentPositionClasses() {
        const contentPositionClasses = {
          left: 'tw-text-left',
          center: 'tw-text-center',
          right: 'tw-text-right',
        };

        const classes = [this.contentClass, contentPositionClasses[this.contentPosition]].filter(Boolean);

        return classes.join(' ');
      },
      buttonsContainerClasses() {
        const buttonsPositionClasses = {
          left: 'tw-justify-start',
          center: 'tw-justify-center',
          right: 'tw-justify-end',
          'space-between': 'tw-justify-between',
        };

        const classes = [this.buttonsContainerClass, buttonsPositionClasses[this.buttonsPosition]].filter(Boolean);

        return classes.join(' ');
      },
    },
    methods: {
      secondaryButtonClick() {
        this.$emit('secondaryButtonClick');
      },
      primaryButtonClick() {
        this.$emit('primaryButtonClick');
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../styles/colors/background.module';
  @import '../../styles/colors/borders';

  .overlay-prompt {
    transition: all 250ms ease-in;
    background: $bg-overlay-50;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 100;
    border-radius: inherit;
    text-align: center;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 24px;
    box-sizing: border-box;
    .overlay-prompt-container {
      border: 1px solid $border-ui-color;
      background: $bg-element;
      max-width: 800px;
      width: fit-content;
      height: fit-content;
      padding: 24px;
      border-radius: 8px;
    }
    .icon {
      margin-bottom: 8px;
    }
    .overlay-prompt-title {
      margin: 0;
    }
    .description {
      margin: 0;
    }

    .row {
      margin: 0 0 8px 0;
    }

    .buttons-container {
      display: flex;
      margin: 24px 0 0 0;
    }
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .overlay-prompt.flat {
    background: rgba(255, 255, 255, 0.95);
    .overlay-prompt-container {
      border: none;
      box-shadow: none;
      background: transparent;
    }
  }
</style>
