<template>
  <div
    ref="nmgSidebarMenu"
    class="nmg-sidebar-menu tw-fixed tw-w-[72px] 1.5xl:tw-w-[264px] tw-h-full tw-flex tw-bg-white tw-transition-all"
    :class="{
      sidebarOpen: isSidebarOpen,
      sidebarClosed: !isSidebarOpen,
      'tw-group/menu': menuState != 'menu-closed-toggle-hovered',
    }"
    :data-state="menuState"
    @mouseover="sidebarMenuHovered = true"
    @mouseleave="sidebarMenuHovered = false"
  >
    <div
      class="tw-bg-white tw-shadow tw-border-r tw-border-neutral-300 tw-flex-col tw-justify-start tw-items-start tw-w-full tw-overflow-hidden"
    >
      <div
        v-for="(item, index) in localItems"
        class="item"
        :key="index"
      >
        <div class="parent flex">
          <div
            class="tw-flex tw-items-center tw-h-14 tw-text-slate-800 tw-text-sm tw-px-4 tw-justify-between tw-relative tw-border-b tw-border-gray-300 tw-cursor-pointer hover:tw-bg-slate-100"
            :class="{ 'tw-font-semibold': item.active }"
            @click="expandItem(index)"
          >
            <div :class="{ 'tw-absolute tw-h-full tw-w-[4px] tw-left-0 active-color': item.active }"></div>
            <component
              :is="item.icon"
              :active="item.active"
              class="tw-mr-2 tw-transition-all"
              :class="[{ 'tw-translate-x-[7px] group-hover/menu:tw-translate-x-[0px]': !isSidebarOpen }]"
            />
            <div
              class="nmg-sidebar-menu-item-title tw-transition-all tw-flex-grow tw-whitespace-nowrap"
              :class="{
                'tw-opacity-0 group-hover/menu:tw-opacity-100': !isSidebarOpen,
              }"
            >
              {{ item.title }}
            </div>
            <menu-chevron
              v-if="item.children && item.children.length"
              :class="{
                'tw-rotate-180': !item.expanded,
                'tw-opacity-0 group-hover/menu:tw-opacity-100': !isSidebarOpen,
              }"
            />
          </div>
        </div>
        <div
          v-if="item.children"
          class="tw-w-full tw-overflow-hidden"
          :class="[
            { 'tw-h-0': !item.expanded },
            !isSidebarOpen && item.expanded ? `tw-h-0 group-hover/menu:!tw-h-${item.children.length * 12}` : ``,
          ]"
        >
          <div
            v-for="(childItem, c) in item.children"
            class="tw-flex tw-flex-row tw-h-12 tw-pl-12 tw-pr-4 tw-justify-start tw-items-center tw-text-slate-800 hover:tw-bg-gray-200 tw-cursor-pointer tw-text-sm tw-whitespace-nowrap"
            :class="{
              'bold-title': childItem.active,
              'tw-bg-gray-200': childItem.active,
              'tw-bg-gray-50': !childItem.active,
            }"
            @click="pageClicked(index, c, childItem)"
            :key="childItem"
          >
            {{ childItem.title }}
          </div>
        </div>
      </div>
    </div>
    <div class="neutral-area tw-absolute tw-w-[22px] tw-h-full -tw-right-[22px]"></div>
    <!-- Opener -tw-right-[23px] -->
    <div
      :id="SIDE_MENU_TOGGLE_ID"
      class="menu-toggle tw-absolute tw-left-[100%] tw-z-10 tw-bg-white tw-top-3 tw-w-6 tw-h-8 bg-white tw-rounded-tr tw-rounded-br tw-shadow tw-border tw-border-neutral-300 tw-justify-center tw-items-center tw-cursor-pointer hover:tw-bg-gray-50 tw-hidden 1.5xl:tw-flex"
      @click="toggleMenuOpenedState"
      @mouseover="menuToggleHovered = true"
      @mouseleave="menuToggleHovered = false"
    >
      <menu-opener-icon :class="{ 'tw-rotate-180': !isSidebarOpen }" />
    </div>
  </div>
</template>

<script>
  import MenuChevron from './Components/MenuChevron.vue';
  import MenuOpenerIcon from './Components/MenuOpenerIcon.vue';
  import ManagementIcon from './Components/Icons/ManagementIcon.vue';
  import AudiencesIcon from './Components/Icons/AudiencesIcon.vue';
  import AiFeaturesIcon from './Components/Icons/AiFeaturesIcon.vue';

  import { SIDE_MENU_TOGGLE_ID } from '../../const';

  const menuWidthWide = 264;

  export default {
    name: 'SidebarMenu',
    components: {
      MenuChevron,
      MenuOpenerIcon,
      ManagementIcon,
      AudiencesIcon,
      AiFeaturesIcon,
    },
    props: {
      items: {
        type: Array,
        default: () => [
          {
            title: 'Model Management',
            link: '/models-management',
            active: true,
            expanded: false,
            icon: ManagementIcon,
            children: [],
          },
          {
            title: 'Audiences',
            link: '/audience',
            active: false,
            expanded: false,
            icon: AudiencesIcon,
            children: [],
          },
          {
            title: 'AI Feature Management',
            link: '/ai-features-management',
            active: false,
            expanded: false,
            icon: AiFeaturesIcon,
            children: [],
          },
        ],
      },
    },
    data() {
      return {
        menuState: '',
        menuToggleHovered: false,
        sidebarMenuHovered: false,
        closingAnimation: false,
        isSidebarOpen: true,
        localItems: this.items,
        SIDE_MENU_TOGGLE_ID,
      };
    },
    emits: ['sidebar-menu-open', 'sidebar-menu-closed', 'page-clicked', 'toggle-sidebar-menu'],
    watch: {
      menuToggleHovered(v) {
        if (this.$refs.nmgSidebarMenu.offsetWidth < menuWidthWide && v) {
          this.menuState = 'menu-closed-toggle-hovered';
        }

        if (this.$refs.nmgSidebarMenu.offsetWidth === menuWidthWide && !v && !this.closingAnimation) {
          this.menuState = 'menu-opened';
        }

        if (this.$refs.nmgSidebarMenu.offsetWidth < menuWidthWide && !v && !this.closingAnimation) {
          this.menuState = 'menu-closed';
        }
      },
      sidebarMenuHovered() {
        if (this.sidebarMenuHovered && !this.menuToggleHovered) {
          this.menuState = 'menu-opened';
        } else if (
          !this.sidebarMenuHovered &&
          !this.menuToggleHovered &&
          !this.closingAnimation &&
          !this.isSidebarOpen
        ) {
          this.menuState = 'menu-closed';
        }
      },
      isSidebarOpen: {
        handler(val) {
          if (val) {
            document.body.classList.remove('sidebar-menu-closed');
            document.body.classList.add('sidebar-menu-open');
            this.$emit('sidebar-menu-open');
          } else {
            document.body.classList.add('sidebar-menu-closed');
            document.body.classList.remove('sidebar-menu-open');
            this.$emit('sidebar-menu-closed');
          }
        },
        immediate: true,
      },
    },
    created() {
      // this.setPageAsSelectedByUrl();
      this.resizeHandler();
      window.addEventListener('resize', this.resizeHandler);
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.resizeHandler);
    },
    methods: {
      setPageAsSelectedByUrl() {
        const currPath = this.$route.path.replace(/\/$/, '');
        this.localItems.forEach((item) => {
          let isSelectedProduct = false;
          item.children.forEach((child) => {
            const isSelectedChild = currPath === child.link;
            isSelectedProduct = isSelectedProduct || isSelectedChild;
            child['active'] = isSelectedChild;
            // this.$set(child, 'active', isSelectedChild);
          });
          item['active'] = isSelectedProduct;
          item['expanded'] = isSelectedProduct;
          // this.$set(item, 'active', isSelectedProduct);
          // this.$set(item, 'expanded', isSelectedProduct);
        });
      },
      setAllItemsAsNotActiveAndUnexpanded() {
        this.localItems.forEach((item) => {
          item['active'] = false;
          item['expanded'] = false;
          // this.$set(item, 'active', false);
          // this.$set(item, 'expanded', false);
          item.children.forEach((child) => {
            // this.$set(child, 'active', false);
            child['active'] = false;
          });
        });
      },
      toggleMenuOpenedState() {
        this.isSidebarOpen = !this.isSidebarOpen;
        this.$emit('toggle-sidebar-menu', this.isSidebarOpen);

        // We've just closed the sidebar, but the mouse is still hovering over the menu opener
        // We want to remove the pointer events for short period of time so the hover is ignored
        // This way the menu will close and we can revert the pointer events
        if (!this.isSidebarOpen && this.menuToggleHovered) {
          this.menuState = 'menu-closing-toggle-hovered';
          this.closingAnimation = true;
          setTimeout(() => {
            this.menuState = '';
            this.closingAnimation = false;
          }, 300);
        }
      },
      expandItem(index) {
        this.localItems.forEach((item, i) => {
          if (i === index) {
            const newStatus = !item.expanded;
            // this.$set(item, 'expanded', newStatus);
            item['expanded'] = newStatus;
            if (newStatus && item?.children?.length <= 1) {
              this.pageClicked(index, 0, item?.children?.length === 0 ? item : item.children[0]);
            }
          } else {
            // this.$set(item, 'expanded', false);
            item['expanded'] = false;
          }
        });
        // this.$forceUpdate(); // TODO to to fix render so we wont need this
      },
      pageClicked(productIndex, pageIndex, page) {
        this.localItems.forEach((item, i) => {
          // this.$set(item, 'active', i === productIndex);
          item['active'] = i === productIndex;
          item.children.forEach((child, c) => {
            // this.$set(child, 'active', i === productIndex && c === pageIndex);
            child['active'] = i === productIndex && c === pageIndex;
          });
        });
        this.$emit('page-clicked', page);
      },
      hasActiveChild(item) {
        return item.children.some((child) => child.active);
      },
      resizeHandler() {
        window.innerWidth < 1440 ? (this.isSidebarOpen = false) : (this.isSidebarOpen = true);
      },
    },
  };
</script>

<style lang="scss">
  @import '../../styles/colors/semantic.module';

  .sidebar-menu-open .view-container .view-container-body {
    padding-left: 310px !important;
  }

  .sidebar-menu-closed .view-container .view-container-body {
    padding-left: 120px !important;
  }

  .nmg-sidebar-menu-item-title {
    transition: opacity 0.3s ease;
  }

  .menu-toggle {
    top: calc(54px + 12px);
    left: calc(100% - 1px);
  }

  .nmg-sidebar-menu {
    width: 72px;
    font-family: Figtree;
    z-index: 105;
    transition: width 0.3s ease;
    padding-top: 55px;

    &.sidebarOpen {
      width: 264px;
    }

    &.sidebarClosed:not([data-state='menu-closed-toggle-hovered']):hover {
      width: 264px;
    }

    &[data-state='menu-closing-toggle-hovered'] {
      pointer-events: none;
    }
    .active-color {
      background-color: $semantic-primary-brand;
    }
  }
</style>
