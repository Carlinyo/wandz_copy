import Tooltip from '../../src/components/Tooltip';
import Chips from '../../src/components/Chips/Chips';

export default {
  title: 'Overlay / Tooltip / Tooltip Regular',
  argTypes: {
    text: {
      control: { type: 'text' },
      name: 'Tooltip text/html',
    },
    showTooltip: {
      control: { type: 'boolean' },
      name: 'Show tooltip',
    },
  },
  args: {
    text: '<i>Campaigns</i> that are <b>scheduled</b> to start running on your site in the future.',
    showTooltip: true,
  },
};

export const tooltipRegular = (args, { argTypes }) => ({
  components: { Tooltip, Chips },
  props: Object.keys(argTypes),
  template: `
<div >
  <div style="display:flex;">
    <div style="margin-top: 80px; margin-left: 30px">
      <tooltip :position="'top-start'" :text="text" :showTooltip="showTooltip"><chips text="Top start"></chips></tooltip>
    </div>
    <div style="margin-top: 80px; margin-left: 380px">
      <tooltip :position="'top-end'" :text="text" :showTooltip="showTooltip"><chips text="Top end"></chips></tooltip>
    </div>
  </div>
  <div style="display:flex;">
    <div style="margin-top: 80px; margin-left: 30px">
      <tooltip :position="'right'" :text="text" :showTooltip="showTooltip"><chips text="Right"></chips></tooltip>
    </div>
    <div style="margin-top: 80px; margin-left: 380px">
      <tooltip :position="'left'" :text="text" :showTooltip="showTooltip"><chips text="Left"></chips></tooltip>
    </div>
  </div>
  <div style="display:flex;">
    <div style="margin-top: 80px; margin-left: 30px">
      <tooltip :position="'bottom-start'" :text="text" :showTooltip="showTooltip"><chips text="Bottom start"></chips></tooltip>
    </div>
    <div style="margin-top: 80px; margin-left: 380px">
      <tooltip :position="'bottom-end'" :text="text" :showTooltip="showTooltip"><chips text="Bottom end"></chips></tooltip>
    </div>
  </div>
</div>
`,
});
