import { action } from '@storybook/addon-actions';
import SidebarMenu from '../../src/components/SidebarMenu';

export default {
  title: 'SidebarMenu',
  argTypes: {
    items: {
      control: { type: 'object' },
      defaultValue: [],
    },
  },
};

export const sidebarMenu = (args, { argTypes }) => ({
  components: { SidebarMenu },
  props: Object.keys(argTypes),
  methods: {
    // onInputChanged: action('Inputed'),
  },
  template: `

      <div class="tw-bg-gray-50 tw-h-screen tw-flex">
        <sidebar-menu />
        <div class="view-container-body tw-container tw-grid tw-grid-cols-12 tw-gap-8 tw-items-start tw-px-10 tw-pt-10">
          <div v-for="i in 4" class="tw-col-span-3 tw-p-5 tw-bg-gray-200 tw-shadow tw-rounded">x</div>
        </div>
      </div>
    `,
});
