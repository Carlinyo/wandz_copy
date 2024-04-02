<template>
  <modal
    modal-open
    content-align="left"
    v-bind="MODAL_PROPS"
    @secondary-button-clicked="$emit(CommonEmits.MODAL_CLOSE)"
    @primary-button-clicked="() => {}"
  >
  </modal>
</template>

<script setup lang="ts">
  import Modal from '@/design-library/src/components/Modal/Modal.vue';
  import { CommonEmits } from '@/components/Common/types';
  import { MODAL_PROPS } from '@/components/Wandz/Audiences/consts';

  defineOptions({
    name: 'CreateAiFeatureModal',
  });
</script>

<style scoped lang="scss"></style>
