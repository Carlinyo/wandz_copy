import TextInput from '../../src/components/TextInput';
import { action } from '@storybook/addon-actions';
import moreInfo from '../../src/assets/icons/info/moreInfo.svg';
import textFormat from '../../src/assets/icons/TextInput/text-format.svg';
export default {
  title: 'Input/Text Input',
  argTypes: {
    label: {
      control: { type: 'text' },
      defaultValue: 'Label',
      name: 'Label',
    },
    placeholder: {
      control: { type: 'text' },
      defaultValue: 'Placeholder',
      name: 'Placeholder',
    },
    tooltip: {
      control: { type: 'text' },
      name: 'Tooltip text',
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
    mainIcon: {
      control: { type: 'file' },
      name: 'Main icon',
    },
    inputIcon: {
      control: { type: 'file' },
      name: 'Input icon',
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
    maxLength: {
      control: { type: 'number' },
      defaultValue: 364,
      name: 'Max. number of characters',
    },
    showNumOfChar: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Show number of characters',
    },
    validState: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Valid State',
    },
    mandatory: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    tooltip: 'Tooltip text',
    error: false,
    errorMessage: 'Validation error',
    disabled: false,
    mainIcon: moreInfo,
    inputIcon: null,
    showSecondaryIcon: false,
    secondaryIcon: textFormat,
    width: 364,
    maxLength: 364,
    showNumOfChar: false,
    validState: false,
    mandatory: false,
  },
};

export const textInput = (args, { argTypes }) => ({
  components: { TextInput },
  props: Object.keys(args),
  methods: {
    onInputChanged: action('Inputed'),
    onSecondaryIconClicked: action('Secondary Icon Clicked'),
  },
  template: `
  <textInput
    v-bind="$props"
    @input="onInputChanged"
    @secondary-icon-clicked="onSecondaryIconClicked"
  >
  </textInput>`,
});
