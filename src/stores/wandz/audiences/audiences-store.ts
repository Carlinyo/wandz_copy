import { defineStore } from 'pinia';
import { onBeforeMount, reactive, ref } from 'vue';

import { AudiencesApi } from '@/apis';
import type { IAudience, IFetchAudiencesResponse } from '@wandzai/wandz-interfaces';

export const audiencesStore = defineStore('audiences', () => {
  /** Data */
  const audiences = ref<IFetchAudiencesResponse>(null);
  const creationModalOpened = ref(false);

  const handledAudience = ref<IAudience | null>(null);

  /** Methods */
  const initStore = async () => {
    await Promise.all([fetchAudiences()]);
  };

  const fetchAudiences = async (/**clientTag: string, domain: string*/) => {
    await AudiencesApi.fetchAudiences(/**clientTag, domain*/).then((data: IFetchAudiencesResponse) => {
      audiences.value = data;
    });
  };

  const createAudience = async (/**clientTag: string, domain: string*/) => {};

  const duplicateAudience = async () => {
    await AudiencesApi.duplicateAudience(/**(<IAudience>handledAudience.value).guid*/ 1);
  };

  const deleteAudience = async (id: number) => {
    await AudiencesApi.deleteAudience(id);
  };

  const setHandledAudience = async (feature: IAudience) => {
    handledAudience.value = feature;
  };

  const clearHandledAudience = () => {
    handledAudience.value = null;
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
    audiences,
    creationModalOpened,
    handledAudience,

    /** computed */

    /** actions */
    createAudience,
    deleteAudience,
    duplicateAudience,
    openCreationModal,
    closeCreationModal,

    setHandledAudience,
    clearHandledAudience,
  };
});
