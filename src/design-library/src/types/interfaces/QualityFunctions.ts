import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
export interface IQualityFunctions {
  name: string;
  value: number;
}

export interface IColorRanges {
  index: number;
  ranges: IRanges[];
  defaultColor: string;
}

interface IRanges {
  min?: number;
  max: number;
  color: string;
}

interface IDirection {
  dy: number;
  dx: number;
}

export interface IQualityFunctionsData {
  year: string;
  poor: number;
  space: number;
  fair: number;
  space2: number;
  good: number;
  space3: number;
  excellent: number;
  space4: number;
}

export interface ILabel {
  series: am4charts.ColumnSeries;
  label: string;
  direction: IDirection;
  color: am4core.Color;
}

export interface ISeriesData {
  field: IQualityFunctions;
  index: number;
  height: number;
  last?: boolean;
  lastSeries?: boolean;
}
