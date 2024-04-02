import { action } from '@storybook/addon-actions';
import Dropdown from '../../src/components/Dropdown';
import moreInfo from '../../src/assets/icons/info/moreInfo.svg';

const allCountries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
];
const selected = [];
export default {
  title: 'Input/Dropdown',
  argTypes: {
    title: {
      control: { type: 'text' },
      defaultValue: 'Country',
      name: 'Title',
    },
    subTitle: {
      control: { type: 'text' },
      defaultValue: 'Select please',
      name: 'Subtitle',
    },
    allItemsSelectedTitle: {
      control: { type: 'text' },
      defaultValue: 'All countries',
      name: 'Text for "All select" option',
    },
    useSearch: {
      control: { type: 'boolean' },
      defaultValue: true,
      name: 'Use search',
    },
    type: {
      options: ['multiSelect', 'singleSelect', 'regular'],
      control: { type: 'select' },
      defaultValue: 'multiSelect',
      name: 'Select type',
    },
    error: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Error',
    },
    required: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Required',
    },
    width: {
      control: { type: 'number' },
      defaultValue: 364,
      name: 'Component width',
    },
    counterPillStyles: {
      control: { type: 'object' },
      defaultValue: {},
      name: 'Counter pill styles',
    },
    showFirstLineLabel: {
      control: { type: 'boolean' },
      defaultValue: true,
      name: 'Show First Line Label',
    },
    useVueScroll: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Use Vue scroll',
    },
    scrollHeight: {
      control: { type: 'number' },
      defaultValue: null,
      name: 'Define Scroll Height',
    },
    shadow: {
      control: { type: 'boolean' },
      defaultValue: true,
      name: 'Show shadow',
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'disabled',
    },
    dense: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Dense',
    },
    inline: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Inline',
    },
    mainIcon: {
      control: { type: 'file' },
      name: 'Main icon',
    },
    showPrependIcon: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Show Prepend icon',
    },
    prependIcon: {
      control: { type: 'file' },
      name: 'Prepend icon (48x48)',
    },
    tooltip: {
      control: { type: 'text' },
      name: 'Tooltip text',
    },
    size: {
      options: ['small', 'medium'],
      control: { type: 'select' },
      defaultValue: 'medium',
      name: 'Size',
    },
    mandatory: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    colorSwatchMap: {
      control: { type: 'object' },
      name: 'Color swatch object' /** Mapping list item key to a color */,
      defaultValue: null,
    },
  },
  args: {
    title: 'Country',
    subTitle: 'Select please',
    allItemsSelectedTitle: 'All countries',
    useSearch: true,
    type: 'multiSelect',
    error: false,
    counterPillStyles: {},
    showFirstLineLabel: true,
    useVueScroll: false,
    scrollHeight: null,
    shadow: true,
    disabled: false,
    dense: false,
    inline: false,
    mainIcon: moreInfo,
    showPrependIcon: false,
    prependIcon: '',
    tooltip: '',
    size: 'medium',
    mandatory: false,
  },
};

export const dropdown = (args, { argTypes }) => ({
  components: { Dropdown },
  props: Object.keys(argTypes),
  computed: {
    items() {
      return allCountries;
    },
    selectedItems() {
      return selected;
    },
  },
  methods: {
    onDropdownOpen: action('Dropdown opened'),
    onDropdownClose: action('Selected items'),
    onPillDelete: action('Selected items'),
  },
  template: `
  <div style="height:300px; width: 600px;">
  <dropdown
    :title="title"
    :subTitle="subTitle"
    :allItemsSelectedTitle="allItemsSelectedTitle"
    :items="items"
    :selectedItems="selectedItems"
    :useSearch="useSearch"
    :type="type"
    :error="error"
    :width="width"
    :showFirstLineLabel="showFirstLineLabel"
    :useVueScroll="useVueScroll"
    :mainIcon="mainIcon"
    :tooltip="tooltip"
    :disabled="disabled"
    :shadow="shadow"
    :show-prepend-icon="showPrependIcon"
    :prepend-icon="prependIcon"
    :dense="dense"
    :inline="inline"
    :size="size"
    :color-swatch-map="colorSwatchMap"
    :mandatory="mandatory"
    @dropdown-open="onDropdownOpen"
    @dropdown-close="onDropdownClose"
    @dropdown-click="onDropdownClose"
    @pill-delete="onPillDelete"
  >
  </dropdown>
  </div>
  `,
});
