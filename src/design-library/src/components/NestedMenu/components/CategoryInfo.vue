<template>
  <div class="container">
    <div
      v-if="isWithTabs"
      class="top-tabs"
    >
      <top-tabs
        :tabs="tabs"
        :border="false"
        :tab-index="selectedTabIndex"
        @on-tab-click="onTabChange"
      />
      <div class="tabs-line" />
    </div>
    <div
      v-for="subCategoryKey in subCategories"
      class="sub-category"
    >
      <div v-if="subCategoryMapping[subCategoryKey] && subCategoryMapping[subCategoryKey].length">
        <div
          class="info-title"
          v-text="subCategoryKey"
        />
        <upgrade-banner
          v-if="isLocked"
          class="upgrade"
          :text="upgradePrefix"
          context="nested-menu"
          :bold-text="upgradeSuffix"
          v-bind="upgradeBannerStyle"
        />
        <div :class="{ separator: showSeparators }" />
        <div v-for="item in subCategoryMapping[subCategoryKey]">
          <detail-item
            :item-info="item"
            @item-clicked="handleItemClicked"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { PropType } from 'vue';
  import DetailItem from './DetailItem.vue';
  import UpgradeBanner from '../../UpgradeBanner';
  import TopTabs from '../../TopTabs';
  import { ITabItem } from '@/types/interfaces/tab-item';
  import { InnerInfoType } from '@/types/interfaces/nested-menu';

  export default {
    name: 'CategoryInfo',
    components: {
      DetailItem,
      TopTabs,
      UpgradeBanner,
    },
    props: {
      info: {
        type: Object as PropType<InnerInfoType>,
        default: () => ({}),
      },
      isWithTabs: {
        type: Boolean,
        default: false,
      },
      isLocked: {
        type: Boolean,
        default: false,
      },
      /** Callback that returns for each item if we should exclude it */
      includeDetailItemCallback: {
        type: Function as PropType<() => Boolean>,
        default: () => true,
      },
    },
    data() {
      return {
        selectedTabIndex: 0,
        upgradePrefix: 'This category isn’t part of your package.',
        upgradeSuffix: ' for access.',
        upgradeBannerStyle: {
          bannerWidth: 460,
          bannerHeight: 32,
          modalStyle: {
            top: '40px',
            left: '0px',
          },
          iconStyle: {
            width: '24px',
            height: '24px',
            'margin-right': '12px',
            display: 'flex',
          },
        },
      };
    },
    computed: {
      showSeparators() {
        /** show separator lines only if has more than 1 subcategory */
        return Object.keys(this.info || {}).length > 1;
      },
      subCategories() {
        const objToOpen = this.isWithTabs ? this.info[this.selectedTabKey] /** open by selected tab */ : this.info;
        return Object.keys(objToOpen || {});
      },
      tabs(): ITabItem[] {
        return Object.keys(this.info).map((key) => {
          return {
            name: key,
          };
        });
      },
      selectedTabKey() {
        return this.isWithTabs ? Object.keys(this.info || {})[this.selectedTabIndex] : '';
      },
      subCategoryMapping(): Record<string, any[]> {
        /** map each subcategory to it's values to avoid duplicate calculations */
        return (this.subCategories || []).reduce((acc, key) => {
          acc[key] = this.innerSubCategoryInfo(key).filter(this.includeDetailItemCallback);
          return acc;
        }, {});
      },
    },
    methods: {
      onTabChange(tabItem: ITabItem, tabIndex: number) {
        this.selectedTabIndex = tabIndex;
      },
      innerSubCategoryInfo(subCategoryKey: string) {
        return this.isWithTabs ? this.info[this.selectedTabKey][subCategoryKey] : this.info[subCategoryKey];
      },
      handleItemClicked(clickedItem) {
        this.$emit('item-clicked', clickedItem);
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../styles/colors/text.module.scss';
  @import '../../../styles/colors/background.module.scss';

  .container {
    margin: 16px 8px 16px 8px;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;

    .info-title {
      margin-left: 8px;
      text-transform: uppercase;
      color: $txt-placeholder;
      font-family: Figtree;
      font-size: 12px;
      line-height: 18px;
      margin-bottom: 4px;
    }

    .upgrade {
      position: sticky;
    }
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #000000;
  }

  .sub-category {
    margin-bottom: 20px;
  }

  .sub-category:last-child {
    margin-bottom: 0;
  }

  .separator {
    height: 1px;
    margin-left: 8px;
    margin-bottom: 8px;
    background-color: $bg-secondary;
  }

  .top-tabs {
    margin-left: 8px;
    margin-bottom: 24px;

    .tabs-line {
      height: 1px;
      background-color: $bg-secondary;
    }
  }
</style>
