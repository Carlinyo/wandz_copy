<template>
  <div class="result">
    <div
      class="pred-name bold-title"
      v-text="item.displayName"
    />
    <div
      class="pred-description small-label-title"
      v-text="item.description"
    />
    <div
      class="pred-category bold-title"
      v-text="categoryText"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, defineProps } from 'vue';
  import { type PropType } from 'vue';

  import { BucketsIds, type IAiFeaturesBasicConfig } from '@wandzai/wandz-interfaces';
  import { CATEGORIES_DISPLAY_NAMES } from '../../consts';

  const props = defineProps({
    item: {
      type: Object as PropType<IAiFeaturesBasicConfig>,
      default: {},
    },
  });

  const categoryText = computed(() => {
    const category = props.item.category || BucketsIds.CUSTOM;
    return `In ${CATEGORIES_DISPLAY_NAMES[category]}`;
  });
</script>

<style lang="scss" scoped>
  @import '@/design-library/src/styles/colors/background.module';
  @import '@/design-library/src/styles/colors/text.module';

  .result {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    cursor: pointer;

    &:hover {
      background-color: $bg-element-hover;
    }
  }
  .pred-category {
    color: $txt-disabled;
  }
</style>
