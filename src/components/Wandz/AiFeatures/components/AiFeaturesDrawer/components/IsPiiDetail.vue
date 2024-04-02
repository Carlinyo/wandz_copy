<template>
  <div class="item-flex-column">
    <span
      class="txt-secondary body-tiny-bold"
      v-text="'Is Pii?'"
    />
    <div class="txt-secondary">
      <span v-text="isPiiText" />
      <span class="separate-pipe" />
      <span v-text="typeText" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { type ICustomAiFeaturesConfig } from '@wandzai/wandz-interfaces';
  import { computed, type PropType } from 'vue';

  defineOptions({
    name: 'IsPiiDetail',
  });

  const props = defineProps({
    item: {
      type: Object as PropType<ICustomAiFeaturesConfig>,
      default: () => ({}),
    },
  });

  const typeText = computed(() => {
    return `Type: ${props.item?.piiType}`;
  });

  const isPiiText = computed(() => {
    return props.item?.isPii ? 'Yes' : 'No';
  });
</script>

<style scoped lang="scss">
  @import '@/design-library/src/styles/borders/borders';
  .item-flex-column {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
</style>
