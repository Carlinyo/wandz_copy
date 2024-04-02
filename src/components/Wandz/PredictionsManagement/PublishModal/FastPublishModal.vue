<template>
  <modal
    :modal-open="true"
    modal-size="mediumSquare"
    @modal-close="() => $emit('closeModal')"
  >
    <div class="content-container">
      <img :src="rocketIcon" />
      <div class="container-title">{{ FAST_PUBLISH_MODAL.TITLE }}</div>
      <div class="content-wrapper">
        <div class="body-small">{{ FAST_PUBLISH_MODAL.CONTENT.LINE1 }}</div>
        <div>
          <span class="body-small">{{ FAST_PUBLISH_MODAL.CONTENT.LINE2_1 }}</span>
          <span class="body-small-bold">{{ FAST_PUBLISH_MODAL.CONTENT.LINE2_2 }}</span>
        </div>
        <br />
        <div class="last-line-content body-small">{{ FAST_PUBLISH_MODAL.CONTENT.LINE3 }}</div>
      </div>
      <div class="help-wrapper">
        <span class="body-tiny"> {{ FAST_PUBLISH_MODAL.GET_BETTER_STR }}</span>
        <cta-button
          @handle-click="() => $emit('helpCenterClicked')"
          :text-padding="4"
          style-type="textLink"
          ><span class="body-tiny-bold">{{ FAST_PUBLISH_MODAL.HELP_CENTER }}</span></cta-button
        >
      </div>
    </div>
    <div class="btns-wrapper">
      <cta-button
        style-type="primary"
        @handle-click="() => $emit('openPublishModal')"
      >
        {{ FAST_PUBLISH_MODAL.BTN_TEXT }}</cta-button
      >
      <cta-button
        style-type="textLink"
        @handle-click="() => $emit('closeModal')"
      >
        {{ FAST_PUBLISH_MODAL.CONTINUE }}</cta-button
      >
    </div>
  </modal>
</template>

<script setup lang="ts">
  import Modal from '@/design-library/src/components/Modal/Modal.vue';
  import CtaButton from '@/design-library/src/components/Button/Button.vue';
  import rocketIcon from '@/design-library/src/assets/icons/misc/rocket.svg';
  import { FAST_PUBLISH_MODAL } from '@/components/Wandz/PredictionsManagement/PublishModal/consts';
</script>

<style scoped lang="scss">
  .content-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .btns-wrapper {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }
</style>
