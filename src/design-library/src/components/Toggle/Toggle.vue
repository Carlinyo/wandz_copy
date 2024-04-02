<template>
  <div class="toggle-container">
    <input
      class="input-item"
      type="checkbox"
      :checked="activated"
      :disabled="disabled"
    />
    <div
      class="toggle-wrapper"
      @click="onToggleClick()"
    >
      <div
        class="line"
        :class="{ 'disabled-style': disabled }"
      >
        <div
          class="inline-line"
          :class="{ activated: activated, 'not-activated': !activated, 'disabled-style': disabled }"
        />
      </div>
      <div
        class="circle"
        :class="{ activated: activated, 'not-activated': !activated, 'disabled-style': disabled }"
      >
        <div class="on-circle" />
        <div class="off-circle" />
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'NmgToggle',
    props: {
      activated: {
        type: Boolean,
        required: false,
      },
      disabled: {
        type: Boolean,
        required: false,
      },
    },
    methods: {
      onToggleClick() {
        if (!this.disabled) {
          this.$emit('toggleClick');
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import '../../styles/colors/background.module';
  @import '../../styles/colors/semantic.module';

  .toggle-container {
    display: inline-flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    position: relative;
    line-height: 20px;
    cursor: pointer;

    .toggle-wrapper {
      height: 16px;
      width: 28px;
      position: relative;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;

      .line {
        height: 16px;
        width: 28px;
        border-radius: 50px;
        background-color: $bg-shapes;
        //border: solid 1px #000000;
        position: relative;
        overflow: hidden;
        &.disabled-style {
          cursor: not-allowed;
          background-color: $bg-disabled;
          //border: solid 1px $disable-gray !important;
        }

        .inline-line {
          height: 100%;
          width: 100%;
          border-radius: 5px;
          background-color: $semantic-positive;
          position: absolute;
          transition: left 0.3s;

          &.activated {
            left: 0;
            &.disabled-style {
              //border: solid 1px $disable-gray !important;
              background-color: #b8dcce;
            }
          }

          &.not-activated {
            left: -100%;
            background-color: $bg-shapes;
          }
        }
      }

      .circle {
        height: 12px;
        width: 12px;
        border-radius: 50%;
        transition: left 0.3s;
        //border: solid 1px #000000;
        position: absolute;
        background-color: $bg-element;

        &.disabled-style {
          //border: solid 1px $disable-gray !important;
          cursor: not-allowed;
          background-color: $bg-element;
        }

        &.activated {
          //background-color: $positive;
          left: calc(100% - 14px);

          .on-circle {
            display: block;
            height: 12px;
            width: 12px;
            background-color: $bg-element;
            border-radius: 50%;
          }

          .off-circle {
            display: none;
          }
        }

        &.not-activated {
          left: 2px;
          .on-circle {
            display: none;
          }

          .off-circle {
            display: block;
            height: 12px;
            width: 12px;
            background-color: $bg-element;
            border-radius: 50%;
          }
        }
      }
    }

    .input-item {
      position: absolute;
      opacity: 0;
      height: 16px;
      width: 28px;
    }
  }
</style>
