import Tooltip from '../../src/components/Tooltip';
import Chips from '../../src/components/Chips/Chips';
import copyToClip from '../../src/assets/icons/actions/copy-to-clip.svg';

export default {
  title: 'Overlay / Tooltip / Tooltip Over Icon',
  argTypes: {
    position: {
      options: [
        'auto',
        'auto-start',
        'auto-end',
        'top-start',
        'top-end',
        'left',
        'right',
        'bottom',
        'bottom-start',
        'bottom-end',
      ],
      control: { type: 'select' },
      name: 'Position',
    },
    tooltipType: {
      options: ['regular', 'icon'],
      control: { type: 'select' },
      name: 'Tooltip Type',
    },
    text: {
      control: { type: 'text' },
      name: 'Tooltip text',
    },
    trigger: {
      options: ['hover', 'click'],
      control: { type: 'select' },
      name: 'Trigger Action',
    },
  },
  args: {
    position: 'top-start',
    tooltipType: 'icon',
    text: 'View results',
    trigger: 'hover',
  },
};

export const tooltipOverIcon = (args, { argTypes }) => ({
  components: { Tooltip, Chips },
  props: Object.keys(argTypes),
  data() {
    return {
      copyToClip,
    };
  },
  template: `
<div >
  <div style="display:flex;">
    <div style="margin-top: 80px; margin-left: 300px">
      <tooltip :position="position" :text="text" :tooltip-type="tooltipType" :trigger="trigger"><img :src="copyToClip" alt=""></tooltip>
    </div>
  </div>
  <hr>
  <h4>Inline Example</h4>
  <div>
    <div style="width: 600px; text-align: center;">
      <tooltip :position="position" :text="text" :showTooltip="showTooltip" :trigger="trigger">
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M7.99989 5.40002C8.04274 5.40002 8.08463 5.38732 8.12026 5.36351C8.15589 5.3397 8.18366 5.30586 8.20006 5.26627C8.21646 5.22668 8.22075 5.18312 8.21239 5.14109C8.20403 5.09906 8.18339 5.06045 8.15309 5.03015C8.12279 4.99985 8.08419 4.97921 8.04216 4.97085C8.00013 4.96249 7.95656 4.96678 7.91697 4.98318C7.87738 4.99958 7.84354 5.02735 7.81973 5.06298C7.79593 5.09861 7.78322 5.14051 7.78322 5.18336C7.78322 5.24082 7.80605 5.29593 7.84668 5.33656C7.88731 5.3772 7.94242 5.40002 7.99989 5.40002Z"
              stroke="#10111B"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
          <path
              d="M8 7.13336V11.9"
              stroke="#10111B"
              stroke-linecap="round"
          />
          <path
              d="M14.5 8C14.5 6.27609 13.8152 4.62279 12.5962 3.4038C11.3772 2.18482 9.72391 1.5 8 1.5C6.27609 1.5 4.62279 2.18482 3.4038 3.4038C2.18482 4.62279 1.5 6.27609 1.5 8C1.5 9.72391 2.18482 11.3772 3.4038 12.5962C4.62279 13.8152 6.27609 14.5 8 14.5C9.72391 14.5 11.3772 13.8152 12.5962 12.5962C13.8152 11.3772 14.5 9.72391 14.5 8V8Z"
              stroke="#10111B"
          />
        </svg>
      </tooltip>
    </div>
  </div>
 </div>
`,
});
