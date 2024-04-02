<template>
  <div
    ref="chartDiv"
    class="chart"
  ></div>
</template>
<script setup lang="ts">
  import { ref, onMounted, onBeforeMount } from 'vue';
  import * as am4core from '@amcharts/amcharts4/core';
  import * as am4charts from '@amcharts/amcharts4/charts';

  import {
    dataBlueOrchid,
    dataBlueOrchidLight,
    dataBlueOrchidLightGradient,
  } from '../../styles/colors/data.module.scss';

  import { txtSecondary } from '../../styles/colors/text.module.scss';
  import type { IRocAuc, IDataChart } from '@/types/interfaces/rocAuc';
  defineOptions({
    name: 'roc-auc',
  });
  const props = withDefaults(defineProps<IRocAuc>(), {
    data: () => [],
  });

  const cloneData: IDataChart[] = [...props.data];
  const chartDiv = ref();
  let chart: am4charts.XYChart;

  onMounted(() => {
    chart = am4core.create(chartDiv.value, am4charts.XYChart);

    // Create a chart instance
    const colorLine = am4core.color(dataBlueOrchid);
    const gradient = new am4core.LinearGradient();
    gradient.rotation = 90;
    gradient.addColor(am4core.color(dataBlueOrchidLight));
    gradient.addColor(am4core.color(dataBlueOrchidLightGradient));
    cloneData[0].colorLine = colorLine;
    cloneData[0].gradient = gradient;
    chart.data = cloneData;
    const valueAxisMax = cloneData.reduce((max, obj) => {
      return obj.truePositive > max ? obj.truePositive : max;
    }, 0);

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'falsePositive';
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.disabled = true;
    categoryAxis.startLocation = 0.4;
    categoryAxis.endLocation = 0.4;
    categoryAxis.tooltip!.disabled = true;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.adapter.add('text', (text: string | number) => {
      return +text === 0 || +text === 1 ? Math.trunc(+text) : `${text}0`;
    });
    valueAxis.renderer.labels.template.fill = am4core.color(txtSecondary);
    valueAxis.tooltip!.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.renderer.labels.template.fontSize = 10;
    valueAxis.renderer.labels.template.paddingBottom = 15;
    valueAxis.max = valueAxisMax + 0.01;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.minGridDistance = 30;
    valueAxis.min = cloneData[0].truePositive;

    const xPoint = cloneData[cloneData.length - 1].falsePositive;
    const yValue = cloneData[cloneData.length - 1].truePositive;

    // Create series
    const lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.categoryX = 'falsePositive';
    lineSeries.dataFields.valueY = 'truePositive';
    lineSeries.fillOpacity = 0.8;
    lineSeries.strokeWidth = 2;
    lineSeries.propertyFields.stroke = 'colorLine';
    lineSeries.propertyFields.fill = 'gradient';

    // Set rounded line
    lineSeries.tensionX = 0.81;
    lineSeries.tensionY = 0.81;

    // Create a connecting line
    const connectingLine = chart.series.push(new am4charts.LineSeries());
    connectingLine.dataFields.categoryX = 'falsePositive';
    connectingLine.dataFields.valueY = 'truePositive';
    connectingLine.data = [
      { falsePositive: 0, truePositive: 0 },
      { falsePositive: xPoint, truePositive: yValue },
    ];
    connectingLine.stroke = am4core.color('#638CF4');
    connectingLine.strokeWidth = 1;
    connectingLine.zIndex = 150;
    connectingLine.strokeDasharray = '11';
    // Make a panning cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.snapToSeries = lineSeries;
    chart.cursor.behavior = 'panXY';
    chart.cursor.lineY.opacity = 0;
    chart.cursor.lineX.opacity = 0;
    // fixed Chart
    chart.cursor.behavior = 'none';
  });

  onBeforeMount(() => {
    if (chart) {
      chart.dispose();
    }
  });
</script>
<style lang="scss" scoped>
  .chart {
    width: 100%;
    height: 100%;
  }
</style>
