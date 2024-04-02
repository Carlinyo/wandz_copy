<template>
  <div class="tree-menu-list-container">
    <div
      v-if="headerText"
      class="header"
    >
      {{ headerText }}
    </div>
    <ul
      ref="tree-list"
      class="tree-menu-list"
      :style="{ maxHeight: maxHeight }"
    >
      <li
        v-if="!list.length"
        class="tree-menu-list-item no-results"
      >
        <div class="text-and-icons">
          <div class="text">No results</div>
        </div>
      </li>
      <li
        v-for="node in list"
        v-else
        :key="node.id"
        class="tree-menu-list-item"
        :class="getNodeClasses(node)"
        :title="node.displayName"
        @click="nodeClick(node)"
      >
        <slot
          name="list-item"
          v-bind="node"
        >
          <div class="text-and-icons">
            <div class="item-info">
              <img
                v-if="node.leftIcon"
                :src="node.leftIcon"
                alt=""
              />
              <div class="text body-small">
                {{ node.displayName }}
              </div>
            </div>
            <ul class="icons-list">
              <li
                v-for="icon in getNodeIcons(node)"
                :key="icon"
                class="icon-list-item"
              >
                <img
                  class="icon-list-img"
                  :src="icon"
                  alt=""
                />
              </li>
            </ul>
          </div>
        </slot>
      </li>
      <li
        v-if="lastItemText || $slots['last-item']"
        class="last-item"
        :class="{ hide: hideLastItem }"
        @click="onLastItemClick"
      >
        <slot name="last-item" />
        <nmg-button
          v-if="!$slots['last-item'] && lastItemText && !hideLastItem"
          :id="lastItemId"
          :button-image="lastItemIcon"
          :button-image-hovered="lastItemIcon"
          style-type="buttonImageLarge"
          justify-content="start"
          :custom-button-style="{
            width: '100%',
            height: '100%',
            padding: '8px 16px',
            fontWeight: '400',
          }"
        >
          {{ lastItemText }}
        </nmg-button>
      </li>
    </ul>
  </div>
</template>

<script>
  import CategoryArrowIcon from '../../assets/icons/arrows/chevron-16x16.svg';
  import LockIcon from '../../assets/icons/info/lock.svg';
  import NmgButton from '../Button';
  import addIcon from '../../assets/icons/actions/AddIcon.svg';

  export default {
    components: {
      NmgButton,
    },
    props: {
      list: {
        type: Array,
        default: () => [],
        required: true,
      },
      selectedNode: {
        type: Object,
        default: null,
      },
      headerText: {
        type: String,
        default: '',
      },
      lastItemText: {
        type: String,
        default: '',
      },
      lastItemIcon: {
        type: String,
        default: addIcon,
      },
      hideLastItem: {
        type: Boolean,
        default: false,
      },
      lastItemId: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        maxHeight: '293px',
      };
    },
    created() {
      this.updateMaxHeight();
    },
    updated() {
      this.updateMaxHeight();
    },
    methods: {
      getNodeClasses(node) {
        const { lock } = node;
        const category = node.children && node.children.length;
        const selected = !category && node.id === (this.selectedNode && this.selectedNode.id);
        return { lock, selected, category };
      },
      getNodeIcons(node) {
        const nodeIcons = node.icons || [];
        const children = node.children || [];
        if (node.lock) return [...nodeIcons, LockIcon];
        if (children.length) {
          return [...nodeIcons, CategoryArrowIcon];
        }
        return nodeIcons;
      },
      onLastItemClick() {
        this.$emit('last-item-click');
      },
      updateMaxHeight() {
        this.$nextTick(() => {
          if (this.$refs['tree-list']) {
            const { top } = this.$refs['tree-list'].getBoundingClientRect();
            this.maxHeight = `${Math.min(window.innerHeight - top - 16, 293)}px`;
          } else {
            this.maxHeight = `${293}px`;
          }
        });
      },
      nodeClick(node) {
        if (!node.lock) {
          this.updateMaxHeight();
          this.$emit('node-click', node);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/abstracts/mixins.scss';
  @import '../../styles/colors/background.module';
  @import '../../styles/colors/borders';
  @import '../../styles/colors/text.module';

  $item-height: 40px;
  $max-items: 6;

  .tree-menu-list-container {
    .header {
      @include unselectable-text;
      display: flex;
      align-items: center;
      height: $item-height;
      padding: 0 16px;
      font-size: 18px;
      font-weight: 600;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: left;
    }

    .tree-menu-list {
      @include reset-list;
      max-height: calc(#{$item-height} * #{$max-items});
      overflow-y: auto;

      &-item {
        @include flex-center;
        @include unselectable-text;
        cursor: pointer;
        //font-size: $font-size-base;
        height: $item-height;
        padding: 0 16px;
        justify-content: space-between;
        transition: all 0.2s ease-out;

        &.lock {
          color: $txt-disabled;
          cursor: not-allowed;

          .icon-list-item:last-child {
            filter: invert(36%) sepia(10%) saturate(363%) hue-rotate(196deg) brightness(89%) contrast(88%);
          }
        }

        &.lock,
        &.category {
          .icon-list-item:last-child {
            margin-left: 4px;
          }
        }

        &.selected {
          background-color: $bg-element-active;
        }

        &.no-results {
          pointer-events: none;
        }

        &:hover:not(.lock):not(.header):not(.selected) {
          background-color: $bg-element-hover;
        }
        .item-info {
          display: flex;
          justify-content: center;
          overflow: hidden;
        }

        .text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 100%;
          padding: 0 0 0 8px;
        }

        .text-and-icons {
          @include flex-center;
          justify-content: space-between;
          width: 100%;
          .icons-list {
            @include flex-center;
            @include reset-list;
            justify-content: space-between;
            gap: 6px;

            .icon-list-img {
              width: 16px;
              height: 16px;
            }
          }
        }
      }

      .last-item {
        @include flex-center;
        will-change: height;
        transition: all 0.3s ease-out;
        border-top: 1px solid $border-ui-color;
        width: 100%;

        &.hide {
          height: 0;
          opacity: 0;
        }

        &:hover {
          background-color: $bg-element-hover;
          cursor: pointer;
        }
      }
    }
    ::-webkit-scrollbar {
      width: 15px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: $bg-shapes;
      background-clip: content-box;
      border: 2px solid transparent;
    }

    ::-webkit-scrollbar-track {
      background: $bg-element;
    }
  }
</style>
<style lang="scss">
  .tree-menu-list-container .last-item .button-image {
    height: 24px !important;
    width: 24px !important;
  }
</style>
