<template>
  <div class="spinning-wheel-waiting-wheel" />
</template>
<script>
  export default {
    name: 'SpinningWheel',
  };
</script>
<style scoped lang="scss">
  @import '../../styles/colors/buttons.scss';

  .spinning-wheel-waiting-wheel {
    border: 3px solid #f3f3f3;
    border-radius: 50%;
    border-top: 3px solid $btn-primary;
    width: 21px;
    height: 21px;
    -webkit-animation: spin 400ms linear infinite;
    animation: spin 400ms linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(180deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
