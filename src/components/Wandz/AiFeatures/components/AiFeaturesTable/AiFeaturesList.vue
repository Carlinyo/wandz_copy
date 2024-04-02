<template>
  <div
    class="category-container table-items"
    :style="itemTablesStyle"
  >
    <div
      v-for="item in items"
      :key="item.id"
      class="item-holder"
      @click="handleItemClick(item)"
    >
      <ai-feature-list-item
        :title="item.displayName"
        :description="item.description"
        :icon="item.icon"
        :circle-color="circleColor"
        :is-disabled="/**!item.isPresent && !item.isReport*/ false"
        :description-max-chars="descriptionMaxChars"
        :title-max-chars="titleMaxChars"
        :texts-width="textsWidth"
        :show-icon="showItemsIcon"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import AiFeatureListItem from './AiFeatureListItem.vue';
  import type { PropType } from 'vue';
  import type { IAiFeaturesBasicConfig } from '@wandzai/wandz-interfaces';

  export default {
    name: 'AiFeaturesList',
    components: {
      AiFeatureListItem,
    },
    props: {
      title: {
        type: String,
        default: '',
      },
      icon: {
        type: String,
        default: '',
      },
      items: {
        type: Array as PropType<IAiFeaturesBasicConfig[]>,
        default: null,
      },
      numOfColumns: {
        type: Number,
        default: 3,
      },
      descriptionMaxChars: {
        type: Number,
        require: true,
      },
      titleMaxChars: {
        type: Number,
        require: true,
      },
      textsWidth: {
        type: Number,
        require: false,
      },
      flexDirection: {
        type: String,
        default: 'row',
      },
      showItemsIcon: {
        type: Boolean,
        default: false,
      },
      circleColor: {
        type: String,
        default: '#F1EFFF',
      },
      shouldAnimateLists: {
        type: Boolean,
        default: true,
      },
    },
    computed: {
      itemTablesStyle() {
        return {
          flexDirection: this.flexDirection,
          'grid-template-columns': `repeat(${this.numOfColumns}, 1fr)`,
        };
      },
    },
    methods: {
      handleItemClick(item) {
        this.$emit('clickedItem', item);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .category-container {
    background-color: white;
    .category-title {
      border-bottom: 1px solid #ebebeb /**$pill*/;

      padding: 8px;
      display: flex;
      align-items: center;
      color: #585961 /**$text-typing*/;
      font-size: 12px;
      line-height: 18px;
      margin-bottom: 8px;
      font-family: NmgFonts-Medium;
      cursor: default;
    }

    .title-icon {
      margin-right: 8px;
      width: 16px;
    }
  }

  .table-items {
    display: grid;
    grid-gap: 10px;
    position: relative;
    margin-bottom: 40px;
  }

  .item-holder {
    cursor: pointer;

    &:hover {
      background-color: #f6f6f6; /**$Placeholder-BG;*/
    }
  }
</style>
