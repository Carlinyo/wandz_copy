<template>
  <div class="item-flex-row">
    <span
      class="txt-secondary body-tiny-bold"
      v-text="'JavaScript Access'"
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
    v-text="jsAccessText"
  />
</template>

<script setup lang="ts">
  import { type IAiFeaturesBasicConfig } from '@wandzai/wandz-interfaces';
  import { computed, type PropType } from 'vue';

  import copy from '@/design-library/src/assets/icons/actions/copy.svg';

  defineOptions({
    name: 'JsAccessDetail',
  });

  const props = defineProps({
    item: {
      type: Object as PropType<IAiFeaturesBasicConfig>,
      default: () => ({}),
    },
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsAccessText.value);
  };

  const jsAccessText = computed(() => {
    return `WDL.get(‘${props.item?.aiFeature}’)`;
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
