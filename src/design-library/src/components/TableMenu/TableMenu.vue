<template>
  <div class="table-menu-wrapper">
    <div
      ref="component"
      class="more-options-button"
      :class="{ opened: showMenu }"
      @click="onMenuClick"
    >
      <img
        class="more-options-image"
        :src="threeDotsIcon"
      />
    </div>
    <div
      ref="tooltip"
      class="menu-container"
    >
      <Menu
        v-if="showMenu"
        :is-open="showMenu"
        :items="items"
        :menu-header="menuHeader"
        :searchable="searchable"
        :list-style="listStyle"
        :dynamic-width="dynamicWidth"
        @clickOutside="onClickOutside"
        @on-item-click="onItemClick"
      />
    </div>
  </div>
</template>
<script>
  import { createPopper } from '@popperjs/core';
  import Menu from '../Menu/Menu.vue';
  import threeDotsIcon from '../../assets/icons/misc/three-dots.svg';

  export default {
    name: 'TableMenu',
    components: {
      Menu,
    },
    props: {
      items: {
        type: Array /** as PropType<ITableMenuItem[]>*/,
        required: true,
        default: () => [],
      },
      listStyle: {
        type: Object,
        required: false,
        default: () => ({}),
      },
      dynamicWidth: {
        type: Boolean,
        default: false,
      },
      menuHeader: {
        type: String,
        default: 'header',
      },
      searchable: {
        type: Boolean,
        default: false,
      },
      menuPlacement: {
        type: String,
        default: 'bottom-end',
      },
      menuOffsetX: {
        type: Number,
        default: 0,
      },
      menuOffsetY: {
        type: Number,
        default: 2,
      },
      popperStrategy: {
        type: String,
        default: 'fixed',
      },
    },
    data() {
      return {
        searchText: '',
        showMenu: false,
        threeDotsIcon,
      };
    },
    mounted() {
      const { component } = this.$refs;
      const { tooltip } = this.$refs;
      const options = {
        strategy: this.popperStrategy,
        placement: this.menuPlacement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [this.menuOffsetX, this.menuOffsetY],
            },
          },
        ],
      };
      createPopper(component, tooltip, options);
    },
    methods: {
      onMenuClick() {
        this.showMenu = !this.showMenu;
      },
      onItemClick(clickedItem, clickedIdx) {
        this.$emit('on-item-click', clickedItem, clickedIdx);
        this.showMenu = false;
      },
      onClickOutside() {
        this.showMenu = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/colors/background.module.scss';

  .table-menu-wrapper {
    display: block !important;

    .menu-container {
      z-index: 100;
    }

    .more-options-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      cursor: pointer;

      &:not(.opened):hover {
        border-radius: 4px;
        background-color: $bg-element-hover;
      }

      &.opened {
        border-radius: 4px;
        background-color: $bg-element-active;
      }
    }
  }

  .more-options-image {
    width: 17px;
  }
</style>
