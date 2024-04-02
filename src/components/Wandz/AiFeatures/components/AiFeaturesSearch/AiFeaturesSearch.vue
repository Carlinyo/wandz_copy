<template>
  <div
    class="search-container"
    v-on-clickaway="closeSearchModal"
  >
    <search
      :class="{
        'search-box': true,
      }"
      :type="'medium'"
      :input-custom-style="
        searchModalOpened
          ? {
              'border-bottom-left-radius': 'unset',
              'border-bottom-right-radius': 'unset',
            }
          : {}
      "
      :placeholder="AI_FEATURES_SEARCH_PH"
      :width="AI_FEATURES_SEARCH_WIDTH"
      @delete-clicked="closeSearchModal"
      @input-clicked="onSearchClick"
      @input-changed="onSearch"
    />
    <ai-features-search-modal
      class="search-modal"
      v-if="searchModalOpened"
      :searched-value="searchedValue"
      :filtered-items="filteredItems"
      @aiFeatureClicked="doOnAiFeatureClicked"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, defineProps, type PropType, computed, defineEmits } from 'vue';

  import { directive as vOnClickaway } from 'vue3-click-away';

  /** Components */
  import Search from '@/design-library/src/components/Search/Search.vue';
  import AiFeaturesSearchModal from './AiFeaturesSearchModal.vue';

  import { AI_FEATURES_SEARCH_PH, AI_FEATURES_SEARCH_WIDTH } from '../../consts';
  import type { IAiFeaturesBasicConfig } from '@wandzai/wandz-interfaces';
  import { WandzCommonEmits } from '@/components/Wandz/types';

  /** Data */
  const searchedValue = ref('');
  const searchModalOpened = ref(false);

  const props = defineProps({
    items: {
      type: Array as PropType<IAiFeaturesBasicConfig[]>,
      default: '',
    },
  });

  /** computed */
  const filteredItems = computed(() => {
    return searchedValue.value?.length
      ? props.items.filter(
          (item) =>
            /** Check if one of <displayName> words equals to searched term */
            item.displayName
              ?.split(' ')
              .some((word) => word.toLowerCase()?.includes(searchedValue.value.toLowerCase())),
        )
      : [];
  });

  const emit = defineEmits([WandzCommonEmits.AI_FEATURE_CLICKED]);

  /** methods */
  const onSearch = (term: string) => {
    searchedValue.value = term;
  };

  const onSearchClick = () => {
    searchModalOpened.value = true;
  };

  const closeSearchModal = () => {
    searchModalOpened.value = false;
  };

  const doOnAiFeatureClicked = (item: IAiFeaturesBasicConfig) => {
    searchModalOpened.value = false;
    emit(WandzCommonEmits.AI_FEATURE_CLICKED, item);
  };
</script>

<style scoped lang="scss">
  .search-container {
    position: relative;

    .search-modal {
      position: absolute;
    }
  }
</style>
