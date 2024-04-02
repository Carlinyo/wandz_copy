<template>
  <div class="flex-item top-bar-container">
    <div
      class="flex-item bold-title semantic-info pointer-element"
      @click="$router.push('/models-management')"
    >
      <img :src="ArrowLeft" />{{ backButtonText }}
    </div>
    <div class="flex-item buttons">
      <div class="flex-item bold-title semantic-info pointer-element">
        <img :src="downloadIcon" />
        {{ exportCsvText }}
      </div>
      <custom-button style-type="secondary">{{ ANALYTICS_TEXTS.EDIT }}</custom-button>
      <div>
        <custom-button
          v-if="!published"
          style-type="primary"
          @handle-click="modalActive = true"
          >{{ ANALYTICS_TEXTS.PUBLISH }}</custom-button
        >
        <publish-model
          v-if="modalActive"
          @close-modal="modalActive = false"
        />
      </div>
      <div
        v-if="!inTraining"
        class="actions-menu-container"
      >
        <img
          class="menu-icon"
          :src="threeDots"
          @click="menu = !menu"
        />
        <actions-menu
          v-if="menu"
          class="actions-menu"
          :is-open="true"
          :items="menuItems"
          @on-item-click="clickedOnMenuItem"
          @click-outside="menu = false"
        />
      </div>
    </div>
    <last-training
      v-if="trainingModalActive"
      :modal-open="trainingModalActive"
      @modal-close="trainingModalActive = false"
    />
    <modal
      :modal-open="actionModalActive"
      @modal-close="actionModalActive = false"
      @secondary-button-clicked="actionModalActive = false"
      @primary-button-clicked="$emit('changeStatus', modalData.statusOnConfirm)"
      :title="modalData.title"
      :subtitle="modalData.subtitle"
      :primary-button-style-type="modalData.primaryButton"
      :content="modalData.content"
      :primary-button-text="modalData.action"
      secondary-button-text="Cancel"
      secondary-button-style-type="secondary"
      content-align="left"
      modal-size="small"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import threeDots from '@/design-library/src/assets/icons/misc/three-dots.svg';
  import ArrowLeft from '@/design-library/src/assets/icons/arrows/back-left.svg';
  import downloadIcon from '@/design-library/src/assets/icons/actions/download.svg';
  import CustomButton from '@/design-library/src/components/Button/Button.vue';
  import PublishModel from '../PredictionsManagement/PublishModal/PublishModal.vue';
  import ActionsMenu from '@/design-library/src/components/Menu/Menu.vue';
  import LastTraining from '@/components/Wandz/Analytics/components/LastTraining/LastTraining.vue';
  import Modal from '@/design-library/src/components/Modal/Modal.vue';
  import { ModelStatuses } from '@wandzai/wandz-interfaces';
  import { ANAlYTICS_TOP_BAR_ACTIONS } from '@/design-library/src/types/enums/AnalyticsTopBar';
  import { IMenuItem } from '@/design-library/src/types/interfaces/AnalyticsTopBar';

  import { TRAINING_COMPLETED_ACTIONS, PUBLISHED_ACTIONS, getModalData, UNPUBLISH, ARCHIVE } from './consts';

  import { ANALYTICS_TEXTS } from '@/design-library/src/types/enums/AnalyticsTopBar';

  const props = defineProps({
    backButtonText: {
      type: String,
      required: true,
    },
    exportCsvText: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      required: true,
    },
    inTraining: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  });

  const emit = defineEmits(['changeStatus']);

  const menu = ref(false);

  const modalActive = ref(false);
  const trainingModalActive = ref(false);
  const actionModalActive = ref(false);

  const clickedOnMenuItem = (item: IMenuItem) => {
    switch (item.methodName) {
      case ANAlYTICS_TOP_BAR_ACTIONS.PUBLISH:
      case ANAlYTICS_TOP_BAR_ACTIONS.CHANGE_AUDIENCE:
        modalActive.value = true;
        break;
      case ANAlYTICS_TOP_BAR_ACTIONS.OPEN_STATES:
        trainingModalActive.value = true;
        break;
      case UNPUBLISH.toLowerCase():
      case ARCHIVE.toLowerCase():
        actionModalActive.value = true;
        break;
      default:
        emit('changeStatus', item.methodName);
    }
  };

  const getActionName = (): string | ANAlYTICS_TOP_BAR_ACTIONS => {
    switch (props.status) {
      case ModelStatuses.PUBLISHED:
        return UNPUBLISH;
      case ModelStatuses.TRAINING_COMPLETED:
        return ARCHIVE;
      default:
        return '';
    }
  };

  const modalData = computed(() => {
    return getModalData(getActionName());
  });

  const menuItems = computed(() => {
    return props.published ? PUBLISHED_ACTIONS : TRAINING_COMPLETED_ACTIONS;
  });
</script>

<style lang="scss" scoped>
  @import '@/design-library/src/styles/colors/borders';
  .flex-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .menu-icon {
    cursor: pointer;
    transform: rotate(90deg);
  }

  .top-bar-container {
    width: 100%;
    justify-content: space-between;
  }

  .buttons {
    gap: 20px;
  }

  .actions-menu-container {
    position: relative;
    .actions-menu {
      position: absolute;
      top: 30px;
      left: -230px;
      z-index: 9;
    }
  }

  .pointer-element {
    cursor: pointer;
  }
</style>
