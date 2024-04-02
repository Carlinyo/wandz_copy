<template>
  <div
    ref="chartDiv"
    class="chart"
  ></div>
</template>

<script setup lang="ts">
  import * as am4core from '@amcharts/amcharts4/core';
  import * as am4charts from '@amcharts/amcharts4/charts';
  import Tooltip from './PredictionDistributionTooltip';
  import { ref, onMounted, onBeforeMount } from 'vue';
  import {
    dataOrangeCarrot,
    dataPurpleEggplant,
    dataOrangeCarrotLight,
    dataPurpleEggplantLight,
  } from '../../styles/colors/data.module.scss';
  import { txtSecondary } from '../../styles/colors/text.module.scss';
  import { IChart, ICloneData } from '@/types/interfaces/predictionDistribution';

  const props = withDefaults(defineProps<IChart>(), {
    data: () => [],
    xPoint: 0.75,
  });

  const chartDiv = ref();
  let chart: am4charts.XYChart;
  onMounted(() => {
    const cloneData: ICloneData[] = [...props.data];
    // Create a chart instance
    chart = am4core.create(chartDiv.value, am4charts.XYChart);
    const colorFalse = am4core.color(dataOrangeCarrot);
    const colorTrue = am4core.color(dataPurpleEggplant);
    const gradientFalse = new am4core.LinearGradient();
    gradientFalse.rotation = 90;
    gradientFalse.addColor(am4core.color(dataOrangeCarrotLight));
    gradientFalse.addColor(am4core.color('white'));
    const gradientTrue = new am4core.LinearGradient();
    gradientTrue.rotation = 90;
    gradientTrue.addColor(am4core.color(dataPurpleEggplantLight));
    gradientTrue.addColor(am4core.color('white'));
    cloneData[0].lineColor = colorFalse;
    cloneData[0].gradient = gradientFalse;
    cloneData[0].dataValue = 'False';
    for (let i = 1; i < cloneData.length; i++) {
      if (cloneData[i].predicted == props.xPoint) {
        cloneData[i].gradient = gradientTrue;
        cloneData[i].lineColor = colorTrue;
        cloneData[i].dataValue = 'True';
      }
      if (cloneData[i].predicted < props.xPoint) {
        cloneData[i].lineColor = colorFalse;
        cloneData[i].dataValue = 'False';
      } else {
        cloneData[i].lineColor = colorTrue;
        cloneData[i].dataValue = 'True';
      }
    }
    chart.data = cloneData;

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.tooltip!.disabled = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.ticks.template.disabled = false;
    categoryAxis.renderer.ticks.template.strokeOpacity = 0.9;
    categoryAxis.renderer.ticks.template.strokeWidth = 2;
    categoryAxis.renderer.ticks.template.paddingLeft = 1;
    categoryAxis.renderer.labels.template.fill = am4core.color(txtSecondary);
    categoryAxis.renderer.line.opacity = 0;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.dataFields.category = 'predicted';
    categoryAxis.startLocation = 0.4;
    categoryAxis.endLocation = 0.6;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip!.disabled = true;
    valueAxis.renderer.line.opacity = 0;
    valueAxis.renderer.ticks.template.disabled = false;
    valueAxis.renderer.ticks.template.strokeOpacity = 0.4;
    valueAxis.renderer.minGridDistance = 40;
    valueAxis.renderer.labels.template.fill = am4core.color(txtSecondary);
    valueAxis.min = 0;

    //Tooltip
    const t = new am4core.Tooltip();
    t.getFillFromObject = true;
    t.pointerOrientation = 'down';
    t.dy = -30;

    // Find the corresponding Y-axis value for the X-axis point
    const index = cloneData.findIndex((elem) => elem.predicted === props.xPoint);
    const yValue = cloneData[index].frequency;

    // Create series
    const lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.categoryX = 'predicted';
    lineSeries.dataFields.valueY = 'frequency';
    lineSeries.tooltip = t;
    lineSeries.fillOpacity = 0.8;
    lineSeries.strokeWidth = 2;
    lineSeries.propertyFields.stroke = 'lineColor';
    lineSeries.propertyFields.fill = 'gradient';
    lineSeries.dataFields.color = 'lineColor';
    // Set rounded line
    lineSeries.tensionX = 0.8;
    lineSeries.tensionY = 0.8;

    lineSeries.tooltipHTML = Tooltip;

    // Create a connecting line
    const connectingLine = chart.series.push(new am4charts.LineSeries());
    connectingLine.dataFields.categoryX = 'predicted';
    connectingLine.dataFields.valueY = 'frequency';
    connectingLine.data = [
      { predicted: props.xPoint, frequency: 0 },
      { predicted: props.xPoint, frequency: yValue },
    ];
    connectingLine.stroke = am4core.color('#131F3C');
    connectingLine.strokeWidth = 1.5;
    connectingLine.zIndex = 150;

    // Make a panning cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.snapToSeries = lineSeries;
    chart.cursor.behavior = 'none';
    chart.cursor.lineY.opacity = 0;

    chart.draggable = false;

    //bulet
    const bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
    bullet.circle.stroke = am4core.color('#131F3C');
    bullet.circle.fill = am4core.color('#131F3C');
    bullet.circle.strokeWidth = 2;
    bullet.fillOpacity = 0;
    bullet.strokeOpacity = 0;

    const bulletState = bullet.states.create('hover');
    bulletState.properties.fillOpacity = 1;
    bulletState.properties.strokeOpacity = 0;

    // Enable the bullet on hover
    categoryAxis.renderer.labels.template.adapter.add('dx', function (dx, target) {
      return target.dataItem && target.dataItem.dataContext?.hover ? -bullet.circle.pixelRadius - 2 : dx;
    });
    chart.events.on('ready', () => {
      chart.invalidateLabels();
    });
  });

  onBeforeMount(() => {
    if (chart) {
      chart.dispose();
    }
  });
</script>

<style scoped>
  .chart {
    width: 100%;
    height: 100%;
  }
  /* Add your component styles here */
  :deep([role='tooltip'] > g:first-of-type) {
    display: none;
  }
</style>
