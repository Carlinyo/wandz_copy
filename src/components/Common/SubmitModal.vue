<template>
  <modal
    v-bind="modalProps"
    :modalOpen="true"
    :width="modalProps.width ? modalProps.width : 350"
    content-align="left"
    @secondary-button-clicked="$emit(CommonEmits.CANCEL_ACTION)"
    @primary-button-clicked="$emit(CommonEmits.APPROVE_ACTION)"
    @modal-close="$emit(CommonEmits.CANCEL_ACTION)"
  >
    <div v-if="modalProps.note">
      <span
        class="body-tiny txt-secondary"
        v-text="modalProps.note"
      />
    </div>
  </modal>
</template>

<script setup lang="ts">
  import Modal from '@/design-library/src/components/Modal/Modal.vue';
  import { CommonEmits } from './types';
  import type { IModalProps } from '@/design-library/src/types/interfaces/modal';
  import type { PropType } from 'vue';

  defineOptions({
    name: 'SubmitModal',
  });

  defineProps({
    modalProps: {
      type: Object as PropType<IModalProps & { note: string }>,
      default: () => {},
    },
  });
</script>

<style scoped lang="scss">
  .content-container {
    padding-top: 24px;
    min-height: unset !important;
  }
  :deep(.modal-content) {
    white-space: pre-line;
  }
</style>
