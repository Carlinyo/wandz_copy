<template>
  <div class="side-menu bg-primary">
    <side-progress-bar
      :steps="computedMenuList"
      :step-index="props.stepIndex"
      @step-click="({ index }) => onStepClick(index)"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import SideProgressBar from '@/design-library/src/components/SideProgressBar/SideProgressBar.vue';
  import { CommonEmits } from '@/components/Common/types';

  const props = defineProps({
    stepIndex: {
      type: Number,
      default: 0,
    },
    menuList: {
      type: Array,
      default: () => [],
    },
    validSteps: {
      type: Object,
      default: () => {},
    },
  });

  const emit = defineEmits([CommonEmits.CHANGE_STEP]);

  const computedMenuList = computed(() => {
    return props.menuList.map((item, idx) => {
      return {
        ...item,
        disabled: !props.validSteps[idx],
        done: idx < props.stepIndex,
      };
    });
  });

  const onStepClick = (idx: number) => {
    if (props.validSteps[idx]) emit(CommonEmits.CHANGE_STEP, idx);
  };
</script>

<style scoped lang="scss">
  @import '@/design-library/src/styles/colors/borders';

  .create-prediction {
    .side-menu {
      height: 100%;
      border-right: 1px solid $border-ui-color;
    }
  }
</style>
