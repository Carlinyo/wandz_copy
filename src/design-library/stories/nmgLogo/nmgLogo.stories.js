import Logo from '../../src/components/Logo';

export default {
  component: Logo,
  title: 'UI Element/Nmg Logo',
  argTypes: {
    type: {
      options: ['yellow', 'black', 'icon'],
      control: { type: 'radio' },
      defaultValue: 'yellow',
      name: 'Logo Type',
    },
    width: {
      control: { type: 'number' },
      defaultValue: 172,
      name: 'Component width',
    },
    height: {
      control: { type: 'number' },
      defaultValue: 18,
      name: 'Component height',
    },
  },
};

export const nmgLogo = (args, { argTypes }) => ({
  components: { Logo },
  props: Object.keys(argTypes),
  template: `
  <logo
    :type="type"
    :width="width"
    :height="height"
  >
  </logo>`,
});
