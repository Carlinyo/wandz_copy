import TableMenu from '../../src/components/TableMenu';
import playIcon from '../../src/assets/icons/actions/edit.svg';
import alertIcon from '../../src/assets/icons/info/alert.svg';
import lockIcon from '../../src/assets/icons/info/lock.svg';

const itemList = [
  { text: 'Tab Name 1 here  ', iconSrc: playIcon, iconSrcAdditional: alertIcon, isSelected: false },
  { text: 'Tab Name 2 here  ', iconSrc: playIcon, iconSrcAdditional: lockIcon, isSelected: true },
  { text: 'Tab Name 3 here  ', iconSrc: playIcon, isSelected: false },
];
export default {
  title: 'Table Menu',
  argTypes: {
    menuHeader: {
      control: { type: 'text' },
      name: 'Menu Header',
    },
    searchable: {
      control: { type: 'boolean' },
      name: 'Searchable',
    },
    menuPlacement: {
      options: ['right', 'left', 'top', 'bottom'],
      control: { type: 'select' },
      name: 'Menu Placement',
    },
    menuOffsetX: {
      control: { type: 'number' },
      name: 'Menu Offset X',
    },
    menuOffsetY: {
      control: { type: 'number' },
      name: 'Menu Offset Y',
    },
  },
  args: {
    menuHeader: '',
    searchable: false,
    menuPlacement: 'bottom-end',
    menuOffsetX: 0,
    menuOffsetY: 2,
  },
};
export const tableMenu = (args, { argTypes }) => ({
  components: { TableMenu },
  props: Object.keys(argTypes),
  computed: {
    list() {
      return itemList;
    },
  },
  template: `
<div class="tw-flex tw-w-full tw-h-96 tw-justify-center tw-items-center">
  <table-menu
    :items="list"
    :menuHeader="menuHeader"
    :searchable="searchable"
    :menuPlacement="menuPlacement"
    :menuOffsetX="menuOffsetX"
    :menuOffsetY="menuOffsetY"
  >
  </table-menu>
</div>
`,
});
