<template>
  <label
    class="checkbox-container"
    @click="onClick"
  >
    <div class="cbx-cont">
      <input
        type="checkbox"
        class="checkbox"
        :checked="checked"
        :disabled="disabled"
      />
      <div
        class="checkbox-content border-radius-tiny"
        :class="{ selected: checked, disabled, error }"
        @click.stop="onClick"
      >
        <img
          @click.stop="() => {}"
          class="img-regular"
          v-if="checked && type === 'regular'"
          :src="regular"
          alt=""
        />
        <img
          @click.stop="() => {}"
          class="img-indeterminate"
          v-if="checked && type === 'indeterminate'"
          :src="indeterminate"
          alt=""
        />
      </div>
    </div>
  </label>
</template>

<script setup lang="ts">
  import indeterminate from '../../assets/icons/misc/checkbox-indeterminate.svg';
  import regular from '../../assets/icons/check-marks/checkmark.svg';

  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: 'regular',
    },
    error: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits();

  const onClick = () => {
    if (!props.disabled) {
      emit('checkboxClick');
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/colors/background.module';
  @import '../../styles/colors/borders';
  @import '../../styles/colors/semantic.module';
  @import '../../styles/colors/text.module.scss';

  .checkbox-container {
    position: relative;
    top: 0;
    width: 16px;
    height: 16px;
    cursor: pointer;
    margin: 0;
    display: inline-block;
    overflow: hidden;

    .cbx-cont {
      line-height: 16px;
      .checkbox-content {
        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
        -moz-box-sizing: border-box; /* Firefox, other Gecko */
        box-sizing: border-box; /* Opera/IE 8+ */
        display: inline-block;
        outline: none;
        height: 16px;
        width: 16px;
        background-color: $bg-element;
        border: 1px solid $border-ui-color;

        &.selected {
          background-color: $semantic-info-icon;
          border-color: $semantic-info-icon;
        }
        &:not(.selected).disabled {
          background-color: $bg-disabled;
          border-color: $txt-disabled;
        }
        &:not(.disabled).error {
          border-color: $semantic-negative;
        }
        .img-regular {
          position: absolute;
          width: 11px;
          height: 8px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .img-indeterminate {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        &.disabled.selected {
          background-color: $txt-disabled;
          border-color: $txt-disabled;
        }
      }

      .checkbox {
        position: absolute;
        opacity: 0;
        border: 0;
        width: 16px;
        height: 16px;
        cursor: pointer;
        margin: 0;
      }
    }
  }
</style>
