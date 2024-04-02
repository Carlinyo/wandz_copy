<template>
  <div class="tag-configuration-page-wrapper">
    <div class="element-container">
      <div class="header-wrapper">
        <span class="container-title"> {{ TAG_CONFIGURATION_STRINGS.TAG_DETAILS_TITLE }}</span>
        <my-button
          style-type="textLink"
          :text-padding="0"
          @handle-click="handleContactSupport"
        >
          {{ TAG_CONFIGURATION_STRINGS.CONTACT_SUPPORT }}
        </my-button>
      </div>
      <div class="inputs-wrapper">
        <div class="input-row">
          <div class="input-with-note">
            <text-input-with-copy
              :label="TAG_CONFIGURATION_STRINGS.TAG_ID"
              :width="350"
              :disabled="true"
              :value="props.tagDetails?.tagId"
            />
            <span class="txt-secondary body-tiny">{{
              TAG_CONFIGURATION_STRINGS.TAG_ID_NOTE(props.tagDetails?.version, props.tagDetails?.build)
            }}</span>
          </div>
          <text-input-with-copy
            :label="TAG_CONFIGURATION_STRINGS.JS_SNIPPET"
            :width="350"
            :disabled="true"
            :value="props.tagDetails?.jsSnippet"
          />
        </div>
        <div class="input-row">
          <text-input
            :label="TAG_CONFIGURATION_STRINGS.TAG_DEP_DATE"
            :width="350"
            :disabled="true"
            :value="props.tagDetails?.deploymentDate"
          />
          <dropdown
            :title="TAG_CONFIGURATION_STRINGS.TAG_MNG_SYS"
            :width="350"
            size="small"
            type="regular"
            :use-search="false"
            :selected-items="[updatedTagMngSystem]"
            :items="MANAGEMENT_SYSTEMS"
            @dropdown-click="handleMngSystemChanged"
          />
        </div>
      </div>
      <div class="action-btn-wrapper">
        <my-button
          :disabled="disableSaveBtn"
          @handle-click="save"
        >
          {{ TAG_CONFIGURATION_STRINGS.BTN_TEXT }}
        </my-button>
      </div>
    </div>
    <site-configuration />
  </div>
</template>
<script setup lang="ts">
  import { DEMO_TAG_DETAILS, ITagDetails, MANAGEMENT_SYSTEMS, TAG_CONFIGURATION_STRINGS } from './consts';
  import TextInputWithCopy from '@/design-library/src/components/TextInputWithCopy/TextInputWithCopy.vue';
  import TextInput from '@/design-library/src/components/TextInput/TextInput.vue';
  import MyButton from '@/design-library/src/components/Button/Button.vue';

  import type { PropType } from 'vue';
  import Dropdown from '@/design-library/src/components/Dropdown/Dropdown.vue';
  import { computed, ref } from 'vue';
  import SiteConfiguration from '@/components/Settings/TagConfigurations/SiteConfiguration.vue';

  const props = defineProps({
    tagDetails: {
      type: Object as PropType<ITagDetails>,
      default: () => DEMO_TAG_DETAILS,
    },
  });

  const updatedTagMngSystem = ref(props.tagDetails?.tagMngSystem);

  const handleContactSupport = () => {
    // Construct the mailto link
    const mailtoLink = `mailto:${TAG_CONFIGURATION_STRINGS.SUPPORT_EMAIL}?subject=${encodeURIComponent(
      TAG_CONFIGURATION_STRINGS.EMAIL_SUBJECT,
    )}`;

    // Open the default email client
    window.location.href = mailtoLink;
  };

  const disableSaveBtn = computed(() => {
    return updatedTagMngSystem.value === props.tagDetails?.tagMngSystem;
  });

  const save = () => {
    console.log('save');
  };

  const handleMngSystemChanged = (newVal: string) => {
    updatedTagMngSystem.value = newVal;
  };
</script>
<style scoped lang="scss">
  @mixin flex-properties($direction) {
    display: flex;
    flex-direction: $direction;
    gap: 24px;
  }

  .tag-configuration-page-wrapper {
    padding-top: 56px;
    width: 100%;
    @include flex-properties(column);

    .element-container {
      width: 100%;
      @include flex-properties(column);

      .header-wrapper {
        display: flex;
        justify-content: space-between;
      }

      .inputs-wrapper {
        @include flex-properties(column);

        .input-row {
          @include flex-properties(row);
        }
      }

      .action-btn-wrapper {
        flex-direction: row-reverse;
        display: flex;
      }
    }
  }
</style>
