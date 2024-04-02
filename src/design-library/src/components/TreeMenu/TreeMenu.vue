<template>
  <div
    class="tree-menu"
    :class="{ withBorder }"
    :style="cssVars"
  >
    <div
      class="back"
      :class="{ hide: !nodeStack.length }"
      @click="popNode"
    >
      <Button
        style-type="buttonImageSmall"
        :text-padding="8"
        class="back-button"
        :button-image="icons.back"
      >
        {{ previousCategoryText }}
      </Button>
    </div>
    <Search
      v-if="searchable"
      :class="withBorder ? 'withBorder' : 'bottomBorderOnly'"
      :auto-focus="searchAutoFocus"
      class="search-input"
      type="small"
      :value="searchText"
      @input-changed="onSearchInput"
    />
    <TreeMenuList
      :list="list"
      :selected-node="selectedNode"
      :header-text="listHeaderText"
      :last-item-icon="lastItemIcon"
      :last-item-text="lastItemText"
      :last-item-id="lastItemId"
      :hide-last-item="!!nodeStack.length"
      @last-item-click="lastItemClick"
      @node-click="onNodeClick"
    >
      <slot
        v-for="(_, name) in $slots"
        :slot="name"
        :name="name"
      />
      <template #last-item>
        <slot name="last-item" />
      </template>
    </TreeMenuList>
  </div>
</template>
<script>
  import BackIcon from '../../assets/icons/arrows/back-left.svg';
  // import addIcon from '../../assets/AddingAndPluses/AddIcon.svg';
  import addIcon from '../../assets/icons/actions/add-empty-16.svg';
  import Search from '../Search/Search.vue';
  import Button from '../Button';
  import { getNodeAncestorBranches, getFlattenedTreeNodes, searchNodeByText } from './utils';
  import TreeMenuList from './TreeMenuList.vue';

  export default {
    name: 'TreeMenu',
    components: {
      Search,
      Button,
      TreeMenuList,
    },
    props: {
      width: {
        type: Number,
        default: 252,
      },
      selectedNode: {
        type: Object,
        default: null,
      },
      searchable: {
        type: Boolean,
        default: true,
      },
      searchAutoFocus: {
        type: Boolean,
        default: false,
      },
      tree: {
        type: Object,
        default: () => ({}),
        required: true,
        // NOTE: Node attributes:
        // id: any > **REQUIRED, must be unique**
        // displayName: String -> **REQUIRED**, text to display
        // icons: Array<String> -> icon src's
        // disabled: Boolean -> disable node
        // children: Array<Node> -> siblings
      },
      filterFunction: {
        type: Function,
        require: false,
      },
      lastItemIcon: {
        type: String,
        default: addIcon,
      },
      lastItemText: {
        type: String,
        default: '',
      },
      lastItemId: {
        type: String,
        default: '',
      },
      withBorder: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        nodeStack: [],
        searchText: '',
      };
    },
    computed: {
      cssVars() {
        return {
          '--width': `${this.width}px`,
        };
      },
      icons() {
        return {
          back: BackIcon,
          addIcon,
        };
      },
      previousCategoryText() {
        if (this.nodeStack.length > 1) {
          return this.nodeStack[this.nodeStack.length - 2].displayName;
        }
        const { displayName = '' } = this.tree;
        return displayName;
      },
      currentNode() {
        return this.nodeStack[this.nodeStack.length - 1] || this.tree;
      },
      listHeaderText() {
        return this.searchText ? 'Search Results' : this.currentNode.displayName;
      },
      list() {
        if (this.searchText) {
          const flattenedTree = getFlattenedTreeNodes(this.tree, this.filterFunction || null);
          return flattenedTree.filter(searchNodeByText(this.searchText));
        }
        // Removed folders that are empty so the user won’t click empty folders at the tree
        return this.filterFunction && this.currentNode.children
          ? // Filter using filterFunction
            this.currentNode.children
              .filter(
                (dp) => this.filterFunction(dp),
                // Filter the children of the children
              )
              .map((dp) =>
                !dp.children
                  ? dp
                  : {
                      ...dp,
                      children: dp.children.filter((child) => this.filterFunction(child)),
                      // Filter the directories with empty children
                    },
              )
              .filter((dp) => !dp.children || dp.children.length)
          : this.currentNode.children;
      },
    },
    watch: {
      selectedNode: {
        immediate: true,
        handler(node) {
          const nodeId = node && node.id;
          if (nodeId || nodeId === 0) {
            this.nodeStack = getNodeAncestorBranches(this.tree, nodeId) || [];
          } else {
            this.nodeStack = [];
          }
        },
      },
    },
    methods: {
      popNode() {
        this.nodeStack.pop();
      },
      onNodeClick(node) {
        const nextNodes = node.children || [];
        this.searchText = '';
        if (nextNodes.length) {
          this.nodeStack = getNodeAncestorBranches(this.tree, node.id);
        } else {
          this.$emit('leaf-click', node, this.selectedNode);
        }
      },
      onSearchInput(searchText) {
        this.searchText = searchText;
        if (!this.searchText) {
          this.nodeStack = getNodeAncestorBranches(this.tree, this.currentNode.id);
        }
      },
      lastItemClick() {
        this.$emit('last-item-click');
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import '../../styles/colors/background.module';
  @import '../../styles/colors/borders';
  @import '../../styles/colors/text.module';

  .tree-menu {
    width: var(--width);
    background-color: $bg-element;
    color: $txt-primary;

    &.withBorder {
      border-radius: 4px 4px 8px 8px;
      border: 1px solid $border-ui-color;

      :deep(.tree-menu-list-item:last-of-type) {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }

      :deep(.last-item) {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }
    }

    .back {
      display: flex;
      align-items: center;
      gap: 4px;
      height: 30px;
      will-change: height;
      transition: all 0.3s ease-out;
      overflow: hidden;
      color: $txt-primary;
      border-bottom: 1px solid $border-ui-color;
      cursor: pointer;

      &.hide {
        height: 0;
        opacity: 0;
      }
    }

    .search-wrapper {
      border-radius: 0;

      &.bottomBorderOnly {
        border-top: 0;
        border-right: 0;
        border-left: 0;
        border-bottom: 1px solid $border-ui-color;
      }
    }

    .search-input.search-wrapper,
    .search-input.search-wrapper:not(.focused).filled,
    .search-input.search-wrapper.filled {
      &.withBorder {
        border-bottom: inherit;
        border-top: 0;
        border-right: 0;
        border-left: 0;
      }
    }

    :deep(.nmg-button .button-slot-wrapper) {
      justify-content: initial;
    }
  }
</style>
