import Menu from '../../src/components/Menu';
import playIcon from '../../src/assets/icons/actions/edit.svg';
import alertIcon from '../../src/assets/icons/info/alert.svg';
import lockIcon from '../../src/assets/icons/info/lock.svg';
import NmgButton from '../../src/components/Button';
import { addDescription, containerSpacingDecorator } from '../story-helpers';

// const iconUrl = 'https://platform.namogoo.com/img/companyInfoIcon.e842655d.svg';

const itemList = [
  {
    text: 'Some text bruh',
    iconSrc: playIcon,
    iconSrcAdditional: alertIcon,
    isSelected: false,
  },
  {
    text: 'Some text bruh here',
    iconSrc: playIcon,
    iconSrcAdditional: lockIcon,
    tooltipContent: 'Tooltip content',
    isSelected: true,
  },
  {
    text: 'Some text bruh here toooooooooooooooooo',
    iconSrc: playIcon,
    isSelected: false,
  },
];

export default {
  title: 'Navigation/Menu',
  component: Menu,
  decorators: [containerSpacingDecorator],
  argTypes: {
    menuHeader: {
      control: { type: 'text' },
      description: 'Text header to appear above Menu items',
    },
    searchable: {
      control: { type: 'boolean' },
      description: 'Add search text input',
    },
    hideNoResultsMessage: {
      control: { type: 'boolean' },
    },
    dynamicWidth: {
      control: { type: 'boolean' },
      description: 'If true, the width of the menu will be based on the width of widest menu item',
    },
    isMenuEllipsis: {
      control: { type: 'boolean' },
      description: 'Enable ellipsis for menu items',
    },
    items: {
      control: { type: 'object' },
      description: "[{ text:'', iconSrc: '', iconSrcAdditional: '', isSelected: false }]",
    },
    menuStyle: {
      control: { type: 'object' },
      description: 'Styles to be applied to the menu container',
    },
    listStyle: {
      control: { type: 'object' },
      description: 'Styles to be applied to the menu list, use this to apply scroll behavior passing `max-height`',
    },
  },
  args: {
    searchable: false,
    hideNoResultsMessage: false,
    dynamicWidth: false,
    isMenuEllipsis: false,
    items: itemList.map((item) => ({
      ...item,
      // iconSrc: null,
      // iconSrcAdditional: null
    })),
    menuStyle: {},
    listStyle: {},
  },
};

export const DefaultMenu = (args, { argTypes }) => ({
  components: { Menu, NmgButton },
  props: Object.keys(argTypes),
  template: '<Menu is-open v-bind="$props" />',
});
addDescription(DefaultMenu, 'Default Menu');

export const WithDynamicWidth = DefaultMenu.bind({});
WithDynamicWidth.args = {
  dynamicWidth: true,
};
addDescription(WithDynamicWidth, "Use item's content to determine the menu's width");

export const WithScroll = DefaultMenu.bind({});
WithScroll.args = {
  listStyle: { maxHeight: '190px' },
  items: [...itemList, ...itemList, ...itemList].map((item, index) => ({ ...item, isSelected: index === 2 })),
};
addDescription(
  WithScroll,
  'Example List style with ```{ max-height: 190px }```, to enable scroll and control how many items are visible',
);

export const WithIcons = DefaultMenu.bind({});
WithIcons.args = {
  items: itemList,
};
addDescription(WithIcons, 'With icons');
