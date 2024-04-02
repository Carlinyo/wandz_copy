<template>
  <div
    class="stepper-label"
    :class="{ complete, active }"
  >
    <slot
      name="title"
      v-bind="{ subtitle, title }"
    >
      <div
        class="title body-small-bold txt-primary"
        :class="{ disabled: disabled }"
      >
        {{ title }}
      </div>
    </slot>
    <slot
      v-if="this.complete"
      name="subtitle"
      v-bind="{ subtitle, title }"
    >
      <div
        class="subtitle body-tiny txt-secondary"
        :class="{ disabled: disabled }"
      >
        {{ subtitle }}
      </div>
    </slot>
  </div>
</template>

<script>
  export default {
    name: 'StepperLabel',
    props: {
      title: {
        type: String,
        required: true,
        default: '',
      },
      subtitle: {
        type: [String, null],
        required: true,
        default: '',
      },
      complete: {
        type: Boolean,
        required: false,
      },
      active: {
        type: Boolean,
        required: false,
      },
      disabled: {
        type: Boolean,
        required: true,
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../styles/colors/text.module';
  .stepper-label {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .disabled {
    color: $txt-disabled;
  }
</style>
