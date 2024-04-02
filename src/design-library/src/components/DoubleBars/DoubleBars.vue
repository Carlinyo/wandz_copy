<template>
  <div
    ref="chartdiv"
    class="double-bar-graph"
    :style="customStyle"
  />
</template>
<script lang="ts">
  import am4themes_animated from '@amcharts/amcharts4/themes/animated';
  import { am4charts, am4core } from '../../utils/amcharts';
  import { COMMON_COLORS } from '../../utils/graphs/colors';
  import Colors from '../../styles/colors/data.module.scss';
  import TextColors from '../../styles/colors/text.module.scss';

  import greenPositionGrowth from '../../assets/icons/arrows/positive-growth-icon.svg';
  import { PropType } from 'vue';
  import { IColumnData } from '@/interfaces/qualityFunctions';

  /**
   * simple bar chart
   * @version beta
   * @since beta
   * @see See [Chartjs website](https://www.chartjs.org)
   * */
  export default {
    name: 'DoubleBars',
    props: {
      addAxisBoldFirstLine: {
        type: Boolean,
        default: false,
      },
      isPercentsGraph: {
        type: Boolean,
        default: true,
      },
      width: {
        type: Number,
        default: 350,
      },
      widthPercentage: {
        type: Number,
        default: 90,
      },
      height: {
        type: Number,
        default: 360,
      },
      maxValue: {
        type: Number,
      },
      minValue: {
        type: Number,
      },
      /**
       * value - required. an array of the current data. required.
       * example :
       * {
       *  [{ value: 123, name: 'Mobile' }, { value: 9, name: 'Desktop' }],
       * }
       * */
      value: {
        type: Array as PropType<IColumnData[]>,
        required: true,
      },
      isColorGradient: {
        type: Boolean,
        default: false,
      },
      leftBarGradientColors: {
        type: Array<string>, // array of colors
        default: () => [Colors.dataPurpleEggplant, '#ffffff'],
      },
      rightBarGradientColors: {
        type: Array<string>, // array of colors
        default: () => [Colors.dataOrangeCarrot, '#ffffff'],
      },
      leftBarColor: {
        type: String,
        default: Colors.dataPurpleEggplant,
      },
      rightBarColor: {
        type: String,
        default: Colors.dataOrangeCarrot,
      },
      /**
       * subSubTitle - (optional), sub title for the tooltip
       * */
      disableTooltip: {
        type: Boolean,
        required: false,
      },
      /**
       * decimal point for the tooltip values.
       * */
      decimal: {
        type: Number,
        required: false,
        default: 0,
      },
      /**
       * font size in the tooltip
       * */
      barTextSize: {
        type: Number,
        required: false,
        default: 12,
      },
      /**
       * average value for the dashed horizontal line
       * */
      averageLine: {
        type: Number,
        required: false,
      },
      averageLineText: {
        type: String,
        default: 'Site Avg',
        required: false,
      },
      uplift: {
        type: Number,
        default: null,
      },
      upliftBarIndex: {
        type: Number,
        default: 1,
      },
      upliftTextPostfix: {
        type: String,
        default: 'opportunity',
      },
    },
    data() {
      return {
        chart: null,
      };
    },
    computed: {
      getValue() {
        const resValue = this.value;
        resValue[0].color = this.leftBarColor;
        resValue[1].color = this.rightBarColor;
        if (this.averageLine) {
          resValue[0].averageLine = this.averageLine;
          resValue[1].averageLine = this.averageLine;
        }
        return resValue;
      },
      customStyle() {
        return `min-width: ${this.width}px; height: ${this.height}px; width: ${this.widthPercentage}%;`;
      },
    },
    mounted() {
      am4core.ready(this.initChart);
    },
    beforeUnmount() {
      if (this.chart) {
        this.chart.dispose();
      }
    },
    methods: {
      initChart() {
        am4core.options.queue = false;
        // am4core.useTheme(am4themes_animated);
        this.chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);
        this.chart.data = this.getValue;
        this.chart.maskBullets = false;
        // Create axes
        const categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = 'name';
        categoryAxis.renderer.grid.template.strokeWidth = 0;
        categoryAxis.renderer.labels.template.fontSize = 12;
        categoryAxis.renderer.labels.template.fill = am4core.color(COMMON_COLORS.TXT_SECONDARY);
        categoryAxis.renderer.labels.template.dy = -30; // Adjust this value to move the labels closer to the top

        // First value axis
        const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = this.minValue ? this.minValue : 0;
        valueAxis.max = this.maxYAxisValue();
        // valueAxis.renderer.labels.template.adapter.add('text', (text) => `${text}${(this.isPercentsGraph && !isNaN(text)) ? '%' : ''}`);
        valueAxis.renderer.labels.template.adapter.add('text', (text) => {
          const formattedValue = this.isPercentsGraph
            ? `{value.formatNumber('#.##')}%`
            : `{value.formatNumber('#.##a')}`;
          return formattedValue.replace('{value}', text);
        });
        valueAxis.renderer.labels.template.fontSize = 12;
        valueAxis.renderer.labels.template.fill = am4core.color(COMMON_COLORS.TXT_SECONDARY);

        // First series
        const series = this.chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = 'value';
        series.dataFields.categoryX = 'name';
        series.columns.template.width = 50;
        series.columns.template.strokeOpacity = 0;
        if (this.isColorGradient) {
          // Create an array of gradient colors for each column
          const gradientColors: Array<Array<string>> = [this.leftBarGradientColors, this.rightBarGradientColors];

          // Loop through each column and assign a gradient color
          series.columns.template.column.adapter.add('fill', (fill, target) => {
            const columnIndex = target.dataItem.index;
            const gradient = new am4core.LinearGradient();
            gradient.rotation = 90;
            gradient.addColor(am4core.color(gradientColors[columnIndex][0])); // startColor
            gradient.addColor(am4core.color(gradientColors[columnIndex][1])); // endColor
            return gradient;
          });
        } else {
          series.columns.template.column.propertyFields.fill = 'color'; // Use the color property from data
        }

        series.columns.template.column.cornerRadiusTopLeft = 8;
        series.columns.template.column.cornerRadiusTopRight = 8;

        if (this.uplift) {
          series.columns.template.events.on('validated', (event) => {
            // Get the column (bar) and add a label above it
            const column = event.target;
            const label = column.createChild(am4core.Label);
            const columnIndex = column.dataItem.index;

            if (this.upliftBarIndex === columnIndex) {
              label.fontSize = 13;
              label.fontWeight = 'normal';
              label.fill = am4core.color(COMMON_COLORS.TXT_UPLIFT);
              label.html = `<div style="display: flex; z-index: 100; background-color: white; padding-left: 2px; padding-right: 2px;">
              <span>${this.uplift}% ${this.upliftTextPostfix}</span>
              <img src='${greenPositionGrowth}' alt="Image" style="margin-left: 4px"/>
            </div>`;
              label.maxWidth = 300;

              /** Position */
              label.dy = -2;
              label.dx = 35;
              label.horizontalCenter = 'middle';
              label.verticalCenter = 'bottom';
            }
          });
        } else {
          // Create value labels
          const valueLabel = series.bullets.push(new am4charts.LabelBullet());
          valueLabel.label.adapter.add('text', (text) => {
            const formattedValue = this.isPercentsGraph
              ? `{valueY.formatNumber('#.##')}%`
              : `{valueY.formatNumber('#.##a')}`;
            return formattedValue.replace('{valueY}', text);
          });
          // valueLabel.label.text = this.isPercentsGraph ? "{valueY.formatNumber('#.##')}%" : "{valueY.formatNumber('#.##a')}"; // Format the value with two decimal places
          valueLabel.label.dy = -10; // Position label above the column
          valueLabel.label.truncate = false; // Don't truncate the label
          valueLabel.label.hideOversized = true; // Don't hide the label if it's too big
          valueLabel.label.fill = '#636C86'; // Set the label text color to black
          valueLabel.label.fontSize = 12;
        }

        if (this.averageLine) {
          const range = valueAxis.axisRanges.create();
          range.value = this.averageLine;
          range.grid.stroke = am4core.color(COMMON_COLORS.TXT_SECONDARY);
          range.grid.strokeWidth = 1;
          range.grid.above = true;
          range.grid.strokeDasharray = '16,10';
          range.grid.strokeOpacity = 1;
          range.label.dy = 5;

          range.label.adapter.add('x', (x, target) => {
            return this.chart.plotContainer.pixelWidth - 10;
          });

          range.label.inside = true;
          range.label.adapter.add('text', (text) => this.averageLineText);
          range.label.fill = range.grid.stroke;
          range.label.verticalCenter = 'bottom';
        }

        if (this.addAxisBoldFirstLine) {
          // Create x-axis line
          const xAxisLine = categoryAxis.axisRanges.create();
          xAxisLine.category = ''; // Add an empty string to create a line along the axis
          xAxisLine.grid.strokeWidth = 1;
          xAxisLine.grid.stroke = am4core.color(TextColors.txtPrimary); // Set the stroke (line) color for the x-axis line
          xAxisLine.grid.strokeOpacity = 1.0; // Set the opacity to 1.0 to ensure no transparency
          xAxisLine.grid.above = true;

          // Create y-axis line
          const yAxisLine = valueAxis.axisRanges.create();
          yAxisLine.value = 0; // Add 0 to create a line along the y-axis
          yAxisLine.grid.stroke = am4core.color(TextColors.txtPrimary); // Set the stroke (line) color for the x-axis line
          yAxisLine.grid.strokeWidth = 1;
          yAxisLine.grid.strokeOpacity = 1.0; // Set the opacity to 1.0 to ensure no transparency
          yAxisLine.grid.above = true;
        }
      },
      maxYAxisValue() {
        let maxHeight = 0;
        this.getValue.forEach((item) => {
          if (maxHeight < item.value) {
            maxHeight = item.value;
          }
        });

        if (this.averageLine) {
          maxHeight = Math.max(maxHeight, this.averageLine);
        }

        maxHeight = (this.maxValue ? this.maxValue : maxHeight) * 1.1;

        if (this.isPercentsGraph) {
          return Math.min(maxHeight, 100);
        }

        /** For non-percent graphs */
        return maxHeight;
      },
    },
  };
</script>
<style module lang="scss">
  .bars-container {
    position: relative;
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    padding-left: 10px;

    .bars-canvas {
      position: relative;
      height: 100%;
      width: 100%;
    }

    .bars-legend {
      width: 100%;
    }
  }
</style>
