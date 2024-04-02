import Tooltip from '../../src/components/Tooltip';
import Chips from '../../src/components/Chips/Chips';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Overlay / Tooltip / Tooltip Info',
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
    tooltipType: {
      options: ['regular', 'icon'],
      control: { type: 'select' },
      name: 'Tooltip Type',
    },
    tooltipIcon: {
      control: { type: 'file' },
      name: 'Tooltip icon',
    },
    trigger: {
      options: ['hover', 'click'],
      control: { type: 'select' },
      name: 'Trigger Action',
    },
  },
  args: {
    title: 'May 25, 2021 <br> Revenue: $10,201s',
    titleSeparator: true,
    text: 'Honney blocking changed from <b>0% to 50%</b>. <br> Amazon Assistant blocking changed from 50% to 100%.',
    showTooltip: true,
    primaryButtonText: '',
    secondaryButtonText: '',
    position: 'top-start',
    tooltipType: 'regular',
    tooltipIcon: '',
    trigger: 'hover',
  },
};

export const tooltipInfo = (args, { argTypes }) => ({
  components: { Tooltip, Chips },
  props: Object.keys(argTypes),
  methods: {
    primaryClick: action('primary-button-clicked'),
    secondaryClick: action('secondary-button-clicked'),
  },
  template: `
  <div style="display:flex; width: 100%; justify-content: center; height: 100%; min-height: 500px; align-items: center;">
      <tooltip
        :tooltip-type="tooltipType"
        :title="title"
        :title-separator="titleSeparator"
        :position="position"
        :text="text"
        :showTooltip="showTooltip"
        :primary-button-text="primaryButtonText"
        :secondary-button-text="secondaryButtonText"
        :tooltip-icon="tooltipIcon"
        :trigger="trigger"
        @primary-button-clicked="primaryClick"
        @secondary-button-clicked="secondaryClick"
      ><chips text="Tooltip"></chips></tooltip>
  </div>
`,
});
