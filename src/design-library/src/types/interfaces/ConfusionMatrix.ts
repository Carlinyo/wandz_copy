export interface IData {
  truePositives: { value: string; tooltip: string };
  falsePositives: { value: string; tooltip: string };
  falseNegatives: { value: string; tooltip: string };
  trueNegatives: { value: string; tooltip: string };
}
export interface IMatrix {
  data: IData;
}

export interface IConfusionMatrix {
  data: IData;
  loading: boolean;
  error: boolean;
  title: string;
  titleTooltip: string;
}
