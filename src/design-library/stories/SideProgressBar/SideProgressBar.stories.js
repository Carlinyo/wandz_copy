import SideProgressBar from '../../src/components/SideProgressBar/SideProgressBar.vue';
import StepperLabel from '../../src/components/SideProgressBar/StepperLabel.vue';
import Button from '../../src/components/Button/Button.vue';

export default {
  title: 'Navigation/Side Progress Bar',
};

export const sideProgressBar = () => ({
  components: { SideProgressBar, StepperLabel, Button },
  props: {},
  methods: {
    stepClick(obj) {
      this.stepIndex = obj.index;
    },
    nextStep() {
      if (this.stepIndex < this.steps.length - 1) {
        this.stepIndex += 1;
      }
    },
    prevStep() {
      if (this.stepIndex > 0) {
        this.stepIndex -= 1;
      }
    },
  },
  data() {
    return {
      steps: [
        { title: 'Step 1', subtitle: 'Line 1' },
        { title: 'Step 2', subtitle: 'Line 2' },
        { title: 'Step 3', subtitle: 'Line 3' },
        { title: 'Step 4', subtitle: 'Line 4' },
        { title: 'Step 5', subtitle: 'Line 5' },
        { title: 'Step 6', subtitle: 'Line 6' },
      ],
      stepIndex: 2,
    };
  },
  template: `<div style="width:310px;">
               <SideProgressBar
                 :steps="steps"
                 :step-index="stepIndex"
                 @step-click="stepClick"
               />
               <div style="display: flex; gap: 8px; padding-top: 16px">
                 <Button @handle-click="prevStep"> Previous Step</Button>
                 <Button @handle-click="nextStep"> Next Step</Button>
               </div>
             </div>`,
});
