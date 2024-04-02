<template>
  <drawer-section :title="ADVANCED_INFO_HEADER">
    <template #content>
      <div class="items">
        <div class="item">
          <key-detail :item="item" />
        </div>
        <div class="item">
          <stored-in-detail :item="item" />
        </div>
        <div class="item">
          <parameter-type-detail
            :item="item"
            :editing="editing"
            v-on="{
              [WandzCommonEmits.AI_FEATURE_DATA_TYPE_UPDATED]: (updatedData: DataTypes) => {
                emit(WandzCommonEmits.AI_FEATURE_DATA_TYPE_UPDATED, updatedData);
              },
            }"
          />
        </div>
        <div class="item">
          <js-access-detail :item="item" />
        </div>
        <div class="item">
          <is-pii-detail :item="item" />
        </div>
      </div>
    </template>
  </drawer-section>
</template>

<script setup lang="ts">
  import { DataTypes, type ICustomAiFeaturesConfig } from '@wandzai/wandz-interfaces';
  import { type PropType } from 'vue';

  import DrawerSection from './DrawerSection.vue';
  import JsAccessDetail from '../components/JsAccessDetail.vue';
  import KeyDetail from '../components/KeyDetail.vue';
  import StoredInDetail from '../components/StoredInDetail.vue';
  import IsPiiDetail from '../components/IsPiiDetail.vue';
  import ParameterTypeDetail from '../components/ParameterTypeDetail.vue';
  import { WandzCommonEmits } from '@/components/Wandz/types';
  import { ADVANCED_INFO_HEADER } from '@/components/Wandz/AiFeatures/consts';

  defineOptions({
    name: 'CustomAiFeatureAdvancedInfoSection',
  });

  const emit = defineEmits([WandzCommonEmits.AI_FEATURE_DATA_TYPE_UPDATED]);

  defineProps({
    item: {
      type: Object as PropType<ICustomAiFeaturesConfig>,
      default: () => ({}),
    },
    editing: {
      type: Boolean,
      default: false,
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
