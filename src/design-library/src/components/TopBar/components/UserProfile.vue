<template>
  <div
    v-on-clickaway="onClickOutside"
    class="user-profile-wrapper"
  >
    <div class="user-profile-main-container">
      <Tooltip
        tooltip-type="regular"
        content="My Profile"
        icon-type="none"
        style="display: flex"
        :options="{ placement: 'bottom-start' }"
      >
        <div
          class="user-profile-button"
          data-automation-id="user-profile"
          @click.stop.prevent="menuDropDownToggle"
        >
          <div class="user-profile-button-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Platform Header/Frame 143418599">
                <path
                  id="Vector"
                  d="M3.89062 21.5486C4.09578 18.8 6.03211 13.3028 12.1362 13.3028C14.8848 13.3075 20.382 14.9632 20.382 21.5486M16.392 6.98191C16.392 9.33204 14.4868 11.2372 12.1367 11.2372C9.78656 11.2372 7.8814 9.33204 7.8814 6.98191C7.8814 4.63178 9.78656 2.72662 12.1367 2.72662C14.4868 2.72662 16.392 4.63178 16.392 6.98191Z"
                  stroke="#131F3C"
                  stroke-linecap="round"
                />
              </g>
            </svg>
          </div>
          <img
            class="arrow-icon"
            :class="{ open: userProfileModalOpen }"
            :src="ArrowIcon"
          />
        </div>
      </Tooltip>
      <div
        v-if="userProfileModalOpen"
        class="user-profile-links-container-wrapper"
      >
        <div class="user-profile-dropdown border-radius-medium shadow border-no-hover">
          <div class="profile">
            <div class="group-and-name txt bold-title">
              {{ headerText }}
            </div>
            <div
              class="username txt ellipsis body-tiny txt-secondary"
              :title="myProfileInfo.username"
            >
              {{ myProfileInfo.username }}
            </div>
          </div>
          <MenuComponent
            class="!tw-border-0"
            is-open
            :items="parsedSettingsOptions"
            @on-item-click="handlePageClicked"
            :menu-style="{
              width: '100%',
            }"
          />
          <div
            v-for="item in myProfileOptions"
            :key="item.name"
            class="user-profile-link nmg-topbar-menu-item"
            :class="{ 'log-out-down': shouldBeFixedLogOutPosition }"
            :style="optionsStyle"
            @click="item.action()"
          >
            <div
              class="profile-option-wrapper"
              :class="{ redText: item.name === 'Logout' }"
            >
              <img
                :src="item.icon"
                class="profile-option-icon"
              />
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, PropType } from 'vue';
  import Tooltip from '../../Tooltip';
  import Dropdown from '../../FilterDropdown';
  import MenuComponent from '../../Menu/Menu.vue';
  import { directive as vOnClickaway } from 'vue3-click-away';
  import ArrowIcon from '../../../assets/icons/arrows/chevron.svg';

  /* icons: */
  import logoutIcon from '../../../assets/icons/actions/logout_black.svg';
  import { IMenuItem } from '@/types/interfaces/IMenuItem';

  /* Helpers */
  const menuListStyle = { width: '252px', top: '25px', left: '-1px' };

  defineOptions({
    name: 'UserProfile',
  });

  const props = defineProps({
    showClientList: {
      type: Boolean,
      default: false,
    },
    myProfileInfo: {
      type: Object,
      default: () => ({}),
    },
    myProfileOptions: {
      type: Array,
      default: () => [],
    },
    clients: {
      type: Array,
      default: () => [],
    },
    selectedClient: {
      type: Object,
      default: () => ({}),
    },
    dropdownId: {
      type: String,
      default: 'nmg_user_drop_filter',
    },
    parsedSettingsOptions: {
      type: Array as PropType<IMenuItem[]>,
      default: () => [],
    },
  });

  const emit = defineEmits(['on-show-up', 'logout', 'on-client-selection', 'on-page-click']);

  const fixedLogoutPosition = ref(false);
  const userProfileModalOpen = ref(false);
  const logOutTopLocation = ref(0);

  const headerText = computed(() => {
    return [props.myProfileInfo.name, props.myProfileInfo.group].filter(Boolean).join(' - ');
  });

  const initials = computed(() => {
    return props.myProfileInfo.initials || '';
  });

  const parsedClients = computed(() => {
    return props.clients.map((item) => ({
      ...item,
      text: item.name,
      isSelected: item.id === this.selectedClient.id,
    }));
  });

  const selectedClientName = computed(() => {
    return props.selectedClient ? props.selectedClient.name : '';
  });

  const shouldBeFixedLogOutPosition = computed(() => {
    return fixedLogoutPosition.value;
  });

  const topLocation = computed(() => {
    return logOutTopLocation.value;
  });

  const optionsStyle = computed(() => {
    return props.shouldBeFixedLogOutPosition ? { top: `${props.topLocation}px` } : {};
  });

  const menuDropDownToggle = () => {
    userProfileModalOpen.value = value === null ? !userProfileModalOpen.value : false;
    if (props.userProfileModalOpen) {
      emit('on-show-up');
    }
    fixedLogoutPosition.value = false;
  };

  const onClickOutside = () => {
    userProfileModalOpen.value = false;
  };

  const closeAll = (val) => {
    userProfileModalOpen.value = val === null ? !userProfileModalOpen.value : false;
  };

  const logout = () => {
    emit('logout');
    menuDropDownToggle();
  };
  const onClientSelect = (client) => {
    if (client && client.id) emit('on-client-selection', client);
  };

  const onMenuOpen = ({ isOpen, listHeight }) => {
    fixedLogoutPosition.value = isOpen;
    logOutTopLocation.value = isOpen ? 62 + listHeight : 0;
  };

  const handlePageClicked = (data) => {
    emit('on-page-click', data);
    menuDropDownToggle();
  };

  defineExpose({
    logoutIcon,
    menuListStyle,
  });
</script>

<style scoped lang="scss">
  @import '../../../styles/corners/corners.scss';
  @import '../../../styles/borders/borders.scss';
  @import '../../../styles/colors/semantic.module.scss';
  @import '../../../styles/colors/data.module.scss';
  .user-profile-wrapper {
    display: flex;
    align-items: center;

    .user-profile-main-container {
      align-items: center;
      display: flex;

      .user-profile-button {
        width: 40px;
        height: 40px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        &-icon {
          padding: 10px;
          border-radius: 50%;
          transition: 0.2s;
          &:hover {
            background-color: $data-azure-sky-light;
          }
        }
      }

      .user-profile-links-container-wrapper {
        position: relative;
        bottom: 12px;
        //right: 10px;

        .user-profile-dropdown {
          position: absolute;
          top: 47px;
          right: 0;
          width: 261px;
          background-color: white;
          overflow: hidden;

          .user-profile-link {
            cursor: pointer;
            white-space: nowrap;
            display: flex;
            gap: 10px;
            align-items: center;
            height: 40px;
            width: 100%;
            background-color: white;
            border-top: 1px solid $border-ui-color;
            justify-content: center;

            .redText {
              color: $semantic-negative;
            }

            .profile-option-wrapper {
              display: flex;
              align-items: center;

              .profile-option-icon {
                width: 16px;
                height: 16px;
                margin-right: 8px;
                //padding: 0 8px 0 0;
              }
            }
          }
        }
      }
    }

    .profile {
      cursor: default !important;
      border-bottom: 1px solid $border-ui-color;
      padding: 24px 0;

      .avatar-container {
        display: flex;
        justify-content: center;
        position: relative;
        top: 32px;
      }

      .txt {
        position: relative;
        line-height: initial;
        text-align: center;
      }

      .group-and-name {
        text-transform: capitalize;
        margin-bottom: 4px;
      }

      .username {
        //top: 58px;
      }

      .ellipsis {
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .clients-dropdown {
        //top: 78px;
        display: flex;
        justify-content: center;
      }
    }
  }

  .option-notifications {
    color: $data-orange-carrot;
    font-size: 14px;
  }

  .user-avatar-notifications {
    width: 18px;
    height: 18px;
    position: absolute;
    background-color: $data-orange-carrot;
    left: 30px;
    bottom: 25px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    .user-avatar-notifications-txt {
      font-size: 10px;
      position: relative;
      top: 1px;
      color: white;
    }
  }

  .arrow-icon {
    transition: 0.3s;
    width: 12px;
  }

  .open {
    transform: rotate(-180deg);
  }

  .log-out-down {
    position: relative;
    //top: 254px;
    width: 242px !important;
    left: -1px;
    border: solid 1px #000000;
  }
</style>

<style lang="scss">
  .v-popover {
    display: inline;

    .trigger {
      display: inline !important;
    }
  }
</style>
