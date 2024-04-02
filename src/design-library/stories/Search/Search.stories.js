import { action } from '@storybook/addon-actions';
import Search from '../../src/components/Search';

export default {
  title: 'Input/Search',
  argTypes: {
    type: {
      options: ['large', 'medium', 'small'],
      control: { type: 'select' },
      name: 'Search size',
    },
    width: {
      control: { type: 'number' },
      name: 'Component width',
    },
    disabled: {
      control: { type: 'boolean' },
      name: 'Disabled',
    },
    inputCustomStyle: {
      control: { type: 'object' },
      name: 'inputCustomStyle',
    },
  },
  args: {
    type: 'medium',
    disabled: false,
  },
};

export const search = (args, { argTypes }) => ({
  components: { Search },
  props: Object.keys(argTypes),
  methods: {
    onInputChanged: action('Inputed'),
  },
  template: `
    <div class="tw-flex tw-w-96 tw-h-full tw-m-auto">
      <search
        :type="type"
        :width="width"
        :disabled="disabled"
        @input-changed="onInputChanged"
      >
      </search>
    </div>`,
});
