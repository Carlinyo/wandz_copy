<template>
  <div class="feature-importance element-container">
    <div class="feature-importance-header">
      <div class="container-title">{{ title }}</div>
      <tooltip
        :text="titleTooltip"
        :position="'right'"
      >
        <img :src="InfoIcon" />
      </tooltip>
    </div>
    <div class="feature-importance-list">
      <div
        class="feature-importance-list-item"
        v-for="(item, index) in data"
        :key="index"
      >
        <div class="body-medium">{{ index + 1 }}. {{ item.feature }} -</div>
        <div class="small-label-title description">{{ item.description }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import type { IFeatureImportace } from './featureImportance.ts';
  import InfoIcon from '@/design-library/src/assets/icons/info/moreInfo.svg';
  import Tooltip from '@/design-library/src/components/Tooltip/Tooltip.vue';
  import { MockData } from './MockData.ts';

  defineOptions({
    name: 'feature-importance',
  });
  withDefaults(defineProps<IFeatureImportace>(), {
    data: MockData,
    title: 'Top 10 AI Features',
    titleTooltip: 'Tooltip',
  });
</script>

<style lang="scss" scoped>
  @import '@/design-library/src/styles/colors/text.module';
  @import '@/design-library/src/styles/spacing/spacing';
  @import '@/design-library/src/styles/colors/background.module';

  .feature-importance {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: $SP24;
    &-header {
      display: flex;
      align-items: center;
      gap: $SP4;
    }
    &-list {
      width: 100%;
      display: block;
      gap: $SP4;
      &-item {
        padding-left: $SP4;
        gap: $SP4;
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-bottom: 1px solid $bg-disabled;
      }
    }
    .description {
      color: $txt-secondary;
    }
  }

  @media screen and (max-width: 1230px) {
    .feature-importance {
      max-width: 800px;
      width: 80vw;
    }
  }
</style>
./MockData.js
