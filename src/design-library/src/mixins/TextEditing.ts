const TextEditing = {
  props: {
    valueType: {
      type: String,
      required: false,
      default: '',
    },
    fallBackToDefaultValue: {
      type: [String, Number],
      default: '',
    },
    endInputWith: {
      type: String,
      default: '',
    },
  },
  methods: {
    filter(value) {
      if (this.valueType === 'number') {
        value = value.replace(/[^\d.-]/g, ''); // Modified regex pattern
      } else if (this.valueType === 'positive-number') {
        value = value
          .split('')
          .filter((letter) => /^\d+$/.test(letter))
          .join('')
          .replace(/^0+/, '');
      } else if (this.valueType === 'positive-number-including-zero') {
        value = value.replace(/[^\d]/g, '');
      } else {
        value = !value?.length ? this.fallBackToDefaultValue ?? value : value;
      }

      // Check if this.endInputWith is set and add it if not at the end
      if (this.endInputWith && !value.endsWith(this.endInputWith)) {
        value += this.endInputWith;
      }

      return value;
    },
  },
};
export default TextEditing;
