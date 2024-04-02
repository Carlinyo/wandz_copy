<template>
  <div
    class="radio-button-container"
    @click="onClick"
    :class="{ 'disabled-style': disabled, 'selected-style': checked }"
  >
    <input
      type="radio"
      :checked="checked"
      :disabled="disabled"
    />
    <span
      class="checkmark"
      :class="{ 'disabled-style': disabled }"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const props = defineProps({
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['select']);

  const selected = ref(props.checked);

  const onClick = () => {
    event.stopPropagation(); // Stop the click event from propagating
    selected.value = true;
    emit('select');
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/colors/semantic.module';
  @import '../../styles/colors/background.module';
  @import '../../styles/colors/text.module';

  .radio-button-container {
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    position: relative;
    background-color: transparent;

    &:not(.disabled-style):hover {
      background-color: $bg-element-hover;
      border-radius: 50px;
    }

    /* Hide the browser's default radio button */
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    /* Create a custom radio button */
    .checkmark {
      position: absolute;
      top: 4px;
      left: 4px;
      height: 16px;
      width: 16px;
      background-color: transparent;
      border-radius: 50%;
      border: 1px solid $semantic-info-icon;
      cursor: pointer;
      &::after {
        content: '';
        position: absolute;
        display: none;
      }
      &.disabled-style {
        cursor: not-allowed;
        border: 1px solid $txt-disabled;
      }
    }
    /* On mouse-over, add a grey background color */
    &:not(.disabled-style):not(.selected-style):hover input ~ .checkmark {
      background-color: $bg-element-hover;
    }

    /* When the radio button is checked, add a blue background */
    input:checked ~ .checkmark {
      background-color: transparent;
    }

    /* Show the indicator (dot/circle) when checked */
    input:checked ~ .checkmark:after {
      display: block;
    }

    /* Style the indicator (dot/circle) */
    .checkmark:after {
      top: 3px;
      left: 3px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $semantic-info-icon;
    }
    .checkmark.disabled-style:after {
      background: $txt-disabled;
    }
  }
</style>
