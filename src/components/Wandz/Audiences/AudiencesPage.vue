<template>
  <grid-layout
    :items="[
      {
        gridColumnStart: 1,
        gridColumnEnd: 12,
        name: 'audiences-manager-header',
      },
      {
        gridColumnStart: 1,
        gridColumnEnd: 12,
        name: 'audiences-table',
      },
    ]"
  >
    <template #audiences-manager-header>
      <div class="audiences-manager-header">
        <search
          class="search-box"
          type="medium"
          :placeholder="SEARCH_PH"
          :width="SEARCH_WIDTH"
          @input-changed="onSearch"
        />
        <wandz-button
          :text-padding="24"
          @click="openCreationModal"
        >
          {{ CREATE_BUTTON_TEXT }}
        </wandz-button>
      </div>
    </template>

    <template #audiences-table>
      <audiences-table :items="filterAudiences" />
    </template>
  </grid-layout>
  <create-audience-modal
    v-if="creationModalOpened"
    @[CommonEmits.MODAL_CLOSE]="closeCreationModal"
  />
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { storeToRefs } from 'pinia';

  /** Components */
  import GridLayout from '@/design-library/src/components/Layout/GridLayout.vue';

  import Search from '@/design-library/src/components/Search/Search.vue';
  import WandzButton from '@/design-library/src/components/Button/Button.vue';

  import CreateAudienceModal from './components/CreateAudienceModal.vue';
  import AudiencesTable from './components/AudiencesTable.vue';

  /** Store usage */
  import { useAudiencesStore } from '@/stores/wandz';

  const audiencesStore = useAudiencesStore();
  const { audiences, creationModalOpened, handledAudience } = storeToRefs(audiencesStore);

  const { closeCreationModal, openCreationModal, setHandledAudience, clearHandledAudience } = audiencesStore;

  import type { IAudience, ICustomAudience } from '@wandzai/wandz-interfaces';

  import {
    SEARCH_PH,
    SEARCH_WIDTH,
    CREATE_BUTTON_TEXT,
    SEARCHED_TERM_MIN_LENGTH,
  } from '@/components/Wandz/Audiences/consts';
  import type { IUiAudience } from './types';
  import { CommonEmits } from '@/components/Common/types';

  const searchedTerm = ref<string>('');

  const onSearch = (term: string) => {
    searchedTerm.value = term;
  };

  const audiencesList: IUiAudience[] = audiences.value
    ? [
        ...audiences.value.wandz.map(
          (aud: IAudience) =>
            <IUiAudience>{
              ...aud,
              isCustom: false,
            },
        ),
        ...audiences.value.custom.map(
          (aud: ICustomAudience) =>
            <IUiAudience>{
              ...aud,
              isCustom: true,
            },
        ),
      ]
    : [];

  const filterAudiences = computed(() =>
    searchedTerm.value?.length >= SEARCHED_TERM_MIN_LENGTH
      ? audiencesList.filter((audience) => audience.name?.startsWith(searchedTerm.value))
      : audiencesList,
  );
</script>

<style scoped lang="scss">
  .audiences-manager-header {
    width: 96%;
    display: flex;
    justify-content: space-between;
  }
</style>
