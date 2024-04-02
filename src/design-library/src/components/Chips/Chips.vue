<template>
  <div
    class="chips-wrapper"
    :style="cssVars"
    :class="[type, { isHovered: isHovered, disableHover: disableHover, resizeByContent: resizeByContent }]"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    @click="emitOnClick"
  >
    <div
      class="chips-text txt-primary body-tiny-bold"
      :class="[type, { isHovered: isHovered }]"
    >
      {{ chipsText }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NmgChips',
    props: {
      text: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        default: 'active',
      },
      color: {
        type: String,
        default: '',
      },
      resizeByContent: {
        type: Boolean,
        default: false,
      },
      disableHover: {
        type: Boolean,
        default: true,
      },
      hoverColor: {
        type: String,
        default: '#F3F5F8',
      },
    },
    data() {
      return {
        isHovered: false,
      };
    },
    computed: {
      chipsText() {
        return this.text ? this.text : this.type.charAt(0).toUpperCase() + this.type.slice(1);
      },
      cssVars() {
        const hoverClr = this.hoverColor;
        const bgClr = this.color;
        return {
          '--hover-background-color': `${hoverClr}`,
          '--background-color': `${bgClr}`,
        };
      },
    },
    methods: {
      emitOnClick() {
        this.$emit('click');
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/colors/semantic.module';
  @import '../../styles/colors/data.module';
  @import '../../styles/colors/background.module';

  .chips-wrapper {
    height: 24px;
    width: 90px;
    border-radius: 50px;
    background-color: var(--background-color);
    text-align: center;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.3s cubic-bezier(0.37, 0.01, 0.59, 0.99);

    &.resizeByContent {
      display: inline-block;
      width: auto;
      height: auto;
      padding: 0 8px;
      .chips-text {
        line-height: 18px;
      }
    }

    &:not(.disableHover).isHovered {
      background-color: var(--hover-background-color) !important;
    }

    &.active {
      background-color: $data-green-apple;
    }

    &.scheduled {
      background-color: $data-orange-carrot;
    }

    &.allow {
      background-color: $data-green-apple;
    }

    &.pending,
    &.paused {
      background-color: $data-blue-orchid-light;
    }

    &.in-progress {
      background-color: $data-orange-carrot;
    }

    &.deleted {
      background-color: $bg-disabled;
    }

    &.ended {
      background-color: $data-pink-pitaya;
    }

    &.draft {
      background-color: $data-azure-sky;
    }

    &.stopped {
      background-color: $data-red-tomato;
    }

    &.inactive {
      background-color: $bg-shapes;
    }

    &.hover {
      background-color: var(--hover-background-color, $bg-element-hover);
    }

    &.trial {
      background-color: $data-pink-pitaya;
    }

    &.blocked {
      background-color: $data-red-tomato;
    }

    &.allowed {
      background-color: $data-green-apple;
    }

    &.testing {
      background-color: $data-orange-carrot;
    }

    &.published {
      background-color: $data-green-apple;
    }

    &.monitor {
      background-color: $data-blue-orchid-light;
    }

    .chips-text {
      //&:not(.disableHover).hover {
      //color: $text-basic;
      //}

      //&:not(.disableHover).isHovered {
      //color: $text-basic;
      //}
    }
  }

  .disableHover {
    pointer-events: none;
  }
</style>
