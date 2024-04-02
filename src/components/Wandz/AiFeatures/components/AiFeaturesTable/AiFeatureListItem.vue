<template>
  <div
    class="item-container"
    :class="isDisabled && 'is-disabled'"
  >
    <div
      v-if="showIcon && icon"
      class="icon"
    >
      <round-icon
        :circle-icon="icon"
        :circle-color="circleColor"
      />
    </div>
    <div
      class="text-container"
      :style="textsStyle"
    >
      <div class="title">
        <tooltip
          :show-tooltip="showTitleTooltip"
          :text="title"
          word-break
          tooltip-type="icon"
        >
          <div
            class="inner-title bold-title"
            v-text="title"
          />
        </tooltip>
      </div>

      <div class="description">
        <tooltip
          :show-tooltip="showDescriptionTooltip"
          :text="description"
          tooltip-type="icon"
          word-break
        >
          <div class="inner-description small-label-title">
            {{ description }}
          </div>
        </tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Tooltip from '@/design-library/src/components/Tooltip';

  import RoundIcon from './RoundIcon.vue';

  export default {
    name: 'AiFeatureListItem',
    components: {
      RoundIcon,
      Tooltip,
    },
    props: {
      title: {
        type: String,
        default: '',
      },
      description: {
        type: String,
        default: '',
      },
      icon: {
        type: String,
        default: '',
      },
      isDisabled: {
        type: Boolean,
        default: false,
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
        default: 245,
      },
      showIcon: {
        type: Boolean,
        default: false,
      },
      circleColor: {
        type: String,
        default: '',
      },
    },
    computed: {
      showTitleTooltip() {
        return Boolean(this.title && this.title.length > (this.titleMaxChars || 0));
      },
      showDescriptionTooltip() {
        return Boolean(this.description && this.description.length > (this.descriptionMaxChars || 0));
      },
      textsStyle() {
        return {
          maxWidth: `${this.textsWidth}px`,
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '@/design-library/src/styles/colors/text.module';

  .item-container {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    padding: 16px;

    .icon {
      margin-right: 8px;
    }

    .text-container {
      display: flex;
      flex-direction: column;
      min-width: 100px;
    }

    .title {
      font-size: 14px;
      font-family: NmgFonts-Medium;
      line-height: 18px;
      margin: 0 0 4px 0;
      text-overflow: ellipsis;
      overflow: hidden;
      display: flex;

      .title-pub-status {
        margin-right: 8px;
      }

      .inner-title {
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .disabled-icon {
        margin-left: 4px;
        width: 16px;
      }
    }

    .description {
      font-size: 12px;
      line-height: 16px;
      margin: 0;
      text-overflow: ellipsis;
      overflow: hidden;
      display: block;
      color: $txt-secondary;

      .inner-description {
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

  .is-disabled {
    color: $txt-disabled;
  }
</style>
