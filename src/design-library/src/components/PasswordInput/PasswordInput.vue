<template>
  <text-input
    ref="password"
    v-model="password"
    :type="currentType"
    :max-length="maxLength"
    :label="label"
    :placeholder="placeholder"
    :error="!!error"
    :error-message="error"
    :disabled="disabled"
    :auto-focus="autoFocus"
    floating-label
    @input="() => $emit('input', password)"
  >
    <template #input-icon>
      <img
        class="eye-icon"
        :class="{
          disabled,
          'show-pass-icon': currentType === INPUT_TYPES.text,
          'hide-pass-icon': currentType === INPUT_TYPES.password,
        }"
        :src="passwordIcon"
        @click="changePasswordVisibility"
      />
    </template>
  </text-input>
</template>

<script>
  import TextInput from '../TextInput';
  import showPasswordIconPurple from '../../assets/icons/misc/validation_eye.svg';
  import hidePasswordIconPurple from '../../assets/icons/misc/hidePassword.svg';

  const INPUT_TYPES = {
    text: 'text',
    password: 'password',
  };

  export default {
    name: 'NmgPasswordInput',
    components: { TextInput },
    props: {
      value: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: 'Password',
      },
      placeholder: {
        type: String,
        default: 'Enter password',
      },
      error: {
        type: String,
        default: '',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      autoFocus: {
        type: Boolean,
        default: false,
      },
      maxLength: {
        type: [String, Number],
        required: false,
        default: Number.MAX_SAFE_INTEGER,
      },
    },
    data() {
      return {
        INPUT_TYPES,
        currentType: INPUT_TYPES.password,
        password: this.value,
      };
    },
    computed: {
      passwordIcon() {
        return this.currentType === INPUT_TYPES.text ? showPasswordIconPurple : hidePasswordIconPurple;
      },
    },
    methods: {
      changePasswordVisibility() {
        if (this.disabled) return;
        this.currentType = this.currentType === INPUT_TYPES.password ? INPUT_TYPES.text : INPUT_TYPES.password;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .eye-icon {
    cursor: pointer;

    &.disabled {
      opacity: 0.3;
      pointer-events: none;
    }
  }
</style>
