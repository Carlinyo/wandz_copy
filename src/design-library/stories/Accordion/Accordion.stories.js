import Accordion from '../../src/components/Accordion';
import TextInput from '../../src/components/TextInput';
import TextInputDouble from '../../src/components/TextInputDouble';
import Radio from '../../src/components/Radio';
import Search from '../../src/components/Search';
import Menu from '../../src/components/Menu';
import playIcon from '../../src/assets/icons/actions/edit.svg';
import alertIcon from '../../src/assets/icons/info/alert.svg';
import lockIcon from '../../src/assets/icons/info/lock.svg';
import Logo from '../../src/components/Logo';

const menuItems = [
  {
    text: 'Tab one  ',
    iconSrc: playIcon,
    iconSrcAdditional: alertIcon,
    isSelected: false,
  },
  {
    text: 'Tab two  ',
    iconSrc: playIcon,
    iconSrcAdditional: lockIcon,
    isSelected: true,
  },
  { text: 'Tab three  ', iconSrc: playIcon, isSelected: false },
];

export default {
  title: 'Input/ Accordion',
  argTypes: {
    titleLarge: {
      control: { type: 'text' },
      defaultValue: 'Section Label One',
      name: 'Accordion title large style',
    },
    errorMessage: {
      control: { type: 'text' },
      defaultValue: '',
      name: 'Error Message',
    },
    maxHeightTransition: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Max height transition',
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Disabled accordion',
    },
    isOpen: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Is accordion opened',
    },
    flat: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Is accordion flat',
    },
    withShadow: {
      control: { type: 'boolean' },
      defaultValue: true,
      name: 'Is accordion with shadow',
    },
    alignLeft: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Is accordion aligned left',
    },
    disableHover: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'disableHover',
    },
    lightBackgroundColor: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'lightBackgroundColor',
    },
    openUpwards: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'open Upwards',
    },
    customWidth: {
      control: { type: 'number' },
      /** by default custom width is falsy and then will use the type (small/large) default */
      defaultValue: 0,
      name: 'custom width',
    },
    manageUiStateFromOutside: {
      control: { type: 'boolean' },
      /** true if want want to expand and collapse only from outside of component */
      defaultValue: false,
      name: 'manage ui state from outside',
    },
    type: {
      control: { type: 'select' },
      options: ['small', 'large'],
    },
    backgroundColor: {
      control: { type: 'color' },
    },
    showRadio: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'show radio button in the left side of the title',
    },
    selected: {
      control: { type: 'boolean' },
    },
  },
  args: {
    titleLarge: 'Section Label One',
    errorMessage: '',
    maxHeightTransition: false,
    disabled: false,
    isOpen: false,
    flat: false,
    alignLeft: false,
    disableHover: false,
    lightBackgroundColor: false,
    openUpwards: false,
    customWidth: 0,
    manageUiStateFromOutside: false,
    type: 'large',
    showRadio: false,
    selected: false,
    withShadow: true,
  },
};

export const accordion = (args, { argTypes }) => ({
  components: {
    Accordion,
    TextInput,
    TextInputDouble,
    Search,
    Menu,
    Logo,
    Radio,
  },
  props: Object.keys(argTypes),
  computed: {
    menuItems() {
      return menuItems;
    },
  },
  methods: {
    toggleRadio() {
      this.selected = !this.selected;
    },
  },
  template: `
    <div style="max-width:400px; margin-top: 50px;">
      <accordion
        :title="titleLarge"
        :errorMessage="errorMessage"
        :type="type"
        expandable
        :maxHeightTransition="maxHeightTransition"
        :disabled="disabled"
        :isOpen="isOpen"
        :flat="flat"
        :align-left="alignLeft"
        :openUpwards="openUpwards"
        :lightBackgroundColor="lightBackgroundColor"
        :selected="selected"
        :backgroundColor="backgroundColor"
        :withShadow="withShadow"
      >
        <template #title-left-content>
          <Radio v-if="showRadio" :checked="selected" @select="toggleRadio"/>
        </template>
      <div slot="content" class="content-wrapper">
        <TextInput label="Demo" showSecondaryIcon />
        <div style="max-width:400px">
          <accordion
            :title="titleLarge"
            :errorMessage="errorMessage"
            type="large"
            expandable
            :maxHeightTransition="maxHeightTransition"
            :disabled="disabled"
            :isOpen="isOpen"
            :flat="flat"
            :disableHover="disableHover"
            :align-left="alignLeft"
            :openUpwards="openUpwards"
          >
            <div slot="content" class="content-wrapper">
              <TextInput label="Demo" showSecondaryIcon></TextInput>
              <br>
              <TextInputDouble :width="300"></TextInputDouble>
            </div>
          </accordion>
          <br>
          <accordion
            style="margin-top: 100px"
            :title="titleLarge"
            type='small'
            expandable
            :maxHeightTransition="maxHeightTransition"
            :isOpen="isOpen"
            :flat="flat"
            :align-left="alignLeft"
            :lightBackgroundColor="lightBackgroundColor"
          >
            <div slot="content" class="content-wrapper">
              <search type='large' :width="300" />
              <br>
              <Menu :items="menuItems" />
              <br>
              <logo style="padding-top:8px;padding-bottom: 16px;" :type="'black'" />
            </div>
          </accordion>
        </div>
      </div>
      </accordion>
    </div>
  `,
});

export const flatAccordion = (args, { argTypes }) => ({
  components: {
    Accordion,
    TextInput,
    TextInputDouble,
  },
  props: Object.keys(argTypes),
  template: `
    <div>
    <accordion
      :title="titleLarge"
      :errorMessage="errorMessage"
      type='large'
      expandable
      :maxHeightTransition="maxHeightTransition"
      :disabled="disabled"
      isOpen
      flat
      align-left
    >
      <div slot="content" class="content-wrapper">
        <TextInput showSecondaryIcon ></TextInput>
        <br>
        <TextInputDouble :width="300"></TextInputDouble>
      </div>
    </accordion>
    </div>
  `,
});
export const CustomTitleAccordion = (args, { argTypes }) => ({
  components: {
    Accordion,
    TextInput,
    TextInputDouble,
  },
  props: Object.keys(args),
  template: `
    <div>
    <accordion
      expandable
      v-bind="$props"
    >

      <div slot="title" style="font-size:32px">my custom slot title bruh 🙀</div>
      <div slot="content" class="content-wrapper">
        <div style="font-size: 24px;text-align:center;">Boo 👻</div>
      </div>
    </accordion>
    </div>
  `,
});
