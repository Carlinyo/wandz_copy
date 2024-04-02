/**
 * @description returns how many children fit into containers width
 * @author EdenViz
 * @param {HTMLElement} itemsContainer
 * @return {number}
 */
export const getMaxDisplayableItemsForContainer = (itemsContainer) => {
  const widths = Array.from(itemsContainer.children).map((a) => a.getBoundingClientRect().width);
  const containerWidth = itemsContainer.getBoundingClientRect().width;
  let currWidth = 0;
  let maxDisplayableItems = 0;
  while (maxDisplayableItems < widths.length) {
    const targetWidth = currWidth + widths[maxDisplayableItems];
    if (targetWidth > containerWidth) return maxDisplayableItems;
    currWidth = targetWidth;
    maxDisplayableItems += 1;
  }
  return maxDisplayableItems;
};

export const DROPDOWN_TYPE = {
  MULTI: 'multiSelect',
  SINGLE: 'singleSelect',
  COUNTRY: 'country',
  REGULAR: 'regular',
  TREE_MENU: 'treeMenu',
};

export default {
  DROPDOWN_TYPE,
  getMaxDisplayableItemsForContainer,
};
