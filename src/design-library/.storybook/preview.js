// @ts-ignore-next-line
require('../src/styles/global.scss');
require('../src/styles/tw.css');
// NOTE: require base styles and fonts here where we know its a dev env, to mimic platform env
// rather than requiring it in the main.scss and bundling assets;
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewMode: 'docs',
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Foundations',
        'Input',
        'Communication',
        'Data Viz',
        'Navigation',
        'Icons',
        'UI Element',
        'Overlay',
        'Animation',
      ],
    },
  },
};
