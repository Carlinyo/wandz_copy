import Scroller from '../../src/components/Scroller';

export default {
  title: 'UI Element/Scroller',
  argTypes: {
    size: {
      control: { type: 'number' },
      defaultValue: 40,
      name: 'Component height',
    },
  },
};

export const scroller = (args, { argTypes }) => ({
  components: { Scroller },
  props: Object.keys(argTypes),
  template: `
  <scroller
    :size="size"
  >
  </scroller>`,
});
