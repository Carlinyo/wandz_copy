<template>
  <div
    class="layout-container"
    :key="renderCount"
  >
    <template
      v-for="item in items"
      :key="item"
    >
      <div
        class="each-item"
        :style="{
          gridColumnStart: item.gridColumnStart,
          gridColumnEnd: item.gridColumnEnd + 1,
          gridRowStart: item.gridRowStart,
          gridRowEnd: item.gridRowEnd,
        }"
      >
        <slot :name="item.name" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
  import type { PropType } from 'vue';
  import type { IGridItem } from '../../types/interfaces/grid-item';

  export default {
    name: 'GridLayout',
    components: {},
    props: {
      items: {
        type: Array as PropType<IGridItem[]>,
        default: () => [
          {
            gridColumnStart: 1,
            gridColumnEnd: 3,
            name: 'leftCorner',
          },
          {
            gridColumnStart: 9,
            gridColumnEnd: 13,
            name: 'rightCorner',
          },
        ],
      },
      shouldReRenderOnMenuToggle: {
        type: Boolean,
        default: false,
      },
    },
    watch: {
      sidebarIsOpened() {
        if (this.shouldReRenderOnMenuToggle) this.renderCount += 1;
      },
    },
    data() {
      return {
        renderCount: 0 /** Using this key for re-rendering every time sidebar is toggled.. */,
      };
    },
    computed: {
      //TODO:fetch from new store
      // ...mapGetters({
      //   sidebarIsOpened: 'sidebarIsOpened',
      // }),
    },
  };
</script>
<style scoped lang="scss">
  .layout-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 24px;
    width: 100%;
  }

  .each-item {
    overflow: inherit;
  }
</style>
