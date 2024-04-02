import OverlayPrompt from '../../src/components/OverlayPrompt';
import NmgButton from '../../src/components/Button';

export default {
  title: 'Overlay/Overlay Prompt',
  component: OverlayPrompt,
  argTypes: {
    title: {
      control: { type: 'text' },
      name: 'title',
      description: 'Overlay title',
      defaultValue: 'My title',
    },
    description: {
      control: { type: 'text' },
      name: 'description',
      description: 'Overlay description',
      defaultValue: 'A description describing whats up and things',
    },
    primaryButtonText: {
      control: { type: 'text' },
      name: 'primaryButtonText',
      description: 'Text to appear at primary button',
      defaultValue: 'Alright',
    },
    secondaryButtonText: {
      control: { type: 'text' },
      name: 'secondaryButtonText',
      description: 'Text to appear at secondary button',
      defaultValue: 'Cancel',
    },
    primaryButtonProps: {
      control: { type: 'object' },
      name: 'primaryButtonProps',
      description: 'Props to pass to primary button',
      defaultValue: {},
    },
    secondaryButtonProps: {
      control: { type: 'object' },
      name: 'secondaryButtonProps',
      description: 'Props to pass to secondary button',
      defaultValue: {},
    },
    buttonsContainerClass: {
      control: { type: 'text' },
    },
    buttonsPosition: {
      control: { type: 'select' },
      options: ['left', 'right', 'center', 'space-between'],
    },
    contentPosition: {
      control: { type: 'select' },
      options: ['left', 'right', 'center'],
    },
    flat: {
      control: { type: 'boolean' },
    },
  },
  args: {
    title: 'My title',
    description: 'A description describing whats up and things',
    primaryButtonText: 'Alright',
    secondaryButtonText: 'Cancel',
    primaryButtonProps: {},
    secondaryButtonProps: {},
    buttonsContainerClass: '',
    buttonsPosition: 'right',
    contentPosition: 'left',
    flat: false,
  },
};
const containerStyle = `
position: relative;
border: 2px solid black;
width: 430px;
height: 329px;
margin: auto;
display: flex;
align-items: center;
justify-content: center;
background-size: contain;
background-image: url('https://c.tenor.com/ngxIvAUHhY8AAAAC/umm-kid.gif');
`;
export const overlayPrompt = (args, { argTypes }) => ({
  components: { OverlayPrompt, NmgButton },
  props: Object.keys(args),
  data() {
    return {
      showOverlay: false,
    };
  },
  methods: {
    toggleOverlay() {
      this.showOverlay = !this.showOverlay;
    },
  },
  template: `
  <div style="${containerStyle}">
    <NmgButton @click="toggleOverlay">Open</NmgButton>
      <OverlayPrompt
        v-if="showOverlay"
        v-bind="$props"
        @primaryButtonClick="toggleOverlay"
        @secondaryButtonClick="toggleOverlay"
      />
  </div>
`,
});
