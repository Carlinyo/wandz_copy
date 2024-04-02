// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface ITableHeader {
  key: string;
  value: string /** for UI */;
  subHeader?: string /** for UI */;
  /** How to 'stringify' current column value..For example, adding % for percentages column type */
  valueToString?: (value: string, component?: any) => string;
  columnStyle?: object;
  info?: string /** text for tooltip */;
  unsortable?: boolean /** to remove sort icon on table */;
  sorting?: {
    sortType: 'String' | 'Number' | 'Boolean';
    sortOrder: number /** -1 (DSC) OR 1 (ASC) */;
  };
  customSort?: Function;
}
