import { PieChartSlice } from '../types/enums/PieChartSlice';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IPieChartSlice {
  [PieChartSlice.Text]: string;
  [PieChartSlice.Value]: number;
  [PieChartSlice.Formatter]?: (value: number) => number;
  [PieChartSlice.Color]: string;
}
