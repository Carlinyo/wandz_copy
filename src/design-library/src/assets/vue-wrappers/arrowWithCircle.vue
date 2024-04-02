<template>
  <div
    :class="{
      right: direction === DIRECTIONS.RIGHT,
      up: direction === DIRECTIONS.UP,
      down: direction === DIRECTIONS.DOWN,
    }"
  >
    <svg
      :width="width"
      :height="height"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.00049 10.998V4.99805"
        :stroke="color"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.5005 8.49805L8.00049 10.998L5.50049 8.49805"
        :stroke="color"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M1.00049 7.99805C1.00049 9.85456 1.73799 11.635 3.05074 12.9478C4.3635 14.2605 6.14397 14.998 8.00049 14.998C9.857 14.998 11.6375 14.2605 12.9502 12.9478C14.263 11.635 15.0005 9.85456 15.0005 7.99805C15.0005 6.14153 14.263 4.36105 12.9502 3.0483C11.6375 1.73554 9.857 0.998047 8.00049 0.998047C6.14397 0.998047 4.3635 1.73554 3.05074 3.0483C1.73799 4.36105 1.00049 6.14153 1.00049 7.99805V7.99805Z"
        :stroke="color"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script lang="ts">
  import { DIRECTIONS } from './utils/enums';
  import colors from '../../styles/colors/semantic.module.scss';

  export default {
    name: 'IconArrow',
    props: {
      direction: {
        type: String,
        default: DIRECTIONS.DOWN,
      },
      color: {
        type: String,
        default: colors.semanticNegative,
      },
      width: {
        type: Number,
        default: 16,
      },
      height: {
        type: Number,
        default: 16,
      },
    },
    data() {
      return {
        DIRECTIONS,
      };
    },
  };
</script>

<style scoped lang="scss">
  .up {
    transform: rotate(180deg);
  }
  .left {
    transform: rotate(90deg);
  }
  .right {
    transform: rotate(-90deg);
  }
</style>
