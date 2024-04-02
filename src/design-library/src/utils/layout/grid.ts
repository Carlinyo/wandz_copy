import { IGridItem } from '../../types/interfaces/grid-item';

export const getGridLayoutList = (data: any[], customColumnsPerItem: null | number = null): IGridItem[] => {
  const maxColumns = 12;
  const items = Object.keys(data);
  const columnsPerItem = customColumnsPerItem || (items.length >= maxColumns ? 1 : maxColumns / items.length);
  let idx = 0;
  let currentRow = 0;
  return items.map((item) => {
    let obj = {
      gridColumnStart: idx * columnsPerItem + 1,
      gridColumnEnd: idx * columnsPerItem + columnsPerItem,
      gridRowStart: currentRow + 1,
      gridRowEnd: currentRow + 2,
      name: `${item}`,
    };
    idx++;

    if (idx * columnsPerItem + columnsPerItem > maxColumns) {
      currentRow++;
      idx = 0;
    }
    return obj;
  });
};
