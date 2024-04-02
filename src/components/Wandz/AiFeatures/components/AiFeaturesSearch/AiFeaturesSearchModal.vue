<template>
  <div
    v-if="resultsToShow || recentItemsToShow"
    class="search-modal-container border-bottom-radius"
    :style="{
      width: `${AI_FEATURES_SEARCH_WIDTH}px`,
    }"
  >
    <no-result-row
      v-if="
        filteredItems.length === 0 && searchedValue /** We won't show no-results component for an empty searched term */
      "
      :searched-value="searchedValue"
    />
    <div v-else>
      <div
        class="recent-items"
        v-if="recentItems.length && !searchedValue /** Show recent items only before typing.. */"
      >
        <div class="recent-items-header">
          <span
            class="overline-title txt-secondary"
            v-text="RECENTS"
          />
          <wandz-button
            styleType="textLink"
            :customButtonStyle="{ paddingRight: 0, paddingLeft: 0 }"
            @handle-click="doOnClearRecentItems"
          >
            {{ CLEAR }}
          </wandz-button>
        </div>
        <div
          v-for="(item, index) in recentItemsToShow"
          :key="index"
        >
          <result-row
            :item="item"
            @click="
              () => {
                doOnItemClicked(item);
              }
            "
          />
        </div>
      </div>
      <div
        v-for="(item, index) in resultsToShow"
        :key="index"
      >
        <result-row
          :class="{
            /** last item border should be with radius */
            'border-bottom-radius': index === resultsToShow.length - 1,
          }"
          :item="item"
          @click="
            () => {
              doOnItemClicked(item);
            }
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineProps, defineEmits, type PropType, computed } from 'vue';

  /** Components */
  import ResultRow from './ResultRow.vue';
  import NoResultRow from './NoResultRow.vue';
  import WandzButton from '@/design-library/src/components/Button/Button.vue';

  import { type IAiFeaturesBasicConfig } from '@wandzai/wandz-interfaces';
  import { CLEAR, RECENTS, AI_FEATURES_SEARCH_WIDTH, MAX_ITEMS_TO_SHOW_ON_SEARCH } from '../../consts';
  import { localStorageService } from '@/utils/local-storage';
  import { WandzCommonEmits, LocalStorageItems } from '@/components/Wandz/types';

  const props = defineProps({
    searchedValue: {
      type: String,
      default: '',
    },
    filteredItems: {
      type: Array as PropType<IAiFeaturesBasicConfig[]>,
      default: [],
    },
  });

  /** Data */
  /** Init recent items from local storage. */
  const recentItems = ref(localStorageService.getItem(LocalStorageItems.RECENT_SEARCHED_AI_FEATURES));

  const emit = defineEmits([WandzCommonEmits.AI_FEATURE_CLICKED]);

  /** Computed */
  const recentItemsToShow = computed(() => {
    return recentItems.value.slice(0, MAX_ITEMS_TO_SHOW_ON_SEARCH);
  });

  const resultsToShow = computed(() => {
    return props.filteredItems.slice(0, MAX_ITEMS_TO_SHOW_ON_SEARCH);
  });

  /** Methods */
  const doOnItemClicked = (item: IAiFeaturesBasicConfig) => {
    const currentRecentItems: IAiFeaturesBasicConfig[] = localStorageService.getItem(
      LocalStorageItems.RECENT_SEARCHED_AI_FEATURES,
    );

    if (!currentRecentItems.some((it) => item.id === it.id)) {
      currentRecentItems.push(item);

      localStorageService.setItem(LocalStorageItems.RECENT_SEARCHED_AI_FEATURES, currentRecentItems);
    }

    emit(WandzCommonEmits.AI_FEATURE_CLICKED, item);
  };

  const doOnClearRecentItems = () => {
    localStorageService.setItem(LocalStorageItems.RECENT_SEARCHED_AI_FEATURES, []);
    recentItems.value = [];
  };
</script>

<style scoped lang="scss">
  .border-bottom-radius {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .search-modal-container {
    height: max-content;
    background-color: #fff;
    border: 1px solid #d8dbe0;
    border-top: 0;
    z-index: 100;
  }
  .recent-items-header {
    padding: 16px;
    display: flex;
    justify-content: space-between;
  }
</style>
