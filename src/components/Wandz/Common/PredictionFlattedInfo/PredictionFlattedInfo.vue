<template>
  <div class="prediction-flatted-info-wrapper">
    <div class="title-wrapper">
      <div class="container-title">{{ name }}</div>
      <status
        :title="statusTitle"
        :status="status"
        :size="Sizes.LARGE"
        :is-archive="isArchive"
      />
    </div>
    <div class="prediction-info-wrapper">
      <div
        class="prediction-info-item"
        v-for="(item, i) in data"
        :key="i"
      >
        <div class="prediction-title regular-title">{{ item.title }}</div>
        <div class="prediction-value regular-title">{{ item.value }}</div>
      </div>
    </div>
    <div
      v-if="extraInfo.length"
      class="info"
    >
      <div class="line" />
      <div class="flex-element space">
        <div
          v-for="(info, index) of extraInfo"
          :key="index"
          class="gap column-element"
        >
          <div class="small-label-title txt-secondary">{{ info.title }}</div>
          <div class="container-title txt-primary">{{ info.value }}</div>
          <div
            v-if="info.subValue"
            class="body-micro txt-secondary"
          >
            {{ info.subValue }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { ITitleAndValues } from '@/components/Wandz/Common/interfaces';
  import type { PropType } from 'vue';
  import Status from '@/components/Common/Status/Status.vue';
  import { ModelStatuses } from '@wandzai/wandz-interfaces/src/enums';
  import { Sizes } from '@/design-library/src/types/enums/Sizes';

  defineProps({
    name: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: ModelStatuses.DRAFT,
    },
    isArchive: {
      type: Boolean,
      default: false,
    },
    statusTitle: {
      type: String,
      default: 'Status',
    },
    data: {
      type: Array as PropType<ITitleAndValues[]>,
      default: () => [],
    },
    extraInfo: {
      type: Array as PropType<ITitleAndValues[]>,
      default: () => [],
    },
  });
</script>

<style scoped lang="scss">
  @import '@/design-library/src/styles/colors/text.module';
  @import '@/design-library/src/styles/colors/borders';

  .prediction-flatted-info-wrapper,
  .info {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 24px;

    .title-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .prediction-info-wrapper {
      display: flex;
      flex-direction: row;
      gap: 48px;

      .prediction-info-item {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .prediction-title {
          color: $txt-secondary;
        }
      }
    }
  }

  .flex-element {
    display: flex;
    gap: 10px;
  }

  .column-element {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .line {
    width: 100%;
    height: 2px;
    background: $border-ui-color;
  }

  .header {
    justify-content: space-between;
  }

  .space {
    gap: 7%;
  }
</style>
