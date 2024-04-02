import Tooltip from '../../src/components/Tooltip';
import Chips from '../../src/components/Chips/Chips';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Overlay / Tooltip / Tooltip Recommendation',
  argTypes: {
    title: {
      control: { type: 'text' },
      name: 'Tooltip title',
    },
    titleSeparator: {
      control: { type: 'boolean' },
      name: 'Show title separator',
    },
    text: {
      control: { type: 'text' },
      name: 'Tooltip text/html',
    },
    showTooltip: {
      control: { type: 'boolean' },
      name: 'Show tooltip',
    },
    primaryButtonText: {
      control: { type: 'text' },
      name: 'Primary button text',
    },
    secondaryButtonText: {
      control: { type: 'text' },
      name: 'Secondary button text',
    },
    position: {
      options: [
        'auto',
        'auto-start',
        'auto-end',
        'top-start',
        'top-end',
        'left',
        'right',
        'bottom-left',
        'bottom-right',
      ],
      control: { type: 'select' },
      name: 'Position',
    },
  },
  args: {
    title: 'Title',
    titleSeparator: false,
    text: '<i>Campaigns</i> that are <b>scheduled</b> to start running on your site in the future.',
    showTooltip: true,
    primaryButtonText: 'Primary',
    secondaryButtonText: '',
    position: 'top-start',
  },
};

export const tooltipRecommendation = (args, { argTypes }) => ({
  components: { Tooltip, Chips },
  props: Object.keys(argTypes),
  methods: {
    primaryClick: action('primary-button-clicked'),
    secondaryClick: action('secondary-button-clicked'),
  },
  template: `
  <div style="display:flex; width: 100%; justify-content: center; height: 100%; min-height: 500px; align-items: center;">
      <tooltip
        :title="title"
        :title-separator="titleSeparator"
        :position="position"
        :text="text"
        :showTooltip="showTooltip"
        :primary-button-text="primaryButtonText"
        :secondary-button-text="secondaryButtonText"
        @primary-button-clicked="primaryClick"
        @secondary-button-clicked="secondaryClick"
      ><chips text="Tooltip"></chips></tooltip>
  </div>
`,
});
