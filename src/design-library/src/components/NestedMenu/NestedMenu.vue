<template>
  <div class="nested">
    <div
      v-if="searchInput"
      class="search-holder"
    >
      <div
        class="search-result-title"
        v-text="searchResultTitle"
      />
      <div v-if="hasRelevantSearchItems">
        <div v-for="item in relevantSearchItems.filter(includeDetailItemCallback)">
          <detail-item
            :item-info="item"
            :show-category-name="true"
            @item-clicked="handleItemClicked"
          />
        </div>
      </div>
      <div
        v-else
        v-text="emptySearchMsg"
      />
    </div>
    <div
      v-else
      class="category-container"
    >
      <div class="categories">
        <div
          class="category-title"
          v-text="categoriesTitle"
        />
        <div v-for="item of upperCategories">
          <category-menu-item
            :item-info="item"
            :is-selected="isItemSelected(item)"
            @hoverItem="handleHoverItem"
            @leaveItem="handleLeaveItem"
          />
        </div>
        <div
          v-if="showSeparator"
          class="separator"
        />
        <div v-for="item of bottomCategories">
          <category-menu-item
            :item-info="item"
            :is-selected="isItemSelected(item)"
            @hoverItem="handleHoverItem"
            @leaveItem="handleLeaveItem"
          />
        </div>
      </div>
      <category-info
        v-if="showCategoryInfo"
        class="category-details"
        :info="selectedCategory.innerInfo"
        :is-with-tabs="selectedCategory.isWithTabs"
        :is-locked="selectedCategory.isLocked"
        :include-detail-item-callback="includeDetailItemCallback"
        @item-clicked="handleItemClicked"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { PropType } from 'vue';
  import {
    INestedMenuCategories,
    categoriesDivision,
    INestedMenuItem,
    InnerInfoType,
    IDetailItem,
  } from '../../types/interfaces/nested-menu';
  import CategoryMenuItem from './components/CategoryMenuItem.vue';
  import CategoryInfo from './components/CategoryInfo.vue';
  import DetailItem from './components/DetailItem.vue';

  export default {
    name: 'NestedMenu',
    components: {
      CategoryMenuItem,
      CategoryInfo,
      DetailItem,
    },
    props: {
      categories: {
        type: Object as PropType<INestedMenuCategories>,
        default: () => ({}),
      },
      searchInput: {
        type: String,
        default: '',
      },
      searchResultTitle: {
        type: String,
        default: 'Data Points',
      },
      searchEmptyStatePrefix: {
        type: String,
        default: 'Hmm, we couldn’t find anything for ',
      },
      /** By default we search all categories, this enables excluding specific categories: */
      excludeSearchCategories: {
        type: Array as PropType<string[]>,
        default: () => [],
      },
      /** Callback that returns for each item if we should exclude it */
      includeDetailItemCallback: {
        type: Function as PropType<() => Boolean>,
        default: () => true,
      },
    },
    data() {
      return {
        categoriesTitle: 'All Categories',
        selectedCategory: null,
        lastSelectedCategory: null,
        isAnyCategorySelected: true,
      };
    },
    computed: {
      upperCategories(): INestedMenuItem[] {
        return this.categories?.[categoriesDivision.UPPER];
      },
      bottomCategories(): INestedMenuItem[] {
        return this.categories?.[categoriesDivision.BOTTOM];
      },
      showSeparator() {
        /** show separating category line if upper and lower categories are not empty */
        return this.upperCategories?.length && this.bottomCategories?.length;
      },
      showCategoryInfo() {
        return this.selectedCategory && Object.keys(this.selectedCategory.innerInfo || {}).length;
      },
      relevantSearchItems() {
        /** filter out categories where we don't want to search in: */
        const getRelevantCategories = (categoriesArray): INestedMenuItem[] =>
          categoriesArray
            .map((category) => (this.excludeSearchCategories.includes(category.name) ? null : category))
            .filter((item) => item);

        const categoriesToSearchIn: INestedMenuItem[] = getRelevantCategories(this.upperCategories).concat(
          getRelevantCategories(this.bottomCategories),
        );

        /** search in relevant categories: */
        const accumulatedAns = [];
        categoriesToSearchIn.forEach((categoryItem: INestedMenuItem) => {
          Object.values(categoryItem.innerInfo).forEach((innerTabs: InnerInfoType) => {
            const searchIn: IDetailItem[][] = categoryItem.isWithTabs ? Object.values(innerTabs) : [innerTabs];
            searchIn.forEach((subcategory: IDetailItem[]) => {
              subcategory.forEach((innerItem: IDetailItem) => {
                if (innerItem.title?.toLowerCase().includes((this.searchInput || '').toLowerCase())) {
                  accumulatedAns.push({
                    ...innerItem,
                    categoryName: categoryItem.name,
                  }); /** add category name */
                }
              });
            });
          });
        });
        return accumulatedAns;
      },
      hasRelevantSearchItems() {
        return this.relevantSearchItems.length;
      },
      emptySearchMsg() {
        return `${this.searchEmptyStatePrefix}"${this.searchInput}".`;
      },
    },
    created() {
      this.selectedCategory = this.getInitialCategory() as INestedMenuItem;
      this.lastSelectedCategory = this.getInitialCategory() as INestedMenuItem;
    },
    methods: {
      isItemSelected(categoryItem: INestedMenuItem) {
        return this.selectedCategory && categoryItem.name === this.selectedCategory.name;
      },
      handleHoverItem(categoryItem: INestedMenuItem) {
        this.isAnyCategorySelected = true;
        this.lastSelectedCategory = categoryItem;
        setTimeout(() => {
          /** switch category item only if the cursor is on it for 500ms */
          if (this.isAnyCategorySelected && this.lastSelectedCategory.name === categoryItem.name) {
            this.selectedCategory = categoryItem;
          }
        }, 500);
      },
      handleLeaveItem() {
        this.isAnyCategorySelected = false;
      },
      handleItemClicked(clickedItem) {
        this.$emit('item-clicked', clickedItem);
      },
      getInitialCategory(): INestedMenuItem {
        if (this.categories) {
          /** select first category family from upper / bottom arrays: */
          const firstCategoryFamily = Object.values(this.categories)?.[0] as INestedMenuItem[];
          /** return first category inside the initial family: */
          return firstCategoryFamily?.[0] as INestedMenuItem;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../src/styles/colors/background.module';
  @import '../../../src/styles/colors/text.module.scss';

  .nested {
    width: 746px;
    height: 410px;
    background-color: white;
    display: flex;

    .separator {
      height: 1px;
      background-color: $bg-disabled;
    }

    .categories {
      display: flex;
      flex-direction: column;
      width: 226px;
      height: 100%;
      background-color: $bg-secondary;
      border-bottom-left-radius: 8px;

      .category-title {
        height: 32px;
        padding: 8px 16px;
        color: $txt-secondary;
        display: flex;
        align-items: center;
        font-family: Figtree;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
    }

    .category-container {
      display: contents;
    }
    .category-details {
      width: calc(100% - 244px);
    }

    .search-holder {
      overflow-y: scroll;
      overflow-x: hidden;
      width: 100%;
      margin: 16px 8px 16px 16px;
    }
    .search-result-title {
      margin-bottom: 12px;
      color: $txt-placeholder;
      font-size: 12px;
      line-height: 18px;
      display: flex;
      align-items: center;
      font-family: Figtree;
      text-transform: uppercase;
    }

    ::-webkit-scrollbar-track {
      border-radius: 10px;
    }

    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: $bg-shapes;
    }
  }
</style>
