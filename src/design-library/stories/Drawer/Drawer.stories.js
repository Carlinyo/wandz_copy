import Drawer from '../../src/components/Drawer';
import NmgButton from '../../src/components/Button';

export default {
  title: 'Overlay/Drawer',
  argTypes: {
    primaryButtonText: {
      control: { type: 'text' },
      defaultValue: 'Confirm',
      name: 'Main button text',
    },
    secondaryButtonText: {
      control: { type: 'text' },
      defaultValue: 'Save',
      name: 'Secondary button text',
    },
    tertiaryButtonText: {
      control: { type: 'text' },
      defaultValue: 'Back',
      name: 'Tertiary button text',
    },
    tertiaryButtonStyle: {
      control: { type: 'text' },
      defaultValue: 'textLink',
      name: 'Tertiary button type',
    },
    hideX: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Hide X',
    },
    shouldCloseWithClickOutside: {
      control: { type: 'boolean' },
      defaultValue: true,
      name: 'Close by clicking outside',
    },
    showTertiaryButton: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Show tertiary button',
    },
    disabledBtn: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Disable main button',
    },
    showDimmer: {
      control: { type: 'boolean' },
      defaultValue: true,
      name: 'Dim screen when drawer is open',
    },
    displayDirection: {
      control: { type: 'select' },
      options: ['left', 'right'],
      defaultValue: 'right',
      name: 'Drawer direction',
    },
    title: {
      control: { type: 'text' },
      defaultValue: 'Drawer for cool people',
      name: 'Drawer title',
    },
    header: {
      control: { type: 'text' },
      defaultValue: 'This header is the best',
      name: 'Drawer header',
    },
    content: {
      control: { type: 'text' },
      defaultValue: "We've got content for days",
      name: 'Drawer content',
    },
    primaryButtonTooltip: {
      control: { type: 'text' },
      defaultValue: '',
      name: 'Primary Button Tooltip',
    },
  },
  args: {
    primaryButtonText: 'Confirm',
    secondaryButtonText: 'Save',
    tertiaryButtonText: 'Back',
    tertiaryButtonStyle: 'textLink',
    hideX: false,
    shouldCloseWithClickOutside: true,
    showTertiaryButton: false,
    disabledBtn: false,
    showDimmer: true,
    displayDirection: 'right',
    title: 'Drawer for cool people',
    header: 'This header is the best',
    content: "We've got content for days",
    primaryButtonTooltip: '',
  },
};

export const drawer = (args, { argTypes }) => ({
  components: { Drawer, NmgButton },
  props: Object.keys(argTypes),
  methods: {
    toggle() {
      this.showDrawer = !this.showDrawer;
    },
  },
  data() {
    return {
      showDrawer: false,
    };
  },
  template: `
<div>
  <div style="background-color:wheat; border-bottom: 1px solid black; height:54px; width: 100%; z-index: 3254325235235; position:absolute; top:0; left:0;">Top Bar</div>
  <Drawer
    v-if="showDrawer"
    :primary-button-text="primaryButtonText"
    :secondary-button-text="secondaryButtonText"
    :tertiary-button-text="tertiaryButtonText"
    :tertiary-button-style="tertiaryButtonStyle"
    :hide-x="hideX"
    :should-close-with-click-outside="shouldCloseWithClickOutside"
    :show-tertiary-button="showTertiaryButton"
    :disabled-btn="disabledBtn"
    :show-dimmer="showDimmer"
    :display-direction="displayDirection"
    :primary-button-tooltip-text="primaryButtonTooltip"
    @closeDrawer="toggle"
  >
    <div slot="title">{{ title }}</div>
    <div slot="header">{{ header }}</div>
    <div slot="main" style="padding-top:30px;">{{ content }}</div>
  </Drawer>
  <div style="margin-top:60px;" >
    <nmg-button @click="toggle">
      Open
    </nmg-button>
  </div>
</div>
`,
});
