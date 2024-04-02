<template>
  <modal
    v-bind="actionModalButtonProps"
    :modalOpen="true"
    :width="350"
    content-align="left"
    @secondary-button-clicked="$emit(CommonEmits.CANCEL_ACTION)"
    @primary-button-clicked="$emit(CommonEmits.APPROVE_ACTION, newModelName)"
  >
    <div class="content-container">
      <text-input
        v-bind="props.modalProps.inputProps"
        :first-line-label="true"
        :value="currentModelName"
        :error="errorMessage.length"
        :error-message="errorMessage"
        :placeholder="''"
        @input="onModelNameChange"
      />
    </div>
  </modal>
</template>

<script setup lang="ts">
  import Modal from '@/design-library/src/components/Modal/Modal.vue';
  import TextInput from '@/design-library/src/components/TextInput/TextInput.vue';
  import { computed, type PropType, ref } from 'vue';
  import { type IPredictionModel } from '@wandzai/wandz-interfaces';
  import merge from 'lodash/merge';
  import { usePredictionManagementStore } from '@/stores/wandz';
  import { CommonEmits } from '@/components/Common/types';

  const predictionModelStore = usePredictionManagementStore();

  defineOptions({
    name: 'RenameModal',
  });

  const props = defineProps({
    modalProps: {
      type: Object,
      default: () => ({}),
    },
    currentPredictionModel: {
      type: Object as PropType<Partial<IPredictionModel>>,
      default: null,
    },
  });

  const currentModelName = ref(props.currentPredictionModel?.name || '');
  const newModelName = ref(currentModelName.value);
  const errorMessage = ref('');

  const isSameName = computed(() => currentModelName.value == newModelName.value);
  const isEmptyName = computed(() => !newModelName.value.length);
  const isDisabled = computed(() => {
    return !!(errorMessage.value.length || isSameName.value || isEmptyName.value);
  });
  const actionModalButtonProps = computed(() => {
    const computedActionProps = {
      primaryButtonProps: {
        disabled: isDisabled.value,
      },
    };
    return structuredClone(merge(props.modalProps, computedActionProps));
  });

  const onModelNameChange = (e: Event) => {
    newModelName.value = (e.target as HTMLInputElement)?.value || '';
    const isAvailable = predictionModelStore.validateModelNameIsAvailable(
      newModelName.value,
      props.currentPredictionModel.guid,
    );
    errorMessage.value = isAvailable ? '' : props.modalProps.inputProps.errorMessage;
  };
</script>

<style scoped lang="scss">
  .content-container {
    padding-top: 24px;
    min-height: unset !important;
  }
</style>
