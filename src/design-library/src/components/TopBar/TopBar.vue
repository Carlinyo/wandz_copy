<template>
  <div
    :id="mainElement"
    class="nmg-top-bar-container"
  >
    <div class="nmg-top-bar-sticky shadow">
      <div class="nmg-top-bar-wrapper">
        <div class="nmg-top-bar-navigator">
          <div
            class="products-menu-wrapper"
            :class="staticElementClass"
          >
            <div>
              <img
                class="logo-icon"
                :src="logo"
                @click="onNavigateToHomePage"
              />
              <img
                class="logo-text"
                :src="logoText"
                @click="onNavigateToHomePage"
              />
            </div>
          </div>
          <div class="screen-name main-heading">
            {{ screenName }}
          </div>
        </div>

        <!-- action button, setting etc.. container-->
        <div
          :class="staticElementClass"
          class="nmg-top-bar-actions"
        >
          <actions
            :clients="clients"
            :show-client-list="showClientList"
            :button-id="buttonId"
            :profile-options="profileOptions"
            :profile-info="profileInfo"
            :settings-options="settingsOptions"
            :client-has-active-products="clientHasActiveProducts"
            :selected-client="selectedClient"
            :selected-product="selectedProduct"
            :selected-client-domain="selectedClientDomain"
            @on-client-selection="onClientClick"
            @on-page-click="onPageClick"
            @logout="$emit('logout')"
            @on-selected-domain-change="(domain) => $emit('on-selected-domain-change', domain)"
          />
        </div>
      </div>
    </div>
    <component
      :is="productBannerProperties.component"
      v-if="productBannerProperties.component && Object.keys(productBannerProperties.component).length"
      v-bind="productBannerProperties.props"
    />
    <component
      :is="billingBannerProperties.component"
      v-if="billingBannerProperties.component && Object.keys(billingBannerProperties.component).length"
      class="banners"
      v-bind="billingBannerProperties.props"
    />
  </div>
</template>

<script setup>
  /**
 * PROPS:
 * @clients: Array, {name: client name, id: sfId/nmgId, tag}
 *
 * @selectedClient: Object
 *
 * @showClientList: boolean attribute, relevant for setting pages where client list isn't needed.
 *
 * @settingsOptions: hold the settings dropdown navigator - name, path etc...
 *
 * @billingBannerProperties: gets all the banners information needed. does not handles the banner, only shares the same div wrapper
 * @should-display-pages: boolean - relevant when platform is locked for the user, hes on settings etc..
 *
 * others:
 * @action: object defines the product action button: { text: '', callback: () => - comes from products Tree}

 *
 * Adaptor Object - for pages tabs responsive content. decides which page is hidden and which isn't.
 * NOTE: the component isn't changing the state of the app and only emits to outside handler. lets keep it that way
 *
 * */
  /* components: */
  import { ref } from 'vue';
  // import { directive as vOnClickAway } from 'vue3-click-away';
  import dropdown from '../FilterDropdown/FilterDropdown.vue';
  import actions from './components/TopBarActions.vue';
  import tab from './components/simpleTab.vue';
  import treeMenu from '../TreeMenu/TreeMenu.vue';

  /* images: */
  import logo from '../../assets/icons/logo/wandzLogoIcon.svg';
  import logoText from '../../assets/icons/logo/wandzLogoText.svg';

  /* helpers */
  import { staticElementClass, mainElement } from './const';

  defineOptions({
    name: 'TopBar',
  });

  defineProps({
    selectedProduct: {
      type: String,
      default: '',
    },
    clients: {
      type: Array,
      default: () => [],
    },
    showClientList: {
      type: Boolean,
      default: true,
    },
    selectedClient: {
      type: Object,
      default: () => ({}),
    },
    settingsOptions: {
      type: Array,
      default: () => [],
    },
    profileOptions: {
      type: Array,
      default: () => [],
    },
    profileInfo: {
      type: Object,
      default: () => ({}),
    },
    billingBannerProperties: {
      type: Object,
      default: () => ({}),
    },
    productBannerProperties: {
      type: Object,
      default: () => ({}),
    },
    notifications: {
      type: Array,
      default: () => [],
    },
    clientHasActiveProducts: {
      type: Boolean,
      default: true,
    },
    selectedClientDomain: {
      type: String,
      default: '',
    },
    buttonId: {
      type: String,
      default: '',
    },
    /* New UI */
    screenName: {
      type: String,
      default: '',
    },
  });

  const productListPosition = { top: '45px' };
  const pagesListPosition = { top: '35px' };
  const staticDropdownStyling = { maxHeight: '100%' };
  const dropdownHeaderStyle = { display: 'flex', alignItems: 'center', height: '100%' };

  const adaptor = ref(null);

  const products = ref(['product1', 'product2']);

  const hover = ref({
    index: -1,
    ignore: false, // relevant so hover effect wont appear when were on div children.
  });

  const emit = defineEmits(['on-page-select', 'navigate-to-home-page', 'on-client-selection']);
  const onPageClick = (item) => {
    emit('on-page-select', item.attachment || item);
  };

  const onNavigateToHomePage = () => {
    emit('navigate-to-home-page');
  };

  const onClientClick = (client) => {
    emit('on-client-selection', client);
  };

  defineExpose({
    logo,
    logoText,
    productListPosition,
    pagesListPosition,
    staticDropdownStyling,
    dropdownHeaderStyle,
    staticElementClass,
    mainElement,
  });
</script>

<style scoped lang="scss">
  @import '../../styles/colors/background.module';
  @import '../../styles/borders/borders';
  @import '../../styles/shadows/shadows';

  .logo-icon {
    display: block;

    @media screen and (min-width: 1440px) {
      display: none;
    }
  }

  .logo-text {
    display: none;

    @media screen and (min-width: 1440px) {
      display: block;
    }
  }

  .screen-name {
    margin-left: 54px;

    @media screen and (min-width: 1440px) {
      margin-left: 114px;
    }
  }

  .nmg-top-bar-container {
    font-family: Figtree;
    display: flex;
    flex-direction: column;
    // top nav should be above everything else
    z-index: 200;
    position: relative;

    .nmg-top-bar-sticky {
      background-color: $bg-element;
      width: 100%;
      display: flex;
      justify-content: center;
      position: fixed;
      z-index: 10;
      border-bottom: $border-layout;

      .nmg-top-bar-wrapper {
        height: 54px;
        display: flex;
        width: 100%;
        align-items: center;
        //max-width: 1380px;
        padding-left: 24px;
        padding-right: 57px;
        justify-content: space-between;

        .nmg-top-bar-navigator {
          height: 100%;
          align-items: center;
          position: relative;
          display: flex;

          .products-menu-wrapper {
            padding: 0 10px 0 0;
            //cursor: pointer; TODO: return after adding the navigation to homepage
          }

          .nmg-top-bar-pages-wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            position: relative;

            .nmg-top-bar-pages {
              display: flex;
              align-items: center;
              width: fit-content;
              position: relative;
              height: 100%;

              .page-container-wrapper {
                height: 100%;
                white-space: nowrap;
                padding: 0 16px;
                flex-grow: 1;
                font-size: 14px;
                cursor: pointer;
                align-items: center;
                display: flex;

                .page-button-content {
                  position: relative;
                  height: 100%;
                  display: flex;
                  align-items: center;

                  .page-container {
                    height: 100%;
                    display: flex;
                    align-items: center;
                  }

                  .selected {
                    height: 4px;
                    background-color: black;
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                  }
                }
              }
            }
          }
        }
      }
    }

    .banners {
      position: relative;
      top: 54px;
    }
  }

  .show-more {
    .pages-menu-tree {
      position: absolute;
      top: 53px;
    }
  }
</style>
