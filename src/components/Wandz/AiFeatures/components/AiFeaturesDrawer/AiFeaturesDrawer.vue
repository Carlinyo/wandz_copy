<template>
  <drawer
    show-dimmer
    v-bind="{
      hideX: true,
      ...buttonsProps,
    }"
    v-on="{
      ...buttonsEmits,
      [WandzCommonEmits.CLOSE_DRAWER]: () => emit(WandzCommonEmits.CLOSE_DRAWER),
    }"
  >
    <template #title>
      <div class="drawer-title">
        <text-input
          v-if="editing"
          :value="item.displayName"
          :height="DRAWER_HEADER_INPUT_HEIGHT"
          :width="0 /** For 100% */"
          @input="
            (e: Event) => {
              if (editableFields) {
                editableFields.displayName = (e.target as HTMLInputElement).value;
              }
            }
          "
        />
        <div
          v-else
          class="header secondary-title"
          v-text="item.displayName"
        />
        <text-input
          v-if="editing"
          :value="item.description"
          :height="DRAWER_HEADER_INPUT_HEIGHT"
          :width="0 /** For 100% */"
          @input="
            (e: Event) => {
              if (editableFields) {
                editableFields.description = (e.target as HTMLInputElement).value;
              }
            }
          "
        />
        <div
          v-else
          class="sub-header regular-title"
          v-text="item.description"
        />

        <div
          v-if="isCustomFeature"
          class="creation-meta-data body-tiny txt-secondary"
        >
          <span v-text="createdByPhrase" />
          <span class="separate-pipe" />
          <span v-text="createdAtPhrase" />
        </div>

        <attention
          v-if="distributionResponse.warning"
          :text="AI_FEATURES_DISTRIBUTION_WARNINGS[distributionResponse.warning]"
          :attention-type="AttentionType.WARNING"
          type="multi-line"
          class="drawer-attention"
        />

        <line-split
          :color="LineSplitColor.BORDER"
          :margin-bottom="0"
        />
      </div>
    </template>
    <template #main>
      <div class="sections-container">
        <distribution-section
          :distribution="distributionResponse.distribution"
          :is-loading="isLoading"
        />
        <custom-ai-feature-advanced-info-section
          v-if="isCustomFeature"
          :item="<ICustomAiFeaturesConfig>item"
          :editing="editing"
          v-on="{
            [WandzCommonEmits.AI_FEATURE_DATA_TYPE_UPDATED]: (dataType: DataTypes) => {
              if (editableFields) {
                editableFields.dataType = dataType;
              }
            },
          }"
        />
        <advanced-info-section
          v-else
          :item="item"
        />
      </div>
    </template>
  </drawer>
  <submit-modal
    v-if="deleteModalOpened"
    :modal-props="DELETE_AI_FEATURE_MODAL_PROPS(deleteRequestSent)"
    v-on="{
      [CommonEmits.CANCEL_ACTION]: () => {
        deleteModalOpened = false;
      },
      [CommonEmits.MODAL_CLOSE]: () => {
        deleteModalOpened = false;
      },
      [CommonEmits.APPROVE_ACTION]: doOnDeleteFeature,
    }"
  />
</template>

<script setup lang="ts">
  import { computed, defineProps, reactive, ref } from 'vue';
  import { type PropType } from 'vue';
  import {
    DataTypes,
    type ICustomAiFeaturesConfig,
    type IAiFeaturesBasicConfig,
    type IAiFeatureDistributionResponse,
  } from '@wandzai/wandz-interfaces';

  import Drawer from '@/design-library/src/components/Drawer/Drawer.vue';
  import Attention from '@/design-library/src/components/Attention/Attention.vue';
  import LineSplit from '@/design-library/src/components/LineSplit/LineSplit.vue';
  import TextInput from '@/design-library/src/components/TextInput/TextInput.vue';
  import { LineSplitColor } from '@/design-library/src/types/enums/LineSplit';
  import formatters from '@/design-library/src/utils/filters/formatters';

  import DistributionSection from './sections/DistributionSection.vue';
  import AdvancedInfoSection from './sections/AdvancedInfoSection.vue';

  import CustomAiFeatureAdvancedInfoSection from './sections/CustomAiFeatureAdvancedInfoSection.vue';
  import {
    DRAWER_BUTTONS_TEXTS,
    DRAWER_HEADER_INPUT_HEIGHT,
    AI_FEATURES_DISTRIBUTION_WARNINGS,
    DELETE_AI_FEATURE_MODAL_PROPS,
  } from '@/components/Wandz/AiFeatures/consts';
  import { useAiFeaturesStore } from '@/stores/wandz';
  import { WandzCommonEmits } from '@/components/Wandz/types';
  import SubmitModal from '@/components/Common/SubmitModal.vue';
  import { AttentionType } from '@/design-library/src/types/enums/AttentionType';
  import { CommonEmits } from '@/components/Common/types';

  const aiFeaturesStore = useAiFeaturesStore();
  const { editAiFeature } = aiFeaturesStore;

  defineOptions({
    name: 'AiFeatureDrawer',
  });

  const props = defineProps({
    isCustomFeature: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object as PropType<IAiFeaturesBasicConfig>,
      default: () => ({}),
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    distributionResponse: {
      type: Object as PropType<IAiFeatureDistributionResponse>,
      default: () => ({}),
    },
  });

  const editableFields = props.isCustomFeature
    ? reactive({
        displayName: (<ICustomAiFeaturesConfig>props.item).displayName,
        description: (<ICustomAiFeaturesConfig>props.item).description,
        dataType: (<ICustomAiFeaturesConfig>props.item).dataType,
      })
    : null;

  const editable = ref<boolean>(props.isCustomFeature);
  const editing = ref<boolean>(false);
  const editingRequestSent /** to server */ = ref<boolean>(false);
  const deleteModalOpened /** to server */ = ref<boolean>(false);
  const deleteRequestSent /** to server */ = ref<boolean>(false);

  const isDirty = computed(() => {
    return (
      props.item.displayName !== editableFields?.displayName ||
      props.item.description !== editableFields?.description ||
      props.item.dataType !== editableFields?.dataType
    );
  });

  const buttonsProps = computed(() => {
    let /** primary */
      primaryButtonText,
      primaryButtonLoadingState,
      disabledBtn /** For primary button */,
      /** secondary */
      secondaryButtonText,
      secondaryButtonType,
      secondaryButtonPadding = 24,
      /** tertiary */
      showTertiaryButton = false,
      tertiaryButtonStyle = 'textLinkDanger',
      tertiaryButtonText = DRAWER_BUTTONS_TEXTS.DELETE;

    if (editable.value) {
      secondaryButtonText = DRAWER_BUTTONS_TEXTS.EDIT;
      showTertiaryButton = true;
    }

    if (editing.value) {
      primaryButtonText = DRAWER_BUTTONS_TEXTS.SAVE;
      secondaryButtonText = DRAWER_BUTTONS_TEXTS.CANCEL;
      secondaryButtonType = 'textLink';
      secondaryButtonPadding = 0;
      showTertiaryButton = false; /** Hide <Delete> button while editing. */
    }

    disabledBtn = !isDirty.value;
    primaryButtonLoadingState = editingRequestSent.value;

    return {
      /** primary */
      primaryButtonText,
      primaryButtonLoadingState,
      disabledBtn,
      /** secondary */
      secondaryButtonText,
      secondaryButtonType,
      secondaryButtonPadding,
      /** tertiary */
      showTertiaryButton,
      tertiaryButtonStyle,
      tertiaryButtonText,
    };
  });

  const buttonsEmits = computed(() => {
    let secondaryButtonClick,
      primaryButtonClick,
      tertiaryButtonClick = () => {
        deleteModalOpened.value = true;
      };

    if (editable.value) {
      secondaryButtonClick = () => {
        editing.value = true;
      };
    }

    if (editing.value) {
      /** On <Cancel> button state */
      secondaryButtonClick = () => {
        editing.value = false;
      };

      if (isDirty.value) {
        primaryButtonClick = () => {
          editingRequestSent.value = true;
          editAiFeature(<IAiFeaturesBasicConfig>editableFields).finally(() => {
            editing.value = false;
            editingRequestSent.value = false;
          });
        };
      }
    }

    return {
      secondaryButtonClick,
      primaryButtonClick,
      tertiaryButtonClick,
    };
  });

  const emit = defineEmits([WandzCommonEmits.CLOSE_DRAWER, WandzCommonEmits.AI_FEATURE_DELETED]);

  const doOnDeleteFeature = () => {
    deleteRequestSent.value = true;
    emit(WandzCommonEmits.AI_FEATURE_DELETED, props.item);
  };

  const createdByPhrase = computed(() => {
    return `Created by: ${(<ICustomAiFeaturesConfig>props.item).createdBy}`;
  });

  const createdAtPhrase = computed(() => {
    return `Created on: ${formatters.dateFormatter((<ICustomAiFeaturesConfig>props.item).createdAt)}`;
  });
</script>

<style scoped lang="scss">
  @import '@/design-library/src/styles/colors/background.module';
  @import '@/design-library/src/styles/borders/borders';

  .drawer-title {
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .sub-header {
      max-width: 80%;
    }
  }

  .creation-meta-data {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .sections-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .drawer-attention {
    margin-top: 16px;
  }
</style>
