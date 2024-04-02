<template>
  <div class="profile-wrapper">
    <div class="profile-container element-container">
      <div class="container-title">{{ PROFILE_PAGE_STRINGS.TITLE }}</div>
      <div class="inputs-wrapper">
        <div class="input-row">
          <text-input
            :width="350"
            :label="PROFILE_PAGE_STRINGS.FULL_NAME"
            :placeholder="PROFILE_PAGE_STRINGS.FULL_NAME_PLACEHOLDER"
            :value="updatedInfo.fullName"
            v-model="updatedInfo.fullName"
          />
          <text-input
            :width="350"
            :disabled="true"
            :label="PROFILE_PAGE_STRINGS.EMAIL"
            :value="updatedInfo.email"
            v-model="updatedInfo.email"
          />
        </div>
        <div class="input-row">
          <text-input
            :width="350"
            :label="PROFILE_PAGE_STRINGS.JOB_TITLE"
            :placeholder="PROFILE_PAGE_STRINGS.JOB_TITLE_PLACE_HOLDER"
            :value="updatedInfo.jobTitle"
            v-model="updatedInfo.jobTitle"
          />
          <text-input
            :width="350"
            :disabled="true"
            :label="PROFILE_PAGE_STRINGS.LAST_ACTIVE"
            :value="updatedInfo.lastActive"
            v-model="updatedInfo.lastActive"
          />
        </div>
        <div class="input-row">
          <text-input
            :width="350"
            :disabled="true"
            :label="PROFILE_PAGE_STRINGS.DATE_JOINED"
            :value="updatedInfo.dateJoined"
            v-model="updatedInfo.dateJoined"
          />
        </div>
      </div>
      <div class="footer">
        <my-button
          :disabled="disableSaveBtn"
          @handle-click="handleSave"
          >{{ PROFILE_PAGE_STRINGS.BTN_TEXT }}</my-button
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import MyButton from '@/design-library/src/components/Button/Button.vue';
  import { IProfileInfo, PROFILE_PAGE_STRINGS } from './consts';
  import TextInput from '@/design-library/src/components/TextInput/TextInput.vue';
  import type { PropType } from 'vue';
  import { computed, reactive } from 'vue';

  const props = defineProps({
    profileInfo: {
      type: Object as PropType<IProfileInfo>,
      default: () => {
        return {
          fullName: '',
          email: 'meital@test.com',
          jobTitle: 'ADMIN',
          lastActive: 'Sep, 2, 2023',
          dateJoined: 'Sep, 2, 2023',
        };
      },
    },
  });

  const updatedInfo = reactive(JSON.parse(JSON.stringify(props.profileInfo)));

  const disableSaveBtn = computed(() => {
    return JSON.stringify(props.profileInfo) === JSON.stringify(updatedInfo);
  });
  const handleSave = () => {
    console.log('Save', updatedInfo);
  };
</script>
<style scoped lang="scss">
  .profile-wrapper {
    padding-top: 56px;
    width: 100%;

    .profile-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 24px;

      .inputs-wrapper {
        display: flex;
        flex-direction: column;
        gap: 24px;

        .input-row {
          display: flex;
          flex-direction: row;
          gap: 24px;
        }
      }

      .footer {
        display: flex;
        flex-direction: row-reverse;
      }
    }
  }
</style>
