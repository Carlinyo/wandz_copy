<template>
  <div
    class="flex-elements bar-container"
    :class="variant"
  >
    <div
      v-if="variant !== 'small-line'"
      :class="`${variant}-info`"
      class="flex-elements info-container"
    >
      <div>
        <div class="overline-title txt-primary">{{ name }}</div>
        <div class="small-label-title txt-secondary">{{ score }}</div>
      </div>
      <tooltip :text="'info'">
        <info
          :width="16"
          :height="16"
        />
      </tooltip>
    </div>
    <quality-functions
      :index="index"
      :columns-data="columnsData"
      :variant="variant"
      :score="score"
    />
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { IColumnData } from '../../interfaces/qualityFunctions';
  import QualityFunctions from '../QualityFunctions/QualityFunctions.vue';
  import Info from '../../assets/vue-wrappers/info.vue';
  import Tooltip from '../Tooltip/Tooltip.vue';

  defineProps({
    name: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    variant: {
      type: String,
      required: true,
    },
    columnsData: {
      type: Array as PropType<Array<IColumnData[]>>,
      required: true,
    },
  });
</script>

<style lang="scss" scoped>
  .flex-elements {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    bottom: 23px;
    gap: 5px;
  }

  .bar-container {
    width: 100%;
    align-items: center;
  }

  .big-line-info {
    margin-top: 75px;
  }

  .medium-line-info {
    margin-top: 90px;
  }

  .info-container {
    min-width: 80px;
  }

  .big-line {
    height: 150px;
  }

  .medium-line {
    height: 37px;
  }

  .small-line {
    height: 100px;
  }
</style>
