<template>
  <div class="item-flex-column">
    <span
      class="txt-secondary body-tiny-bold"
      v-text="'Storage Details'"
    />
    <div class="second-line body-small">
      <span
        class="txt-secondary"
        v-text="'Stored in'"
      />
      <span
        class="txt-primary"
        v-text="storedInText"
      />
    </div>
    <div class="service-row body-tiny txt-secondary">
      <span v-text="item.writingService.substring(0, 5)" />
      <span class="separate-pipe" />
      <span v-text="firstStoreText" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { type ICustomAiFeaturesConfig, ParameterLocations } from '@wandzai/wandz-interfaces';
  import { computed, type PropType } from 'vue';
  import { PARAMETER_LOCATIONS_STRINGS } from '@/components/Wandz/AiFeatures/consts';
  import formatters from '@/design-library/src/utils/filters/formatters';

  defineOptions({
    name: 'KeyDetail',
  });

  const props = defineProps({
    item: {
      type: Object as PropType<ICustomAiFeaturesConfig>,
      default: () => ({}),
    },
  });

  const storedInText = computed(() => {
    return PARAMETER_LOCATIONS_STRINGS[props.item.storedIn as ParameterLocations];
  });

  const firstStoreText = computed(() => {
    return `First stored: ${formatters.dateFormatter(props.item?.firstCollectedAt)}`;
  });
</script>

<style scoped lang="scss">
  @import '@/design-library/src/styles/borders/borders';

  .item-flex-column {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .second-line {
      display: flex;
      flex-direction: row;
      gap: 4px;
    }
  }
</style>
