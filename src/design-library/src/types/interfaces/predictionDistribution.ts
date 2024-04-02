import * as am4core from '@amcharts/amcharts4/core';

export interface IData {
  predicted: number;
  frequency: number;
}
export interface IChart {
  data: IData[];
  xPoint: number;
}
export interface ICloneData extends IData {
  lineColor?: am4core.Color;
  gradient?: am4core.LinearGradient;
  dataValue?: string;
}
export interface IPredictionDistribution {
  data: IData[];
  xPoint: number;
  loading: boolean;
  error: boolean;
  title: string;
  titleTooltip: string;
}
