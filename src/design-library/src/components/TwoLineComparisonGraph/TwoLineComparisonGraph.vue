<template>
  <div
    ref="chartDiv"
    class="chart"
  />
</template>
<script setup lang="ts">
  import { ref, onBeforeUnmount, onMounted } from 'vue';
  import * as am4core from '@amcharts/amcharts4/core';
  import * as am4charts from '@amcharts/amcharts4/charts';
  import { dataOrangeCarrot, dataPurpleEggplant } from '../../styles/colors/data.module.scss';
  import { txtSecondary } from '../../styles/colors/text.module.scss';
  import type { IData, IPredictionMade, IDataChart } from '@/types/interfaces/predictionMade';
  defineOptions({
    name: 'prediction-made',
  });
  const props = withDefaults(defineProps<IPredictionMade>(), {
    data: () => [] as IData[],
  });

  let chart: am4charts.XYChart;

  const cloneData: IDataChart[] = [...props.data];
  const chartDiv = ref();

  onMounted(() => {
    chart = am4core.create(chartDiv.value, am4charts.XYChart);
    // Create a chart instance
    const colorLineTrue = am4core.color(dataPurpleEggplant);
    const colorLineFalse = am4core.color(dataOrangeCarrot);
    cloneData[0].colorLineTrue = colorLineTrue;
    cloneData[0].colorLineFalse = colorLineFalse;
    chart.data = cloneData;

    const categoryAxis1 = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis1.dataFields.category = 'dateTrue';
    categoryAxis1.renderer.grid.template.disabled = true;
    categoryAxis1.renderer.labels.template.disabled = false;
    categoryAxis1.renderer.labels.template.fill = am4core.color(txtSecondary);
    categoryAxis1.renderer.labels.template.fontSize = 10;
    categoryAxis1.startLocation = 0.3;
    categoryAxis1.endLocation = 0.4;
    categoryAxis1.tooltip!.disabled = true;

    const categoryAxis2 = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis2.dataFields.category = 'dateFalse';
    categoryAxis2.renderer.grid.template.disabled = true;
    categoryAxis2.renderer.labels.template.disabled = true;
    categoryAxis2.startLocation = 0.3;
    categoryAxis2.endLocation = 0.4;
    categoryAxis2.tooltip!.disabled = true;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.adapter.add('text', (text: string | number) => {
      const number = Math.abs(+text?.toString().replace(',', ''));
      return number >= 1000 ? number / 1000 + 'K' : number;
    });
    valueAxis.renderer.labels.template.fill = am4core.color(txtSecondary);
    valueAxis.tooltip!.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.renderer.labels.template.fontSize = 10;
    valueAxis.renderer.labels.template.paddingBottom = 15;
    valueAxis.renderer.minGridDistance = 20;
    valueAxis.min = 0;

    // Create series
    const lineSeries1 = chart.series.push(new am4charts.LineSeries());
    lineSeries1.dataFields.valueY = 'valueTrue';
    lineSeries1.dataFields.categoryX = 'dateTrue';
    lineSeries1.strokeWidth = 3;
    lineSeries1.xAxis = categoryAxis1;
    lineSeries1.propertyFields.stroke = 'colorLineTrue';
    lineSeries1.name = 'True';

    const lineSeries2 = chart.series.push(new am4charts.LineSeries());
    lineSeries2.dataFields.valueY = 'valueFalse';
    lineSeries2.dataFields.categoryX = 'dateFalse';
    lineSeries2.strokeWidth = 3;
    lineSeries2.xAxis = categoryAxis2;
    lineSeries2.propertyFields.stroke = 'colorLineFalse';
    lineSeries2.name = 'False';
  });

  onBeforeUnmount(() => {
    if (chart) {
      chart.dispose();
    }
  });
</script>
<style scoped lang="scss">
  .chart {
    width: 100%;
    height: 100%;
  }

  :deep(div) {
    left: -24px;
  }
</style>
