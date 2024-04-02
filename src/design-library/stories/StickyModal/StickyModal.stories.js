import StickyModal from '../../src/components/StickyModal';
import NmgDoughnut from '../../src/components/Doughnut';
import { addDescription, containerSpacingDecorator } from '../story-helpers';

export default {
  title: 'Overlay/Sticky Modal',
  component: StickyModal,
  decorators: [containerSpacingDecorator],
  argTypes: {
    title: {
      control: { type: 'text' },
      defaultValue: 'Modal Title',
      name: 'Modal title',
    },
    subtitle: {
      control: { type: 'text' },
      defaultValue: 'My Subtitle',
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
    color: {
      control: { type: 'color' },
      // defaultValue: '#FFF',
      name: 'Header / Footer color',
    },
    size: {
      options: ['regular', 'small', 'wideSmall', 'big', 'medium', 'longMedium', 'auto', 'fullScreen'],
      control: { type: 'select' },
      defaultValue: 'fullScreen',
      name: 'Modal Size',
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
    disableButton: {
      control: { type: 'boolean' },
      defaultValue: true,
      name: 'Disable Button',
    },
    disableTooltip: {
      control: { type: 'text' },
      defaultValue: 'You need to enter values',
      name: 'Disable Tooltip',
    },
    showConfirmOverlay: {
      control: { type: 'boolean' },
      defaultValue: true,
      name: 'ShowConfirm Overlay',
    },
    triggerOverlay: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Trigger overlay',
    },
    overlayText: {
      control: { type: 'text' },
      defaultValue: 'Your work won’t be saved. Are you sure you want to exit?',
      name: 'Overlay Text',
    },
    overlayDescription: {
      control: { type: 'text' },
      defaultValue: '',
      name: 'Overlay description',
    },
    overlayPrimaryButtonText: {
      control: { type: 'text' },
      defaultValue: 'Exit',
      name: 'Overlay Primary Button Text',
    },
    overlaySecondaryButtonText: {
      control: { type: 'text' },
      defaultValue: 'Keep Edit',
      name: 'Overlay Secondary Button Text',
    },
    closeOnClickAway: {
      control: { type: 'boolean' },
      defaultValue: true,
      name: 'Close On Click Away',
    },
    closable: {
      control: { type: 'boolean' },
      defaultValue: true,
      name: 'Closable',
    },
    showHeader: {
      control: { type: 'boolean' },
      defaultValue: true,
      name: 'Show Header',
    },
    showFooter: {
      control: { type: 'boolean' },
      defaultValue: true,
      name: 'Show Footer',
    },
  },
  args: {
    title: 'Modal Title',
    subtitle: 'My Subtitle',
    primaryButtonText: 'Primary',
    primaryButtonStyleType: 'primary',
    secondaryButtonText: 'Secondary',
    secondaryButtonStyleType: 'secondary',
    size: 'fullScreen',
    primaryButtonProps: {},
    secondaryButtonProps: {},
    disableButton: true,
    disableTooltip: 'You need to enter values',
    showConfirmOverlay: true,
    triggerOverlay: false,
    overlayText: 'Your work won’t be saved. Are you sure you want to exit?',
    overlayDescription: '',
    overlayPrimaryButtonText: 'Exit',
    overlaySecondaryButtonText: 'Keep Edit',
    closeOnClickAway: true,
    closable: true,
    showHeader: true,
    showFooter: true,
  },
};

export const stickyModal = (args, { argTypes }) => ({
  components: { StickyModal },
  props: Object.keys(argTypes),
  data() {
    return {
      modalIsOpen: false,
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
      console.log(`Button ${buttonName} was clicked`);
    },
    keepEdit() {},
  },
  template: `
<div>
  <button @click="showModal">
    show modal
  </button>
  <sticky-modal
    :title="title"
    :color="color"
    :subtitle="subtitle"
    :modal-size="size"
    :modal-open="modalIsOpen"
    :primary-button-text="primaryButtonText"
    :primary-button-style-type="primaryButtonStyleType"
    :secondary-button-text="secondaryButtonText"
    :secondary-button-style-type="secondaryButtonStyleType"
    :primary-button-props="primaryButtonProps"
    :secondary-button-props="secondaryButtonProps"
    :disable-button="disableButton"
    :button-tooltip="disableButton && disableTooltip"
    :show-confirm-overlay="showConfirmOverlay"
    :overlay-text="overlayText"
    :trigger-overlay="triggerOverlay"
    :overlay-primary-button-text="overlayPrimaryButtonText"
    :overlay-secondary-button-text="overlaySecondaryButtonText"
    :overlay-description="overlayDescription"
    :close-on-click-away="closeOnClickAway"
    :closeable="closable"
    :show-header="showHeader"
    :show-footer="showFooter"
    @modal-close="onCloseModal"
    @secondary-button-clicked="buttonClicked('second-')"
    @primary-button-clicked="buttonClicked('primary-')"
    @keep-edit="keepEdit"
  >
    <template #header>
      <div :style="{ display: 'flex', flexDirection: 'column' }">
        <button>Header </button>
        <button>Header </button>
      </div>
    </template>
    <template #content>
      <div :style="{ display: 'flex', flexDirection: 'column' }">
      <button :style="{ height: '100px', marginTop:'10px'}">scrollable</button>
      <button :style="{ height: '100px', marginTop:'10px'}">scrollable</button>
      <button :style="{ height: '100px', marginTop:'10px'}">scrollable</button>
      <button :style="{ height: '100px', marginTop:'10px'}">scrollable</button>
      <button :style="{ height: '100px', marginTop:'10px'}">scrollable</button>
      <button :style="{ height: '100px', marginTop:'10px'}">scrollable</button>
      <button :style="{ height: '100px', marginTop:'10px'}">scrollable</button>
      <button :style="{ height: '100px', marginTop:'10px'}">scrollable</button>
      <button :style="{ height: '100px', marginTop:'10px'}">scrollable</button>
      <button :style="{ height: '100px', marginTop:'10px'}">scrollable</button>

      </div>
    </template>
    <template #footer>
      <button>footer</button>
      <button>footer</button>
      <button>footer</button>
      <button>footer</button>
      <button>footer</button>
      <button>footer</button>
    </template>
  </sticky-modal>
</div>
  `,
});
addDescription(stickyModal, 'Default Menu');

export const stickyModalTwoSections = (args, { argTypes }) => ({
  components: { StickyModal, NmgDoughnut },
  props: Object.keys(argTypes),
  data() {
    return {
      modalIsOpen: false,
      doughnutOptions: {
        height: 256,
        cutout: '80%',
      },
      dummyDoughnut: [
        {
          name: 'Value1',
          value: 5,
        },
        {
          name: 'Value2',
          value: 5,
        },
      ],
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
      console.log(`Button ${buttonName} was clicked`);
    },
    keepEdit() {},
  },
  template: `
<div>
  <button @click="showModal">
    show modal
  </button>
  <sticky-modal
    :title="title"
    :color="color"
    :subtitle="subtitle"
    :modal-size="size"
    :modal-open="modalIsOpen"
    :primary-button-text="primaryButtonText"
    :primary-button-style-type="primaryButtonStyleType"
    :secondary-button-text="secondaryButtonText"
    :secondary-button-style-type="secondaryButtonStyleType"
    :primary-button-props="primaryButtonProps"
    :secondary-button-props="secondaryButtonProps"
    :disable-button="disableButton"
    :button-tooltip="disableButton && disableTooltip"
    :show-confirm-overlay="showConfirmOverlay"
    :overlay-text="overlayText"
    :trigger-overlay="triggerOverlay"
    :overlay-primary-button-text="overlayPrimaryButtonText"
    :overlay-secondary-button-text="overlaySecondaryButtonText"
    :overlay-description="overlayDescription"
    :close-on-click-away="closeOnClickAway"
    :closeable="closable"
    :show-header="showHeader"
    :show-footer="false"
    @modal-close="onCloseModal"
    @secondary-button-clicked="buttonClicked('second-')"
    @primary-button-clicked="buttonClicked('primary-')"
    @keep-edit="keepEdit"
  >
    <template #header>
      <div :style="{ display: 'flex', flexDirection: 'column' }">
        <button>Header </button>
        <button>Header </button>
      </div>
    </template>
    <template #content>
      <div :style="{ display: 'flex', flexDirection: 'column' }">
      <button :style="{ height: '100px', marginTop:'10px'}">scrollable</button>
      <button :style="{ height: '100px', marginTop:'10px'}">scrollable</button>
      <button :style="{ height: '100px', marginTop:'10px'}">scrollable</button>
      <button :style="{ height: '100px', marginTop:'10px'}">scrollable</button>
      <button :style="{ height: '100px', marginTop:'10px'}">scrollable</button>
      <button :style="{ height: '100px', marginTop:'10px'}">scrollable</button>
      <button :style="{ height: '100px', marginTop:'10px'}">scrollable</button>
      <button :style="{ height: '100px', marginTop:'10px'}">scrollable</button>
      <button :style="{ height: '100px', marginTop:'10px'}">scrollable</button>
      <button :style="{ height: '100px', marginTop:'10px'}">scrollable</button>

      </div>
    </template>
    <template #right-section>
      <nmg-doughnut
        :doughnut-data="dummyDoughnut"
        :options="doughnutOptions"
        :style="{
          height: '100%',
          width:'100%',
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
                }"/>
    </template>

  </sticky-modal>
</div>
  `,
});
addDescription(stickyModalTwoSections, 'Default Menu');
