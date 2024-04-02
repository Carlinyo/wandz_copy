<template>
  <lottie-player
    :width="200"
    :height="200"
    :animation-data="animationData"
  />
</template>

<script>
  import loadingAnimation from '../../assets/animations/nmgLoadingAnimation.json';
  import collectingDataAnimation from '../../assets/animations/nmgGraphsAnimation.json';
  import LottiePlayer from '../LottiePlayer';

  export default {
    name: 'LoadingAnimation',
    components: {
      LottiePlayer,
    },
    props: {
      type: {
        // Types: ballBounce, collectingData
        type: String,
        default: 'ballBounce',
      },
    },
    computed: {
      animationData() {
        if (this.type === 'collectingData') {
          return collectingDataAnimation;
        }
        return loadingAnimation;
      },
    },
  };
</script>

<style lang="scss" scoped></style>
