<template>
  <div
    class="split"
    :style="computedStyle"
    :class="colorClass"
  />
</template>

<script lang="ts">
  import { PropType } from 'vue';
  import { LineSplitColor } from '../../types/enums/LineSplit';

  export default {
    name: 'LineSplit',
    props: {
      marginTop: {
        required: false,
        type: Number,
        default: 24,
      },
      marginBottom: {
        required: false,
        type: Number,
        default: 24,
      },
      width: {
        required: false,
        type: String,
        default: '100%',
      },
      color: {
        required: false,
        type: String as PropType<LineSplitColor>,
        default: LineSplitColor.INFO_BG,
      },
    },
    computed: {
      computedStyle() {
        return {
          marginTop: `${this.marginTop}px`,
          marginBottom: `${this.marginBottom}px`,
          width: this.width,
        };
      },
      colorClass() {
        switch (this.color) {
          case LineSplitColor.INFO_BG:
            return 'info-bg';
          case LineSplitColor.BLACK:
            return 'black';
          case LineSplitColor.BORDER:
            return 'border';
          default:
            return 'info-bg';
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/colors/background.module.scss';

  .split {
    height: 0;
    left: 24px;
    top: 344px;
    transform: matrix(1, 0, 0, -1, 0, 0);
  }

  .info-bg {
    border: 1px solid $bg-primary;
  }

  .black {
    border: 1px solid #000000;
  }
</style>
