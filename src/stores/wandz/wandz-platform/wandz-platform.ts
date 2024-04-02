import { defineStore } from 'pinia';
import { onBeforeMount, ref } from 'vue';

import type { IPredictionModel } from '@wandzai/wandz-interfaces';

import { ConfigurationsApi, PredModelsApi } from '@/apis';
import { useAiFeaturesStore, usePredictionManagementStore } from '@/stores/wandz';

export const useWandzPlatformStore = defineStore('wandz-platform', () => {
  /*
   * Init all wandz stores
   */
  useAiFeaturesStore();
  usePredictionManagementStore();

  const initStore = async () => {
    await Promise.all([getPredictionTemplates(), getEventsList()]);
  };
  const predictionTemplates = ref<IPredictionModel[]>([]);
  const sidebarIsOpened = ref(true);
  const eventsList = ref([]);

  const getPredictionTemplates = async () => {
    await PredModelsApi.getPredictionTemplates()
      .then((res) => {
        predictionTemplates.value = res.data;
      })
      .catch((e) => {
        console.error(`Error while receive prediction templates: ${e}`);
      });
  };

  const getEventsList = async () => {
    await ConfigurationsApi.getEventsList()
      .then((res) => {
        eventsList.value = res.data;
      })
      .catch((e) => {
        console.error(`Error while receive Events list: ${e}`);
      });
  };
  onBeforeMount(async () => await initStore());

  return {
    predictionTemplates,
    sidebarIsOpened,
    eventsList,
  };
});
