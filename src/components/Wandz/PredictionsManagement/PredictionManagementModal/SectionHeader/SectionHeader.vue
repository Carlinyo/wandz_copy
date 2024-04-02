<template>
  <div class="section-header-wrapper txt-primary bold-title">
    {{ title }}
    <tooltip
      v-if="tooltip"
      :text="tooltip"
    >
      <img :src="InfoIcon" />
    </tooltip>
  </div>
</template>

<script setup lang="ts">
  import Tooltip from '@/design-library/src/components/Tooltip/Tooltip.vue';
  import InfoIcon from '@/design-library/src/assets/icons/info/moreInfo.svg';

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    tooltip: {
      type: String,
      default: '',
    },
  });
</script>

<style scoped lang="scss">
  .section-header-wrapper {
    width: 100%;
    margin-bottom: 16px;
    display: flex;
    gap: 4px;
  }
</style>
