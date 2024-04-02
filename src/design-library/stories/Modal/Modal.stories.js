import Modal from '../../src/components/Modal';

export default {
  title: 'Overlay/Modal',
  component: Modal,
  argTypes: {
    contentAlign: {
      options: ['left', 'center', 'right'],
      control: { type: 'select' },
      defaultValue: 'center',
      name: 'Content Align',
    },
    size: {
      options: ['regular', 'small', 'wideSmall', 'big', 'medium', 'longMedium', 'auto'],
      control: { type: 'select' },
      defaultValue: 'regular',
      name: 'Modal Predefined Styles',
    },
    width: {
      control: { type: 'number' },
      name: 'Component width',
    },
    height: {
      control: { type: 'number' },
      name: 'Component height',
    },
    backgroundColor: {
      control: { type: 'text' },
      // defaultValue: '#FFF',
      name: 'Background Color',
    },
    title: {
      control: { type: 'text' },
      defaultValue: 'Modal Title',
      name: 'Modal title',
    },
    subtitle: {
      control: { type: 'text' },
      defaultValue: '',
      name: 'Modal Subtitle',
    },
    primaryButtonText: {
      control: { type: 'text' },
      defaultValue: 'Primary',
      name: 'Primary Button Text',
    },
    primaryButtonStyleType: {
      options: [
        'primary',
        'secondary',
        'secondaryWhite',
        'primaryWhite',
        'textLink',
        'buttonImageLarge',
        'buttonImageSmall',
      ],
      control: { type: 'select' },
      defaultValue: 'primary',
      name: 'Primary button style type',
    },
    secondaryButtonText: {
      control: { type: 'text' },
      defaultValue: 'Secondary',
      name: 'Secondary Button Text',
    },
    secondaryButtonStyleType: {
      options: [
        'primary',
        'secondary',
        'secondaryWhite',
        'primaryWhite',
        'textLink',
        'buttonImageLarge',
        'buttonImageSmall',
      ],
      control: { type: 'select' },
      defaultValue: 'secondary',
      name: 'Secondary button style type',
    },
    secondaryActionsContent: {
      control: { type: 'text' },
      defaultValue: 'Need help? <a href="#" style="text-decoration: underline;">Click Here</a>',
      name: 'Secondary Actions content',
    },
    dynamicSize: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'dynamicSize',
    },
    primaryButtonProps: {
      control: { type: 'object' },
      defaultValue: {},
      name: 'primaryButtonProps',
    },
    secondaryButtonProps: {
      control: { type: 'object' },
      defaultValue: {},
      name: 'secondaryButtonProps',
    },
    showConfirmOverlay: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'ShowConfirm Overlay',
    },
    overlayText: {
      control: { type: 'text' },
      defaultValue: 'Your work won’t be saved. Are you sure you want to exit?',
      name: 'Overlay Text',
    },
    overlayReturnCta: {
      control: { type: 'text' },
      defaultValue: 'No, keep editing',
      name: 'Overlay Return Cta',
    },
    overlayExitCta: {
      control: { type: 'text' },
      defaultValue: 'Yes, exit',
      name: 'Overlay Exit Cta',
    },
    postActionValidation: {
      control: { type: 'object' },
      defaultValue: { next: 'Send', back: 'Back', up: false, warning: 'Are you sure?' },
      name: 'postActionValidation',
    },
    contentGap: {
      control: { type: 'number' },
      defaultValue: 16,
    },
  },
  args: {
    contentAlign: 'center',
    size: 'regular',
    width: 364,
    height: 364,
    backgroundColor: '#FFF',
    title: 'Modal Title',
    subtitle: '',
    primaryButtonText: 'Primary',
    primaryButtonStyleType: 'primary',
    secondaryButtonText: 'Secondary',
    secondaryButtonStyleType: 'secondary',
    secondaryActionsContent: 'Need help? <a href="#" style="text-decoration: underline;">Click Here</a>',
    dynamicSize: false,
    primaryButtonProps: {},
    secondaryButtonProps: {},
    showConfirmOverlay: false,
    overlayText: 'Your work won’t be saved. Are you sure you want to exit?',
    overlayReturnCta: 'No, keep editing',
    overlayExitCta: 'Yes, exit',
    postActionValidation: { next: 'Send', back: 'Back', up: false, warning: 'Are you sure?' },
    contentGap: 16,
  },
};

export const modal = (args, { argTypes }) => ({
  components: { Modal },
  props: Object.keys(argTypes),
  data() {
    return {
      modalIsOpen: true,
    };
  },
  methods: {
    onCloseModal() {
      this.modalIsOpen = false;
    },
    showModal() {
      this.modalIsOpen = true;
    },
    buttonClicked(buttonName) {
      action(`Button ${buttonName} was clicked`);
    },
  },
  template: `
<div>
  <button @click="showModal">
    show modal
  </button>
  <modal
    :title="title"
    :color="backgroundColor"
    :subtitle="subtitle"
    :modal-size="size"
    :width="width"
    :height="height"
    :modal-open="modalIsOpen"
    :content-align="contentAlign"
    :primary-button-text="primaryButtonText"
    :primary-button-style-type="primaryButtonStyleType"
    :secondary-button-text="secondaryButtonText"
    :secondary-button-style-type="secondaryButtonStyleType"
    :secondary-actions-content="secondaryActionsContent"
    :dynamic-size="dynamicSize"
    :primary-button-props="primaryButtonProps"
    :secondary-button-props="secondaryButtonProps"
    :overlay-exit-cta="overlayExitCta"
    :overlay-text="overlayText"
    :overlay-return-cta="overlayReturnCta"
    :show-confirm-overlay="showConfirmOverlay"
    :post-action-validation="postActionValidation"
    :content-gap="contentGap"
    @modal-close="onCloseModal"
    @secondary-button-clicked="buttonClicked('second-')"
  >
    Honey will be fully blocked starting now until you decide to stop blocking it and allow it.
    <template v-if="!secondaryActionsContent" #secondary-actions>
      <div>Need help? <a href="#">Click Here</a></div>
    </template>
  </modal>
</div>
  `,
});

export const modalDynamicSize = (args, { argTypes }) => ({
  components: { Modal },
  props: Object.keys(argTypes),
  data() {
    return {
      modalIsOpen: true,
    };
  },
  methods: {
    onCloseModal() {
      this.modalIsOpen = false;
    },
    showModal() {
      this.modalIsOpen = true;
    },
    buttonClicked(buttonName) {
      action(`Button ${buttonName} was clicked`);
    },
  },
  template: `
<div>
  <button @click="showModal">
    show modal
  </button>
  <modal
    :title="title"
    :color="backgroundColor"
    :subtitle="subtitle"
    :modal-size="size"
    :width="width"
    :height="height"
    :modal-open="modalIsOpen"
    :content-align="contentAlign"
    :primary-button-text="primaryButtonText"
    :primary-button-style-type="primaryButtonStyleType"
    :secondary-button-text="secondaryButtonText"
    :secondary-button-style-type="secondaryButtonStyleType"
    :secondary-actions-content="secondaryActionsContent"
    dynamic-size
    :primary-button-props="primaryButtonProps"
    :secondary-button-props="secondaryButtonProps"
    @modal-close="onCloseModal"
    @secondary-button-clicked="buttonClicked('second-')"
  >
    <div style="height:200px;width:800px;">The content is 200x800</div>
  </modal>
</div>
  `,
});
