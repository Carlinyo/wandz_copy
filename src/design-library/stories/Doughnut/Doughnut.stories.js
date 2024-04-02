import { action } from '@storybook/addon-actions';
import Doughnut from '../../src/components/Doughnut';

const brandBlue = '#85E3F6';

export default {
  title: 'Data Viz/Doughnut',
  argTypes: {
    doughnutData: {
      control: { type: 'array' },
      defaultValue: [
        { name: 'Google', value: 4418 },
        {
          name: 'Direct',
          value: 4261,
        },
        { name: 'Google Ad Services', value: 1540 },
        {
          name: 'Bing',
          value: 237,
        },
        { name: 'Facebook', value: 66 },
        { name: 'Snapchat', value: 26 },
        {
          name: 'Other',
          value: 21,
        },
      ],
      name: 'Doughnut data',
    },
    options: {
      control: { type: 'object' },
      defaultValue: { height: 256, cutout: '80%' },
      name: 'Options',
    },
    colorList: {
      control: { type: 'array' },
      name: 'Color List',
    },
    totalText: {
      control: { type: 'text' },
      name: 'Total Text',
    },
    enableLegend: {
      control: { type: 'boolean' },
      name: 'Enable Legend',
      defaultValue: true,
    },
    enablePercentage: {
      control: { type: 'boolean' },
      name: 'Enable Percentage',
      defaultValue: true,
    },
    roundPercentage: {
      control: { type: 'boolean' },
      name: 'Round Percentage',
      defaultValue: false,
    },
    onlyPercentageInLegend: {
      control: { type: 'boolean' },
      name: 'Only Percentage In Legend',
      defaultValue: false,
    },
    onlyPercentageInTooltip: {
      control: { type: 'boolean' },
      name: 'Only Percentage In Tooltip',
      defaultValue: false,
    },
    disableInnerText: {
      control: { type: 'boolean' },
      name: 'Disable Inner Text',
      defaultValue: false,
    },
    emitHover: {
      control: { type: 'boolean' },
      name: 'Emit Hover',
      defaultValue: false,
    },
    noValuesForLegend: {
      control: { type: 'boolean' },
      name: 'No Values For Legend',
      defaultValue: false,
    },
    normalizeMinimum: {
      control: { type: 'boolean' },
      name: 'Normalize Minimum',
      defaultValue: false,
    },
    noramlizationMultiplier: {
      control: { type: 'number' },
      name: 'Normalization Multiplier',
      defaultValue: 2,
    },
    deepMerge: {
      control: { type: 'boolean' },
      name: 'Deep Merge',
      defaultValue: false,
    },
    legendTextSpaced: {
      control: { type: 'text' },
      name: 'Legend Text Spaced',
    },
    legendTextPosition: {
      control: { type: 'text' },
      name: 'Legend Text Position',
    },
    isLegendTextEllipsis: {
      control: { type: 'boolean' },
      name: 'Is Legend Text Ellipsis',
      defaultValue: true,
    },
    innerTextWidth: {
      control: { type: 'text' },
      name: 'Inner Text Width',
    },
    customTotalIssues: {
      control: { type: 'number' },
      name: 'Custom Total Issues',
    },
    legendColumns: {
      control: { type: 'number' },
      name: 'Legend Columns',
    },
    isScrollable: {
      control: { type: 'boolean' },
      name: 'Is Scrollable',
      defaultValue: false,
    },
    legendMaxWidth: {
      control: { type: 'text' },
      name: 'Legend Max Width',
    },
    isDoughnutContainerFlex: {
      control: { type: 'boolean' },
      name: 'Is Doughnut Container Flex',
      defaultValue: true,
    },
    customDoughnutContainer: {
      control: { type: 'text' },
      name: 'Custom Doughnut Container',
    },
    customDoughnutLegend: {
      control: { type: 'text' },
      name: 'Custom Doughnut Legend',
    },
    customCanvas: {
      control: { type: 'text' },
      name: 'Custom Canvas',
    },
    legendColumnPerRow: {
      control: { type: 'number' },
      defaultValue: 3,
      name: 'Legend Column Per Row',
    },
    layoutDirection: {
      control: { type: 'text' },
      defaultValue: 'column',
      name: 'Layout Direction',
    },
    tooltipBackgroundColor: {
      control: { type: 'color' },
      name: 'Tooltip Background Color',
      defaultValue: '#FFFFFF',
    },
    tooltipTextColor: {
      control: { type: 'color' },
      name: 'Tooltip Text Color',
      defaultValue: '#131F3C',
    },
    fullWidth: {
      control: { type: 'boolean' },
      name: 'Full Width',
      defaultValue: true,
    },
    legendSpacing: {
      control: { type: 'text' },
      defaultValue: 'space-evenly',
      name: 'Legend Spacing',
    },
    legendBottomMargin: {
      control: { type: 'text' },
      name: 'Legend Bottom Margin',
    },
    disabled: {
      control: { type: 'boolean' },
      name: 'Is Disabled',
      defaultValue: false,
    },
    disabledTooltip: {
      control: { type: 'boolean' },
      name: 'Is Disabled Tooltip',
      defaultValue: false,
    },
    issuesColor: {
      control: { type: 'text' },
      name: 'Issues Color',
      defaultValue: '',
    },
  },
  args: {
    doughnutData: [
      { name: 'Google', value: 4418 },
      {
        name: 'Direct',
        value: 4261,
      },
      { name: 'Google Ad Services', value: 1540 },
      {
        name: 'Bing',
        value: 237,
      },
      { name: 'Facebook', value: 66 },
      { name: 'Snapchat', value: 26 },
      {
        name: 'Other',
        value: 21,
      },
    ],
    options: { height: 256, cutout: '80%' },
    // colorList: [
    //   '#ED64A7',
    //   '#558CEB',
    //   '#8DD8C6',
    //   '#FF8E4F',
    //   '#83D4FF',
    // ],
    totalText: 'Total',
    enableLegend: true,
    enablePercentage: true,
    roundPercentage: false,
    onlyPercentageInLegend: false,
    onlyPercentageInTooltip: false,
    disableInnerText: false,
    emitHover: false,
    noValuesForLegend: false,
    normalizeMinimum: false,
    noramlizationMultiplier: 2,
    deepMerge: false,
    legendTextSpaced: '',
    legendTextPosition: '',
    isLegendTextEllipsis: true,
    innerTextWidth: '',
    customTotalIssues: 0,
    legendColumns: 0,
    isScrollable: false,
    legendMaxWidth: '',
    isDoughnutContainerFlex: true,
    customDoughnutContainer: '',
    customDoughnutLegend: '',
    customCanvas: '',
    legendColumnPerRow: 3,
    layoutDirection: 'column',
    tooltipBackgroundColor: '#FFFFFF',
    tooltipTextColor: '#131F3C',
    fullWidth: true,
    legendSpacing: 'space-evenly',
    legendBottomMargin: '',
    disabled: false,
    disabledTooltip: false,
    issuesColor: '',
  },
};

export const doughnut = (args, { argTypes }) => ({
  components: { Doughnut },
  props: Object.keys(argTypes),
  methods: {
    onClick: action('Click'),
    onHover: action('Hover'),
  },
  template: `
    <div style="margin-top: 100px">
    <doughnut
      :doughnutData="doughnutData"
      :options="options"
      :colorList="colorList"
      :totalText="totalText"
      :enableLegend="enableLegend"
      :enablePercentage="enablePercentage"
      :roundPercentage="roundPercentage"
      :onlyPercentageInLegend="onlyPercentageInLegend"
      :onlyPercentageInTooltip="onlyPercentageInTooltip"
      :disableInnerText="disableInnerText"
      :emitHover="emitHover"
      :noValuesForLegend="noValuesForLegend"
      :normalizeMinimum="normalizeMinimum"
      :noramlizationMultiplier="noramlizationMultiplier"
      :deepMerge="deepMerge"
      :legendTextSpaced="legendTextSpaced"
      :legendTextPosition="legendTextPosition"
      :isLegendTextEllipsis="isLegendTextEllipsis"
      :innerTextWidth="innerTextWidth"
      :customTotalIssues="customTotalIssues"
      :legendColumns="legendColumns"
      :isScrollable="isScrollable"
      :legendMaxWidth="legendMaxWidth"
      :isDoughnutContainerFlex="isDoughnutContainerFlex"
      :customDoughnutContainer="customDoughnutContainer"
      :customDoughnutLegend="customDoughnutLegend"
      :customCanvas="customCanvas"
      :legendColumnPerRow="legendColumnPerRow"
      :layoutDirection="layoutDirection"
      :tooltipBackgroundColor="tooltipBackgroundColor"
      :tooltipTextColor="tooltipTextColor"
      :fullWidth="fullWidth"
      :legendSpacing="legendSpacing"
      :legendBottomMargin="legendBottomMargin"
      :issues-color="issuesColor"
      :disabled-tooltip="disabledTooltip"
      @onClick="onClick"
      @onHover="onHover"
    >
    </doughnut>
    </div>
  `,
});

export const doughnutDisabled = (args, { argTypes }) => ({
  components: { Doughnut },
  props: Object.keys(argTypes),
  methods: {
    onClick: action('Click'),
    onHover: action('Hover'),
  },
  template: `
    <div style="margin-top: 100px">
    <doughnut
      :doughnutData="doughnutData"
      :options="options"
      :colorList="colorList"
      :totalText="totalText"
      :enableLegend="enableLegend"
      :enablePercentage="enablePercentage"
      :roundPercentage="roundPercentage"
      :onlyPercentageInLegend="onlyPercentageInLegend"
      :onlyPercentageInTooltip="onlyPercentageInTooltip"
      :disableInnerText="disableInnerText"
      :emitHover="emitHover"
      :noValuesForLegend="noValuesForLegend"
      :normalizeMinimum="normalizeMinimum"
      :noramlizationMultiplier="noramlizationMultiplier"
      :deepMerge="deepMerge"
      :legendTextSpaced="legendTextSpaced"
      :legendTextPosition="legendTextPosition"
      :isLegendTextEllipsis="isLegendTextEllipsis"
      :innerTextWidth="innerTextWidth"
      :customTotalIssues="customTotalIssues"
      :legendColumns="legendColumns"
      :isScrollable="isScrollable"
      :legendMaxWidth="legendMaxWidth"
      :isDoughnutContainerFlex="isDoughnutContainerFlex"
      :customDoughnutContainer="customDoughnutContainer"
      :customDoughnutLegend="customDoughnutLegend"
      :customCanvas="customCanvas"
      :legendColumnPerRow="legendColumnPerRow"
      :layoutDirection="layoutDirection"
      :tooltipBackgroundColor="tooltipBackgroundColor"
      :tooltipTextColor="tooltipTextColor"
      :fullWidth="fullWidth"
      :legendSpacing="legendSpacing"
      :legendBottomMargin="legendBottomMargin"
      disabled
      :issues-color="issuesColor"
      :disabled-tooltip="disabledTooltip"
      @onClick="onClick"
      @onHover="onHover"
    >
    </doughnut>
    </div>
  `,
});

export const doughnutNoPreview = (args, { argTypes }) => ({
  components: { Doughnut },
  props: Object.keys(argTypes),
  methods: {
    onClick: action('Click'),
    onHover: action('Hover'),
  },
  template: `
    <div style="margin-top: 100px">
    <doughnut
      :doughnutData="[]"
      :options="options"
      :colorList="colorList"
      :totalText="totalText"
      :enableLegend="enableLegend"
      :enablePercentage="enablePercentage"
      :roundPercentage="roundPercentage"
      :onlyPercentageInLegend="onlyPercentageInLegend"
      :onlyPercentageInTooltip="onlyPercentageInTooltip"
      :disableInnerText="disableInnerText"
      :emitHover="emitHover"
      :noValuesForLegend="noValuesForLegend"
      :normalizeMinimum="normalizeMinimum"
      :noramlizationMultiplier="noramlizationMultiplier"
      :deepMerge="deepMerge"
      :legendTextSpaced="legendTextSpaced"
      :legendTextPosition="legendTextPosition"
      :isLegendTextEllipsis="isLegendTextEllipsis"
      :innerTextWidth="innerTextWidth"
      :customTotalIssues="customTotalIssues"
      :legendColumns="legendColumns"
      :isScrollable="isScrollable"
      :legendMaxWidth="legendMaxWidth"
      :isDoughnutContainerFlex="isDoughnutContainerFlex"
      :customDoughnutContainer="customDoughnutContainer"
      :customDoughnutLegend="customDoughnutLegend"
      :customCanvas="customCanvas"
      :legendColumnPerRow="legendColumnPerRow"
      :layoutDirection="layoutDirection"
      :tooltipBackgroundColor="tooltipBackgroundColor"
      :tooltipTextColor="tooltipTextColor"
      :fullWidth="fullWidth"
      :legendSpacing="legendSpacing"
      :legendBottomMargin="legendBottomMargin"
      :issues-color="issuesColor"
      :disabled-tooltip="disabledTooltip"
      @onClick="onClick"
      @onHover="onHover"
    >
    </doughnut>
    </div>
  `,
});

export const doughnutTotalIssuesSlot = (args, { argTypes }) => ({
  components: { Doughnut },
  props: Object.keys(argTypes),
  data() {
    return {
      brandBlue,
    };
  },
  methods: {
    onClick: action('Click'),
    onHover: action('Hover'),
  },
  template: `
    <div style="margin-top: 100px">
    <doughnut
      :doughnutData="doughnutData"
      :options="options"
      :colorList="colorList"
      :totalText="totalText"
      :enableLegend="enableLegend"
      :enablePercentage="enablePercentage"
      :roundPercentage="roundPercentage"
      :onlyPercentageInLegend="onlyPercentageInLegend"
      :onlyPercentageInTooltip="onlyPercentageInTooltip"
      :disableInnerText="disableInnerText"
      :emitHover="emitHover"
      :noValuesForLegend="noValuesForLegend"
      :normalizeMinimum="normalizeMinimum"
      :noramlizationMultiplier="noramlizationMultiplier"
      :deepMerge="deepMerge"
      :legendTextSpaced="legendTextSpaced"
      :legendTextPosition="legendTextPosition"
      :isLegendTextEllipsis="isLegendTextEllipsis"
      :innerTextWidth="innerTextWidth"
      :customTotalIssues="customTotalIssues"
      :legendColumns="legendColumns"
      :isScrollable="isScrollable"
      :legendMaxWidth="legendMaxWidth"
      :isDoughnutContainerFlex="isDoughnutContainerFlex"
      :customDoughnutContainer="customDoughnutContainer"
      :customDoughnutLegend="customDoughnutLegend"
      :customCanvas="customCanvas"
      :legendColumnPerRow="legendColumnPerRow"
      :layoutDirection="layoutDirection"
      :tooltipBackgroundColor="tooltipBackgroundColor"
      :tooltipTextColor="tooltipTextColor"
      :fullWidth="fullWidth"
      :legendSpacing="legendSpacing"
      :legendBottomMargin="legendBottomMargin"
      :issues-color="issuesColor"
      :disabled-tooltip="disabledTooltip"
      @onClick="onClick"
      @onHover="onHover"
    >
      <template #override-inner-text>
        <div :style="{color: brandBlue}">
          %
        </div>
      </template>
    </doughnut>
    </div>
  `,
});
