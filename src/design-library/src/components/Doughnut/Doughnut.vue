<template>
  <div
    id="doughnut-container"
    class="doughnut-container"
    :class="customDoughnutContainer"
    :style="containerStyle"
  >
    <div
      id="canvas-doughnut"
      class="doughnut-canvas"
    >
      <div
        v-if="!disableInnerText"
        class="doughnut-inner-text txt-primary"
        :style="doughnutMarginStyle"
      >
        <slot name="override-inner-text" />
        <div
          v-if="!$slots['override-inner-text']"
          class="doughnut-total-items"
          :class="textGray"
          :style="{ color: issuesColor }"
        >
          {{ totalIssues }}
        </div>
        <div
          :ref="innerTextHeaderRef"
          :style="innerTextHeaderStyle"
          class="inner-text-header"
          :class="textGray"
        >
          {{ innerText }}
        </div>
      </div>
      <canvas
        :ref="canvasRef"
        :class="customCanvas"
      />
    </div>
    <div
      v-if="enableLegend && !disabled"
      class="doughnut-legend"
      :class="customDoughnutLegend"
      :style="donutLegendStyle"
    >
      <div class="doughnut-legend-container">
        <div
          v-for="(item, index) in doughnutData"
          :key="index"
          class="doughnut-legend-item-container"
        >
          <div
            :style="createColorStyle(colors[index])"
            class="color-label border-radius-tiny"
          />
          <div
            class="item-name body-tiny"
            :title="item.name"
          >
            {{ getLegendText(item) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Chart from 'chart.js/auto';
  import { chartjsTooltip } from '../../utils/chartjs/chartjsTooltip';
  import LogicFilters from '../../utils/filters/formatters';
  import merge from '../../utils/merge';
  import { DATA_COLORS } from '../../utils/graphs/colors';

  const elementsBlack = '#000000';
  const pill = '#EBEBEB';

  /**
   * @version beta
   *  @since beta
   * @see See [Chartjs website](https://www.chartjs.org)
   * */
  export default {
    name: 'NmgDoughnut',
    props: {
      /**
       * doughnutData - an array of the current data. required.
       * */
      doughnutData: Array,
      /**
       * options - (optional) the chart options (see https://www.chartjs.org/docs/latest/charts/doughnut.html for more info).
       * */
      options: Object,
      /**
       * colorList - (optional) list of the colors chartjs will use (in the pie, in the legend and in the tooltip).
       * */
      colorList: Array,
      /**
       * totalText - (optional) the text that will be displayed inside the doughnut.
       * */
      totalText: String,
      /**
       * enableLegend - (optional) if true, legend will be displayed.
       * */
      enableLegend: Boolean,
      /**
       * enablePercentage - (optional) if true, percent will be displayed (in both legend and tooltip).
       * */
      enablePercentage: Boolean,
      /**
       * roundPercentage - (optional) if true, percent will be without decimal point.
       * */
      roundPercentage: Boolean,
      /**
       * onlyPercentageInLegend - (optional) if true, only percent will be displayed @ legend.
       * */
      onlyPercentageInLegend: Boolean,
      /**
       * onlyPercentageInTooltip - (optional) if true, only percent will be displayed @ tooltip.
       * */
      onlyPercentageInTooltip: Boolean,
      tooltipCallback: Function,
      /**
       * disableInnerText - (optional) if true, inner text will not be displayed.
       * */
      disableInnerText: Boolean,
      /**
       * disableInnerText - (optional) if true, inner text will not be displayed.
       * */
      emitHover: Boolean,
      noValuesForLegend: Boolean,
      normalizeMinimum: Boolean,
      noramlizationMultiplier: {
        type: Number,
        required: false,
        default: 2,
      },
      /**
       * deep-merge - deep merge the options with the default options for the render function
       * */
      deepMerge: {
        type: Boolean,
        required: false,
        default: false,
      },
      legendTextSpaced: {
        type: String,
        default: '12',
      },
      legendTextPosition: {
        type: String,
        default: '0',
      },
      isLegendTextEllipsis: {
        type: Boolean,
        default: false,
      },
      /**
       * innerTextWidth - with of the inner text
       * */
      innerTextWidth: {
        type: String,
        required: false,
        default: '',
      },
      /**
       * customTotalIssues - allows you to show custom total number in the middle of the doughnut
       * */
      customTotalIssues: {
        type: Number,
        required: false,
      },
      legendColumns: {
        type: [String, Number],
        required: false,
        default: null,
      },
      isScrollable: {
        type: Boolean,
        default: false,
      },
      legendMaxWidth: {
        type: [Number, String],
        default: '',
      },
      isDoughnutContainerFlex: {
        type: Boolean,
        default: true,
      },
      customDoughnutContainer: {
        type: String,
        required: false,
        default: '',
      },
      customDoughnutLegend: {
        type: String,
        required: false,
        default: '',
      },
      customCanvas: {
        type: String,
        required: false,
        default: '',
      },
      legendColumnPerRow: {
        type: Number,
        default: null,
      },
      layoutDirection: {
        type: String,
        validator: (value) => ['row', 'column'].indexOf(value) !== -1,
        default: 'row',
      },
      tooltipBackgroundColor: {
        type: String,
        default: '#FFFFFF',
      },
      tooltipTextColor: {
        type: String,
        default: '#131F3C',
      },
      fullWidth: {
        type: Boolean,
        default: false,
      },
      legendSpacing: {
        type: String,
        default: 'space-between',
      },
      legendBottomMargin: {
        type: String,
        default: '10px',
      },
      // Style Object to override default styling
      styleOverride: {
        // deprecated, please do not use
        type: Object,
        default: () => ({}),
      },
      wordBreak: {
        type: Boolean,
        default: false,
      },
      // Key for mapping the doughnutData object to extract label
      // (Useful if a differentiation between legend label and tooltip label is needed)
      legendKey: {
        type: String,
        default: 'name',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      disabledText: {
        type: String,
        default: 'of all visitors',
      },
      noPreviewText: {
        type: String,
        default: 'No preview available',
      },
      issuesPostfix: {
        type: String,
        default: '',
      },
      issuesColor: {
        type: String,
        default: elementsBlack,
      },
      disabledTooltip: {
        type: Boolean,
        default: false,
      },
      customTooltipBuilder: {
        type: Function,
        default: null,
      },
    },
    data() {
      return {
        chartCtx: '',
        /**
         * doughnutId is used in all $refs in the component, to distinguish from other doughnut components on the screen.
         * */
        doughnutId: Math.ceil(Math.random() * 1000),
        defaultTotalText: 'Total issues',
        defaultColorLists: DATA_COLORS,
        defaultOptions: {
          cutout: '60%',
          responsive: true,
          maintainAspectRatio: false,
          devicePixelRatio: 1,
          onClick: this.onClick,
          hover: {},
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
              external: function () {
                if (this.disabledTooltip || this.disabled || !this.doughnutData.length) return;
                const { tooltipBackgroundColor, tooltipTextColor, styleOverride, wordBreak, customTooltipBuilder } =
                  this;
                return function custom({ tooltip }) {
                  /* eslint no-underscore-dangle:0 */
                  const childId = `chartjs-tooltip-${this._chart.id}`;
                  const caretId = `caret-${this._chart.id}`;
                  chartjsTooltip.createTooltipOld(
                    tooltip,
                    this._chart.canvas.getBoundingClientRect(),
                    this._chart.canvas.parentNode,
                    childId,
                    caretId,
                    tooltipBackgroundColor,
                    tooltipTextColor,
                    0,
                    styleOverride,
                    wordBreak,
                    customTooltipBuilder,
                  );
                };
              }
                .bind(this)
                .apply(), // using bind and apply to gain the possibility to access the this object within the function
              callbacks: {
                label: ({ dataset, dataIndex, label, formattedValue }) => {
                  const labelItem = {
                    label,
                    value: formattedValue,
                    percentage: dataset.percentage[dataIndex],
                    showPercentage: this.enablePercentage,
                    showOnlyPercentage: this.onlyPercentageInTooltip,
                    tooltipCallback: this.tooltipCallback,
                    valueTotal: LogicFilters.currencyFormatter(this.valueTotal),
                  };
                  return labelItem;
                },
              },
            },
          },
          tooltips: {
            /* eslint object-shorthand:0 */
          },
        },
        legendTop: 0,
        totalIssues: '',
        defaultRatio: 0.5,
        innerTextSize: '1em',
        legendHtml: '',
        doughnutMarginStyle: {
          margin: '50px 70px',
        },
      };
    },
    computed: {
      innerText() {
        // default value is 'Total issue'
        if ((!this.doughnutData || this.doughnutData.length === 0) && !this.disabled) {
          return this.noPreviewText;
        }
        return this.disabled ? this.disabledText : this.totalText || this.defaultTotalText;
      },
      colors() {
        return this.colorList || this.defaultColorLists;
      },
      valueTotal() {
        return this.doughnutData.reduce((total, curr) => total + curr.value, 0);
      },
      containerStyle() {
        return {
          display: this.isDoughnutContainerFlex ? 'flex' : '-webkit-box',
          'flex-direction': this.layoutDirection,
        };
      },
      innerTextHeaderRef() {
        return `inner-text-header-${this.doughnutId}`;
      },
      canvasRef() {
        return `canvas-${this.doughnutId}`;
      },
      innerTextHeaderStyle() {
        return { 'font-size': this.innerTextSize, width: this.innerTextWidth, 'max-width': `${this.options.height}px` };
      },
      donutLegendStyle() {
        return { top: this.legendTop, position: 'relative' };
      },
      textGray() {
        return { disabled: this.disabled || !this.doughnutData || !this.doughnutData.length };
      },
    },
    watch: {
      doughnutData() {
        this.init();
      },
    },
    mounted() {
      this.init();
    },
    methods: {
      /**
       * @function (re)render the multi lines chart.js canvas.
       * */
      init() {
        if (this.chartCtx) {
          this.chartCtx.destroy();
        }
        if (this.$props.emitHover) {
          this.defaultOptions = {
            ...this.defaultOptions,
            hover: {
              ...this.defaultOptions.hover,
              onHover: this.onHover,
            },
          };
        }
        // render the chart - builds the chart
        const options = this.deepMerge
          ? merge(this.defaultOptions, this.options)
          : { ...this.defaultOptions, ...this.options };
        this.renderChart(this.computeData(), options);
      },
      /**
       * @function renderChart creates a chart on an existing canvas.
       * @param data {Object} an object of datasets and labels (each of them is an array).
       * @param options {Object}
       * */
      renderChart(data, options) {
        // create the canvas, determine its size and its positioning.
        const ctx = this.setCanvasSize(options);
        // create a chartjs doughnut on the canvas we created.
        this.chartCtx = new Chart(ctx, { type: 'doughnut', data, options });

        // create the inside text in the doughnut.
        this.createInnerText();

        // handle font size
        this.setFontSize(options);

        // handle doughnut thickness
        this.doughnutMarginStyle = {
          margin: `${options.cutoutPercentage - 10}px ${options.cutoutPercentage}px`,
        };
      },
      setFontSize(options) {
        // 70 -> 1em
        const pivot = 70;
        this.innerTextSize = options.innerFontSize || `${options.cutoutPercentage / pivot}em`;
      },
      onClick(event, item) {
        this.$emit('onClick', event, item, this.chartCtx);
      },
      onHover(event, item) {
        this.$emit('onHover', event, item, this.chartCtx);
      },
      setCanvasSize(options) {
        const chartID = this.canvasRef;
        const containerWidth = document.getElementById('doughnut-container').clientWidth;
        const containerHeight = document.getElementById('doughnut-container').clientHeight;
        const ctx = this.$refs[chartID].getContext('2d');

        // default ratio by the width/height in options
        const defaultRatioWidth = this.enableLegend && !this.fullWidth ? this.defaultRatio : 1;
        const defaultRatioHeight = options.height ? options.height / containerHeight : this.defaultRatio;
        ctx.canvas.width = containerWidth * defaultRatioWidth;
        ctx.canvas.height = containerHeight * defaultRatioHeight;

        return ctx;
      },
      getCanvasInnerArea(canvasWidth, options) {
        // calculate inner area: width - (width * coutour / 100)
        return canvasWidth - (parseFloat(canvasWidth) * parseInt(options.cutoutPercentage, 10)) / 100;
      },
      getTextLength() {
        const innerText = this.innerTextHeaderRef;
        return this.$refs[innerText].innerText.length;
      },
      getTextSize() {
        const innerText = this.innerTextHeaderRef;
        return this.$refs[innerText].clientWidth;
      },
      roundPercentageTotals(numArr) {
        const res = [...numArr];
        // Total of all numbers passed.
        const total = res.reduce((acc, val) => acc + val, 0);

        // Percentage representations of each number (out of 100).
        const numPercent = res.map((item) => {
          let num = item;
          if (!item) num = 0;
          if (total === 0) return '0%';
          const per = (num / total) * 100;
          if (per < 1) {
            return per === 0 ? '0%' : '<1%';
          }
          return `${this.roundPercentage ? per.toFixed(0) : parseFloat(per.toFixed(2))}%`;
        });

        // Return the percentage version of the array passed in.
        return numPercent;
      },
      getLargestNumInArrayIndex(array) {
        return array.indexOf(Math.max(...array));
      },
      createInnerText() {
        if (this.disabled) {
          this.totalIssues = '%';
        } else if (this.doughnutData && this.doughnutData.length) {
          let numItems = 0;
          if (this.doughnutData.length) {
            // if not customTotalSessions not supplied, calculate it
            if (!this.customTotalIssues) {
              this.doughnutData.forEach((item) => {
                if (item.length) {
                  numItems = item.map((innerItem) => innerItem.value).reduce((acc, val) => acc + val);
                }
              });
            } else {
              numItems = this.customTotalIssues;
            }
            this.totalIssues = LogicFilters.kFormatter(numItems) + this.issuesPostfix;
          }
        } else {
          this.totalIssues = '';
        }
      },
      getPercent(val) {
        return Math.round((val / this.valueTotal) * 100);
      },
      getLegendText(item) {
        return `${item[this.legendKey]}: ${this.getPercent(item.value)}%`;
      },
      computeData() {
        // get the color scheme
        const colorScheme =
          this.disabled || !this.doughnutData || !this.doughnutData.length
            ? [pill]
            : this.colorList || this.defaultColorLists;

        const parsedData = {
          totalValue: this.valueTotal,
        }; // Multiple dataSets
        parsedData.datasets = [];
        parsedData.labels = [];
        // Data is an array of labels vs data

        const customData = this.doughnutData.map((item) => LogicFilters.decimalFormatter(item.value));
        const customLabels = this.doughnutData.map((item) => item.name);

        const filteredPercentageByZero = this.roundPercentageTotals(customData);

        const maxVal = Math.max(...customData);
        const minValToDisplay = (maxVal / 100) * this.$props.noramlizationMultiplier;
        const normalizer = this.$props.normalizeMinimum
          ? (val) => {
              if (val < minValToDisplay) return minValToDisplay;
              return val;
            }
          : (v) => v;

        if (!customData.length) {
          customData.push({
            name: '',
            value: 1,
          });
        }

        parsedData.datasets.push({
          data: customData.map(normalizer),
          originalValues: customData,
          percentage: filteredPercentageByZero, // always calculate percentage, use it depend on props.
          backgroundColor: colorScheme,
          hoverBackgroundColor: colorScheme,
          borderWidth: 0,
        });

        customLabels.forEach((label) => {
          if (parsedData.labels.indexOf(label) === -1) {
            parsedData.labels.push(label);
          }
        });

        parsedData.type = 'doughnut';
        return parsedData;
      },
      createColorStyle(color) {
        return {
          backgroundColor: color,
        };
      },
    },
  };
</script>
<style scoped lang="scss">
  @import '../../styles/colors/text.module';

  .doughnut-container {
    height: 100%;
    width: 100%;
    align-items: center;

    .doughnut-canvas {
      position: relative;
      min-width: 50%;

      canvas {
        z-index: 100;
      }
    }

    .doughnut-legend {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .doughnut-legend-container {
        display: flex;
        margin-top: 30px;
        justify-content: space-evenly;
        flex-wrap: wrap;
        flex-direction: row;

        .doughnut-legend-item-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 15px;
          margin-left: 5px;

          .color-label {
            min-width: 21px;
            height: 21px;
          }

          .item-name {
            padding-left: 5px;
            width: 100%;
            color: $txt-secondary;
            position: relative;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }

    .doughnut-inner-text {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 1;
      margin: 50px 70px;

      .doughnut-total-items {
        font-weight: 500;
        font-size: 24px;
        &.disabled {
          color: $txt-disabled;
        }
      }

      .inner-text-header {
        text-align: center;
        &.disabled {
          color: $txt-disabled;
        }
      }
    }

    ::-webkit-scrollbar {
      width: 7px;
    }

    ::-webkit-scrollbar-track {
      background: inherit;
    }

    ::-webkit-scrollbar-thumb {
      background: #e5e5e5;
      border-radius: 10px;
    }
  }
</style>
