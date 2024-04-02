<template>
  <div class="quality-analytics-container">
    <div
      ref="qualityFunctionsChart"
      :id="`stackedBar${index}`"
      :class="variant"
      @mouseover="tooltipActive = true"
      @mouseleave="tooltipActive = false"
    />
    <div
      class="my-custom-tooltip"
      :style="`left: ${props.score * 100}%`"
    >
      <tooltip
        v-if="tooltipActive"
        :text="`Score: ${score}`"
        position="top"
        :shown="true"
      />
      <div
        class="line"
        :class="`${variant}-ml`"
        :style="`height: ${height + 10}px`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, PropType, ref } from 'vue';
  import { IColorRanges, ILabel, IQualityFunctions, ISeriesData } from '../../types/interfaces/QualityFunctions';
  import { onMounted } from 'vue';

  import { QUALITY_FUNCTIONS_CHART_TYPES } from '../../types/enums/QualityFunctions';

  import { QUALITY_FUNCTIONS_COLORS, COMMON_COLORS } from '../../utils/graphs/colors';
  import {
    QUALITY_FUNCTIONS_CHART_DATA,
    QUALITY_FUNCTIONS_SIZES,
    QUALITY_FUNCTIONS_LABEL_SPACES,
    QUAILITY_FUNCTIONS_CHART_SERIES_SIZES,
  } from '../../const';
  import Tooltip from '../Tooltip/Tooltip.vue';

  const { BIG_CHART_HEIGHT, MEDIUM_CHART_HEIGHT } = QUALITY_FUNCTIONS_SIZES;

  const { YEAR_VALUE, SPACE_VALUE, POOR_VALUE, FAIR_VALUE, GOOD_VALUE, EXCELLENT_VALUE } = QUALITY_FUNCTIONS_CHART_DATA;

  const { dataRedTomato, lightestGray, dataOrangeCarrot, lightGray, dataYellowBanana, gray, dataGreenApple, boldGray } =
    QUALITY_FUNCTIONS_COLORS;
  import * as am4core from '@amcharts/amcharts4/core';
  import * as am4charts from '@amcharts/amcharts4/charts';
  import am4themes_animated from '@amcharts/amcharts4/themes/animated';

  const props = defineProps({
    score: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    variant: {
      type: String,
      required: true,
    },
    columnsData: {
      type: Array as PropType<IQualityFunctions[]>,
      required: true,
    },
  });

  let chart: am4charts.XYChart;

  const qualityFunctionsChart = ref<any>(null);

  const height = ref(0);

  const tooltipActive = ref(false);

  const findColor = (index: number): am4core.Color | string => {
    const colorRanges: IColorRanges[] = [
      {
        index: 0,
        ranges: [{ max: 0.5, color: dataRedTomato }],
        defaultColor: lightestGray,
      },
      {
        index: 2,
        ranges: [{ min: 0.5, max: 0.6, color: dataOrangeCarrot }],
        defaultColor: lightGray,
      },
      {
        index: 4,
        ranges: [{ min: 0.6, max: 0.7, color: dataYellowBanana }],
        defaultColor: gray,
      },
      {
        index: 6,
        ranges: [{ min: 0.7, max: 1, color: dataGreenApple }],
        defaultColor: boldGray,
      },
    ];

    const matchingIndex = colorRanges.find((range) => range.index === index);
    if (!matchingIndex) return COMMON_COLORS.BLACK;

    const matchingRange = matchingIndex.ranges.find(
      (range) =>
        (range.min === undefined || props.score >= range.min) && (range.max === undefined || props.score < range.max),
    );

    return matchingRange ? matchingRange.color : matchingIndex.defaultColor;
  };

  const createLabel = ({ series, label, direction, color }: ILabel) => {
    let Label = series.columns.template.createChild(am4core.Label);
    Label.text = label;
    Label.fontSize = 12;
    Label.fill = color;
    Label.dy = direction.dy;
    Label.dx = direction.dx;
    Label.strokeWidth = 0;
  };

  const findMaxRange = () => {
    let max = 0;
    for (let data of chart.data) {
      for (let el in data) {
        max += data[el] ? data[el] : 0;
      }
    }
    return max;
  };

  const createSeries = ({ field, index, height, lastSeries, last }: ISeriesData) => {
    const label: string = `${field.name[0].toUpperCase()}${field.name.slice(1)}`;
    const space: boolean = label.includes('Space');
    let series = chart.series.push(new am4charts.ColumnSeries());
    if (index === 0) {
      series.columns.template.column.cornerRadiusTopLeft = 10;
      series.columns.template.column.cornerRadiusBottomLeft = 10;
    } else if (lastSeries) {
      series.columns.template.column.cornerRadiusTopRight = 10;
      series.columns.template.column.cornerRadiusBottomRight = 10;
    }

    series.dataFields.valueX = field.name;
    series.columns.template.height = height;
    series.dataFields.categoryY = 'year';
    series.stacked = true;

    if (!space || last) {
      const bottomX = last ? -10 : 0;
      const y = QUALITY_FUNCTIONS_LABEL_SPACES[props.variant];
      const topLabel: ILabel = {
        series,
        label,
        direction: {
          dx: 0,
          dy: -y - 5,
        },
        color: COMMON_COLORS.TXT_PRIMARY,
      };
      const bottomLabel: ILabel = {
        series,
        label: `${field.value}`,
        direction: { dx: bottomX, dy: y },
        color: COMMON_COLORS.TXT_SECONDARY,
      };
      if (!last) {
        createLabel(topLabel);
        createLabel(bottomLabel);
      } else {
        createLabel(bottomLabel);
      }
    }

    const color = findColor(index);

    series.columns.template.stroke = am4core.color(color);
    series.columns.template.fill = am4core.color(color);

    if (space) {
      series.columns.template.fill = am4core.color(COMMON_COLORS.WHITE);
      series.columns.template.stroke = am4core.color(COMMON_COLORS.WHITE);
    }
  };

  const getChartSize = (): number => {
    switch (props.variant) {
      case QUALITY_FUNCTIONS_CHART_TYPES.BIG_LINE:
        return QUAILITY_FUNCTIONS_CHART_SERIES_SIZES.BIG_LINE;
      case QUALITY_FUNCTIONS_CHART_TYPES.MEDIUM_LINE:
        return QUAILITY_FUNCTIONS_CHART_SERIES_SIZES.MEDIUM_LINE;
      case QUALITY_FUNCTIONS_CHART_TYPES.SMALL_LINE:
        return QUAILITY_FUNCTIONS_CHART_SERIES_SIZES.SMALL_LINE;
      default:
        return QUAILITY_FUNCTIONS_CHART_SERIES_SIZES.DEFAULT;
    }
  };

  onMounted(() => {
    chart = am4core.create(`stackedBar${props.index}`, am4charts.XYChart);
    chart.data = [
      {
        year: YEAR_VALUE,
        poor: POOR_VALUE,
        space: SPACE_VALUE,
        fair: FAIR_VALUE,
        space2: SPACE_VALUE,
        good: GOOD_VALUE,
        space3: SPACE_VALUE,
        excellent: EXCELLENT_VALUE,
        space4: SPACE_VALUE,
      },
    ];
    height.value = getChartSize();

    am4core.useTheme(am4themes_animated);

    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'year';
    categoryAxis.renderer.grid.template.opacity = 0;

    const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());

    switch (props.variant) {
      case QUALITY_FUNCTIONS_CHART_TYPES.MEDIUM_LINE:
        categoryAxis.height = MEDIUM_CHART_HEIGHT;
        break;
      case QUALITY_FUNCTIONS_CHART_TYPES.BIG_LINE:
        categoryAxis.height = BIG_CHART_HEIGHT;
        break;
    }
    valueAxis.hidden = true;
    valueAxis.renderer.minGridDistance = 40;
    valueAxis.renderer.grid.template.opacity = 0;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.max = findMaxRange();

    props.columnsData.forEach((el: IQualityFunctions, index: number): void => {
      const seriesData: ISeriesData = {
        field: el,
        index,
        last: index === props.columnsData.length - 1,
        lastSeries: index === props.columnsData.length - 2,
        height: height.value,
      };

      createSeries(seriesData);
    });
  });

  onBeforeMount(() => {
    if (chart) {
      chart.dispose();
    }
  });
</script>

<style lang="scss" scoped>
  .quality-analytics-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .big-line,
  .medium-line {
    width: 100%;
  }

  .small-line {
    width: 350px;
  }

  :deep([role='tooltip'] > g:first-of-type) {
    display: none;
  }
  .my-custom-tooltip {
    height: 90%;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    margin: auto;
  }

  .line {
    background: black;
    width: 2px;
    height: 40%;
  }

  .medium-line-ml {
    height: 12px !important;
    margin-top: 49px;
  }

  .big-line-ml {
    margin-top: 47px;
  }
</style>
