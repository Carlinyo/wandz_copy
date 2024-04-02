import TextBox from '../../src/components/TextBox';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Input/Text Box',
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      defaultValue: 'Placeholder',
      name: 'Placeholder',
    },
    error: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Validation error',
    },
    errorMessage: {
      control: { type: 'text' },
      defaultValue: 'Validation error',
      name: 'Validation error text',
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Disabled',
    },
    showMainIcon: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Show main icon',
    },
    mainIcon: {
      control: { type: 'file' },
      name: 'Main icon',
    },
    showSecondaryIcon: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Show secondary icon',
    },
    secondaryIcon: {
      control: { type: 'file' },
      name: 'Secondary icon',
    },
    width: {
      control: { type: 'number' },
      defaultValue: 364,
      name: 'Component width',
    },
    maxCharacter: {
      control: { type: 'number' },
      defaultValue: 100,
      name: 'Max character',
    },
    label: {
      control: { type: 'text' },
    },
  },
  args: {
    placeholder: 'Placeholder',
    error: false,
    errorMessage: 'Validation error',
    disabled: false,
    showMainIcon: false,
    mainIcon: null,
    showSecondaryIcon: false,
    secondaryIcon: null,
    width: 364,
    maxCharacter: 100,
    label: 'Label',
  },
};

export const textBox = (args, { argTypes }) => ({
  components: { TextBox },
  props: Object.keys(argTypes),
  methods: {
    onInputChanged: action('Inputed'),
    onSecondaryIconClicked: action('Secondary Icon Clicked'),
  },
  template: `
  <text-box
    :error="error"
    :errorMessage="errorMessage"
    :disabled="disabled"
    :showMainIcon="showMainIcon"
    :showSecondaryIcon="showSecondaryIcon"
    :mainIcon="mainIcon"
    :secondaryIcon="secondaryIcon"
    :placeholder="placeholder"
    :width="width"
    :maxCharacter="maxCharacter"
    :label="label"
    @input="onInputChanged"
    @secondary-icon-clicked="onSecondaryIconClicked"
  >
  </text-box>`,
});
