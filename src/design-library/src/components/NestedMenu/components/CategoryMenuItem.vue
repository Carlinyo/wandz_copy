<template>
  <div
    class="category-item"
    :class="{ selected: isSelected }"
    @mouseover="handleHoverItem(itemInfo)"
    @mouseleave="handleFocusOutItem(itemInfo)"
  >
    <img
      v-if="itemInfo.icon"
      :src="itemInfo.icon"
      class="icon"
      alt=""
    />
    {{ itemInfo.name }}
  </div>
</template>

<script lang="ts">
  import { PropType } from 'vue';
  import { INestedMenuItem } from '../../../types/interfaces/nested-menu';

  export default {
    name: 'CategoryMenuItem',
    components: {},
    props: {
      itemInfo: {
        type: Object as PropType<INestedMenuItem>,
        default: null,
      },
      isSelected: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {};
    },
    computed: {},
    methods: {
      handleHoverItem(categoryItem: INestedMenuItem) {
        this.$emit('hoverItem', categoryItem);
      },
      handleFocusOutItem(categoryItem: INestedMenuItem) {
        this.$emit('leaveItem', categoryItem);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .category-item {
    height: 32px;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 18px;
    cursor: default;
  }
  .icon {
    width: 24px;
    margin-right: 8px;
  }
  .category-item.selected {
    background-color: white;
  }
</style>
