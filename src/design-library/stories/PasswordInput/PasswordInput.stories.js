import PasswordInput from '../../src/components/PasswordInput';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Input/Password Input',
  argTypes: {
    label: {
      control: { type: 'text' },
      defaultValue: '',
      name: 'Label',
    },
    placeholder: {
      control: { type: 'text' },
      defaultValue: '',
      name: 'Placeholder',
    },
    error: {
      control: { type: 'text' },
      defaultValue: '',
      name: 'Error',
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Disabled',
    },
  },
};

export const passwordInput = (args, { argTypes }) => ({
  components: { PasswordInput },
  props: Object.keys(argTypes),
  methods: { onInputChanged: action('Input') },
  template: `
    <password-input
      :label="label"
      :placeholder="placeholder"
      :error="error"
      :disabled="disabled"
      @input="onInputChanged"
    >
    </password-input>
  `,
});
