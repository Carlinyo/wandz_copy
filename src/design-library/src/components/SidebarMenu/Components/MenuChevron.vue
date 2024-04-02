<template>
  <div class="tw-inline-block">
    <svg
      :class="iconClass"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector"
        d="M7.00488 0.825048C7.11488 0.825048 7.22488 0.845048 7.32488 0.885048C7.43488 0.935049 7.53488 0.995049 7.61488 1.07505L12.8549 6.32505C13.0549 6.51505 13.0549 6.83505 12.8549 7.02505C12.6549 7.21505 12.3449 7.22505 12.1549 7.02505L7.00488 1.88505L1.85488 7.02505C1.65488 7.22505 1.34488 7.22505 1.14488 7.02505C0.944883 6.82505 0.944883 6.51505 1.14488 6.31505L6.39488 1.08505C6.47488 1.00505 6.56488 0.945048 6.67488 0.895048C6.78488 0.855048 6.89488 0.825048 7.00488 0.825048Z"
        fill="#131F3C"
      />
    </svg>
  </div>
</template>

<script lang="ts">
  // import { defineComponent } from 'vue';

  export default {
    name: 'MenuChevron',
    props: {
      icon: {
        type: String,
        default: '',
      },
      iconClass: {
        type: String,
        default: 'tw-h-4 tw-w-4',
      },
    },
  };
</script>

<style scoped lang="scss"></style>
