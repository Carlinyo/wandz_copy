<template>
  <div class="overlay-container">
    <div class="message-container body-small-bold element-container">
      <span> {{ text }}</span>
      <Button
        v-if="withButton"
        style-type="secondary"
        @handle-click="handleRefresh"
        >{{ DISTRIBUTION_GRAPH_LABELS.REFRESH_PREVIEW }}</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import { DISTRIBUTION_GRAPH_LABELS } from '@/components/Wandz/PredictionsManagement/PredictionManagementModal/consts';
  import Button from '@/design-library/src/components/Button/Button.vue';

  const props = defineProps({
    withButton: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: DISTRIBUTION_GRAPH_LABELS.COMPLETE_ALL_FIELDS_MESSAGE,
    },
  });

  const handleRefresh = () => {
    console.log('refresh');
  };
</script>

<style scoped lang="scss">
  @import '@/design-library/src/styles/colors/background.module';

  .overlay-container {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: $bg-overlay-light;
    display: flex;
    align-items: center;
    justify-content: center;

    .message-container {
      padding: 16px !important;
      width: 240px;
      height: fit-content;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
  }
</style>
