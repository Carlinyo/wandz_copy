import { defineStore } from 'pinia';
import { computed, onBeforeMount, reactive, ref } from 'vue';

import { AiFeaturesApi } from '@/apis';
import type {
  IAiFeatureDistributionResponse,
  IAiFeaturesBasicConfig,
  IAiFeaturesResponse,
  ICustomAiFeaturesConfig,
} from '@wandzai/wandz-interfaces';
import { localStorageService } from '@/utils/local-storage';
import { LocalStorageItems } from '@/components/Wandz/types';
import { sleep } from '@/utils/common';
import { AiFeaturesActions } from '@/stores/wandz/types';

/** Init searched items */
localStorageService.initItem(LocalStorageItems.RECENT_SEARCHED_AI_FEATURES, []);

export const aiFeaturesStore = defineStore('ai-features', () => {
  /** Data */
  const features = ref<IAiFeaturesResponse>(<IAiFeaturesResponse>{});
  const creationModalOpened = ref(false);

  /** This will represent the current ai-feature we're working on.
   * It will be updated for case a feature selected from table or from search.
   * On case this <ref> is not null, the drawer will be opened and show the <handledAiFeature>
   * (we need to think if we might want to use here <reactive>) */
  const handledAiFeature = ref<IAiFeaturesBasicConfig | null>(null);
  const aiFeaturesDistribution = reactive<Record<string, IAiFeatureDistributionResponse>>({});

  const loadingStates = reactive<Record<AiFeaturesActions, boolean>>({
    [AiFeaturesActions.FETCH_ALL]: false,
    [AiFeaturesActions.FETCH_FEATURE_DISTRIBUTION]: false,
  });

  /** Computed */
  const handledAiFeatureDistribution = computed(() => aiFeaturesDistribution[handledAiFeature.value?.id]);

  /** Methods */
  const initStore = async () => {
    await Promise.all([fetchAiFeatures()]);
  };

  const fetchAiFeatures = async (/**clientTag: string, domain: string*/) => {
    await AiFeaturesApi.fetchAiFeatures(/**clientTag, domain*/).then((data: IAiFeaturesResponse) => {
      features.value = data;
    });
  };

  const createAiFeature = async (/**clientTag: string, domain: string*/) => {};

  const editAiFeature = async (updatedData: Partial<IAiFeaturesBasicConfig>) => {
    await AiFeaturesApi.editAiFeature((<IAiFeaturesBasicConfig>handledAiFeature.value).id, updatedData).then(() => {
      const updatedFeature = {
        ...handledAiFeature.value,
        ...updatedData,
      } as IAiFeaturesBasicConfig;

      handledAiFeature.value = updatedFeature;

      /** Sync custom ai-features list */
      features.value = {
        ...features.value,
        custom: features.value.custom.map((f: IAiFeaturesBasicConfig) =>
          f.id === handledAiFeature.value?.id ? updatedFeature : f,
        ) as ICustomAiFeaturesConfig[],
      };
    });
  };

  const deleteAiFeature = async (id: number) => {
    await AiFeaturesApi.deleteAiFeature(id)
      /** Faking latency. It looks more real... */
      .then(sleep.bind(null, 1000))
      .then(() => {
        handledAiFeature.value = null;

        /** Sync custom ai-features list */
        features.value = {
          ...features.value,
          custom: features.value.custom.filter((f: IAiFeaturesBasicConfig) => f.id !== id) as ICustomAiFeaturesConfig[],
        };
      });
  };

  const setHandledAiFeature = async (feature: IAiFeaturesBasicConfig) => {
    handledAiFeature.value = feature;

    if (!aiFeaturesDistribution[feature.id]) {
      loadingStates[AiFeaturesActions.FETCH_FEATURE_DISTRIBUTION] = true;

      await AiFeaturesApi.fetchAiFeatureDistribution(feature.id)
        .then((result) => {
          aiFeaturesDistribution[feature.id] = result;
        })
        /** Should be removed */
        .then(sleep.bind(null, 1500))
        .finally(() => {
          loadingStates[AiFeaturesActions.FETCH_FEATURE_DISTRIBUTION] = false;
        });
    }
  };

  const clearHandledAiFeature = () => {
    handledAiFeature.value = null;
  };

  const openCreationModal = () => {
    creationModalOpened.value = true;
  };

  const closeCreationModal = () => {
    creationModalOpened.value = false;
  };

  onBeforeMount(async () => await initStore());

  return {
    /** state */
    features,
    creationModalOpened,
    handledAiFeature,

    /** computed */
    loadingStates,
    handledAiFeatureDistribution,

    /** actions */
    editAiFeature,
    createAiFeature,
    deleteAiFeature,
    openCreationModal,
    closeCreationModal,

    setHandledAiFeature,
    clearHandledAiFeature,
  };
});
