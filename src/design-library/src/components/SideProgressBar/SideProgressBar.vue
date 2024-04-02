<template>
  <div class="nmg-vertical-stepper">
    <ul class="vertical-list">
      <li
        v-for="(step, index) in steps"
        :key="step.title"
        class="vertical-list-item"
        :class="{
          complete: isComplete(step, index),
          active: isActive(step, index),
          activComplete: isComplete(step, index) && isActive(step, index),
        }"
      >
        <div
          v-if="isActive(step, index)"
          class="active-bar"
        />
        <div
          v-if="isComplete(step, index)"
          class="click-bar"
          @click="$emit('step-click', { step, index })"
        />
        <div class="indicator">
          <img
            v-if="isComplete(step, index)"
            :src="checkIcon"
            class="check"
          />
          <div
            v-else
            class="title body-small-bold txt-primary"
            :class="{ disabled: isDisabled(step, index) }"
          >
            {{ index + 1 }}
          </div>
        </div>
        <div style="pointer-events: none">
          <slot
            name="label"
            v-bind="{ step, index }"
          >
            <StepperLabel
              :title="step.title"
              :subtitle="step.subtitle"
              :complete="isComplete(step, index)"
              :active="true"
              :disabled="isDisabled(step, index)"
            />
          </slot>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import StepperLabel from './StepperLabel.vue';
  import newCheckSvg from '../../assets/icons/check-marks/checkmark-side-progress-bar.svg';

  export default {
    name: 'VerticalStepper',
    components: {
      StepperLabel,
    },
    props: {
      checkIcon: {
        type: String,
        required: false,
        default: newCheckSvg,
      },
      steps: {
        type: Array,
        required: true,
        default: () => [],
      },
      stepIndex: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    methods: {
      isComplete(step, index) {
        if (!step.disabled) return step.done === true;
      },
      isActive(step, index) {
        return this.stepIndex === index;
      },
      isDisabled(step, index) {
        return step.disabled === true;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/colors/semantic.module';
  @import '../../styles/colors/background.module';
  @import '../../styles/colors/text.module';
  @import '../../styles/colors/data.module';

  @keyframes verticalLineIn {
    from {
      height: 0;
    }
    to {
      height: 50px;
    }
  }

  .nmg-vertical-stepper {
    .vertical-list {
      list-style: none;
      margin: 0;
      padding: 0;

      .vertical-list-item {
        display: flex;
        position: relative;
        align-items: center;
        height: 64px;
        color: $semantic-info-icon;
        padding: 0 32px;
        width: 300px;
        gap: 16px;
        border-bottom: 1px solid $semantic-info-icon-new;
        .active-bar {
          position: absolute;
          left: 0;
          height: 100%;
          width: 100%;
          background-color: #fff;
          z-index: 0;
          animation: verticalLineIn 450ms cubic-bezier(0.07, 0.75, 0.2, 1);
        }

        &:first-of-type .vertical-line {
          height: 50%;
          top: 50%;
        }
      }
    }
    .check {
      z-index: 10;
    }

    .indicator {
      box-sizing: border-box;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 40px;
      border: 1px solid $semantic-info-icon-new;
      background-color: transparent;
      border-radius: 50%;
      pointer-events: none;
      z-index: 10;
    }

    .complete .indicator {
      background-color: $data-green-apple-light;
    }

    @keyframes indicatorFillIn {
      from {
        background-color: $bg-primary;
      }
      to {
        background-color: #fff;
      }
    }
    .disabled {
      color: $txt-disabled;
    }
    .activComplete .active .indicator {
      animation: indicatorFillIn 450ms cubic-bezier(0.07, 0.75, 0.2, 1) forwards;
    }

    .vertical-list-item:last-child .vertical-line {
      height: 20px;
      top: 0;
    }

    .vertical-line-only-one-item {
      visibility: hidden;
    }

    .click-bar {
      position: absolute;
      left: 0;
      height: 100%;
      width: 100%;
      cursor: pointer;
      &:hover {
        background-color: $bg-element-hover;
      }
    }
  }
</style>
