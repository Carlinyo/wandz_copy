import Radio from '../../src/components/Radio';

export default {
  title: 'Radio',
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Disable',
    },
  },
};

export const radio = (args, { argTypes }) => ({
  components: { Radio },
  props: Object.keys(argTypes),
  data() {
    return {
      selectedOne: true,
      selectedTwo: false,
    };
  },
  methods: {
    onSelect(idx) {
      if (this.disabled) return;
      if (idx === 'one') {
        this.selectedOne = true;
        this.selectedTwo = false;
      } else {
        this.selectedOne = false;
        this.selectedTwo = true;
      }
    },
  },
  template: `
<div class="wrapper-storybook-radio">
  <div style="display: flex;align-items: center;padding-bottom: 16px; ">
    <radio
      :disabled="disabled"
      :checked="selectedOne"
      @select="onSelect('one')"
    >
    </radio> <span style="font-family: Figtree;font-size: 14px;line-height:18px;padding-left:8px;">Choice one </span>
  </div>
  <div style="display: flex;align-items: center; font-family: Figtree;">
    <radio
      :disabled="disabled"
      :checked="selectedTwo"
      @select="onSelect('two')"
    >
    </radio> <span style="font-family: Figtree;font-size: 14px;line-height:18px;padding-left:8px;">Choice two </span>
  </div>
</div>
`,
});
