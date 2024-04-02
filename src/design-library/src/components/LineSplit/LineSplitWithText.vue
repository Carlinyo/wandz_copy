<template>
  <div
    class="split-line-container"
    :class="noPadding ? '' : 'top-bottom-padding'"
  >
    <div class="with-lines-container">
      <span
        class="txt-secondary bold-title"
        :style="`background-color:${textBackGround};`"
      >
        {{ text }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    text: {
      required: true,
      type: String,
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
    textBackGround: {
      type: String,
      default: '#FFFFFF',
    },
  });
</script>
<style lang="scss" scoped>
  @import '../../styles/colors/borders.scss';

  .top-bottom-padding {
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .split-line-container {
    position: relative;
    width: 100%;
  }

  .with-lines-container {
    width: 100%;
    text-align: center;
    border-bottom: 1px solid $border-ui-color;
    line-height: 0.1em !important;
    margin: 10px 0 10px;
    font-size: 14px;

    span.bold-title {
      line-height: unset !important;
      padding: 0 15px;
    }
  }
</style>
