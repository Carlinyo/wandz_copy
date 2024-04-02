<template>
  <modal
    class="add-or-edit-user-modal-wrapper"
    :modal-open="true"
    :width="410"
    :height="350"
    :title="modalHeader"
    :primary-button-text="buttonText"
    primary-button-style-type="primary"
    :secondary-button-text="USER_MODAL_STRINGS.CANCEL"
    :secondaryButtonStyleType="'secondary'"
    :primary-button-props="{ disabled: disablePrimaryBtn }"
    @primary-button-clicked="onSaveClick"
    @secondary-button-clicked="$emit('closeModal')"
    content-align="left"
    @modal-close="$emit('closeModal')"
  >
    <div class="content-container">
      <div class="user-details-container">
        <div class="container-title">
          {{ USER_MODAL_STRINGS.USER_DETAILS_TITLE }}
        </div>
        <text-input
          :width="360"
          :label="USER_MODAL_STRINGS.EMAIL_ADDRESS"
          :placeholder="USER_MODAL_STRINGS.EMAIL_ADDRESS_PLACEHOLDER"
          :disabled="isEditMode"
          :value="updatedUser.userEmail"
          v-model="updatedUser.userEmail"
        />
        <dropdown
          :items="rolesList"
          :selected-items="[selectedRoleItem]"
          :title="USER_MODAL_STRINGS.PRODUCT_ROLE"
          :width="360"
          size="small"
          type="regular"
          :formatter="(item) => item.text"
          :use-search="false"
          @dropdown-click="handleRoleChanged"
        />
      </div>
    </div>
  </modal>
</template>

<script setup lang="ts">
  import { ROLES_MAPPING, USER_MODAL_STRINGS } from './consts';
  import type { IUserItem } from './consts';
  import type { PropType } from 'vue';
  import { computed, reactive, ref } from 'vue';
  import Modal from '@/design-library/src/components/Modal/Modal.vue';
  import TextInput from '@/design-library/src/components/TextInput/TextInput.vue';
  import Dropdown from '@/design-library/src/components/Dropdown/Dropdown.vue';

  const props = defineProps({
    modalOpen: {
      type: Boolean,
      default: false,
    },
    userObject: {
      type: Object as PropType<Partial<IUserItem>>,
      default: () => {
        return {
          userEmail: '',
          accountRole: 2,
        };
      },
    },
  });

  const updatedUser = reactive(JSON.parse(JSON.stringify(props.userObject)));

  const isEditMode = computed(() => {
    return props.userObject?.userEmail?.length > 0;
  });

  const modalHeader = computed(() => {
    return isEditMode.value ? USER_MODAL_STRINGS.EDIT_TITLE : USER_MODAL_STRINGS.INVITE_TITLE;
  });

  const buttonText = computed(() => {
    return isEditMode.value ? USER_MODAL_STRINGS.EDIT_CTA : USER_MODAL_STRINGS.INVITE_CTA;
  });

  const disablePrimaryBtn = computed(() => {
    return JSON.stringify(updatedUser) === JSON.stringify(props.userObject);
  });

  const selectedRoleItem = ref({
    value: props.userObject?.accountRole,
    text: ROLES_MAPPING[props.userObject?.accountRole],
  });

  const onSaveClick = () => {
    console.log(updatedUser);
  };

  const handleRoleChanged = (data) => {
    console.log('handleRoleChanged', data);
    updatedUser.accountRole = data.value;
  };

  const rolesList = computed(() => {
    return Object.keys(ROLES_MAPPING).map((key) => {
      return {
        value: key,
        text: ROLES_MAPPING[key],
      };
    });
  });
</script>

<style scoped lang="scss">
  .user-details-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 32px;
  }
</style>
