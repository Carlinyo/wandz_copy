<template>
  <!--  eslint-disable-->
  <div class="top-bar-actions-wrapper">
    <!-- Clients List -->
    <div
      v-if="showClientList"
      class="clients-list"
    >
      <Dropdown
        v-if="parsedClients && parsedClients.length > 1"
        ref="clientsDropdown"
        searchable
        label="Client"
        :menu-style="{ position: 'relative', top: '24px' }"
        :items="parsedClients"
        :selected-item="selectedClientName"
        @on-item-click="onClientSelect"
      />
      <!--      in-case there is only one client - show only the first one -->
      <div
        v-else
        class="selected-client"
      >
        <span
          v-if="parsedClients.length"
          class="body-micro dropdown-label"
          >Client</span
        >
        <span>{{ parsedClients && parsedClients.length ? parsedClients[0].text : '' }}</span>
      </div>
    </div>

    <!-- Domain's List -->
    <div
      v-if="!isSetting"
      style="display: flex"
    >
      <Dropdown
        label="Domain"
        id="nmg-domains-dropdown"
        v-if="selectedClientDomains && selectedClientDomains.length > 1"
        ref="clientDomainsDropdown"
        @on-item-click="onDomainSelect"
        :selected-item="selectedClientDomain"
        :menu-style="{ position: 'relative', top: '24px' }"
        searchable
        :items="selectedClientDomains"
      />
      <!--      in-case there is only one domain - show only the first one -->
      <div
        v-else
        class="selected-domain"
      >
        <span
          v-if="selectedClientDomains.length"
          class="body-micro dropdown-label"
          >Domain</span
        >
        <span>{{ selectedClientDomains.length ? selectedClientDomains[0].text : '' }}</span>
      </div>
      <!--      in-case there is only one tag - show only the first one -->
    </div>
    <div
      class="top-bar-help-section"
      id="top-bar-help-section"
    >
      <!-- User Profile -->
      <user-profile
        id="nmg_user_profile_dropdown"
        :my-profile-info="profileInfo"
        :my-profile-options="profileOptions"
        :show-client-list="false"
        :parsed-settings-options="parsedSettingsOptions"
        @on-show-up="closeAll"
        @on-page-click="onPageSelect"
        @logout="$emit('logout')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  /* component: */
  // import NmgButton from '../../Button/Button.vue';
  import UserProfile from './UserProfile.vue';
  import Dropdown from '../../FilterDropdown/FilterDropdown.vue';

  /* Icons: */

  import questionMark from '../../../assets/icons/misc/questionMark.svg';
  import cogWheel from '../../../assets/icons/misc/cogWheel.svg';
  import bell from '../../../assets/icons/info/bell-notification.svg';

  /* Helpers: */
  const settingsPosition = { right: '30px', left: 'auto', top: '38px' };
  const customListPosition = { top: '38px' };

  const staticStyling = { maxHeight: '100%' };

  defineOptions({
    name: 'TopBarActions',
  });

  const props = defineProps({
    clients: {
      type: Array,
      default: () => [],
    },
    selectedClient: {
      type: Object,
      default: () => ({}),
    },
    settingsOptions: {
      type: Array,
      default: () => [],
    },
    showWhatsNew: {
      type: Boolean,
      default: false,
    },
    profileOptions: {
      type: Array,
      default: () => [],
    },
    profileInfo: {
      type: Object,
      default: () => ({}),
    },
    selectedProduct: {
      type: String,
      default: '',
    },
    clientHasActiveProducts: {
      type: Boolean,
      default: true,
    },
    onClientSelection: {
      type: Function,
      default: () => ({}),
    },
    selectedClientDomain: {
      type: String,
      default: '',
    },
    showClientList: {
      type: Boolean,
      default: true,
    },
    buttonId: {
      type: String,
      default: '',
    },
  });

  const clientsDropdown = ref(null);
  const clientDomainsDropdown = ref(null);

  const emit = defineEmits(['on-client-selection', 'on-page-click', 'on-selected-domain-change']);

  const parsedSettingsOptions = computed(() => {
    return props.settingsOptions.map((option) => {
      const item = { ...option, text: option.name, iconSrc: option.icon || '' };
      delete item.icon;
      return item;
    });
  });

  const isSetting = computed(() => {
    return 'settings' === props.selectedProduct; // TODO replace with const
  });

  const selectedClientDomains = computed(() => {
    return props.selectedClient && props.selectedClient.domains
      ? props.selectedClient.domains.map((item) => ({ text: item.domain, ...item }))
      : [];
  });

  const parsedClients = computed(() => {
    return props.clients.map((item) => ({
      ...item,
      text: item.name,
      isSelected: item.id === props.selectedClient.id,
    }));
  });

  const selectedClientName = computed(() => {
    return props.selectedClient ? props.selectedClient.name : '';
  });

  const onClientSelect = (client) => {
    if (client && client.id) {
      emit('on-client-selection', client);
    }
  };

  const onPageSelect = (page): void => {
    emit('on-page-click', page);
  };

  const onDomainSelect = (selectedDomain): void => {
    const { domain } = selectedDomain;
    emit('on-selected-domain-change', domain);
  };

  const closeAll = (): void => {
    Object.values([clientsDropdown.value, clientDomainsDropdown.value]).forEach((item) => {
      if (item && item.closeListDisplay) item.closeListDisplay();
    });
  };

  defineExpose({
    bell,
    questionMark,
    cogWheel,
    settingsPosition,
    staticStyling,
    customListPosition,
  });
</script>

<style scoped lang="scss">
  @import '../../../styles/colors/text.module';

  .top-bar-actions-wrapper {
    color: $txt-primary;
    display: flex;
    align-items: center;

    > * {
      > * {
        cursor: pointer;
      }
    }

    .top-bar-help-section {
      display: flex;
      align-items: center;

      .whats-new-button {
        cursor: pointer;
        padding-right: 20px;
      }

      .help-center-btn {
        padding-right: 14px;
      }

      .setting-dropdown-btn {
        padding-right: 14px;
      }
    }
  }

  .action-button {
    min-width: fit-content;

    .custom {
      color: purple !important;
    }
  }

  .selected-domain,
  .selected-client {
    cursor: default;
    display: flex;
    align-items: center;
  }

  .dropdown-label {
    color: $txt-secondary;
    margin-right: 4px;
  }

  .clients-list {
    padding-right: 24px;
  }
</style>
