<template>
  <div class="audience-config-wrapper">
    <section-header
      :title="title"
      :tooltip="titleTooltip"
    />
    <div class="choices-container txt-primary regular-title">
      <div class="radio-container">
        <template v-for="item in audienceSelectOptions">
          <div class="radio-wrapper">
            <radio
              :checked="selectedAudience === item"
              @select="onSelectAudienceOption(item)"
            />
            <span
              class="radio-label"
              v-text="item"
            />
          </div>
        </template>
        <div class="check-box-wrapper">
          <checkbox
            :checked="isBotExcluded"
            @checkboxClick="onSelectExcludeBots"
          />
          {{ SELECT_AUDIENCE_STRINGS.EXCLUDE_BOTS }}
          <tooltip :text="SELECT_AUDIENCE_STRINGS.EXCLUDE_BOTS_TOOLTIP">
            <img :src="InfoIcon" />
          </tooltip>
          <span class="body-micro"> {{ SELECT_AUDIENCE_STRINGS.RECOMMENDED }}</span>
        </div>
      </div>
    </div>
    <div
      class="specific-audience-wrapper"
      v-if="selectedAudience === AUDIENCE_CONFIG_OPTIONS.SPECIFIC_SEGMENT"
    >
      <div class="body-tiny txt-primary">
        {{ SELECT_AUDIENCE_STRINGS.SPECIFIC_AUDIENCE }}
      </div>
      <div
        class="input-wrapper border border-radius-small"
        :class="{ 'border-error': error }"
      >
        <div class="tags-wrapper">
          <pills
            v-if="isPillsDisplay"
            v-for="(value, category) in baseAudienceSettings"
            :text="getPillText(category, value)"
            :closeable="false"
          />
          <div
            v-else
            class="body-small txt-placeholder"
          >
            {{ SELECT_AUDIENCE_STRINGS.FILTER_BY_AUDIENCE }}
          </div>
        </div>
        <Button
          :style-type="'textLink'"
          :text-padding="0"
          @handle-click="() => (isOpenModal = true)"
        >
          {{ SELECT_AUDIENCE_STRINGS.EDIT }}
        </Button>
      </div>
      <span
        class="body-tiny semantic-negative"
        v-if="error"
        v-text="error"
      />
    </div>
    <specific-audience-filter-modal
      :filters="baseAudienceSettings"
      v-if="isOpenModal"
      @update-filters="updateFilters"
      @close-modal="isOpenModal = false"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import type { PropType, Ref } from 'vue';

  import SectionHeader from '@/components/Wandz/PredictionsManagement/PredictionManagementModal/SectionHeader';
  import Radio from '@/design-library/src/components/Radio/Radio.vue';
  import Tooltip from '@/design-library/src/components/Tooltip/Tooltip.vue';
  import InfoIcon from '@/design-library/src/assets/icons/info/moreInfo.svg';
  import Checkbox from '@/design-library/src/components/Checkbox/Checkbox.vue';
  import Pills from '@/design-library/src/components/Pills/Pills.vue';
  import Button from '@/design-library/src/components/Button/Button.vue';

  import type { IPredictionModel } from '@wandzai/wandz-interfaces';
  import type { IBaseAudiencesConfig } from '@wandzai/wandz-interfaces/src/interfaces/pred-model';
  import SpecificAudienceFilterModal from '@/components/Wandz/Common/SelectAudience/SpecificAudienceFilterModal.vue';
  import { SpecificAudienceFilters } from '@/components/Wandz/Common/types';
  import { AUDIENCE_FILTERS } from '@/components/Wandz/Common/consts';
  import { SELECT_AUDIENCE_STRINGS, AUDIENCE_CONFIG_OPTIONS } from '@/components/Wandz/Common/SelectAudience/consts';

  const props = defineProps({
    title: {
      type: String,
      default: SELECT_AUDIENCE_STRINGS.AUDIENCE_TITLE,
    },
    titleTooltip: {
      type: String,
      default: '',
    },
    predictionModelObj: {
      type: Object as PropType<IPredictionModel>,
      default: () => {},
    },
    error: {
      type: String,
      default: '',
    },
  });

  const audienceSelectOptions = ref(AUDIENCE_CONFIG_OPTIONS);
  const selectedAudience = ref(
    !props.predictionModelObj?.trainedAudiences?.audiences
      ? AUDIENCE_CONFIG_OPTIONS.ALL
      : AUDIENCE_CONFIG_OPTIONS.SPECIFIC_SEGMENT,
  );
  const isBotExcluded = ref(props.predictionModelObj?.trainedAudiences?.excludeBots ?? true);
  const isOpenModal = ref(false);

  const baseAudienceSettings: Ref<IBaseAudiencesConfig> = ref(
    props.predictionModelObj?.trainedAudiences?.audiences ?? {
      [SpecificAudienceFilters.channels]: [],
      [SpecificAudienceFilters.devices]: [],
      [SpecificAudienceFilters.segments]: [],
    },
  );

  const isPillsDisplay = computed(() => Object.values(baseAudienceSettings.value).some((arr) => arr.length));
  const emit = defineEmits(['segmentSelected', 'onSelectExcludeBots']);

  const onSelectExcludeBots = () => {
    isBotExcluded.value = !isBotExcluded.value;
    emit('onSelectExcludeBots', isBotExcluded.value);
  };

  const onSelectAudienceOption = (option: string) => {
    selectedAudience.value = option;
    emit('segmentSelected', option === AUDIENCE_CONFIG_OPTIONS.ALL ? null : baseAudienceSettings.value);
  };

  const updateFilters = (updatedFilters: IBaseAudiencesConfig) => {
    baseAudienceSettings.value = updatedFilters;
    isOpenModal.value = false;
    emit('segmentSelected', baseAudienceSettings.value);
  };

  const getPillText = (category: SpecificAudienceFilters, value: string[]) => {
    return `${AUDIENCE_FILTERS[category]} (${
      value.length === 1 && value[0] === SELECT_AUDIENCE_STRINGS.ALL ? SELECT_AUDIENCE_STRINGS.ALL : value.length
    })`;
  };
</script>

<style scoped lang="scss">
  .choices-container,
  .radio-container {
    display: flex;
    gap: 24px;
    align-items: center;

    .radio-wrapper,
    .check-box-wrapper {
      display: flex;
      gap: 6px;
      align-items: center;
    }
  }

  .specific-audience-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 16px;

    .input-wrapper {
      height: 40px;
      width: 459px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
      text-transform: capitalize;

      .tags-wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
  }
</style>
