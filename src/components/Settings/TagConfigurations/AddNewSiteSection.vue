<template>
  <modal
    class="add-or-edit-user-modal-wrapper"
    :modal-open="true"
    :width="412"
    :height="414"
    content-align="left"
    :title="SITE_CONFIGURATIONS_STRINGS.MODAL_TITLE"
    :primary-button-text="SITE_CONFIGURATIONS_STRINGS.BTN_TEXT"
    primary-button-style-type="primary"
    @primary-button-clicked="$emit('onSave')"
    @modal-close="$emit('closeModal')"
  >
    <div class="content-container"></div>
  </modal>
</template>
<script setup lang="ts">
  import Modal from '@/design-library/src/components/Modal/Modal.vue';
  import { SITE_CONFIGURATIONS_STRINGS } from '@/components/Settings/TagConfigurations/consts';
</script>
<style scoped lang="scss"></style>
