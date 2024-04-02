import PieChartComp from '../../src/components/PieChart';

const slices = [
  { text: 'red tomato', value: 20 },
  { text: 'pink pitaya', value: 10 },
  { text: 'orange carrot', value: 10 },
  { text: 'yellow banana', value: 10 },
  { text: 'green apple', value: 10 },
  { text: 'azure sky', value: 10 },
  { text: 'blue orchid', value: 10 },
  { text: 'purple eggplant', value: 10 },
  { text: 'No more colors', value: 10 },
  { text: 'Custom color', value: 10, color: '#009688' },
];

export default {
  title: 'Data Viz/Pie Chart',
  component: { PieChart: PieChartComp },
  argTypes: {
    chartData: {
      control: { type: 'array' },
      name: 'chartData',
      description: "chartData Rows Array example: ```[ { text: '', value: '', color: '' }, ...]```  ",
      defaultValue: slices,
    },
    tooltipValueText: {
      control: { type: 'text' },
      name: 'tooltipValueText',
      description: 'Text to appear next to actual value in tooltip',
      defaultValue: 'Nose Boops',
    },
    selectSlice: {
      control: { type: 'object' },
      name: 'selectSlice',
      description: 'Object taken from chartData that is currently selected(highlighted)',
      defaultValue: slices[0],
    },
    changeSelectedSlice: {
      control: { type: 'boolean' },
      name: 'changeSelectedSlice',
      defaultValue: false,
      description: 'should a slice pop when being selected',
    },
    fontSize: {
      control: { type: 'number' },
      name: 'fontSize',
      defaultValue: 12,
      description: 'font size of the labels',
    },
  },
  args: {
    chartData: slices,
    tooltipValueText: 'Nose Boops',
    selectSlice: slices[0],
    changeSelectedSlice: false,
    fontSize: 12,
  },
};

export const PieChart = (args) => ({
  components: { PieChart: PieChartComp },
  props: Object.keys(args),
  template: `
  <div>
    <PieChart
      v-bind="$props"
    />
  </div>
`,
});
