<template>
  <div class="auto-publication-settings-wrapper">
    <div class="title-wrapper">
      <div class="bold-title">{{ AUTO_PUBLISH_SETTINGS.TITLE }}</div>
      <tooltip :text="AUTO_PUBLISH_SETTINGS.TITLE_TOOLTIP">
        <img :src="InfoIcon" />
      </tooltip>
    </div>
    <div class="choices-wrapper">
      <div
        class="choice-container"
        v-for="(choice, c) in AUTO_PUBLISH_SETTINGS.CHOICES"
        @click="handleChoiceSelected"
        :key="c"
      >
        <Radio
          @select="handleChoiceSelected(choice)"
          :checked="choice.value == localChoice"
        />
        <span>{{ choice.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import InfoIcon from '@/design-library/src/assets/icons/info/moreInfo.svg';
  import Tooltip from '@/design-library/src/components/Tooltip/Tooltip.vue';
  import Radio from '@/design-library/src/components/Radio/Radio.vue';
  import { RetrainPublishPolicies } from '@wandzai/wandz-interfaces/src/enums';
  import { ref } from 'vue';
  import { AUTO_PUBLISH_SETTINGS } from './consts';

  const props = defineProps({
    currentChoice: {
      type: String,
      default: RetrainPublishPolicies.BEST,
    },
  });

  const localChoice = ref(props.currentChoice);
  const emit = defineEmits(['choiceChanges']);

  const handleChoiceSelected = (choice) => {
    localChoice.value = choice.value;
    emit('choiceChanges', localChoice.value);
  };
</script>

<style scoped lang="scss">
  .auto-publication-settings-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .title-wrapper {
      display: flex;
      flex-direction: row;
      gap: 8px;
    }

    .choices-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .choice-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 4px;
      }
    }
  }
</style>
