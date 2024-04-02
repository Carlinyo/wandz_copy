<template>
  <div class="status-wrapper">
    <span
      class="txt-secondary body-small"
      v-if="title"
      >{{ title }}:</span
    >
    <color-dot
      :dotColor="getStatusProperties.color"
      :size="size"
    />
    <span
      :class="{
        'bold-title': size === Sizes.LARGE,
        'regular-title': size === Sizes.SMALL,
        'small-label-title': size === Sizes.TINY,
      }"
      >{{ getStatusProperties.label }}</span
    >
  </div>
</template>

<script setup lang="ts">
  import { ModelStatuses } from '@wandzai/wandz-interfaces/src/enums';
  import { computed, PropType } from 'vue';
  import type { IColorAndLabel } from '@/components/Wandz/Common/interfaces';
  import { STATUS_LABELS_MAP, ARCHIVE_LABELS } from './consts';
  import ColorDot from '@/design-library/src/components/colorDot/ColorDot.vue';
  import { Sizes } from '@/design-library/src/types/enums/Sizes';
  import type { Statuses } from '@/components/Wandz/Common/types';

  const props = defineProps({
    size: {
      type: String,
      default: Sizes.SMALL,
    },
    title: {
      type: String,
      default: '',
    },
    status: {
      type: String as PropType<Statuses>,
      default: ModelStatuses.DRAFT,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  });

  const getStatusProperties = computed((): IColorAndLabel => {
    return props.isArchived ? ARCHIVE_LABELS : STATUS_LABELS_MAP[props.status];
  });
</script>

<style scoped lang="scss">
  .status-wrapper {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
  }
</style>
