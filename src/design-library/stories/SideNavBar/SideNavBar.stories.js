import SideNavBar from '../../src/components/SideNavBar';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Navigation/Side Nav Bar',
  argTypes: {
    text: {
      control: { type: 'text' },
      defaultValue: 'Title Place Holder',
      name: 'SideNavBar text',
    },
    imageSrc: {
      control: { type: 'file' },
      name: 'Upload icon',
    },
  },
};

export const sideNavBar = (args, { argTypes }) => ({
  components: { SideNavBar },
  props: Object.keys(argTypes),
  methods: {
    onSelect(event) {
      event ? this.selected(this.text) : this.unSelected(this.text);
    },
    selected: action('Selected'),
    unSelected: action('Unselected'),
  },
  template: `
  <div>
    <side-nav-bar
      :text="text"
      :imageSrc="imageSrc"
      @side-bar-selected="onSelect"
    >
    </side-nav-bar>
  </div>
`,
});
