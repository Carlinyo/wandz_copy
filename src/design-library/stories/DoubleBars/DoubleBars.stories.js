import DoubleBars from '../../src/components/DoubleBars';

export default {
  title: 'Data Viz/Double Bars',
  argTypes: {
    value: {
      control: { type: 'array' },
      defaultValue: [
        {
          name: 'Before 7.2%',
          value: 7.173657,
          chunkCount: 732,
          totalCount: 10204,
        },
        {
          name: 'After 4.3%',
          value: 4.263151,
          chunkCount: 996,
          totalCount: 23363,
        },
      ],
      name: 'Value',
    },
    // options: {
    //   control: { type: 'object' },
    //   defaultValue: {},
    //   name: 'Options'
    // },
    // yPostfix: {
    //   control: { type: 'text' },
    //   name: 'Y Postfix'
    // },
    // yPrefix: {
    //   control: { type: 'text' },
    //   name: 'Y Prefix'
    // },
    // topBarText: {
    //   control: { type: 'boolean' },
    //   name: 'Top Bar Text',
    //   defaultValue: false,
    // },
    leftBarColor: {
      control: { type: 'color' },
      name: 'Left Bar Color',
    },
    rightBarColor: {
      control: { type: 'color' },
      name: 'Right Bar Color',
    },
    // colorList: {
    //   control: { type: 'array' },
    //   defaultValue: ['#62B0DC', '#FFAD31'],
    //   name: 'Color List'
    // },
    disableTooltip: {
      control: { type: 'boolean' },
      name: 'Disable Tooltip',
      defaultValue: false,
    },
    // barCanvasStyle: {
    //   control: { type: 'object' },
    //   defaultValue: {
    //     width: '380px',
    //     height: '370px'
    //   },
    //   name: 'Bar Canvas Style'
    // },
    // barPositioning: {
    //   control: { type: 'object' },
    //   defaultValue: {},
    //   name: 'Bar Positioning'
    // },
    // decimal: {
    //   control: { type: 'number' },
    //   name: 'Decimal',
    //   defaultValue: 0,
    // },
    // barTextSize: {
    //   control: { type: 'number' },
    //   name: 'Bar Text Size',
    //   defaultValue: 14,
    // },
    // uplift: {
    //   control: { type: 'number' },
    //   name: 'Uplift',
    //   defaultValue: null,
    // },
    // averageLine: {
    //   control: { type: 'number' },
    //   name: 'Average Line',
    // },
  },
  args: {
    value: [
      {
        name: 'Before 7.2%',
        value: 7.173657,
        chunkCount: 732,
        totalCount: 10204,
      },
      {
        name: 'After 4.3%',
        value: 4.263151,
        chunkCount: 996,
        totalCount: 23363,
      },
    ],
    options: {},
    yPostfix: '',
    yPrefix: '',
    topBarText: false,
    leftBarColor: '#638CF4',
    rightBarColor: '#E2EAFD',
    disableTooltip: false,
    barCanvasStyle: {
      width: '380px',
      height: '370px',
    },
    barPositioning: {},
    decimal: 0,
    barTextSize: 14,
    uplift: null,
    averageLine: null,
  },
};

export const doubleBars = (args, { argTypes }) => ({
  components: { DoubleBars },
  props: Object.keys(argTypes),
  template: `
  <div style="height: 300px; width: 300px;">
    <doubleBars
      :value="value"
      :options="options"
      :yPostfix="yPostfix"
      :yPrefix="yPrefix"
      :topBarText="topBarText"
      :leftBarColor="leftBarColor"
      :rightBarColor="rightBarColor"
      :disableTooltip="disableTooltip"
      :barCanvasStyle="barCanvasStyle"
      :barPositioning="barPositioning"
      :decimal="decimal"
      :barTextSize="barTextSize"
      :uplift="uplift"
      :averageLine="averageLine"
    >
    </doubleBars>
  </div>`,
});
