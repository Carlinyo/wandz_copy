import Pills from '../../src/components/Pills';

export default {
  title: 'UI Element/Pills',
  argTypes: {
    closeable: {
      control: { type: 'boolean' },
      name: 'Has X button',
    },
    text: {
      control: { type: 'text' },
      name: 'Pills text',
    },
    border: {
      control: { type: 'boolean' },
      name: 'Border',
    },
    disabled: {
      control: { type: 'boolean' },
      name: 'Disabled',
    },
  },
  args: {
    closeable: true,
    text: 'Something new',
    border: true,
    disabled: false,
  },
};

export const pills = (args, { argTypes }) => ({
  components: { Pills },
  props: Object.keys(argTypes),
  template: `
  <pills
    :closeable="closeable"
    :text="text"
    :border="border"
    :disabled="disabled"
  >
  </pills>`,
});
