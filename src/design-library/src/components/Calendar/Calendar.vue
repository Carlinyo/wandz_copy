<template>
  <DatePicker
    v-model="date"
    ref="picker"
    :mode="mode"
    :minute-increment="minuteIncrement"
    :is24hr="is24Hour"
    :is-range="isRange"
    :is-required="isRequired"
    :min-date="minDate"
    :max-date="maxDate"
    :popover="{ visibility: 'click' }"
    :timezone="timezone"
    :columns="datepickerColumns"
    :rows="datepickerRows"
    :disabled-dates="disabledDates"
    :available-dates="availableDates"
    class="nmg-date-time-picker"
    :class="{
      'no-minutes': hideMinutes,
      'disable-hours': disableHours,
      single: componentType === 'single',
      double: componentType === 'double',
      custom: componentType === 'custom',
    }"
    @input="(newDate, oldDate) => $emit('date-change', newDate, oldDate)"
    @popoverWillHide="() => ['popoverWillHide', 'popover-will-hide'].forEach((txt) => $emit(txt, date))"
    @popoverWillShow="() => ['popoverWillShow', 'popover-will-show'].forEach((txt) => $emit(txt, date))"
  >
    <template v-slot="{ inputValue, inputEvents, isDragging }">
      <div
        v-if="firstLinePlaceholder"
        class="first-line-placeholder"
      >
        <div
          class="first-line-text"
          :class="{ 'is-disabled': !editable }"
        >
          {{ firstLinePlaceholder }}
        </div>
      </div>
      <div
        v-else-if="!forTable && !isRange && withInput"
        class="calendar-input-container border border-radius-small"
      >
        <div v-on="inputEvents">
          <input
            class="calendar-input border-radius-small"
            :class="{ 'first-line-placeholder': !!firstLinePlaceholder }"
            :value="inputValueFormatter(date)"
            :disabled="!editable"
            :readonly="disableDateInputFieldEditing"
            v-on="inputEvents"
          />
          <img
            class="calendar-input-icon"
            :src="editable ? calendarIconSrc : disabledCalendarIcon"
            :class="{ 'is-disabled': !editable }"
          />
        </div>
      </div>
      <div
        v-else-if="isRange && withInput"
        class="calendar-input-container border border-radius-small"
      >
        <input
          class="calendar-input border-radius-small"
          :class="{ 'first-line-placeholder': !!firstLinePlaceholder }"
          :value="`${inputValueFormatter(inputValue.start)} - ${inputValueFormatter(inputValue.end)}`"
          :disabled="!editable"
          :readonly="disableDateInputFieldEditing"
          v-on="inputEvents.start"
        />
        <img
          class="calendar-input-icon"
          :src="editable ? calendarIconSrc : disabledCalendarIcon"
          :class="{ 'is-disabled': !editable }"
        />
      </div>
      <div
        v-else-if="withInput"
        class="calendar-input-container-for-table"
      >
        <input
          :disabled="!editable"
          :placeholder="placeholder"
          class="calendar-input-for-table"
          :class="{ clickable: editable }"
          :value="inputValueFormatter(date)"
          v-on="inputEvents"
        />
        <slot name="calendar-input-append" />
      </div>
    </template>
  </DatePicker>
</template>

<script>
  import { DatePicker } from 'v-calendar';
  import calendarIconSrc from './assets/calendar.svg';
  import disabledCalendarIcon from './assets/calendar-disabled.svg';

  export default {
    name: 'VCalendar',
    components: {
      DatePicker,
    },
    props: {
      componentType: {
        type: String,
        default: () => 'single',
        validator: (value) => ['single', 'double', 'custom'].indexOf(value) !== -1,
      },
      rows: {
        type: Object,
        default: () => ({ default: 1 }),
      },
      columns: {
        type: Object,
        default: () => ({ default: 1 }),
      },
      // date: {
      //   type: [Date, String],
      //   default: () => new Date(),
      // },
      dateStart: {
        type: [Date, String],
        default: () => new Date(),
      },
      dateEnd: {
        type: [Date, String],
        default: () => new Date(),
      },
      minDate: {
        type: [Date, String],
        default: () => new Date(),
      },
      maxDate: {
        type: [Date, String],
        default: null,
      },
      disabledDates: {
        type: Array,
        required: false,
      },
      availableDates: {
        type: Array,
        required: false,
      },
      mode: {
        type: String,
        default: 'datetime', // 'date' OR 'time' OR 'datetime'
      },
      inputValueFormatter: {
        type: Function,
        required: false,
        default: (val) => val,
      },
      is24Hour: {
        type: Boolean,
        default: false,
      },
      isRange: {
        type: Boolean,
        default: false,
      },
      withInput: {
        type: Boolean,
        default: true,
      },
      isRequired: {
        type: Boolean,
        default: false,
      },
      minuteIncrement: {
        type: Number,
        default: 1,
      },
      hideMinutes: {
        type: Boolean,
        default: true,
      },
      disableHours: {
        type: Boolean,
        default: false,
      },
      shouldOpenDatePicker: {
        type: Boolean,
        default: false,
      },
      disableDateInputFieldEditing: {
        type: Boolean,
        default: false,
      },
      forTable: {
        type: Boolean,
        default: false,
      },
      editable: {
        type: Boolean,
        default: true,
      },
      placeholder: {
        type: String,
        default: '-',
      },
      timezone: {
        type: String,
        default: undefined,
      },
      calendarIconSrc: {
        type: String,
        default: calendarIconSrc,
      },
      firstLinePlaceholder: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        disabledCalendarIcon,
        date: new Date(),
      };
    },
    computed: {
      dateValue() {
        if (this.isRange) {
          return {
            start: this.dateStart,
            end: this.dateEnd,
          };
        }

        return this.date;
      },
      datepickerColumns() {
        if (this.componentType === 'double') {
          return 2;
        }

        if (this.componentType === 'custom') {
          return this.$screens(this.columns);
        }

        return 1;
      },
      datepickerRows() {
        if (this.componentType === 'custom') {
          return this.$screens(this.columns);
        }

        return 1;
      },
    },
    watch: {
      shouldOpenDatePicker: {
        handler(newValue) {
          if (newValue) {
            this.openDatePicker();
          }
        },
        immediate: true,
      },
      date() {
        this.$emit('date-change', this.date);
      },
    },
    methods: {
      hide() {
        this.$refs.picker.hidePopover();
      },
      openDatePicker() {
        const calendar = this.$refs.picker;
        calendar.showPopover();
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/colors/background.module';
  @import '../../styles/colors/borders';
  @import '../../styles/colors/text.module';
  .nmg-date-time-picker {
    .calendar-input-container {
      position: relative;
      //display: inline-block; TODO make sure it doesnt fuck up anything else

      &:focus-within {
        border: 1px solid $border-focus-color;
      }

      .first-line-placeholder {
        height: 27px;
        width: 364px;
        background-color: white;
        border-bottom: none;

        .first-line-text {
          padding-left: 16px;
          padding-top: 16px;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 11px;
          color: #585961;
          align-items: center;

          &.is-disabled {
            background-color: white !important;
            color: #b4b3c0 !important;
            pointer-events: none;
          }
        }
      }
      .calendar-input {
        height: 50px;
        width: 100%;
        color: #585961;
        font-size: 14px;
        letter-spacing: 0;
        line-height: 18px;
        padding: 0 16px;
        border: 0;
        box-sizing: border-box;
        outline: none;

        &:disabled {
          background-color: white !important;
          color: #b4b3c0 !important;
          pointer-events: none;
        }
      }

      .calendar-input-icon {
        position: absolute;
        right: 16px;
        top: 0;
        bottom: 0;
        margin: auto;
        cursor: pointer;
        &.is-disabled {
          pointer-events: none;
        }
      }
    }

    .calendar-input-container-for-table {
      .calendar-input-for-table {
        border: 0;
        box-sizing: border-box;
        background-color: transparent;
      }

      .clickable {
        cursor: pointer;
      }
    }
  }
</style>

<style lang="scss">
  @import '../../styles/colors/background.module';
  @import '../../styles/colors/borders';
  @import '../../styles/colors/semantic.module';
  @import '../../styles/colors/text.module';
  @import '../../styles/colors/buttons';

  .nmg-date-time-picker {
    .nmg-date-time-picker.no-minutes {
      :deep(.vc-focusable.is-disabled) {
        pointer-events: none;
      }

      :deep(.vc-time) {
        > span {
          display: none;
        }

        .vc-time {
          > span {
            display: none;
          }

          .vc-select:not(:nth-child(1)) {
            display: none;
          }
        }
      }
    }
    .nmg-date-time-picker.disable-hours {
      :deep(.vc-am-pm) {
        pointer-events: none;
        .active {
          background-color: $bg-disabled !important;
        }
      }
      :deep(.vc-date-time) {
        pointer-events: none;
        .button:nth-child(1) {
          color: $txt-disabled;
        }
        .vc-select > select {
          color: $txt-disabled;
        }
      }
    }
    .vc-popover-caret {
      display: none;
    }

    .vc-title {
    }
    .vc-time-picker.vc-bordered {
      border-top: 0;
    }

    &.single .vc-pane-layout {
      width: 300px;
    }

    &.double .vc-pane-layout {
      width: 600px;
    }

    .vc-arrow {
      color: $semantic-info-icon;

      &:hover {
        background: $bg-element-hover;
      }
    }

    .vc-time-picker svg {
      display: none;
    }

    .vc-date-time .vc-date {
      display: none;
    }

    .vc-weeks {
      padding: 5px 0;
    }

    .vc-weeks .vc-weekday {
      background-color: $bg-secondary-element !important;
      padding: 8px 0;
      color: $txt-primary;
      font-weight: initial;
    }

    .vc-day-content.vc-focusable.is-disabled {
      color: $txt-disabled;
    }

    .vc-am-pm {
      background: $bg-secondary-element;
      .active {
        background-color: $semantic-info-icon !important;
        &:focus {
          border-color: $semantic-info-icon !important;
        }
      }

      button {
        border-color: transparent;
      }
    }

    .vc-day-box-right-center .vc-highlight {
      background-color: $btn-primary-hover !important;
    }

    .vc-day-box-right-center + .vc-day-box-center-center .vc-highlight,
    .vc-day-box-left-center + .vc-day-box-center-center .vc-highlight {
      background: $btn-primary !important;
    }

    .vc-highlights .vc-highlight {
      background-color: $semantic-primary-brand !important;
      border-color: $semantic-primary-brand !important;
    }

    .vc-day-content {
      font-weight: initial !important;
      /* Body/Tiny - 12px regular */
      font-family: Figtree;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .vc-highlight-content-solid {
      color: $txt-inverted !important;
    }
    .vc-pane-container {
      border-color: $border-ui-color;
      border-radius: 8px;

      .column-1 {
        border-right: 1px solid $border-ui-color;
      }
      .vc-title-wrapper {
        font-weight: initial;
        font-size: 14px;
        span {
          color: $txt-primary;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 18px;
        }
      }
    }
    .vc-day-content:focus {
      background-color: $semantic-primary-brand !important;
      color: $txt-inverted !important;
    }

    .vc-day-content:hover {
      background-color: $semantic-primary-brand !important;
      color: $txt-inverted !important;
    }
    .vc-date-time .vc-select > select {
      background: $bg-secondary-element;
      border: 1px solid $border-ui-color;
      color: $txt-primary;
    }
    .vc-nav-container {
      .vc-nav-items {
        background-color: $semantic-primary-brand !important;
        border-radius: 0 !important;
      }
    }

    :deep(.vc-nav-title) {
      color: $txt-primary;

      &:hover {
        background-color: $bg-element-hover;
      }
    }
    .vc-day-content.vc-disabled {
      background-color: $bg-disabled !important;
    }
    :deep(.vc-nav-popover-container) {
      background: #fff;
      border: none;

      .vc-nav-items {
        //grid-gap: 40px;

        span {
          color: $txt-primary;
          font-weight: 500;
          font-size: 14px;
          line-height: 18px;

          &:hover {
            background: $bg-element-hover;
            border-color: transparent;
          }
        }
      }
    }
    :deep(.vc-nav-item) {
      &:focus {
        border-color: $semantic-primary-brand;
      }
    }
    :deep(.vc-nav-item.is-current) {
      outline: none;
      border-color: $semantic-primary-brand;

      &:focus {
        border-color: transparent;
      }
    }

    :deep(.vc-nav-item.is-active) {
      box-shadow: none;
      background-color: $semantic-primary-brand;
      outline: none;

      &:focus {
        border-color: transparent;
      }
    }
  }
  .vc-time-month {
    color: $semantic-primary-brand !important;
  }
  .vc-time-day {
    color: $semantic-primary-brand !important;
  }
  .vc-nav-item {
    color: $txt-primary;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
  }
  .vc-nav-item.is-active {
    background-color: $semantic-primary-brand;
    border-radius: 0;
  }
  .vc-nav-title {
    color: $txt-primary;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
  }
  .vc-nav-item.is-current {
    color: $semantic-primary-brand;
  }
</style>
