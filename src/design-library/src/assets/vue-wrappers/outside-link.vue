<template>
  <div>
    <svg
      :width="width"
      :height="height"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.50073 8H16.0001"
        :stroke="color"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.5002 10.5L16.0001 8L13.5002 5.5"
        :stroke="color"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.0004 11V14C11.0118 14.253 10.9226 14.5003 10.7522 14.6877C10.5818 14.8751 10.3441 14.9874 10.0911 15H1.90962C1.65677 14.9872 1.41926 14.8749 1.249 14.6875C1.07875 14.5001 0.989584 14.2529 1.00101 14V2C0.989406 1.74703 1.07851 1.49976 1.2488 1.31234C1.41909 1.12492 1.65671 1.01261 1.90962 1H10.0911C10.3441 1.01261 10.5818 1.1249 10.7522 1.3123C10.9226 1.4997 11.0118 1.74696 11.0004 2V5"
        :stroke="color"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'IconInfo',
    props: {
      color: {
        type: String,
        default: '#1971D8',
      },
      width: {
        type: Number,
        default: 17,
      },
      height: {
        type: Number,
        default: 16,
      },
    },
  };
</script>

<style scoped lang="scss"></style>
