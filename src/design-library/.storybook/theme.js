import { create } from '@storybook/theming/create';

export default create({
  base: 'light',

  colorPrimary: '#FFDF5A',
  colorSecondary: '#FFDF5A',

  // UI
  appBg: 'white',
  appContentBg: 'white',
  appBorderColor: 'grey',
  appBorderRadius: 4,

  // Typography
  fontBase: `'Figtree', "Open Sans", sans-serif`,
  fontCode: 'monospace',

  // Text colors
  textColor: '#10111B',
  textInverseColor: 'rgba(255,255,255,0.8)',

  // Toolbar default and active colors
  barTextColor: '#10111B',
  barSelectedColor: '#10111B',
  barBg: '#FFDF5A',

  // Form colors
  inputBg: 'white',
  inputBorder: '#585961',
  inputTextColor: '#10111B',
  inputBorderRadius: 4,

  brandTitle: 'Namogoo storybook',
  brandUrl: 'https://namogoo.com',
  brandImage: 'https://nmg-platform-resources.s3.amazonaws.com/nmg-name-icon.svg',
});
