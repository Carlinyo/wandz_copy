<template>
  <div class="user-management-wrapper">
    <div class="search-container">
      <search
        :width="268"
        :height="40"
        type="small"
        :placeholder="USER_MANAGEMENT_STRINGS.SEARCH_PLACEHOLDER"
        @input-changed="setSearchValue"
      />
      <my-button
        class="create-new-user-button-wrapper"
        @click="openAddOrEditUserModal(true)"
      >
        <div class="create-new-user-butt-content">
          {{ USER_MANAGEMENT_STRINGS.BTN_TEXT }}
        </div>
      </my-button>
    </div>
    <div class="company-information-page-container element-container">
      <div class="container-title">
        {{ USER_MANAGEMENT_STRINGS.TABLE_TITLE }}
      </div>
      <users-table
        class="users-table-container"
        :items="filteredList"
        :tabStyling="{ boxStyle: false }"
        :headers="USERS_TABLE_HEADERS"
        :row-height="56"
        :itemsPerPage="5"
        with-pagination
        highlight-on-hover
      >
        <template v-slot:[UsersTableColumns.NAME]="{ item: modelItem }">
          <span
            v-html="modelItem.name"
            class="body-tiny add-space"
          />
          <tag
            v-if="modelItem.isNew"
            :text="USER_MANAGEMENT_STRINGS.NEW"
            type="green"
          />
        </template>
        <template v-slot:[UsersTableColumns.USER_EMAIL]="{ item: modelItem }">
          <span
            v-html="modelItem.userEmail"
            class="body-tiny"
          />
        </template>
        <template v-slot:[UsersTableColumns.JOB_TITLE]="{ item: modelItem }">
          <span
            v-html="modelItem.jobTitle"
            class="body-tiny"
          />
        </template>
        <template v-slot:[UsersTableColumns.ACCOUNT_ROLE]="{ item: modelItem }">
          <span
            v-html="ROLES_MAPPING[modelItem.accountRole]"
            class="body-tiny"
          />
        </template>
        <template v-slot:[UsersTableColumns.LAST_ACTIVE]="{ item: modelItem }">
          <span
            v-html="modelItem.lastActive"
            class="body-tiny"
          />
        </template>
        <template v-slot:[UsersTableColumns.STATUS]="{ item: modelItem }">
          <status
            :status="modelItem.status"
            :size="Sizes.TINY"
          />
        </template>
        <template v-slot:[UsersTableColumns.ACTIONS]="{ item: modelItem }">
          <TableMenu
            class="table-menu-container"
            :items="UsersTableMenuAction"
            menu-header=""
            :menuPlacement="'bottom-end'"
            :dynamic-width="true"
            @on-item-click="handleMenuItemClicked($event, modelItem)"
          />
        </template>
      </users-table>

      <add-or-edit-user-modal
        v-if="modalToOpen == Modals.ADD_OR_EDIT_USER"
        :user-object="selectedUser"
        @close-modal="closeModal"
      />
      <submit-modal
        v-if="showSubmitModal"
        :modal-props="submitModalProps"
        @[CommonEmits.CANCEL_ACTION]="handleActionCanceled"
        @[CommonEmits.APPROVE_ACTION]="handleActionApproved"
      />
    </div>
    <div
      class="snackbar-wrapper"
      v-if="showSnackBar"
    >
      <snackbar
        :text="USER_MANAGEMENT_STRINGS.INVITE_SENT_MSG"
        :timerToDisappear="3"
        @snackbarClickButtonX="closeSnackbar"
        @hide-by-timer="closeSnackbar"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import MyButton from '@/design-library/src/components/Button/Button.vue';
  import UsersTable from '@/design-library/src/components/Table/Table.vue';
  import Search from '@/design-library/src/components/Search';
  import tag from '@/design-library/src/components/Tags';
  import { UsersTableColumns, Modals, Actions } from './types';
  import {
    EXAMPLE_DATA,
    IUserItem,
    MODAL_PROPS_FOR_SUBMIT_MODAL,
    ROLES_MAPPING,
    USER_MANAGEMENT_STRINGS,
    USERS_TABLE_HEADERS,
    UsersTableMenuAction,
  } from './consts';
  import { computed, ref } from 'vue';
  import Status from '@/components/Common/Status/Status.vue';
  import TableMenu from '@/design-library/src/components/TableMenu/TableMenu.vue';
  import { Sizes } from '@/design-library/src/types/enums/Sizes';
  import AddOrEditUserModal from '@/components/Settings/UserManagement/AddOrEditUserModal.vue';
  import type { ITableMenuItem } from '@/design-library/src/types/interfaces/table-menu';
  import SubmitModal from '@/components/Common/SubmitModal.vue';
  import { IModalProps } from '@/design-library/src/types/interfaces/modal';
  import { CommonEmits } from '@/components/Common/types';
  import Snackbar from '@/design-library/src/components/Snackbars/Snackbars.vue';

  const showSnackBar = ref(false);
  const searchVal = ref('');
  const selectedUser = ref<IUserItem>(null);
  const setSearchValue = (val: string) => {
    searchVal.value = val;
  };

  // TODO: update to read the list from server or store
  const usersList = ref<IUserItem[]>(EXAMPLE_DATA);

  const filteredList = computed(() => {
    if (searchVal.value) {
      return usersList.value.filter((elem) => elem.name.includes(searchVal.value));
    } else {
      return usersList.value;
    }
  });

  const modalToOpen = ref('');

  const openAddOrEditUserModal = (isNew: boolean) => {
    modalToOpen.value = Modals.ADD_OR_EDIT_USER;
    // set default value for new user
    if (isNew) {
      selectedUser.value = {
        userEmail: '',
        accountRole: 2,
      };
    }
  };
  const closeModal = () => {
    modalToOpen.value = '';
  };

  const handleMenuItemClicked = (action: ITableMenuItem, user: IUserItem) => {
    selectedUser.value = user;
    switch (action.key) {
      case Actions.EDIT: {
        openAddOrEditUserModal(false);
        break;
      }
      case Actions.REINVITE: {
        modalToOpen.value = Modals.REINVITE;
        break;
      }
      case Actions.REMOVE: {
        modalToOpen.value = Modals.REMOVE;
        break;
      }
    }
  };

  const showSubmitModal = computed(() => {
    return modalToOpen.value === Modals.REMOVE || modalToOpen.value === Modals.REINVITE;
  });

  const submitModalProps = computed((): IModalProps => {
    return MODAL_PROPS_FOR_SUBMIT_MODAL[modalToOpen.value](selectedUser.value.userEmail);
  });

  const handleActionCanceled = () => {
    modalToOpen.value = '';
  };

  const handleActionApproved = () => {
    const userCopy: IUserItem = JSON.parse(JSON.stringify(selectedUser.value));
    if (modalToOpen.value === Modals.REINVITE) {
      sendInvite(userCopy);
    } else {
      deleteUser(userCopy);
    }
    modalToOpen.value = '';
  };

  const closeSnackbar = () => {
    showSnackBar.value = false;
  };
  const sendInvite = (user: IUserItem) => {
    console.log('sendInvite');
    // TODO: call sentInvitation endpoint (API)
    // After invitation was send show success snackbar msg
    showSnackBar.value = true;
  };

  const deleteUser = (user: IUserItem) => {
    // TODO: call DeleteUser Endpoint (API)
    // After server deleted the user -> update the local list
    usersList.value = usersList.value.filter((elem) => elem.userEmail !== user.userEmail);
  };
</script>

<style scoped lang="scss">
  .user-management-wrapper {
    width: 100%;
    padding-top: 56px;

    .search-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .company-information-page-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      width: 100%;
    }

    .users-table-container {
      .add-space {
        margin-right: 8px;
      }
    }
  }
</style>
