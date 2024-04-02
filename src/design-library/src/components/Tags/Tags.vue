<template>
  <div
    class="tags-wrapper border-radius-tiny"
    :style="`background-color: ${backgroundColor}`"
    :class="type"
  >
    <div
      class="tags-text txt-primary body-tiny-bold"
      :style="`color: ${textColor}`"
    >
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'NmgTags',
  });
  const props = defineProps({
    type: {
      type: String,
      default: 'recommended',
    },
    text: {
      type: String,
      default: 'Recommended',
    },
    backgroundColor: {
      type: String,
      default: '',
    },
    textColor: {
      type: String,
      default: '',
    },
  });
</script>

<style lang="scss" scoped>
  @import '../../styles/colors/data.module';
  .tags-wrapper {
    padding: 4px;
    display: inline-block;

    &.red {
      background: $data-red-tomato-light;
    }
    &.pink {
      background: $data-pink-pitaya-light;
    }
    &.orange {
      background: $data-orange-carrot-light;
    }
    &.yellow {
      background: $data-yellow-banana-light;
    }
    &.green {
      background: $data-green-apple-light;
    }
    &.azure {
      background: $data-azure-sky-light;
    }
    &.blue {
      background: $data-blue-orchid-light;
    }
    &.purple {
      background: $data-purple-eggplant-light;
    }
  }
</style>
