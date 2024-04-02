<template>
  <div class="no-results">
    <div
      class="bold-title"
      v-text="notFoundText"
    />
    <div>
      <span> Want to </span>
      <wandz-button
        class="button"
        styleType="textLink"
        :text-padding="0"
        @handle-click="openCreationModal"
      >
        create an AI feature
      </wandz-button>
      <span> instead? </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import WandzButton from '@/design-library/src/components/Button/Button.vue';

  import { computed, defineProps } from 'vue';

  import { useAiFeaturesStore } from '@/stores/wandz';

  const aiFeaturesStore = useAiFeaturesStore();
  const { openCreationModal } = aiFeaturesStore;

  const props = defineProps({
    searchedValue: {
      type: String,
      default: '',
    },
  });

  const notFoundText = computed(() => {
    return `Hmm, we couldn’t find anything for "${props.searchedValue}".`;
  });
</script>

<style lang="scss" scoped>
  .no-results {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
</style>
