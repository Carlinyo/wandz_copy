<template>
  <div class="numeric-input">
    <div
      v-if="showLabel"
      class="numeric-input-label small-label-title"
    >
      {{ NUMERIC_INPUT_STEPPER_TEXTS.TITLE }}
    </div>
    <div class="numeric-input-details">
      <div
        class="main-heading numeric-input-decrease"
        @click="decrease"
      >
        {{ NUMERIC_INPUT_STEPPER_TEXTS.DECREMENT }}
      </div>
      <input
        v-model="inputValue"
        type="text"
        pattern="\d*"
        maxlength="4"
        class="regular-title"
      />
      <div
        class="main-heading numeric-input-increase"
        @click="increase"
      >
        {{ NUMERIC_INPUT_STEPPER_TEXTS.INCREMENT }}
      </div>
    </div>
    <div
      v-if="showError"
      class="numeric-input-error-text small-label-title"
    >
      {{ errorText }}
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import debounce from 'debounce';
  import { NUMERIC_INPUT_STEPPER_TEXTS } from './consts';

  const props = defineProps({
    showLabel: {
      type: Boolean,
      required: false,
      default: true,
    },
    showError: {
      type: Boolean,
      required: false,
      default: true,
    },
    min: {
      type: Number,
      required: true,
      default: 0.5,
    },
    max: {
      type: Number,
      required: true,
      default: 0.9,
    },
    step: {
      type: Number,
      required: true,
      default: 0.05,
    },
    score: {
      type: Number,
      required: true,
    },
  });

  const emit = defineEmits(['changeScore']);

  const inputValue = ref(props.score);

  const errorText = ref('');

  const increase = () => {
    if (inputValue.value < props.max) {
      emit('changeScore', (+inputValue.value + props.step).toFixed(2));
    } else {
      errorText.value = NUMERIC_INPUT_STEPPER_TEXTS.ERROR_MAX;
    }
  };

  const decrease = () => {
    if (inputValue.value > props.min) {
      emit('changeScore', (+inputValue.value - props.step).toFixed(2));
    } else {
      errorText.value = NUMERIC_INPUT_STEPPER_TEXTS.ERROR_MIN;
    }
  };

  watch(
    () => inputValue.value,
    (newValue, oldValue) => {
      if (+inputValue.value !== props.score && oldValue !== newValue) {
        if (!+`${inputValue.value}`[3]) emit('changeScore', `${inputValue.value}`.slice(0, 3));
        if (newValue < props.min) {
          emit('changeScore', props.min);
        } else if (newValue > props.max) {
          emit('changeScore', props.max);
        } else if (newValue > props.min && newValue < props.max) {
          errorText.value = '';
          debounce(() => {
            emit('changeScore', Number((Math.round(newValue / props.step) * props.step).toFixed(2)));
          }, 200)();
        }
      }
    },
  );

  watch(
    () => props.score,
    () => {
      if (+inputValue.value !== props.score) {
        inputValue.value = props.score;
      }
    },
  );
</script>

<style lang="scss" scoped>
  @import '@/design-library/src/styles/colors/borders';
  @import '@/design-library/src/styles/colors/background.module';
  @import '@/design-library/src/styles/colors/text.module';
  @import '@/design-library/src/styles/corners/corners';

  .numeric-input {
    height: 86px;
    input {
      text-align: center;
      transition: 0.2s;
      width: 100%;
      &:focus-visible {
        border: 2px solid $border-focus-color !important;
        outline: none !important;
      }
    }
    &-increase,
    &-decrease {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      width: 46px;
      background: $bg-secondary-element;
      transition: 0.2s;
      &:hover {
        background: $bg-primary;
      }
    }
    &-decrease {
      border-right: 1px solid $border-ui-color;
    }
    &-increase {
      border-left: 1px solid $border-ui-color;
    }
    &-details {
      width: 140px;
      height: 38px;
      overflow: hidden;
      border-radius: $border-radius-medium;
      border: 1px solid $border-ui-color;
      display: flex;
      margin: 10px 0;
    }
    &-error-text {
      color: $border-error-color;
    }
    &-label {
      color: $txt-primary;
    }
  }
</style>
