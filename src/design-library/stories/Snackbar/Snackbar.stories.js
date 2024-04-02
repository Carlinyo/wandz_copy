import Snackbars from '../../src/components/Snackbars';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Communication/Snackbar',
  argTypes: {
    type: {
      options: ['positive', 'negative', 'info'],
      control: { type: 'select' },
      defaultValue: 'positive',
      name: 'Banner type',
    },
    text: {
      control: { type: 'text' },
      defaultValue: 'You can have only one campaign live at a time.',
      name: 'Banner text',
    },
    showIcon: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Show Icon',
    },
    showXIcon: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Show X Icon',
    },
    showButtonOne: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Show Button One',
    },
    buttonOneText: {
      control: { type: 'text' },
      defaultValue: 'Button 1',
      name: 'Button One Text',
    },
    buttonOneType: {
      options: ['primary', 'secondary', 'textLink', 'textLinkWhite'],
      control: { type: 'select' },
      defaultValue: 'primary',
      name: 'Button One Type',
    },
    buttonOneTextPadding: {
      control: { type: 'number' },
      defaultValue: 0,
      name: 'Button One Text Padding',
    },
    showButtonTwo: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Show Button Two',
    },
    buttonTwoText: {
      control: { type: 'text' },
      defaultValue: 'Button 2',
      name: 'Button Two Text',
    },
    buttonTwoType: {
      options: ['primary', 'secondary', 'textLink', 'textLinkWhite'],
      control: { type: 'select' },
      defaultValue: 'primary',
      name: 'Button Two Type',
    },
    buttonTwoTextPadding: {
      control: { type: 'number' },
      defaultValue: 0,
      name: 'Button Two Text Padding',
    },
    timerToDisappear: {
      control: { type: 'number' },
      defaultValue: 0,
      name: 'Timer',
    },
  },
  args: {
    type: 'positive',
    text: 'You can have only one campaign live at a time.',
    showIcon: true,
    showXIcon: true,
    showButtonOne: true,
    buttonOneText: 'Button 1',
    buttonOneType: 'primary',
    buttonOneTextPadding: 24,
    showButtonTwo: false,
    buttonTwoText: 'Button 2',
    buttonTwoType: 'primary',
    buttonTwoTextPadding: 24,
    timerToDisappear: 0,
  },
};

export const snackbar = (args, { argTypes }) => ({
  components: { Snackbars },
  props: Object.keys(argTypes),
  methods: {
    actionButtonX: action('clicked Button X'),
    actionButton1: action('clicked Button 1'),
    actionButton2: action('clicked Button 2'),
  },
  template: `
  <snackbars
    :text="text"
    :type="type"
    :showIcon="showIcon"
    :showXIcon="showXIcon"
    :showButtonOne="showButtonOne"
    :showButtonTwo="showButtonTwo"
    :buttonOneText="buttonOneText"
    :buttonTwoText="buttonTwoText"
    :buttonOneType="buttonOneType"
    :buttonTwoType="buttonTwoType"
    :buttonOneTextPadding="buttonOneTextPadding"
    :buttonTwoTextPadding="buttonTwoTextPadding"
    :timerToDisappear="timerToDisappear"
    @snackbarClickButtonX="actionButtonX"
    @snackbarClickButton1="actionButton1"
    @snackbarClickButton2="actionButton2"
  >
  </snackbars>`,
});
