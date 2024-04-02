import { action } from '@storybook/addon-actions';
import MyButton from '../../src/components/Button';

export default {
  title: 'UI Element/Button',
  argTypes: {
    styleType: {
      options: ['primary', 'secondary', 'textLink', 'textLinkWhite'],
      control: { type: 'select' },
      defaultValue: 'primary',
      name: 'Button type',
    },
    text: {
      control: { type: 'text' },
      defaultValue: 'Click me!',
      name: 'Button text',
    },
    isLoading: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Is Loading',
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Disable',
    },
    smallSize: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Small size',
    },
    textPadding: {
      control: { type: 'number' },
      defaultValue: false,
      name: 'Text padding size',
    },
    customWidth: {
      control: { type: 'number' },
      defaultValue: false,
      name: 'Button custom width',
    },
    reverseImage: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Reverse between image and text',
    },
    iconSrcLeft: {
      control: { type: 'file' },
      defaultValue: '',
      name: 'Left Icon src to show aside the text',
    },
    iconSrcRight: {
      control: { type: 'file' },
      defaultValue: '',
      name: 'Right Icon src to show aside the text',
    },
    canvasBackgroundColor: {
      control: { type: 'color' },
      defaultValue: '#FFFFFF',
      name: 'Canvas Background Color',
    },
  },
  args: {
    styleType: 'primary',
    text: 'Click me!',
    isLoading: false,
    disabled: false,
    smallSize: false,
    customWidth: 0,
    reverseImage: false,
    iconSrcLeft: '',
    iconSrcRight: '',
    canvasBackgroundColor: '#FFFFFF',
  },
};

export const button = (args, { argTypes }) => ({
  components: { MyButton },
  props: Object.keys(argTypes),
  methods: { action: action('clicked') },
  template: `
  <div
    class="tw-flex tw-justify-center tw-items-center"
    style="height: 200px;"
    :style="{backgroundColor: canvasBackgroundColor}"
  >
    <my-button
      :disabled="disabled"
      :is-loading="isLoading"
      :styleType="styleType"
      :on-click="action"
      :smallSize="smallSize"
      :customWidth="customWidth"
      :reverseImage="reverseImage"
      :iconSrcLeft="iconSrcLeft"
      :iconSrcRight="iconSrcRight"
      :textPadding="textPadding"
    >
      {{ text }}
    </my-button>
  </div>`,
});
