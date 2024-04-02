<template>
  <div class="empty-state-graph-container">
    <img :src="graphPlaceholder" />
    <div class="text body-tiny-bold">{{ text }}</div>
    <dl-button
      v-if="withButton"
      class="text body-tiny-bold"
      style-type="secondary"
      @handle-click="handlePreview"
    >
      {{ DISTRIBUTION_GRAPH_LABELS.PREVIEW_BTN }}
    </dl-button>
  </div>
</template>

<script setup lang="ts">
  import graphPlaceholder from '@/design-library/src/assets/icons/misc/graphPlaceholder.svg';
  import dlButton from '@/design-library/src/components/Button/Button.vue';
  import { DISTRIBUTION_GRAPH_LABELS } from '@/components/Wandz/PredictionsManagement/PredictionManagementModal/consts';

  const props = defineProps({
    withButton: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "To preview your audience's estimated size, first set rules",
    },
  });

  const handlePreview = () => {
    console.log('preview graph');
  };
</script>

<style scoped lang="scss">
  @import '@/design-library/src/styles/corners/corners';
  @import '@/design-library/src/styles/borders/borders';
  @import '@/design-library/src/styles/colors/background.module';

  .empty-state-graph-container {
    display: flex;
    width: 241px;
    height: 195px;
    padding: 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    border-radius: $border-radius-large;
    border: $border;
    background-color: $bg-secondary-element;

    .text {
      text-align: center;
    }
  }
</style>
