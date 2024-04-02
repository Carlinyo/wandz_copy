import Chips from '../../src/components/Chips';

export default {
  title: 'UI Element/Chips',
  argTypes: {
    type: {
      options: [
        'active',
        'scheduled',
        'allow',
        'pending',
        'ended',
        'draft',
        'stopped',
        'inactive',
        'hover',
        'trial',
        'blocked',
        'allowed',
        'testing',
        'published',
        'monitor',
      ],
      control: { type: 'select' },
      name: 'Chips type',
    },
    text: {
      control: { type: 'text' },
      name: 'Chips text',
    },
    color: {
      control: { type: 'text' },
      name: 'Chips background color',
    },
    resizeByContent: {
      control: { type: 'boolean' },
      name: 'Resize by content',
    },
    disableHover: {
      control: { type: 'boolean' },
      name: 'disable hover effect',
    },
  },
  args: {
    type: 'active',
    text: 'Active',
    color: '',
    resizeByContent: false,
    disableHover: false,
  },
};

export const chips = (args, { argTypes }) => ({
  components: { Chips },
  props: Object.keys(argTypes),
  template: `
  <chips
    :text="text"
    :type="type"
    :color="color"
    :resizeByContent="resizeByContent"
    :disableHover="disableHover"
  >
  </chips>`,
});
