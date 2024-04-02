<template>
  <drawer-section title="Distribution">
    <template #content>
      <lottie-player
        v-if="isLoading"
        :width="300"
        :height="200"
      />
      <div v-else-if="distribution.length > 0">
        <div class="distribution-tab-header">
          <div
            class="regular-title description-text"
            v-text="DIST_DESCRIPTION"
          />
          <div
            class="body-tiny time-range"
            v-text="DIST_TAB_DATE_RANGE_TXT"
          />
        </div>
        <div class="chart-wrapper">
          <doughnut
            :doughnut-data="distribution"
            :options="{
              height: 160,
              /** cutout: '50%' by default */
            }"
            :color-list="CommonGraphsColors"
            enable-legend
            disable-inner-text
            isLegendTextEllipsis
            layoutDirection="column"
            :legendColumnPerRow="3"
            roundPercentage
          />
        </div>
      </div>
      <div
        v-else
        class="empty-distribution"
      >
        <img
          :src="ICON_MAPPING[IconTypes.COMPUTER_CLOCK]"
          alt=""
        />
        <div
          class="bold-title empty-distribution-title"
          v-text="EMPTY_DISTRIBUTION_TITLE"
        />
        <div
          class="regular-title empty-distribution-sub-title"
          v-text="EMPTY_DISTRIBUTION_SUB_TITLE"
        />
      </div>
    </template>
  </drawer-section>
</template>

<script setup lang="ts">
  import { CommonGraphsColors } from '@/components/Wandz/consts';
  import {
    DIST_DESCRIPTION,
    DIST_TAB_DATE_RANGE_TXT,
    EMPTY_DISTRIBUTION_TITLE,
    EMPTY_DISTRIBUTION_SUB_TITLE,
  } from '@/components/Wandz/AiFeatures/consts';

  import Doughnut from '@/design-library/src/components/Doughnut/Doughnut.vue';
  import LottiePlayer from '@/design-library/src/components/LottiePlayer/LottiePlayer.vue';
  import DrawerSection from './DrawerSection.vue';
  import { ICON_MAPPING } from '@/design-library/src/types/interfaces/DisabledResultBox';
  import { IconTypes } from '@/design-library/src/types/enums/DisabledResultBox';

  defineOptions({
    name: 'DistributionSection',
  });

  defineProps({
    distribution: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  });
</script>

<style scoped lang="scss">
  .distribution-tab-header {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .chart-wrapper {
    margin-top: 24px;
  }
  .empty-distribution {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 16px;
    margin-bottom: 16px;

    img {
      width: 120px;
      height: 120px;
    }

    .empty-distribution-title {
      margin-bottom: 4px;
    }

    .empty-distribution-title,
    .empty-distribution-sub-title {
      max-width: 80%;
      text-align: center;
    }
  }
</style>
