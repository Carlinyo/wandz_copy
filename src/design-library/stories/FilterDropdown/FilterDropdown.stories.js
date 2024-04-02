import FilterDropdownComp from '../../src/components/FilterDropdown';
import Menu from '../../src/components/Menu';
import MultiChoices from '../../src/components/MultiChoices';

export default {
  title: 'Input/Filter Dropdown',
  component: FilterDropdownComp,
  subcomponents: { Menu, MultiChoices },
  argTypes: {
    menuStyle: {
      control: { type: 'object' },
      name: 'menuStyle',
      description: 'Pass down style for Menu component',
      defaultValue: {},
    },
    multiChoice: {
      control: { type: 'boolean' },
      name: 'multiChoice',
      description: 'Multiple options',
      defaultValue: false,
    },
    searchable: {
      control: { type: 'boolean' },
      name: 'searchable',
      description: 'Adds search input',
      defaultValue: false,
    },
    disabled: {
      control: { type: 'boolean' },
      name: 'disabled',
      description: 'Disable click to opening list',
      defaultValue: false,
    },
    label: {
      control: { type: 'text' },
      name: 'label',
      description: 'Filter label',
      defaultValue: 'Label',
    },
    selectedItem: {
      control: { type: 'text' },
      name: 'selectedItem',
      description: 'selected item description or text to appear when nothing is selected',
      defaultValue: 'Boop',
    },
    allSelectedText: {
      control: { type: 'text' },
      name: 'allSelectedText',
      description: 'Text to appear when in multi choice everything is selected',
      defaultValue: 'All',
    },
    underlineLabel: {
      control: { type: 'boolean' },
      name: 'underlineLabel',
      description: 'Underline Label',
      defaultValue: false,
    },
    underlineLabelStyles: {
      control: { type: 'object' },
      name: 'underlineLabelStyles',
      description: 'Pass down style for underline label text',
      defaultValue: {},
    },
    categories: {
      control: { type: 'array' },
      name: 'categories',
      description: 'categories',
      defaultValue: [],
    },
    ctaBtnTitle: {
      control: { type: 'string' },
      name: 'ctaBtnTitle',
      description: 'title to cta button',
      defaultValue: 'add Something',
    },
    isFont: {
      control: { type: 'boolean' },
      name: 'isFont',
      description: 'is font items',
      defaultValue: false,
    },
    horizontalLabel: {
      control: { type: 'boolean' },
      name: 'horizontalLabel',
      description: 'Horizontal Label',
      defaultValue: false,
    },
    arrowStyle: {
      options: ['thin', 'filled'],
      control: { type: 'select' },
      defaultValue: 'thin',
      name: 'Arrow Style',
    },
    selectedItemStyle: {
      options: ['regular', 'heading-h4'],
      control: { type: 'select' },
      defaultValue: 'regular',
      name: 'Selected Item Style',
    },
  },
  args: {
    menuStyle: {},
    multiChoice: false,
    searchable: false,
    disabled: false,
    label: 'Label',
    selectedItem: 'Boop',
    allSelectedText: 'All',
    underlineLabel: false,
    underlineLabelStyles: {},
    categories: [],
    ctaBtnTitle: 'add Something',
    isFont: false,
    horizontalLabel: false,
    arrowStyle: 'thin',
    selectedItemStyle: 'regular',
    maxMultiChoiceHeight: '300px',
  },
};

export const FilterDropdown = (args) => ({
  components: { FilterDropdown: FilterDropdownComp },
  props: Object.keys(args),
  data() {
    const multiChoice = Array(10)
      .fill()
      .map((_, idx) => ({ text: `booqeqweqeqweqweop${idx}`, isSelected: idx % 2 === 0 }));
    const singleChoice = Array(10)
      .fill()
      .map((_, idx) => ({ text: `boqweqweqweoop${idx}`, isSelected: idx === 2 }));
    const list = args.multiChoice ? multiChoice : singleChoice;
    return {
      list,
    };
  },
  methods: {
    onItemClick(clickedItem, clickedIdx) {
      this.list = this.list.map((item, idx) => ({
        ...item,
        isSelected: idx === clickedIdx,
      }));
    },
    onAllClicked() {
      const targetIsSelected = !this.list.every((item) => item.isSelected);
      this.list = this.list.map((item) => ({
        ...item,
        isSelected: targetIsSelected,
      }));
    },
  },
  template: `
    <div class="tw-flex tw-justify-center tw-items-center tw-mt-20">
      <div style="min-height:250px;" class="body-medium">
        <FilterDropdown
          :label="label"
          :multiChoice="multiChoice"
          :searchable="searchable"
          :disabled="disabled"
          :selected-item="selectedItem"
          :all-selected-text="allSelectedText"
          :menu-style="menuStyle"
          :items="list"
          :categories="categories"
          :isFont="isFont"
          :cta-btn-title="ctaBtnTitle"
          :horizontal-label="horizontalLabel"
          :arrow-style="arrowStyle"
          :selected-item-style="selectedItemStyle"
          :max-multi-choice-height="maxMultiChoiceHeight"
          :underline-label="underlineLabel"
          :underline-label-styles="underlineLabelStyles"
          @on-item-click="onItemClick"
          @on-select-all="onAllClicked"
        />
      </div>
    </div>
  `,
});

export const FilterDropdownSearchable = FilterDropdown.bind({});
FilterDropdownSearchable.args = {
  ...FilterDropdown.args,
  searchable: true,
};

export const FilterDropdownMultiChoice = FilterDropdown.bind({});
FilterDropdownMultiChoice.args = {
  ...FilterDropdown.args,
  multiChoice: true,
};

export const FilterDropdownCustomWidth = FilterDropdown.bind({});
FilterDropdownCustomWidth.args = {
  ...FilterDropdown.args,
  menuStyle: { width: '400px' },
};

export const FilterDropdownNoLabel = FilterDropdown.bind({});
FilterDropdownNoLabel.args = {
  ...FilterDropdown.args,
  label: '',
};
