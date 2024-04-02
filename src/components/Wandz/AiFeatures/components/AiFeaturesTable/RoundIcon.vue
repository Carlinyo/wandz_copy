<template>
  <div class="outer-container">
    <div class="inner-container">
      <div
        class="circle"
        :style="customStyle"
      />
      <img
        :src="calcIcon"
        alt=""
        class="icon"
      />
    </div>
  </div>
</template>

<script>
  import { AI_FEATURES_ICONS_PREFIX } from '../../consts';
  export default {
    name: 'RoundIcon',
    props: {
      circleColor: {
        type: String,
        default: '#638CF4',
      },
      circleDiameter: {
        type: Number,
        default: 56,
      },
      circleIcon: {
        type: String,
        default: '',
      },
    },
    computed: {
      customStyle() {
        return {
          backgroundColor: this.circleColor,
          width: `${this.circleDiameter}px`,
          height: `${this.circleDiameter}px`,
        };
      },
      calcIcon() {
        return `${AI_FEATURES_ICONS_PREFIX}${this.circleIcon}.svg`;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .inner-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .circle {
    border-radius: 100%;
  }

  .icon {
    position: absolute;
  }
</style>
