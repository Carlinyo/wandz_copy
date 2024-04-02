<template>
  <drawer-section :title="ADVANCED_INFO_HEADER">
    <template #content>
      <div class="items">
        <div class="item">
          <parameter-type-detail :item="item" />
        </div>
        <div class="item">
          <js-access-detail :item="item" />
        </div>
      </div>
    </template>
  </drawer-section>
</template>

<script setup lang="ts">
  import { type IAiFeaturesBasicConfig } from '@wandzai/wandz-interfaces';
  import { type PropType } from 'vue';

  import DrawerSection from './DrawerSection.vue';
  import JsAccessDetail from '../components/JsAccessDetail.vue';
  import ParameterTypeDetail from '../components/ParameterTypeDetail.vue';
  import { ADVANCED_INFO_HEADER } from '@/components/Wandz/AiFeatures/consts';

  defineOptions({
    name: 'AdvancedInfoSection',
  });

  defineProps({
    item: {
      type: Object as PropType<IAiFeaturesBasicConfig>,
      default: () => ({}),
    },
  });
</script>

<style scoped lang="scss">
  .items {
    display: flex;
    flex-direction: column;
    gap: 24px;

    .item {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
  }
</style>
