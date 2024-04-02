// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IDetailItem {
  title: string;
  description?: string;
  item?: unknown /** hold the item itself if needed - can be any item you need */;
  categoryName?: string;
  isLocked?: boolean;
}

export type SubCategoryType = Record<string, IDetailItem[]>;
export type TabsCategoriesType = Record<string, SubCategoryType>;
export type InnerInfoType = SubCategoryType | TabsCategoriesType;

export interface INestedMenuItem {
  name: string;
  icon?: string;
  innerInfo: InnerInfoType;
  isWithTabs?: boolean;
  isLocked?: boolean;
}

export enum categoriesDivision {
  UPPER = 'upper',
  BOTTOM = 'bottom',
}

export interface INestedMenuCategories {
  [categoriesDivision.UPPER]: INestedMenuItem[];
  [categoriesDivision.BOTTOM]: INestedMenuItem[];
}
