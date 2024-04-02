import { action } from '@storybook/addon-actions';
import MultiChoices from '../../src/components/MultiChoices';

export default {
  title: 'Input/Multi Choices',
  argTypes: {
    flat: {
      control: { type: 'boolean' },
      name: 'Is flat',
    },
    shrink: {
      control: { type: 'boolean' },
      name: 'Is shrink items to 5',
    },
    shrinkMinimum: {
      control: { type: 'Number' },
      name: 'Shrink minimum items',
    },
    searchable: {
      control: { type: 'boolean' },
      name: 'Is searchable',
    },
    clearOnAll: {
      control: { type: 'boolean' },
      name: 'Clear all items on all',
    },
  },
  args: {
    flat: false,
    shrink: false,
    shrinkMinimum: 5,
    searchable: false,
    clearOnAll: false,
  },
};

export const multiChoices = (args, { argTypes }) => ({
  components: {
    MultiChoices,
  },
  props: Object.keys(argTypes),
  data() {
    return {
      items: Array(10)
        .fill()
        .map((_, idx) => ({
          text: `booqeqweqeqweqweop${idx}`,
          isSelected: idx % 2 === 0,
        })),
    };
  },
  methods: {
    selectAll: action('selectAll'),
    itemClick: action('itemClick'),
  },
  template: `
    <multi-choices
      :items="items"
      :searchable="searchable"
      :flat="flat"
      :shrink="shrink"
      :shrink-minimum="shrinkMinimum"
      :clear-on-all="clearOnAll"
      @on-item-click="itemClick"
      @on-select-all="selectAll"
    />
    `,
});

export const shrinkMultiChoices = (args, { argTypes }) => ({
  components: {
    MultiChoices,
  },
  props: Object.keys(argTypes),
  data() {
    return {
      items: Array(10)
        .fill()
        .map((_, idx) => ({
          text: `booqeqweqeqweqweop${idx}`,
          isSelected: idx % 2 === 0,
        })),
    };
  },
  methods: {
    selectAll: action('selectAll'),
    itemClick: action('itemClick'),
  },
  template: `
    <multi-choices
      :items="items"
      :searchable="searchable"
      flat
      shrink
      :clear-on-all="clearOnAll"
      :shrink-minimum="shrinkMinimum"
      @on-item-click="itemClick"
      @on-select-all="selectAll"
    />
    `,
});

export const clearOnAllMultiChoices = (args, { argTypes }) => ({
  components: {
    MultiChoices,
  },
  props: Object.keys(argTypes),
  data() {
    return {
      items: Array(10)
        .fill()
        .map((_, idx) => ({
          text: `booqeqweqeqweqweop${idx}`,
          isSelected: true,
        })),
    };
  },
  methods: {
    selectAll: action('selectAll'),
    itemClick: action('itemClick'),
  },
  template: `
    <multi-choices
      :items="items"
      :searchable="searchable"
      flat
      :shrink="shrink"
      clear-on-all
      :shrink-minimum="shrinkMinimum"
      @on-item-click="itemClick"
      @on-select-all="selectAll"
    />
    `,
});
