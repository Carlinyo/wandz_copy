<template>
  <div class="target-rule-info-container border-radius-small bg-secondary-element shadow">
    <div class="icon-wrapper">
      <img
        v-if="predictionTemplate"
        :src="predictionTemplate.imageSource"
      />
    </div>
    <div class="text-wrapper">
      <div
        class="title body-small-bold txt-primary"
        v-text="'How does it work?'"
      />
      <div
        class="info-text body-small txt-primary"
        v-text="title"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { usePredictionManagementStore, useWandzPlatformStore } from '@/stores/wandz';
  import { storeToRefs } from 'pinia';
  import { INTENT_RULES_STRINGS } from '../consts';
  import { computed } from 'vue';

  const predictionModelsStore = usePredictionManagementStore();
  const { predictionModelObj } = storeToRefs(predictionModelsStore);
  const wandzStore = useWandzPlatformStore();
  const { predictionTemplates } = storeToRefs(wandzStore);

  const title = computed(() => INTENT_RULES_STRINGS[predictionModelObj.value?.intent]?.infoText);
  const predictionTemplate = computed(() =>
    predictionTemplates.value.find((item) => item.intent === predictionModelObj.value.intent),
  );
</script>

<style scoped lang="scss">
  @import '@/design-library/src/styles/borders/borders';
  .target-rule-info-container {
    width: 100%;
    height: 100px;
    border: $border;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    gap: 16px;

    .icon-wrapper {
      height: 45px;
      width: 46px;
      background: url('@/design-library/src/assets/icons/info/vector.svg') no-repeat;
      background-size: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 11px;
      img {
        width: 24px;
        height: 24px;
      }
    }
    .text-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
    }
  }
</style>
