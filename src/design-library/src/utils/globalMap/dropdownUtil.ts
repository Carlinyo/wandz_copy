import { IDropdownItem } from '@/types/interfaces/IDropdownItem';

export const objectToDropdownArray = (object: { [key: string]: string }): IDropdownItem[] =>
  Object.keys(object).map((option) => {
    return {
      value: option,
      text: object[option],
    };
  });
