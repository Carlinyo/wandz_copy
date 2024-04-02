<template>
  <div>
    <sticky-modal
      :modalOpen="modalOpen"
      @modal-close="closeModal"
      modalSize="fullScreenLessHeight"
      :title="LAST_TRAINING_CONSTS.TITLE"
      :contentGap="32"
      :color="BackgroundPrimary"
      contentAlign="left"
      :showFooter="false"
    >
      <template #content>
        <model-analytics :is-modal="true" />
      </template>
    </sticky-modal>
  </div>
</template>
<script setup lang="ts">
  import ModelAnalytics from '../../ModelAnalytics.vue';
  import StickyModal from '@/design-library/src/components/StickyModal/StickyModal.vue';
  import { LAST_TRAINING_CONSTS } from './consts';
  import { BackgroundPrimary } from '@/design-library/src/styles/colors/background.module.scss';
  const props = defineProps({
    modalOpen: {
      type: Boolean,
      required: true,
      default: false,
    },
  });
  const emit = defineEmits(['modal-close']);
  const closeModal = () => {
    emit('modal-close', !props.modalOpen);
  };
</script>

<style lang="scss" scoped></style>
