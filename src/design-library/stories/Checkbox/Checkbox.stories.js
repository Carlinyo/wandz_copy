import { action } from '@storybook/addon-actions';
import NmgCheckbox from '../../src/components/Checkbox';

export default {
  title: 'Input/Checkbox',
  argTypes: {
    type: {
      options: ['regular', 'indeterminate'],
      control: { type: 'select' },
      defaultValue: 'regular',
      name: 'Checkbox type',
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Disable',
    },
    error: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Error State',
    },
  },
};

export const Checkbox = (args, { argTypes }) => ({
  components: { NmgCheckbox },
  props: Object.keys(argTypes),
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    action: action('checkboxClick'),
    onCheckboxClick() {
      this.checked = !this.checked;
    },
  },
  template: `
    <div class="tw-w-full tw-h-96 tw-flex tw-justify-center tw-items-center">
    <nmg-checkbox
      :checked="checked"
      :type="type"
      :disabled="disabled"
      :error="error"
      @checkboxClick="onCheckboxClick"
    />
    </div>
`,
});
