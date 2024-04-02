<template>
  <div
    class="basic-slider-wrapper"
    :class="{ disabled }"
  >
    <div class="basic-slider">
      <div
        class="slider-label-container body-small"
        :style="{ color: leftColor }"
      >
        <div
          class="slider-label-value"
          v-html="`${state.value}${valuePostFix}`"
        />
        <div
          class="slider-label"
          v-html="leftLabel"
        />
      </div>
      <div class="slider-container">
        <VueSlider
          ref="slider"
          class="slider-control"
          v-model="state.value"
          tooltip="active"
          :min="0"
          :max="100"
          :interval="interval"
          :width="width"
          :railStyle="{ backgroundColor: rightColor }"
          :processStyle="{ backgroundColor: leftColor }"
          :disabled="disabled"
          @change="debouncedOnChange"
          height="4px"
          :dot-style="{
            border: `2px solid ${textColors.txtDisableGrey}`,
          }"
        />
      </div>
      <div
        class="slider-label-container body-small"
        :style="{ color: rightColor }"
      >
        <div
          class="slider-label-value"
          v-html="`${100 - state.value}${valuePostFix}`"
        />
        <div
          class="slider-label"
          v-html="rightLabel"
        />
      </div>
    </div>
    <div class="error-message-wrapper">
      <div class="error-message body-tiny semantic-negative">{{ state.errorMessage }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, defineEmits } from 'vue';
  import VueSlider from 'vue-3-slider-component';
  import debounce from 'lodash/debounce';

  import dataColors from '../../styles/colors/data.module.scss';
  import textColors from '../../styles/colors/text.module.scss';

  const emit = defineEmits();

  const props = defineProps({
    width: {
      type: String,
      default: '250px',
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    minErrorMessage: {
      type: String,
    },
    maxErrorMessage: {
      type: String,
      default: '',
    },
    minErrorMessageTooltip: {
      type: String,
      default: '',
    },
    maxErrorMessageTooltip: {
      type: String,
      default: '',
    },
    interval: {
      type: Number,
      default: 1,
    },
    initialValue: {
      type: Number,
    },
    valuePostFix: {
      type: String,
      default: '%',
    },
    leftLabel: {
      type: String,
      default: 'Training',
    },
    rightLabel: {
      type: String,
      default: 'Test',
    },
    leftColor: {
      type: String,
      default: dataColors.dataGreenApple,
    },
    rightColor: {
      type: String,
      default: dataColors.dataBlueOrchid,
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  });

  const state = reactive<{
    value: number;
    errorMessage: null | string;
    errorMessageTooltip: null | string;
    railStyle: { backgroundColor: string };
  }>({
    value: props.initialValue || 0,
    errorMessage: null,
    errorMessageTooltip: null,
    railStyle: { backgroundColor: '#000000' },
  });

  const sliderRef = ref(null);

  const debouncedOnChange = debounce((value: number) => {
    if (value > props.max!) {
      state.value = props.max!;
      state.errorMessage = props.maxErrorMessage!;
      state.errorMessageTooltip = props.maxErrorMessageTooltip!;
    } else if (value < props.min!) {
      state.value = props.min!;
      state.errorMessage = props.minErrorMessage!;
      state.errorMessageTooltip = props.minErrorMessageTooltip!;
    } else {
      state.value = value;
      if (state.errorMessage === props.maxErrorMessage && value !== props.max) {
        state.errorMessage = null;
        state.errorMessageTooltip = null;
      }
      if (state.errorMessage === props.minErrorMessage && value !== props.min) {
        state.errorMessage = null;
        state.errorMessageTooltip = null;
      }
    }

    const sliderValue = sliderRef.value?.getValue();
    if (sliderValue !== state.value) {
      sliderRef.value?.setValue(state.value);
    }

    emit('change', state.value);
  }, 150);
</script>

<style lang="scss" scoped>
  .disabled {
    opacity: 0.6;
  }

  .basic-slider-wrapper {
    display: flex;
    flex-flow: column;

    .basic-slider {
      display: flex;
      width: 100%;
      justify-content: flex-start;
      align-items: center;

      .slider-label-container {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        width: 50px;
      }

      .slider-container {
        display: flex;
        flex-flow: column;
        margin: 0 20px;
      }

      :deep(.vue-slider-dot) {
        width: 18px !important;
        height: 18px !important;
      }
    }

    .error-message-wrapper {
      display: flex;
      margin-top: 16px;
      min-height: 11.5px;
      align-items: center;

      img {
        margin-left: 8px;
        margin-top: 2px;
      }
    }

    :deep(.vue-slider-dot-handle) {
      box-shadow: unset !important;
      border: 3px solid #efefef;
    }
  }
</style>
