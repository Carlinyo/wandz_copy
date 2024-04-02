<template>
  <modal
    :primaryButtonText="'Create'"
    :secondaryButtonText="'Cancel'"
    :modalOpen="true"
    :title="'Create new AI Feature'"
    content-align="left"
    :secondaryButtonStyleType="'secondary'"
    :primaryButtonStyleType="'primary'"
    v-on="{
      ...$listeners,
    }"
    @secondary-button-clicked="
      () => {
        $emit('modal-close');
      }
    "
    @primary-button-clicked="() => {}"
  >
  </modal>
</template>

<script setup lang="ts">
  import Modal from '@/design-library/src/components/Modal/Modal.vue';
  import TextInput from '@/design-library/src/components/TextInput/TextInput.vue';

  defineOptions({
    name: 'CreateAiFeatureModal',
  });
</script>

<style scoped lang="scss"></style>
