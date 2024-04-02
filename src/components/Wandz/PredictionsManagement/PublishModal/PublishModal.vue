<template>
  <sticky-modal
    :modal-open="true"
    :modal-size="'highRectangle'"
    :title="PUBLISH_MODEL_STRINGS.MODEL_TITLE"
    :primary-button-text="PUBLISH_MODEL_STRINGS.PRIMARY_BTN_TEXT"
    primary-button-style-type="primary"
    :secondary-button-text="PUBLISH_MODEL_STRINGS.SECONDARY_BTN_TEXT"
    secondary-button-style-type="secondary"
    @primary-button-clicked="handlePublish"
    @secondary-button-clicked="() => $emit('closeModal')"
    @modal-close="() => $emit('closeModal')"
  >
    <template #content>
      <div class="publish-modal-content-container">
        <div class="element-container">
          <prediction-flatted-info
            :status="predictionModelObj.status"
            :data="getPredictionInfo"
            :name="predictionTitle"
            :is-archive="predictionModelObj.isArchived"
          />
          <select-audience
            :prediction-model-obj="predictionModelObj"
            :title="PUBLISH_MODEL_STRINGS.AUDIENCE_FOR_PUBLISH_TITLE"
            @on-select-exclude-bots="handleSelectedExcludeBots"
            @segment-selected="handleSegmentChanged"
          />
          <auto-publication-settings @choice-changes="handleAutoPublicationSettingsChoiceChanged" />
        </div>
        <div class="element-container">
          <copied-code-block
            :code-block="CODE_SNIPPET.PATH_CODE"
            :title="CODE_SNIPPET.PATH_TITLE"
            @help-clicked="pathHelpClicked"
          />
          <copied-code-block
            :code-block="CODE_SNIPPET.REGISTER_CODE"
            :title="CODE_SNIPPET.REGISTER_TITLE"
            @help-clicked="registerHelpClicked"
          />
        </div>
      </div>
    </template>
  </sticky-modal>
</template>

<script setup lang="ts">
  import StickyModal from '@/design-library/src/components/StickyModal/StickyModal.vue';
  import CopiedCodeBlock from '@/design-library/src/components/CopiedCodeBlock/CopiedCodeBlock.vue';
  import { CODE_SNIPPET, PUBLISH_MODEL_STRINGS } from '@/components/Wandz/PredictionsManagement/PublishModal/consts';
  import { PredictionFlattedInfo, SelectAudience } from '@/components/Wandz/Common';

  import { usePredictionManagementStore } from '@/stores/wandz';
  import { storeToRefs } from 'pinia';
  import type { IBaseAudiencesConfig, ITrainingPeriod } from '@wandzai/wandz-interfaces/src/interfaces/pred-model';
  import { computed } from 'vue';
  import type { ITitleAndValues } from '@/components/Wandz/Common/interfaces';
  import formatters from '@/design-library/src/utils/filters/formatters';
  import AutoPublicationSettings from '@/components/Wandz/PredictionsManagement/PublishModal/AutoPublicationSettings.vue';
  import { STRING_OPERATORS_LABELS_MAP, TARGET_LABELS_MAP } from '@/components/Wandz/PredictionsManagement/const';

  const predictionModelStore = usePredictionManagementStore();
  const { predictionModelObj } = storeToRefs(predictionModelStore);

  const props = defineProps({
    isFastPublish: {
      type: Boolean,
      default: false,
    },
  });

  const emits = defineEmits(['onPublish']);

  const handlePublish = () => {
    console.log('publish clicked!');
    emits('onPublish');
  };

  const handleAutoPublicationSettingsChoiceChanged = (value) => {
    predictionModelObj.value.publishPolicyUponRetrain = value;
  };

  const getPredictionInfo = computed((): ITitleAndValues[] => {
    const target = predictionModelObj.value.targetRules?.length
      ? predictionModelObj.value.targetRules[0]
      : { type: '', value: '' };

    const res: ITitleAndValues[] = [
      {
        title: PUBLISH_MODEL_STRINGS.TARGET,
        value: `${TARGET_LABELS_MAP[target.type]} ${
          target.operator ? STRING_OPERATORS_LABELS_MAP[target.operator] : '>'
        } ${target.value}`,
      },
    ];

    if (props.isFastPublish) {
      res.push({
        title: PUBLISH_MODEL_STRINGS.TRAINED_ON,
        value: `${predictionModelObj.value.optimizationFunction}`,
      });
    } else {
      res.push(
        {
          title: PUBLISH_MODEL_STRINGS.TRAINED_ON,
          value: `${formatters.dateFormatter(predictionModelObj.value.lastUpdated)}`,
        },
        {
          title: PUBLISH_MODEL_STRINGS.TRAINING_DATE_RANGE,
          value: `${formatters.dateFormatter(
            (predictionModelObj.value.trainingPeriod as ITrainingPeriod).startDate,
          )} - ${formatters.dateFormatter((predictionModelObj.value.trainingPeriod as ITrainingPeriod).endDate)}`,
        },
        {
          title: PUBLISH_MODEL_STRINGS.AUDIENCE,
          value: `${predictionModelObj.value.trainedAudiences.audiences}`,
        },
      );
    }
    return res;
  });

  const handleSelectedExcludeBots = (isSelected: boolean) => {
    if (predictionModelObj.value.audiencesForPublish) {
      predictionModelObj.value.audiencesForPublish.excludeBots = isSelected;
    } else {
      predictionModelObj.value.audiencesForPublish = {
        excludeBots: isSelected,
      };
    }
  };
  const handleSegmentChanged = (value: IBaseAudiencesConfig | null) => {
    if (predictionModelObj.value.audiencesForPublish) {
      predictionModelObj.value.audiencesForPublish.audiences = value;
    } else {
      predictionModelObj.value.audiencesForPublish = {
        audiences: value,
        excludeBots: false,
      };
    }
  };

  const pathHelpClicked = () => {
    console.log('PATH HELP CLICKED');
  };

  const registerHelpClicked = () => {
    console.log('REGISTER HELP CLICKED');
  };
  const predictionTitle = computed(() => {
    return `${PUBLISH_MODEL_STRINGS.PREDICTION_TO} ${predictionModelObj.value.name}`;
  });
</script>

<style scoped lang="scss">
  .publish-modal-content-container {
    width: 100%;

    .element-container {
      width: 100% !important;
      margin-bottom: 24px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
  }
</style>
