import TreeMenuComponent from '../../src/components/TreeMenu';
import treeMd from './tree.md';
import { tree } from './data';
import addIcon from '../../src/assets/icons/actions/add-empty-16.svg';

export default {
  title: 'Navigation/TreeMenu',
  component: TreeMenuComponent,
  argTypes: {
    searchable: {
      control: { type: 'boolean' },
      defaultValue: true,
      name: 'Is Searchable',
    },
    tree: {
      control: { type: 'object' },
      name: 'tree',
      description: treeMd,
      defaultValue: tree,
    },
    selectedNode: {
      control: { type: 'object' },
      description:
        'Selected node, provide a leaf with id for selected value, or provide a node with children if you want to open a category',
      name: 'selectedNode',
    },
    withBorder: {
      control: { type: 'boolean' },
    },
  },
  args: {
    width: 252,
    selectedNode: null,
    searchable: true,
    searchAutoFocus: false,
    tree,
    filterFunction: null,
    lastItemIcon: addIcon,
    lastItemText: 'Sticky Menu Item',
    lastItemId: null,
    withBorder: false,
  },
};

const treeMenuTemplate =
  (data) =>
  (args, { argTypes }) => ({
    components: { TreeMenu: TreeMenuComponent },
    props: Object.keys(args),
    methods: {
      onChange(item) {
        this.selectedDp = item;
      },
    },
    data,
    template: `
    <div style="min-height:380px;">
    <div style="margin-bottom: 50px">Current selected leaf: {{ selectedDp ? selectedDp.displayName : '' }}</div>
    <div>
      <TreeMenu
        v-bind="$props"
        @leaf-click="onChange"
      />
    </div>
    </div>
  `,
  });

export const TreeMenu = treeMenuTemplate(() => ({
  selectedDp: null,
}));

export const TreeMenuSelectedLeaf = treeMenuTemplate(() => ({
  selectedDp: { id: 98 },
}));

export const TreeMenuSelectedCategory = treeMenuTemplate(() => ({
  selectedDp: { id: 19 },
}));

export const TreeMenuListItemSlot = (args, { argTypes }) => ({
  components: { TreeMenu: TreeMenuComponent },
  props: Object.keys(argTypes),
  methods: {
    onChange(item) {
      this.selectedDp = item;
    },
  },
  data: () => ({
    selectedDp: null,
  }),
  template: `
    <div style="min-height:380px;">
    <div style="margin-bottom: 50px">Current selected leaf: {{ selectedDp ? selectedDp.displayName : '' }}</div>
    <div>
      <TreeMenu
        :tree="tree"
        :selected-node="selectedDp"
        @leaf-click="onChange"
      >
        <template slot="list-item">qwe</template>
      </TreeMenu>
    </div>
    </div>
  `,
});

export const TreeMenuListLastItemSlot = (args, { argTypes }) => ({
  components: { TreeMenu: TreeMenuComponent },
  props: Object.keys(argTypes),
  methods: {
    onChange(item) {
      this.selectedDp = item;
    },
    lastItemClick() {
      alert('last item click');
    },
  },
  data: () => ({
    selectedDp: null,
  }),
  template: `
  <div style="min-height:380px;">
    <div style="margin-bottom: 50px">Current selected leaf: {{ selectedDp ? selectedDp.displayName : '' }}</div>
    <div>
      <TreeMenu
        :tree="tree"
        :selected-node="selectedDp"
        last-item-text="Text"
        @last-item-click="lastItemClick"
        @leaf-click="onChange"
      >
      <template slot="list-item">qwe</template>
      </TreeMenu>
    </div>
  </div>
  `,
});
