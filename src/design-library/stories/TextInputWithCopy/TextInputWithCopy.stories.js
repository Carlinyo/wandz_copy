import TextInputWithCopy from '../../src/components/TextInputWithCopy';
import { action } from '@storybook/addon-actions';
import copyIcon from '../../src/assets/icons/actions/copy.svg';
import infoIcon from '../../src/assets/icons/info/moreInfo.svg';

export default {
  title: 'Input/Text Input With Copy',
  argTypes: {
    showFirstLineLabel: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Show first line label',
    },
    shadow: {
      control: { type: 'boolean' },
      defaultValue: true,
      name: 'Show shadow',
    },
    placeholder: {
      control: { type: 'text' },
      defaultValue: 'Placeholder',
      name: 'Placeholder',
    },
    value: {
      control: { type: 'text' },
    },
    tooltip: {
      control: { type: 'text' },
      name: 'Tooltip text',
    },
    errorMessage: {
      control: { type: 'text' },
      defaultValue: 'Validation error',
      name: 'Validation error text',
    },
    error: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Validation error',
    },
    label: {
      control: { type: 'text' },
      defaultValue: 'Label',
      name: 'Label',
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
    // inputIcon: {
    //   control: { type: 'file' },
    //   name: 'Input icon'
    // },
    copyIcon: {
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
    validState: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Valid State',
    },
    multiLine: {
      control: { type: 'boolean' },
      default: false,
    },
    iconWithText: {
      control: { type: 'boolean' },
      default: false,
    },
    useEllipsis: {
      control: { type: 'boolean' },
    },
    rows: {
      control: { type: 'number' },
    },
    breakAnywhere: {
      control: { type: 'boolean' },
    },
    clickAnywhere: {
      control: { type: 'boolean' },
    },
  },
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    tooltip: '',
    error: false,
    errorMessage: 'Validation error',
    disabled: true,
    inputIcon: null,
    showSecondaryIcon: false,
    secondaryIcon: null,
    maxLength: 364,
    validState: false,
    // multiLine: false,
    iconWithText: false,
    value: 'RAX1234567890',
    copyIcon: copyIcon,
    mainIcon: infoIcon,
    useEllipsis: true,
    rows: 1,
    breakAnywhere: false,
    clickAnywhere: false,
  },
};

export const textInputWithCopy = (args, { argTypes }) => ({
  components: { TextInputWithCopy },
  props: Object.keys(args),
  methods: {
    onInputChanged: action('Inputed'),
    onSecondaryIconClicked: action('Secondary Icon Clicked'),
  },
  template: `
  <text-input-with-copy
    v-bind="$props"
    @input="onInputChanged"
    @secondary-icon-clicked="onSecondaryIconClicked"
  >
  </text-input-with-copy>`,
});
