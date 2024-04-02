import MenuWithDescription from '../../src/components/MenuWithDescription';
import checkBadge from '../../src/assets/icons/check-marks/checked-new.svg';
import lockIcon from '../../src/assets/icons/info/lock.svg';
import { action } from '@storybook/addon-actions';
export default {
  title: 'Navigation/Menu With Description',
  argTypes: {
    list: {
      control: { type: 'object' },
    },
    showMenu: {
      control: { type: 'boolean' },
    },
  },
  args: {
    list: [
      {
        header: 'Header1',
        text: 'An explanation of this option appears in this running text1.',
        iconSrc: checkBadge,
        iconSrcAdditional: lockIcon,
        isSelected: false,
      },
      {
        header: 'Header2',
        text: 'An explanation of this option appears in this running text2.',
        iconSrc: checkBadge,
        isSelected: true,
        tagsText: 'tags text',
        tagsType: 'red',
      },
      {
        header: 'Header3',
        text: 'An explanation of this option appears in this running text3.',
        iconSrc: checkBadge,
        isSelected: false,
      },
      {
        header: 'Header4',
        text: 'An explanation of this option appears in this running text4.',
        iconSrc: checkBadge,
        isSelected: false,
      },
      {
        header: 'Header5',
        text: 'An explanation of this option appears in this running text5.',
        iconSrc: checkBadge,
        iconSrcAdditional: lockIcon,
        isSelected: false,
        isDisabled: true,
      },
      {
        header: 'Header6',
        text: 'An explanation of this option appears in this running text6.',
        iconSrc: checkBadge,
        isSelected: false,
      },
    ],
    showMenu: true,
  },
};

export const menuWithDescription = (args, { argTypes }) => ({
  components: { MenuWithDescription },
  props: Object.keys(args),
  methods: {
    onItemClick: action('Item clicked'),
    onClose: action('Click outside'),
  },
  template: `
    <div class="tw-w-96">
  <MenuWithDescription
    :items="list"
    :show-menu="showMenu"
    @on-item-click="onItemClick"
    @close="onClose"
  >
  </MenuWithDescription>
    </div>`,
});
