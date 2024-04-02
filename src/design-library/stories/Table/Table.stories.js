import MyTable, { ThreeDotsIcon, ArrowIcon } from '../../src/components/Table';
import NmgButton from '../../src/components/Button';

// eslint-disable-next-line max-len
const myCustomSortingFunctionForBlockedBro = (sortDirection) => (a, b) =>
  (parseFloat(a.blocked) - parseFloat(b.blocked)) * sortDirection;

const headers = [
  { key: 'name', value: 'KPI Name', info: 'KPI bruh 🙀' },
  { key: 'blocked', value: 'Blocked', customSort: myCustomSortingFunctionForBlockedBro },
  { key: 'control', value: 'Control' },
  { key: 'difference', value: 'Difference' },
  { key: 'actions', value: 'Actions', unsortable: true },
];
const items = [
  {
    name: 'Conversion Rate',
    blocked: '5.5%',
    control: '3.2%',
    difference: '+2.3%',
    actions: '',
    someDataForExpandableRow: {},
  },
  {
    name: 'Retention Rate',
    blocked: '65%',
    control: '45%',
    difference: '+20%',
    actions: 'AS',
    someDataForExpandableRow: {},
  },
  {
    name: 'Cart Abandonment1',
    blocked: '14%',
    control: '32%',
    difference: '-18%',
    actions: '',
    someDataForExpandableRow: {},
  },
  {
    name: 'Cart Abandonment2',
    blocked: '14%',
    control: '32%',
    difference: '-18%',
    actions: '',
    someDataForExpandableRow: {},
  },
  {
    name: 'Cart Abandonment3',
    blocked: '14%',
    control: '32%',
    difference: '-18%',
    actions: '',
  },
  {
    name: 'Cart Abandonment4',
    blocked: '14%',
    control: '32%',
    difference: '-18%',
    actions: 'AM',
  },
  {
    name: 'Cart Abandonment5',
    blocked: '14%',
    control: '32%',
    difference: '-18%',
    actions: '',
  },
  {
    name: 'Cart Abandonment6',
    blocked: '14%',
    control: '32%',
    difference: '-18%',
    actions: '',
  },
  {
    name: 'Cart Abandonment7',
    blocked: '14%',
    control: '32%',
    difference: '-18%',
    actions: '',
  },
  {
    name: 'Cart Abandonment8',
    blocked: '14%',
    control: '32%',
    difference: '-18%',
    actions: '',
  },
  {
    name: 'Cart Abandonment9',
    blocked: '14%',
    control: '32%',
    difference: '-18%',
    actions: '',
  },
  {
    name: 'Cart Abandonment10',
    blocked: '14%',
    control: '32%',
    difference: '-18%',
    actions: 'DF',
  },
  {
    name: 'Cart Abandonment11',
    blocked: '14%',
    control: '32%',
    difference: '-18%',
    actions: '',
  },
  {
    name: 'Cart Abandonment12',
    blocked: '14%',
    control: '32%',
    difference: '-18%',
    actions: '',
  },
  {
    name: 'Cart Abandonment13',
    blocked: '14%',
    control: '32%',
    difference: '-18%',
    actions: '',
  },
  {
    name: 'Cart Abandonment14',
    blocked: '14%',
    control: '32%',
    difference: '-18%',
    actions: '',
  },
  {
    name: 'Cart Abandonment15',
    blocked: '14%',
    control: '32%',
    difference: '-18%',
    actions: '',
  },
  {
    name: 'Cart Abandonment16',
    blocked: '14%',
    control: '32%',
    difference: '-18%',
    actions: 'RT',
  },
  {
    name: 'Cart Abandonment17',
    blocked: '14%',
    control: '32%',
    difference: '-18%',
    actions: '',
  },
  {
    name: 'Cart Abandonment18',
    blocked: '14%',
    control: '32%',
    difference: '-18%',
    actions: '',
  },
  {
    name: 'Cart Abandonment19',
    blocked: '14%',
    control: '32%',
    difference: '-18%',
    actions: '',
  },
  {
    name: 'Cart Abandonment20',
    blocked: '14%',
    control: '32%',
    difference: '-18%',
    actions: '',
  },
  {
    name: 'Cart Abandonment21',
    blocked: '14%',
    control: '32%',
    difference: '-18%',
    actions: '',
  },
];

export default {
  title: 'Table',
  argTypes: {
    withPagination: {
      control: { type: 'boolean' },
      name: 'Use pagination',
    },
    itemsPerPage: {
      control: { type: 'number' },
      name: 'Items per page',
    },
    sortable: {
      control: { type: 'boolean' },
      name: 'Sortable',
    },
    highlightOnHover: {
      control: { type: 'boolean' },
      name: 'highlightOnHover',
    },
    tableWidth: {
      control: { type: 'number' },
      name: 'Table Width',
    },
    tableMinWidth: {
      control: { type: 'number' },
      name: 'Table Min Width',
    },
    rowHeight: {
      control: { type: 'number' },
      name: 'Row height',
    },
    withBorder: {
      control: { type: 'boolean' },
      name: 'withBorder',
    },
    withShadow: {
      control: { type: 'boolean' },
    },
    theadStyle: {
      control: { type: 'object' },
      name: 'theadStyle',
    },
    loading: {
      control: { type: 'boolean' },
      name: 'loading',
      description: 'Will show yellow loading bar on the top of the table',
    },
    enableOverFlow: {
      control: { type: 'boolean' },
      name: 'enableOverFlow',
    },
    stripedRows: {
      control: { type: 'boolean' },
    },
    stickyFirstCol: {
      control: { type: 'boolean' },
    },
    stickyLastCol: {
      control: { type: 'boolean' },
    },
    tableMaxHeight: {
      control: { type: 'number' },
    },
  },
  args: {
    withPagination: true,
    itemsPerPage: 10,
    sortable: true,
    highlightOnHover: true,
    tableWidth: false,
    rowHeight: 56,
    withBorder: true,
    withShadow: false,
    theadStyle: {},
    loading: false,
    enableOverFlow: false,
    tableMinWidth: 800,
    tableMaxHeight: 605,
    stripedRows: true,
    stickyFirstCol: false,
    stickyLastCol: false,
  },
};

export const Table = (args, { argTypes }) => ({
  components: { MyTable, NmgButton },
  props: Object.keys(argTypes),
  computed: {
    items() {
      return items;
    },
    headers() {
      return headers;
    },
    icons() {
      return {
        ThreeDotsIcon,
        ArrowIcon,
      };
    },
  },
  methods: {
    toggleRowExpand(item, index) {
      // NOTE: always reassign new instance to this.expandedRowsIndexes, don't mutate it
      if (this.expandedRowsIndexes.includes(index)) {
        this.expandedRowsIndexes = this.expandedRowsIndexes.filter((rowIdx) => rowIdx !== index);
      } else {
        this.expandedRowsIndexes = [...this.expandedRowsIndexes, index];
      }
    },
    getHeightForIndex(index) {
      const base = 50;
      const multi = index + 1;
      const height = base * multi;
      return `${height}px`;
    },
  },
  data() {
    return {
      expandedRowsIndexes: [],
    };
  },
  template: `
  <my-table
    :headers="headers"
    :items="items"
    :highlightRows="{7: {backgroundColor: '#F7F9FF'}}"
    :withPagination="withPagination"
    :itemsPerPage="itemsPerPage"
    :sortable="sortable"
    :tableWidth="tableWidth"
    :tableMinWidth="tableMinWidth"
    :rowHeight="rowHeight"
    :highlightOnHover="highlightOnHover"
    :withBorder="withBorder"
    :withShadow="withShadow"
    :loading="loading"
    :expandedRowsIndexes="expandedRowsIndexes"
    :enableOverFlow="enableOverFlow"
    :stripedRows="stripedRows"
    :stickyFirstCol="stickyFirstCol"
    :stickyLastCol="stickyLastCol"
    :tableMaxHeight="tableMaxHeight"
    @row-click="toggleRowExpand"
  >
    <template slot="expanded-row" slot-scope="{ item, index }" v-if="item.someDataForExpandableRow">
      <h2 :style="{ height: getHeightForIndex(index) }">
        hello from slot scope at index {{ index }}
        my height is {{ getHeightForIndex(index) }}
      </h2>
    </template>

    <template slot="actions" slot-scope="{ item, index }" v-if="item.someDataForExpandableRow">
      <NmgButton styleType="textLink" @click.native.prevent.stop="toggleRowExpand(item, index)">
        <img :src="icons.ArrowIcon" />
      </NmgButton>
    </template>
  </my-table>`,
});
