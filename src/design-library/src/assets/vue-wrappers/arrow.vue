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
      viewBox="0 0 24 24"
      :fill="masked ? '#000000' : color"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.2947 4.70532C11.6842 4.31578 12.3158 4.31578 12.7053 4.70532C13.0946 5.0946 13.0949 5.72568 12.7059 6.11531L7.83 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H7.83L12.7059 17.8847C13.0949 18.2743 13.0946 18.9054 12.7053 19.2947C12.3158 19.6842 11.6842 19.6842 11.2947 19.2947L4 12L11.2947 4.70532Z"
        :fill="masked ? '#10111B' : color"
      />
      <mask
        id="mask0"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="4"
        y="4"
        width="16"
        height="16"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.2947 4.70532C11.6842 4.31578 12.3158 4.31578 12.7053 4.70532C13.0946 5.0946 13.0949 5.72568 12.7059 6.11531L7.83 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H7.83L12.7059 17.8847C13.0949 18.2743 13.0946 18.9054 12.7053 19.2947C12.3158 19.6842 11.6842 19.6842 11.2947 19.2947L4 12L11.2947 4.70532Z"
          fill="white"
        />
      </mask>
      <g
        mask="url(#mask0)"
        v-if="masked"
      >
        <rect
          id="arrow"
          width="24"
          height="24"
          :fill="color"
        />
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
  import { DIRECTIONS } from './utils/enums';

  export default {
    name: 'IconArrow',
    props: {
      direction: {
        type: String,
        default: DIRECTIONS.LEFT,
      },
      color: {
        type: String,
        default: '#000000',
      },
      width: {
        type: Number,
        default: 24,
      },
      height: {
        type: Number,
        default: 24,
      },
      masked: {
        type: Boolean,
        default: true,
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
  .right {
    transform: rotate(180deg);
  }
  .up {
    transform: rotate(90deg);
  }
  .down {
    transform: rotate(270deg);
  }
</style>
