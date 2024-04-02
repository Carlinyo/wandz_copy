<template>
  <vue-3-lottie
    :animationData="animationData"
    :height="height"
    :width="width"
  />
</template>

<script>
  import { Vue3Lottie } from 'vue3-lottie';
  import WandzGraphLoading from '@/design-library/src/assets/animations/wandz-graph-loading.json';

  export default {
    name: 'LottiePlayer',
    components: {
      Vue3Lottie,
    },
    props: {
      animationData: {
        type: Object,
        required: true,
        default: () => WandzGraphLoading,
      },
      width: {
        type: Number,
        default: 400,
      },
      height: {
        type: Number,
        default: 400,
      },
    },
  };
</script>
