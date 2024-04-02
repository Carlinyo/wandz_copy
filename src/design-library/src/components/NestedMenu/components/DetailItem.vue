<template>
  <div
    class="item"
    v-if="itemInfo"
    @click="handleClick"
  >
    <Tooltip
      :show-tooltip="showTooltip"
      :text="tooltipText"
      allow-overflow
    >
      <div
        class="details"
        :class="{ locked: itemInfo.isLocked }"
      >
        <div class="details-info">
          <div
            class="title"
            v-text="itemInfo.title"
          />
          <div
            v-if="itemInfo.title"
            class="separator"
            v-text="separatorSign"
          />
          <div
            class="description"
            :ref="`${itemInfo.title}`"
            v-text="itemInfo.description"
          />
        </div>
        <div
          v-if="showCategoryName"
          class="category"
        >
          <div v-text="categoryTextPrefix" />
          <div
            class="highlighted"
            v-text="categoryText"
          />
        </div>
      </div>
    </Tooltip>
  </div>
</template>

<script lang="ts">
  import { PropType } from 'vue';
  import Tooltip from '../../Tooltip';
  import { IDetailItem } from '../../../types/interfaces/nested-menu';

  export default {
    name: 'DetailItem',
    components: {
      Tooltip,
    },
    props: {
      itemInfo: {
        type: Object as PropType<IDetailItem>,
        default: null,
      },
      showCategoryName: {
        type: Boolean,
        default: false,
      },
      categorySuffix: {
        type: String,
        default: 'Data Points',
      },
    },
    data() {
      return {
        separatorSign: '|',
        showTooltip: false,
        categoryTextPrefix: 'In',
      };
    },
    computed: {
      tooltipText() {
        return `<span style="font-family: Figtree">${this.itemInfo.title}</span><br/>${this.itemInfo.description}`;
      },
      categoryText() {
        return `${this.itemInfo?.categoryName} ${this.categorySuffix}`;
      },
    },
    watch: {
      itemInfo: {
        immediate: true,
        handler() {
          this.$nextTick(() => {
            /** wait for next tick so the ref is ready and you can check div's overflow */
            this.showTooltip = this.calcShowTooltip();
          });
        },
      },
    },
    methods: {
      calcShowTooltip() {
        /** show tooltip on whole item if description is cut off */
        const descriptionElement = this.$refs[`${this.itemInfo.title}`];
        return !!descriptionElement && descriptionElement.offsetWidth < descriptionElement.scrollWidth;
      },
      handleClick() {
        if (!this.itemInfo?.isLocked) {
          this.$emit('item-clicked', this.itemInfo?.item);
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../styles/colors/background.module.scss';
  @import '../../../styles/colors/text.module.scss';

  .item {
    display: flex;

    &:hover {
      background-color: $bg-element-hover;
      cursor: pointer;
    }
    /deep/ .tooltip-container {
      overflow: hidden;
    }
    /deep/ .tooltip-container .trigger {
      overflow: hidden;
    }
  }
  .details {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    padding: 12px 8px;
    overflow: hidden;

    .category {
      color: $txt-disabled;
      font-size: 12px;
      line-height: 16px;
      margin-top: 4px;
      display: flex;

      .highlighted {
        margin-left: 4px;
        font-family: Figtree;
      }
    }
  }
  .details-info {
    display: flex;
    line-height: 18px;

    .title {
      white-space: nowrap;
      font-family: Figtree;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      color: $txt-primary;
    }

    .description {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: $txt-secondary;
      font-family: Figtree;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .separator {
      margin: auto 8px;
      color: $txt-secondary;
    }
  }
  .locked {
    color: $txt-disabled;
    cursor: default;
  }

  .locked .title {
    color: $txt-disabled;
  }
  .locked .separator {
    color: $txt-disabled;
  }
  .locked .description {
    color: $txt-disabled;
  }
</style>
