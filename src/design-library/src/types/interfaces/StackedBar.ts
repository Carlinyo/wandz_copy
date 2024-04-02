export interface StackedBarI {
  name: string;
  value: number;
}

export interface ColorRangesI {
  index: number;
  ranges: Ranges[];
  defaultColor: string;
}

interface Ranges {
  min?: number;
  max: number;
  color: string;
}
