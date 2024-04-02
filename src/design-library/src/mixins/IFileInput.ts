const IFileInput = {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    readAsDataUrl: {
      type: Boolean,
      default: true,
    },
    fileExtAccepted: {
      type: String,
      default: 'image/png,image/jpeg',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    fileMaxSize: {
      type: Number,
      default: 4 * 1024 * 1024, // 4 MB
    },
    showLoading: {
      type: Boolean,
      default: false,
    },
    customValidator: {
      type: Function,
      default: (file) =>
        Promise.resolve({
          isValid: true,
          errorMessage: null,
        }),
    },
  },
};
export default IFileInput;
