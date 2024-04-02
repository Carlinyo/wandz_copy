import Dropdown from '../../src/components/Dropdown';
import { action } from '@storybook/addon-actions';
import fiCanada from '../Dropdown/CountryIcons/fiCanada.png';
import fiItaly from '../Dropdown/CountryIcons/fiItaly.png';
import fiAustralia from '../Dropdown/CountryIcons/fiAustralia.png';
import fiSwitzerland from '../Dropdown/CountryIcons/fiSwitzerland.png';

const allCountries = [
  { country: 'Australia', flag: fiAustralia },
  { country: 'Canada', flag: fiCanada },
  { country: 'Italy', flag: fiItaly },
  { country: 'Switzerland', flag: fiSwitzerland },
];
export default {
  title: 'Input/Dropdown Countries',
  argTypes: {
    title: {
      control: { type: 'text' },
      defaultValue: 'Country',
      name: 'Title',
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
    error: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Validation',
    },
    width: {
      control: { type: 'number' },
      defaultValue: 364,
      name: 'Component width',
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
  },
  args: {
    title: 'Country',
    allItemsSelectedTitle: 'All countries',
    useSearch: true,
    error: false,
    width: 364,
    showFirstLineLabel: true,
    useVueScroll: false,
  },
};

export const dropdownCountries = (args, { argTypes }) => ({
  components: { Dropdown },
  props: Object.keys(argTypes),
  computed: {
    items() {
      return allCountries;
    },
  },
  methods: {
    onDropdownToggle: action('Selected items:'),
  },
  template: `
  <dropdown
    :title="title"
    :allItemsSelectedTitle="allItemsSelectedTitle"
    :items="items"
    :useSearch="useSearch"
    :type="'country'"
    :error="error"
    :width="width"
    :showFirstLineLabel="showFirstLineLabel"
    :useVueScroll="useVueScroll"
    @dropdown-toggle="onDropdownToggle"
  >
  </dropdown>`,
});
