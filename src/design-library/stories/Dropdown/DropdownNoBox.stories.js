import Dropdown from '../../src/components/Dropdown';
import { action } from '@storybook/addon-actions';
import fiCanada from '../Dropdown/CountryIcons/fiCanada.png';
import fiItaly from '../Dropdown/CountryIcons/fiItaly.png';
import fiAustralia from '../Dropdown/CountryIcons/fiAustralia.png';
import fiSwitzerland from '../Dropdown/CountryIcons/fiSwitzerland.png';

const allCountries = ['https://www.rockandroll.com', 'https://namogoo.com'];

export default {
  title: 'Input/Dropdown No Box',
  argTypes: {
    type: {
      options: ['multiSelect', 'singleSelect', 'regular'],
      control: { type: 'select' },
      defaultValue: 'singleSelect',
      name: 'Select type',
    },
    title: {
      control: { type: 'text' },
      defaultValue: 'Domain:',
      name: 'Title',
    },
    dense: {
      control: { type: 'boolean' },
      defaultValue: true,
      name: 'Dense field',
    },
    allItemsSelectedTitle: {
      control: { type: 'text' },
      defaultValue: 'All items',
      name: 'Text for "All select" option',
    },
    useSearch: {
      control: { type: 'boolean' },
      defaultValue: false,
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
    shadow: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Show shadow',
    },
    showFirstLineLabel: {
      control: { type: 'boolean' },
      defaultValue: true,
      name: 'Show First Line Label',
    },
    showPrependIcon: {
      control: { type: 'boolean' },
      defaultValue: true,
      name: 'Show Prepend icon',
    },
    prependIcon: {
      control: { type: 'file' },
      name: 'Prepend icon (48x48)',
    },
    useVueScroll: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Use Vue scroll',
    },
  },
};

export const dropdownNoBox = (args, { argTypes }) => ({
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
    :type="type"
    :error="error"
    :width="width"
    :showFirstLineLabel="showFirstLineLabel"
    :useVueScroll="useVueScroll"
    :shadow="shadow"
    :dense="dense"
    :show-prepend-icon="showPrependIcon"
    :prependIcon="prependIcon"
    @dropdown-toggle="onDropdownToggle"
  >
  </dropdown>`,
});
