<template>
  <div
    ref="chartDiv"
    class="nmg-pie-chart"
    :style="`fontSize: ${fontSize}px`"
  />
</template>

<!-- Chart code -->
<script lang="ts">
  import { PropType } from 'vue';
  import { PieChartLabelPosition, PieChartLabelUnitType } from '../../types/enums/PieChartSlice';
  import { am4charts, am4core } from '../../utils/amcharts';
  import { COMMON_COLORS, DATA_COLORS } from '../../utils/graphs/colors';

  export default {
    name: 'PieChart',
    props: {
      chartData: {
        type: Array, // [{ text: 'boop', value: 12, color, ' #0f0' }, ... ]
        required: true,
      },
      selectSlice: {
        type: Object,
        required: false,
        default: () => ({}),
      },
      tooltipValueText: {
        type: String,
        required: false,
        default: '',
      },
      totalNumber: {
        type: Number,
        required: false,
      },
      kpiTitle: {
        type: String,
        required: false,
      },
      showTooltip: {
        type: Boolean,
        default: true,
      },
      radius: {
        type: Number,
        default: 100, // In Percent
      },
      labelPosition: {
        type: Number as PropType<PieChartLabelPosition>,
        default: PieChartLabelPosition.Adjacent,
      },
      labelUnitType: {
        type: Number as PropType<PieChartLabelUnitType>,
        default: PieChartLabelUnitType.Percent,
      },
      labelUnit: {
        type: String,
        default: '',
      },
      currency: {
        type: String,
        default: null,
      },
      changeSelectedSlice: {
        type: Boolean,
        default: true,
      },
      fontSize: {
        type: Number,
        default: 14,
      },
      customTooltip: {
        type: String,
        required: false,
        default: '',
      },
    },
    computed: {
      tooltipPrefixText() {
        return `{${this.hasTooltipText ? 'tooltipText' : 'text'}}: {value.percent.formatNumber('#.##')}% ({value}`;
      },
      hasTooltipText() {
        // check if at least one item has the tooltipText property
        return !!(this.chartData && this.chartData.find((item) => item.tooltipText));
      },
    },
    data() {
      return {
        chart: null,
        pieSeries: {},
      };
    },
    watch: {
      chartData() {
        this.chart.data = this.chartData;
      },
      selectSlice() {
        if (this.changeSelectedSlice) {
          this.activateSlice(this.selectSlice.text);
        }
      },
    },
    mounted() {
      am4core.ready(this.initChart);
    },
    beforeDestroy() {
      this.chart?.dispose();
    },

    methods: {
      constructLabelTextTemplate(): string {
        let valueProperty;
        if (this.labelUnitType === PieChartLabelUnitType.Percent) {
          valueProperty = "{value.percent.formatNumber('#.0')}%";
        } else {
          valueProperty = `{value.value}${this.labelUnit}`;
          if (this.labelUnitType === PieChartLabelUnitType.Currency) {
            valueProperty = `${this.currency}${valueProperty}`;
          }
        }

        const divider = this.labelPosition === PieChartLabelPosition.Adjacent ? ': ' : '\n';
        return `{category}${divider}${valueProperty}`;
      },

      activateSlice(sliceName) {
        /* eslint-disable no-param-reassign */
        this.pieSeries.slices.values.forEach((slice) => {
          if (slice.dataItem.dataContext.text === sliceName) {
            slice.isActive = true;
            slice.scale = 1;
            slice.fillOpacity = 1;
          } else {
            slice.isActive = false;
            slice.scale = 1;
            slice.fillOpacity = 0.3;
          }
        });
        /* eslint-enable no-param-reassign */
      },
      initChart() {
        this.chart = am4core.create(this.$refs.chartDiv, am4charts.PieChart);
        this.chart.radius = am4core.percent(this.radius);
        // Add data
        this.chart.data = this.chartData;

        // Config the pie setting
        this.pieSeries = this.chart.series.push(new am4charts.PieSeries());
        this.pieSeries.colors.list = this.chartData.map((item, index) =>
          item.color ? am4core.color(item.color) : am4core.color(DATA_COLORS[index]),
        );
        this.pieSeries.dataFields.value = 'value';
        this.pieSeries.dataFields.category = 'text';
        this.pieSeries.dataFields.tooltipText = 'tooltipText';
        this.pieSeries.slices.template.propertyFields.isActive = 'isActive';
        this.pieSeries.slices.template.propertyFields.fill = 'color';
        this.pieSeries.slices.template.fillOpacity = 1;

        this.pieSeries.slices.template.stroke = am4core.color('#FFFFFF');
        this.pieSeries.slices.template.strokeWidth = 2;
        this.pieSeries.slices.template.strokeOpacity = 1;

        this.pieSeries.slices.template.showOnInit = true;
        this.pieSeries.labels.template.text = this.constructLabelTextTemplate();
        this.pieSeries.labels.template.fill = am4core.color(COMMON_COLORS.TXT_PRIMARY);

        if (this.showTooltip) {
          // Config the tooltip
          this.pieSeries.tooltip.label.padding(16, 16, 16, 16);
          this.pieSeries.tooltip.getFillFromObject = false;
          this.pieSeries.tooltip.strokeLinejoin = 'miter';
          this.pieSeries.tooltip.background.strokeWidth = 0;
          this.pieSeries.tooltip.background.fillOpacity = 1;
          this.pieSeries.tooltip.background.fill = am4core.color('#FFFFFF');
          this.pieSeries.tooltip.background.cornerRadius = 4;
          //Shadow
          this.pieSeries.tooltip.background.filters.clear();
          this.pieSeries.tooltip.background.filters.push(new am4core.DropShadowFilter());
          this.pieSeries.tooltip.background.filters.getIndex(0).opacity = 0.15;
          this.pieSeries.tooltip.background.filters.getIndex(0).blur = 5;
          this.pieSeries.tooltip.background.filters.getIndex(0).color = am4core.color('#000000');

          this.pieSeries.tooltip.background.strokeWidth = 1;
          this.pieSeries.tooltip.background.stroke = am4core.color('#D8DBE0');

          if (this.customTooltip) {
            this.pieSeries.slices.template.tooltipText = this.customTooltip;
          } else {
            this.pieSeries.slices.template.tooltipText = this.totalNumber
              ? `${this.tooltipPrefixText}/${this.totalNumber.toLocaleString()}${
                  this.kpiTitle ? ` ${this.kpiTitle}` : ''
                })`
              : `${this.tooltipPrefixText}){othersTxt}`;
          }

          this.pieSeries.tooltip.label.maxWidth = 400;
          this.pieSeries.tooltip.label.wrap = true;
          this.pieSeries.tooltip.label.fill = am4core.color(COMMON_COLORS.TXT_PRIMARY);
          this.pieSeries.tooltip.label.fontSize = 14;
        } else {
          this.pieSeries.slices.template.tooltipText = '';
        }

        // Change color at hover or at active slice
        const hoverSlice = this.pieSeries.slices.template.states.getKey('hover');
        hoverSlice.properties.scale = 1;
        hoverSlice.properties.fillOpacity = 0.4;
        const activeSlice = this.pieSeries.slices.template.states.getKey('active');
        if (this.changeSelectedSlice) {
          activeSlice.properties.scale = 1;
          activeSlice.properties.fillOpacity = 1;
          this.pieSeries.slices.template.events.on('ready', () => {
            if (this.selectSlice && this.selectSlice.text) {
              this.activateSlice(this.selectSlice.text);
            }
          });
        } else {
          activeSlice.properties.shiftRadius = 0;
        }

        /* eslint-disable no-param-reassign */
        this.pieSeries.slices.template.events.on('hit', (ev) => {
          this.$emit('onItemSelect', ev.target.dataItem.dataContext);
          if (this.changeSelectedSlice) {
            const series = ev.target.dataItem.component;
            ev.target.scale = 1;
            ev.target.fillOpacity = 1;
            // eslint-disable-next-line no-restricted-syntax
            for (const slice of series.slices) {
              if (slice.dataItem.dataContext.text !== ev.target.dataItem.dataContext.text) {
                slice.isActive = false;
                slice.scale = 1;
                slice.fillOpacity = 0.3;
              } else if (!slice.isActive) {
                slice.isActive = true;
              }
            }
          }
        });
        /* eslint-enable no-param-reassign */
      },
    },
  };
</script>

<style lang="scss" scoped>
  .nmg-pie-chart {
    width: 100%;
    height: 100%;
  }
</style>
