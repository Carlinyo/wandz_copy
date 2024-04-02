<template>
  <div class="item-flex-row">
    <span
      class="txt-secondary body-tiny-bold"
      v-text="'Key'"
    />
    <img
      @click="copyToClipboard"
      class="js-access-button"
      :src="copy"
      alt=""
    />
  </div>
  <div
    class="body-small"
    v-text="aiFeature"
  />
</template>

<script setup lang="ts">
  import { type ICustomAiFeaturesConfig } from '@wandzai/wandz-interfaces';
  import { computed, type PropType } from 'vue';

  import copy from '@/design-library/src/assets/icons/actions/copy.svg';

  defineOptions({
    name: 'KeyDetail',
  });

  const props = defineProps({
    item: {
      type: Object as PropType<ICustomAiFeaturesConfig>,
      default: () => ({}),
    },
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(aiFeature.value);
  };

  const aiFeature = computed(() => {
    return props.item?.aiFeature;
  });
</script>

<style scoped lang="scss">
  .item-flex-row {
    display: flex;
    flex-direction: row;
    gap: 8px;

    .js-access-button {
      cursor: pointer;
    }
  }
</style>
