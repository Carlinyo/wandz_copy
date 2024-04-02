<template>
  <div
    class="body-tiny"
    :style="wrapperStyle"
  >
    <span>
      {{ preText }}
    </span>
    <span
      class="nmg-button"
      :style="buttonStyle"
      @click="onButtonClick"
    >
      {{ buttonText }}
    </span>
    <span>
      {{ postText }}
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      onClick: {
        type: Function,
        required: false,
        default: () => ({}),
      },
      preText: {
        type: String,
        default: '',
      },
      buttonText: {
        type: String,
        default: '',
      },
      postText: {
        type: String,
        default: '',
      },
      buttonColor: {
        type: String,
        default: 'blue',
      },
      fontSize: {
        type: String,
        default: '12px',
      },
    },
    computed: {
      buttonStyle() {
        return {
          ...this.$attrs,
        };
      },
      wrapperStyle() {
        return {
          fontSize: this.fontSize,
        };
      },
    },
    methods: {
      onButtonClick(event) {
        this.$emit('click');
        this.onClick(event);
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../styles/colors/text.module';

  .nmg-button {
    cursor: pointer;
    border: none;
    box-sizing: border-box;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    position: relative;
    overflow: hidden;
    height: 20px;
    background-color: inherit;
    border-radius: 0;
    color: $txt-link;
    &:hover {
      background-color: inherit;
      color: $txt-link-hover;
    }
  }
</style>
