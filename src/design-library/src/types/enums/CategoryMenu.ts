export interface CategoryItem {
  title: string;
  items: Item[];
}

export interface Item {
  name: string;
  additionalData?: unknown;
}

export interface SelectedCategoryItem {
  category: string;
  categoryInd: number;
  item: Item;
  itemInd: number;
}
