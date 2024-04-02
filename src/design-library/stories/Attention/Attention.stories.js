import Attention from '../../src/components/Attention';
import { AttentionBtnTypes } from '../../src/types/enums/Attention';

export default {
  title: 'Communication/Attention',
  argTypes: {
    type: {
      options: ['line', 'box'],
      control: { type: 'select' },
      defaultValue: 'line',
      name: 'Attention type',
    },
    attentionType: {
      control: { type: 'select' },
      options: ['info', 'warning'],
    },
    text: {
      control: { type: 'text' },
      defaultValue: 'You can have only one campaign live at a time.',
      name: 'Attention text',
    },
    width: {
      control: { type: 'number' },
      defaultValue: 364,
      name: 'Component width',
    },
    btnType: {
      control: { type: 'select' },
      options: [AttentionBtnTypes.ACTION, AttentionBtnTypes.WITH_TEXT],
      defaultValue: AttentionBtnTypes.ACTION,
      name: 'Button type',
    },
    btnText: {
      control: { type: 'text' },
      defaultValue: '',
      name: 'Button text',
    },
    btnSubText: {
      control: { type: 'text' },
      defaultValue: '',
      name: 'Button sub-text',
    },
  },
  args: {
    type: 'line',
    attentionType: 'info',
    text: 'You can have only one campaign live at a time.',
    width: 364,
    btnType: AttentionBtnTypes.ACTION,
    btnText: '',
    btnSubText: '',
  },
};

export const attention = (args, { argTypes }) => ({
  components: { Attention },
  props: Object.keys(argTypes),
  template: `
  <attention
    :text="text"
    :type="type"
    :attentionType="attentionType"
    :width="width"
    :btnType="btnType"
    :btn-text="btnText"
    :btn-sub-text="btnSubText"
  >
  </attention>`,
});
