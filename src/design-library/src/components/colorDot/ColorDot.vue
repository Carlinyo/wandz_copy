<template>
  <svg
    class="color-dot-wrapper"
    :width="dotSize"
    :height="dotSize"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="5"
      cy="5"
      r="5"
      :fill="props.dotColor"
    />
  </svg>
</template>

<script setup lang="ts">
  import { Sizes } from '../../types/enums/Sizes';
  import { computed } from 'vue';

  defineOptions({
    name: 'ColorDot',
  });
  const props = defineProps({
    dotColor: String,
    size: {
      type: String,
      default: Sizes.SMALL,
    },
  });

  const dotSize = computed(() => {
    switch (props.size) {
      case Sizes.MEDIUM: {
        return 10;
      }
      case Sizes.LARGE: {
        return 16;
      }
      default: {
        return 10;
      }
    }
  });
</script>

<style scoped lang="scss">
  .color-dot-wrapper {
    min-width: 10px;
  }
</style>
