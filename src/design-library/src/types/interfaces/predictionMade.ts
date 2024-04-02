import * as am4core from '@amcharts/amcharts4/core';
export interface IData {
  dateTrue: string | number;
  valueTrue: number;
  dateFalse: string | number;
  valueFalse: number;
}

export interface IPredictionMade {
  data: IData[];
  title: string;
  error: boolean;
}
export interface IDataChart extends IData {
  colorLineTrue?: am4core.Color;
  colorLineFalse?: am4core.Color;
}
