import { action } from '@storybook/addon-actions';
import nmgCalendar from '../../src/components/Calendar';

export default {
  title: 'Input/Calendar',
  argTypes: {
    componentType: {
      options: ['single', 'double'],
      control: { type: 'select' },
      defaultValue: 'single',
      name: 'Calendar type',
    },
    initialDate: {
      control: { type: 'date' },
      defaultValue: () => new Date(),
      name: 'Initial Date',
    },
    mode: {
      options: ['date', 'datetime'],
      control: { type: 'select' },
      defaultValue: 'datetime',
      name: 'Mode',
    },
    minDate: {
      control: { type: 'date' },
      // defaultValue: add(new Date(), { hours: 1 }),
      name: 'Min Date',
    },
    maxDate: {
      control: { type: 'date' },
      // defaultValue: add(new Date(), { hours: 1 }),
      name: 'Max Date',
    },
    isRange: {
      control: { type: 'boolean' },
      default: false,
      name: 'Is Range?',
    },
    isRequired: {
      control: { type: 'boolean' },
      default: false,
      name: 'Required',
    },
    is24Hour: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Is 24 Hour?',
    },
    forTable: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'For table',
    },
    disableHours: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Disable Hours',
    },
    minuteIncrement: {
      control: { type: 'number' },
      defaultValue: 1,
      name: 'Minutes Increment',
    },
    hideMinutes: {
      control: { type: 'boolean' },
      defaultValue: true,
      name: 'Hide Minutes',
    },
    placeholderValue: {
      control: { type: 'text' },
      name: 'Placeholder',
    },
    firstLinePlaceholder: {
      control: { type: 'text' },
      name: 'First line Placeholder',
    },
    editable: {
      control: { type: 'boolean' },
      defaultValue: true,
      name: 'Editable',
    },
    disableDateInputFieldEditing: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Disable input field editing',
    },
  },
  args: {
    componentType: 'single',
    initialDate: new Date(),
    mode: 'datetime',
    minDate: null,
    maxDate: null,
    isRange: false,
    isRequired: false,
    is24Hour: false,
    forTable: false,
    disableHours: false,
    minuteIncrement: 1,
    hideMinutes: true,
    placeholderValue: 'Placeholder',
    firstLinePlaceholder: 'Label',
    editable: true,
    disableDateInputFieldEditing: false,
  },
};

export const Calendar = (args, { argTypes }) => ({
  components: { nmgCalendar },
  props: Object.keys(argTypes),
  methods: {
    update: action('Date Changed'),
  },
  template: `
  <div style="height:300px;width:500px;display:flex;align-items:center;justify-content:center;">
    <nmg-calendar
        :component-type="componentType"
        :mode="mode"
        :date="initialDate"
        :for-table="forTable"
        :is-required="isRequired"
        :is-range="isRange"
        :is24-hour="is24Hour"
        :minute-increment="minuteIncrement"
        :hide-minutes="hideMinutes"
        :disable-hours="disableHours"
        :disable-date-input-field-editing="disableDateInputFieldEditing"
        :editable="editable"
        :placeholder="placeholderValue"
        :firstLinePlaceholder="firstLinePlaceholder"
        @date-change="update"
    ></nmg-calendar>
  </div>`,
});
