import { action } from '@storybook/addon-actions';
import NmgToggle from '../../src/components/Toggle';

export default {
  title: 'UI Element/Toggle',
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Disable',
    },
    activated: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Activated',
    },
  },
};

export const toggle = (args, { argTypes }) => ({
  components: { NmgToggle },
  props: Object.keys(argTypes),
  template: `<nmg-toggle
                :activated="activated"
                @toggleClick="onToggleClick"
                :disabled="disabled"
              />`,
  methods: {
    action: action('toggleClick'),
    onToggleClick() {
      setTimeout(() => {
        if (!this.disabled) {
          this.activated = !this.activated;
        }
      });
    },
  },
});
