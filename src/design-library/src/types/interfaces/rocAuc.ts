import * as am4core from '@amcharts/amcharts4/core';
export interface IDataPositive {
  truePositive: number;
  falsePositive: number;
}
export interface IRocAuc {
  data: Array<IDataPositive>;
}
export interface IRocAucGraph {
  data: Array<IDataPositive>;
  aucValue: number | string;
  loading: boolean;
  error: boolean;
  title: string;
  titleTooltip: string;
}
export interface IDataChart extends IDataPositive {
  colorLine?: am4core.Color;
  gradient?: am4core.LinearGradient;
}
