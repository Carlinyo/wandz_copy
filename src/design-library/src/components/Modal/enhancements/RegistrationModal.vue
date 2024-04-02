<template>
  <!--  eslint-disable-->
  <modal
    modal-size="auto"
    class="modal-wrapper"
    :close-on-click-away="false"
    :closeable="false"
    :modal-open="modalOpen"
    @modal-close="$emit('modal-close')"
    :primary-button-text="primaryButton"
    :secondary-button-text="secondaryButton"
    :secondaryButtonStyleType="'textLink'"
    :primary-button-tooltip-text="primaryButtonTooltipText"
    :primary-button-props="primaryButtonProps"
    :secondary-button-props="secondaryButtonProps"
    :width="674"
    @primary-button-clicked="$emit('primary-button-clicked')"
    @secondary-button-clicked="$emit('secondary-button-clicked')"
  >
    <div
      v-if="hasHeader"
      class="modal-header-container"
    >
      <div
        v-if="image"
        class="header-image-wrapper"
      >
        <img
          class="header-image"
          :src="image"
        />
      </div>
      <div
        v-if="header"
        class="modal-header"
      >
        <span>{{ header }}</span>
      </div>
      <div
        v-if="subHeader"
        class="modal-sub-header"
      >
        <span>{{ subHeader }}</span>
      </div>
    </div>
    <div class="registration-modal-content">
      <slot />
    </div>
  </modal>
</template>

<script>
  /*eslint-disable*/
  /* components: */
  import modal from '../Modal.vue';

  export default {
    name: 'RegistrationModal',
    components: { modal },
    props: {
      image: {
        type: String,
        default: '',
      },
      header: {
        type: String,
        default: '',
      },
      subHeader: {
        type: String,
        default: '',
      },
      modalOpen: {
        type: Boolean,
        default: false,
      },
      primaryButton: {
        type: String,
        default: '',
      },
      primaryButtonTooltipText: {
        type: String,
        default: '',
      },
      secondaryButton: {
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
    },
    computed: {
      hasHeader() {
        return this.$props.header || this.$props.image || this.$props.subHeader;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .modal-wrapper {
    display: flex;
    align-items: center;

    .modal-header-container {
      flex-direction: column;
      padding-bottom: 0 !important;
      word-break: break-all;
      margin-bottom: 24px;
      white-space: pre;
      .header-image-wrapper {
        .header-image {
          height: 120px;
          width: 120px;
        }
      }
      .header-image-wrapper + div {
        margin-top: 24px;
      }
      .modal-header {
        word-break: break-word;
        line-height: 32px;
        font-family: Figtree;
        font-size: 32px;
      }
      .modal-header + div {
        margin-top: 16px;
      }
      .sub-header {
        font-family: Figtree;
        font-size: 14px;
      }
    }
  }
  .registration-modal-content {
    display: flex;
    justify-content: center;
  }
</style>
