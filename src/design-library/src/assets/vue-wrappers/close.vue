<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="-1 -1 16 16"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1.09934 12.1929C0.90407 12.3881 0.904061 12.7047 1.09932 12.9C1.29457 13.0953 1.61116 13.0953 1.80642 12.9L6.9997 7.70704L12.1937 12.9007C12.3889 13.096 12.7055 13.096 12.9008 12.9007C13.096 12.7054 13.096 12.3888 12.9008 12.1936L7.70683 6.99995L12.9008 1.80632C13.096 1.61107 13.096 1.29448 12.9008 1.09922C12.7055 0.903948 12.3889 0.903939 12.1937 1.09919L6.9997 6.29287L1.80642 1.0999C1.61116 0.90464 1.29457 0.904649 1.09932 1.09992C0.904061 1.29519 0.90407 1.61177 1.09934 1.80702L6.29257 6.99995L1.09934 12.1929Z"
      :fill="color"
    />
  </svg>
</template>

<script lang="ts">
  export default {
    name: 'CloseIcon',
    props: {
      color: {
        type: String,
        default: '#BB1A1A',
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
