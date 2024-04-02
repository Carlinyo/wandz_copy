/* eslint-disable max-len */
const strCompare = (key, dir) => (a, b) => a.ref[key].toLowerCase().localeCompare(b.ref[key].toLowerCase()) * dir;
const numericCompare = (key, dir) => (a, b) => (Number(a.ref[key]) - Number(b.ref[key])) * dir;
const dateCompare = (key, dir) => (a, b) => (new Date(a.ref[key]) - new Date(b.ref[key])) * dir;
/* eslint-enable max-len */

export const highlightSymbol = Symbol('highlight');

export const DIRECTIONS = {
  ASC: 1,
  DESC: -1,
};

export const getSorterByData = (list, headerInfo) => {
  const { key, direction, unsortable, customSort } = headerInfo;

  // cant determine sort
  if (unsortable || !key || !list.length || list[0].ref[key] === undefined) return null;

  // indicating sample value for all other values being compared with
  const sampleValue = list[0].ref[key];

  // got custom sort for this key
  if (customSort) return customSort(direction);

  // is Date instance
  if (sampleValue instanceof Date) {
    return dateCompare(key, direction);
  }

  // is numeric compare
  if (typeof sampleValue === 'number') {
    return numericCompare(key, direction);
  }

  // is str compare
  if (typeof sampleValue === 'string') {
    // is date as string compare
    const isDateStr = !Number.isNaN(Date.parse(sampleValue));
    if (isDateStr) {
      return dateCompare(key, direction);
    }
    // is numeric str compare
    const isNumericStr = !Number.isNaN(parseInt(sampleValue, 10));
    if (isNumericStr) {
      return numericCompare(key, direction);
    }
    return strCompare(key, direction);
  }

  return null;
};

export default {
  getSorterByData,
  DIRECTIONS,
};
