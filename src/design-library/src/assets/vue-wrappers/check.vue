<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 -3 16 16"
    fill="none"
  >
    <path
      d="M15.5 1L5.1875 11L0.5 6.45455"
      :stroke="color"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts">
  export default {
    name: 'CheckIcon',
    props: {
      color: {
        type: String,
        default: '#138B5D',
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
  };
</script>
