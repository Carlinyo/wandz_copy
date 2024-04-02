import { action } from '@storybook/addon-actions';
import NmgTopTabs from '../../src/components/TopTabs';

const tabs = [{ name: 'First tab' }, { name: 'Second tab', disabled: true }, { name: 'Third tab', info: 'my info 🥸' }];

export default {
  title: 'Navigation/Top Tabs',
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['medium', 'large'],
    },
    boxStyle: {
      control: { type: 'boolean' },
      name: 'Use Box-style',
    },
    horizontalScroll: {
      control: { type: 'boolean' },
      name: 'Use horizontal scroll',
    },
    useFadeEffect: {
      control: { type: 'boolean' },
      name: 'Use fade effect',
    },
    title: {
      control: { type: 'text' },
      name: 'Tittle',
    },
    hoverColor: {
      control: { type: 'color' },
      name: 'Hover color',
    },
    showGreyLine: {
      control: { type: 'boolean' },
      name: 'Show grey line',
    },
    tabsLeftPadding: {
      control: { type: 'number' },
      name: 'Leading line (left padding)',
    },
    titlePadding: {
      control: { type: 'boolean' },
      name: 'Title padding',
    },
    backgroundColor: {
      control: { type: 'boolean' },
      name: 'Background color (White)',
    },
  },
  args: {
    size: 'medium',
    boxStyle: false,
    horizontalScroll: false,
    useFadeEffect: false,
    showGreyLine: false,
    titlePadding: false,
    tabsLeftPadding: 0,
    backgroundColor: false,
    // title: 'Top Tabs',
    // hoverColor: '#000000'
  },
};

export const TopTabs = (args, { argTypes }) => ({
  components: { NmgTopTabs },
  props: Object.keys(argTypes),
  computed: {
    tabs() {
      return tabs;
    },
  },
  data() {
    return {
      contents: ['First tab content', 'Second tab content', 'Third tab content'],
      selectedTabIdx: 0,
    };
  },
  methods: {
    onTabClick(tab, idx) {
      this.selectedTabIdx = idx;
      this.emitTab(tab);
    },
    emitTab: action('selected tab'),
  },
  template: `
    <div class="">
  <nmg-top-tabs
    :tabs="tabs"
    :size="size"
    :tabIndex="selectedTabIdx"
    :title="title"
    :boxStyle="boxStyle"
    :hoverColor="hoverColor"
    :show-grey-line="showGreyLine"
    :tabs-left-padding="tabsLeftPadding"
    :titlePadding="titlePadding"
    :background-color="backgroundColor"
    @on-tab-click="onTabClick"
  >
    <div style="padding:30px;">
      <div v-for="(item ,idx) in contents" :key="item" v-show="selectedTabIdx === idx">
        {{ item }} rofl
      </div>
    </div>
  </nmg-top-tabs></div>`,
});

export const TopTabsInfoAndDisabled = (args, { argTypes }) => ({
  components: { NmgTopTabs },
  props: Object.keys(argTypes),
  // computed: {
  //   tabs() {
  //     return tabs;
  //   },
  // },
  data() {
    return {
      contents: ['First tab content', 'Second tab content', 'Third tab content'].map((str, idx) => ({
        name: str,
        info: str,
        disabled: idx !== 0,
      })),
      selectedTabIdx: 0,
    };
  },
  methods: {
    onTabClick(tab, idx) {
      this.selectedTabIdx = idx;
      this.emitTab(tab);
    },
    emitTab: action('selected tab'),
  },
  template: `
  <nmg-top-tabs
    :tabs="contents"
    :tabIndex="selectedTabIdx"
    :title="title"
    :boxStyle="boxStyle"
    :hoverColor="hoverColor"
    @on-tab-click="onTabClick"
  />
  `,
});

export const TopTabsWithScroll = (args, { argTypes }) => ({
  components: { NmgTopTabs },
  props: Object.keys(argTypes),
  data() {
    return {
      contents: [
        { name: 'First tab' },
        { name: 'Second tab' },
        { name: 'Third tab' },
        { name: 'Fourth tab' },
        { name: 'Fives tab' },
        { name: 'Sixth tab' },
      ],
      selectedTabIdx: 0,
    };
  },
  methods: {
    onTabClick(tab, idx) {
      this.selectedTabIdx = idx;
      this.emitTab(tab);
    },
    emitTab: action('selected tab'),
  },
  template: `
   <div style="width: 300px">
    <nmg-top-tabs
      :tabs="contents"
      :tabIndex="selectedTabIdx"
      :title="title"
      :boxStyle="boxStyle"
      :horizontalScroll="horizontalScroll"
      :useFadeEffect="useFadeEffect"
      :hoverColor="hoverColor"
      @on-tab-click="onTabClick"
    />
  </div>
  `,
});
