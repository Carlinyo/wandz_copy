<template>
  <div class="staked-bar">
    <div class="info" />
    <div class="bar" />
  </div>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
  @import '../../styles/corners/corners';
  @import '../../styles/colors/background.module';

  .staked-bar {
    display: flex;
    align-items: center;
    gap: 30px;
  }

  .info,
  .bar {
    border-radius: $border-radius-large;
    background: $bg-skeleton;
    height: 40px;
  }

  .info {
    width: 20%;
  }

  .bar {
    width: 80%;
  }
</style>
