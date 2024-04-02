<template>
  <grid-layout
    :items="[
      {
        gridColumnStart: 1,
        gridColumnEnd: 12,
        name: 'ai-features-manager-header',
      },
      {
        gridColumnStart: 1,
        gridColumnEnd: 12,
        name: 'ai-features-table',
      },
    ]"
  >
    <template #ai-features-manager-header>
      <div class="ai-features-manager-header">
        <ai-features-search
          :type="'medium'"
          :items="allFeaturesArray"
          @aiFeatureClicked="setHandledAiFeature"
        />
        <wandz-button
          :text-padding="24"
          @click="openCreationModal"
        >
          {{ buttonText }}
        </wandz-button>
      </div>
    </template>

    <template #ai-features-table>
      <div class="element-container ai-features-table">
        <top-tabs
          :tabs="tabs"
          :border="false"
          :background-color="false"
          embedded-box
          :tab-index="selectedTabIndex"
          @on-tab-click="
            (tab, index) => {
              onTabSelected(tab, index);
            }
          "
        />
        <!-- Custom tab empty state -->
        <div
          v-if="isCustomTabSelected && selectedTabFeatures.length === 0"
          class="custom-tab-empty-state"
        >
          <img
            :src="SiteClick"
            alt=""
          />
          <div
            class="custom-tab-empty-state-message regular-title"
            v-text="customAiFeaturesEmptyState"
          />
          <wandz-button
            :text-padding="24"
            style-type="secondary"
            @click="openCreationModal"
          >
            {{ buttonText }}
          </wandz-button>
        </div>
        <ai-features-list
          v-else
          class="ai-features-list"
          show-items-icon
          :items="
            selectedTabFeatures.map((feature: IAiFeaturesBasicConfig) => ({
              ...feature,
              icon: isCustomTabSelected ? CUSTOM_AI_FEATURE_SVG : feature.icon,
            }))
          "
          @clickedItem="setHandledAiFeature"
        />
      </div>
    </template>
  </grid-layout>
  <ai-features-modal
    v-if="creationModalOpened"
    @modal-close="closeCreationModal"
  />
  <ai-features-drawer
    v-if="handledAiFeature"
    :item="handledAiFeature"
    :is-loading="loadingStates[AiFeaturesActions.FETCH_FEATURE_DISTRIBUTION]"
    :distribution-response="handledAiFeatureDistribution"
    :is-custom-feature="isCustomTabSelected"
    v-on="{
      [WandzCommonEmits.CLOSE_DRAWER]: clearHandledAiFeature,
      [WandzCommonEmits.AI_FEATURE_DELETED]: onAiFeatureDeleted,
    }"
  />
  <snackbar
    v-if="snackbarMessage"
    class="snackbar"
    :text="snackbarMessage"
    :type="'info'"
    :timerToDisappear="5"
    @snackbarClickButtonX="clearSnackbar"
    @hide-by-timer="clearSnackbar"
  />
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { storeToRefs } from 'pinia';

  import { type ITabItem } from '@/design-library/src/types/interfaces/tab-item';

  import SiteClick from '@/design-library/src/assets/icons/empty-states/SiteClick.svg';

  /** Components */
  import Snackbar from '@/design-library/src/components/Snackbars/Snackbars.vue';
  import GridLayout from '@/design-library/src/components/Layout/GridLayout.vue';
  import TopTabs from '@/design-library/src/components/TopTabs/TopTabs.vue';
  import WandzButton from '@/design-library/src/components/Button/Button.vue';
  import AiFeaturesModal from './components/AiFeaturesModal.vue';
  import AiFeaturesDrawer from './components/AiFeaturesDrawer/AiFeaturesDrawer.vue';
  import AiFeaturesList from './components/AiFeaturesTable/AiFeaturesList.vue';
  import AiFeaturesSearch from './components/AiFeaturesSearch/AiFeaturesSearch.vue';

  /** Store usage */
  import { useAiFeaturesStore } from '@/stores/wandz';

  const aiFeaturesStore = useAiFeaturesStore();
  const { handledAiFeatureDistribution, features, creationModalOpened, handledAiFeature, loadingStates } =
    storeToRefs(aiFeaturesStore);

  const { closeCreationModal, openCreationModal, setHandledAiFeature, clearHandledAiFeature, deleteAiFeature } =
    aiFeaturesStore;

  import {
    AI_FEATURES_TABLE_TABS,
    AI_FEATURES_CREATE_BUTTON,
    CUSTOM_AI_FEATURES_EMPTY_MESSAGE,
    CUSTOM_AI_FEATURE_SVG,
    SNACKBAR_DELETION_MESSAGE,
  } from './consts';

  import { BucketsIds, type IAiFeaturesBasicConfig, type ICustomAiFeaturesConfig } from '@wandzai/wandz-interfaces';
  import { WandzCommonEmits } from '@/components/Wandz/types';
  import { AiFeaturesActions } from '@/stores/wandz/types';

  /** Data */
  const snackbarMessage = ref<string>('');
  const tabs = ref(AI_FEATURES_TABLE_TABS);
  const buttonText = ref(AI_FEATURES_CREATE_BUTTON);
  const selectedTabKey = ref(AI_FEATURES_TABLE_TABS[0].key);
  const selectedTabIndex = ref(0);

  const customAiFeaturesEmptyState = ref(CUSTOM_AI_FEATURES_EMPTY_MESSAGE);

  const onAiFeatureDeleted = (item: ICustomAiFeaturesConfig) => {
    deleteAiFeature(item.id).finally(() => {
      snackbarMessage.value = SNACKBAR_DELETION_MESSAGE(item.displayName as string);
    });
  };

  const clearSnackbar = () => {
    snackbarMessage.value = '';
  };

  /** Methods */
  const onTabSelected = (tab: ITabItem, index: number) => {
    selectedTabIndex.value = index;
    selectedTabKey.value = tab.key;
  };

  /** Computed */
  const allFeaturesArray = computed<IAiFeaturesBasicConfig[]>(() => {
    return Object.entries(features.value).reduce(
      (acc, [bucket, list]) => [
        ...acc,
        /** Skip popular to avoid duplicated features */
        ...(bucket === BucketsIds.POPULAR ? [] : list),
      ],
      [],
    );
  });

  const selectedTabFeatures = computed<IAiFeaturesBasicConfig[]>(() => {
    return features.value[selectedTabKey.value] || [] /** For case features wasn't loaded yet. */;
  });

  const isCustomTabSelected = computed(() => {
    return selectedTabKey.value === BucketsIds.CUSTOM;
  });
</script>

<style scoped lang="scss">
  .ai-features-table {
    height: calc(100vh - 164px);

    .ai-features-list {
      padding-bottom: 32px;
      height: calc(100% - 64px);
      overflow-y: scroll;
    }

    .custom-tab-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: calc(100% - 32px);
      gap: 24px;

      .custom-tab-empty-state-message {
        max-width: 300px;
        text-align: center;
      }
      img {
        width: 110px;
        height: 90px;
      }
    }
  }

  .ai-features-manager-header {
    width: 96%;
    display: flex;
    justify-content: space-between;
  }

  :deep(.embedded-line) {
    width: calc(100% + 32px);
    left: -16px;
  }
</style>
