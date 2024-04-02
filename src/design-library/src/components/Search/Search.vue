<template>
  <div
    class="search-wrapper border border-radius-small tw-gap-2 tw-w-full"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      ...inputCustomStyle,
    }"
    :class="{
      'large body-medium': type === 'large',
      'medium body-small': type === 'medium',
      'small body-small': type === 'small',
      filled: value,
      focused: isFocused,
      disabled: disabled,
    }"
  >
    <div class="search-input-wrapper tw-w-full tw-h-full">
      <input
        ref="input"
        v-model="currValue"
        class="search-input border-radius-small txt-primary tw-w-full"
        :class="{
          large: type === 'large',
          small: type === 'small',
          focused: isFocused,
          disabled: disabled,
        }"
        :placeholder="placeholder"
        @input="onTextInput"
        @click="onTextInputClick"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
    </div>
    <div
      class="search-icon-wrapper tw-flex-grow-0"
      :class="type"
    >
      <img
        v-if="!currValue"
        class="search-icon"
        :src="disabled ? searchDisabled : search"
        :class="type"
        alt=""
      />
      <img
        v-if="currValue"
        class="search-icon pointer"
        :src="searchDelete"
        :class="type"
        alt=""
        @click="onDeleteClick"
      />
    </div>
  </div>
</template>
<script lang="ts">
  interface Props {
    type?: string;
    value?: string | number | null;
    width?: number | null;
    height?: number | null;
    placeholder?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    valueListener?: boolean;
    inputCustomStyle?: any;
  }
</script>
<script setup lang="ts">
  import { ref, watch, onMounted, nextTick } from 'vue';
  import search from '../../assets/icons/search/search.svg';
  import searchDisabled from '../../assets/icons/search/search-disabled.svg';
  import searchDelete from '../../assets/icons/search/search-delete.svg';
  defineOptions({
    name: 'NmgSearch',
  });

  const props = withDefaults(defineProps<Props>(), {
    type: 'small',
    value: '',
    width: null,
    height: null,
    placeholder: '',
    disabled: false,
    autoFocus: false,
    valueListener: false,
    inputCustomStyle: () => ({}),
  });
  const emit = defineEmits(['input-changed', 'input', 'input-clicked', 'delete-clicked']);
  const isFocused = ref(false);
  const currValue = ref(props.value);
  const input = ref<HTMLInputElement>();

  watch(currValue, () => {
    if (props.valueListener) {
      // currValue.value = props.value;
      console.log(currValue.value);
    }
  });

  onMounted(() => {
    if (props.autoFocus) {
      nextTick(() => input.value!.focus());
    }
  });

  const onDeleteClick = (): void => {
    currValue.value = '';
    emit('input-changed', '');
    emit('input', '');
    emit('delete-clicked');
  };

  const onTextInput = (e: Event): void => {
    emit('input-changed', (e.target as HTMLInputElement).value);
    emit('input', (e.target as HTMLInputElement).value);
  };

  const onTextInputClick = (): void => {
    emit('input-clicked');
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/colors/background.module';
  @import '../../styles/colors/borders';
  @import '../../styles/colors/text.module';

  .search-wrapper {
    display: flex;
    background-color: $bg-element;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;

    input {
      border: 0;
      outline: 0;
      padding-left: 16px;
      height: 100%;

      &.disabled::placeholder {
        color: $txt-disabled;
      }
    }

    input:focus {
      outline: none !important;
    }

    &.focused {
      background-color: $bg-element;
      border: 1px solid $border-focus-color;

      &:hover {
        background-color: $bg-element;
        border: 1px solid $border-focus-color;
      }
    }

    &.large {
      height: 48px;
    }

    &.medium {
      height: 40px;
    }

    &.small {
      height: 32px;
      //width: 323px;
    }

    &.disabled {
      border: 1px solid $txt-disabled;
    }

    .search-input {
      width: 100%;
      //padding-left: 16px;

      &.large {
        //width: 310px;
        //padding-top: 22px;
      }

      &.small {
        //width: 271px;
        //padding-top: 8px;
      }

      &:not(.focused):not(.disabled).small:hover {
        //background-color: $hover-yellow;
      }

      &.disabled {
        pointer-events: none;
      }
    }

    .search-icon-wrapper {
      margin-left: auto;
      margin-right: 16px;
      height: 16px;
      width: 16px;
      display: flex;

      .search-icon {
        &.large {
          //margin-top: 24px;
        }

        &.small {
          //margin-top: 9px;
        }

        &.pointer {
          cursor: pointer;
        }
      }
    }
  }

  .disabled {
    cursor: not-allowed;
  }
</style>
