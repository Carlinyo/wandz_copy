import NavigationCard from '../../src/components/NavigationCard';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Navigation Card',
  argTypes: {
    text: {
      control: { type: 'text' },
      defaultValue: 'Some text',
      name: 'Text',
    },
    subText: {
      control: { type: 'text' },
      defaultValue: 'Some subtext',
      name: 'SubText',
    },
    buttonText: {
      control: { type: 'text' },
      defaultValue: 'Some button text',
      name: 'Button Text',
    },
    img: {
      options: ['copy-to-clip.svg'],
      control: { type: 'select' },
      defaultValue: 'copy-to-clip.svg',
      name: 'img',
    },
    comingSoon: {
      control: { type: 'boolean' },
      name: 'Coming Soon',
      defaultValue: false,
    },
    width: {
      control: { type: 'number' },
      name: 'Width',
    },
    height: {
      control: { type: 'number' },
      name: 'Height',
    },
    alignContent: {
      options: ['center', 'left', 'right'],
      control: { type: 'select' },
    },
    tagText: {
      control: { type: 'text' },
    },
    tagType: {
      control: { type: 'select' },
      options: ['red', 'green', 'blue'],
    },
    isLocked: {
      control: { type: 'boolean' },
    },
  },
  args: {
    text: 'Some text',
    subText: 'Some subtext',
    buttonText: 'Some button text',
    img: 'copy-to-clip.svg',
    comingSoon: false,
    width: '440',
    isLocked: false,
  },
};

export const navigationCard = (args, { argTypes }) => ({
  components: { NavigationCard },
  props: Object.keys(argTypes),
  methods: {
    cardClicked: action('cardClicked'),
  },
  template: `
<div >
  <navigationCard
    :text="text"
    :subText="subText"
    :buttonText="buttonText"
    :img="img"
    :comingSoon="comingSoon"
    :width="width"
    :height="height"
    :alignContent="alignContent"
    :tagText="tagText"
    :tagType="tagType"
    :isLocked="isLocked"
    @cardClicked="cardClicked"
  >
  </navigationCard>
</div>
`,
});
