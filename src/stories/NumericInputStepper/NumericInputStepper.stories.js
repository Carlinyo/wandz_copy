import NumericInputStepper from '../../src/components/NumericInputStepper/NumericInputStepper.vue';
export default {
  title: 'Numeric Input Stepper',
  argTypes: {
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
  },
};
export const numericInputStepper = (args, { argTypes }) => ({
  components: { NumericInputStepper },
  props: Object.keys(argTypes),
  template: `
  <NumericInputStepper />
`,
});
