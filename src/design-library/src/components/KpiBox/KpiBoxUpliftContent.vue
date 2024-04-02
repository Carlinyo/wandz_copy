<template>
  <div class="nmg-kpi-box-uplift-content">
    <div
      v-if="mainValueText"
      class="main-values"
    >
      <div
        class="main-value-text txt-primary container-title"
        :style="{ color: mainValueColor }"
      >
        {{ mainValueText }}
      </div>
      <Tags
        v-if="tagText"
        :text="tagText"
        :background-color="tagBackgroundColor"
      />
      <div
        v-if="mainValueAdditionalText"
        class="main-value-text-details bold-title"
      >
        {{ mainValueAdditionalText }}
      </div>
    </div>

    <div class="uplift-row">
      <slot name="uplift-row">
        <div
          v-if="upliftText"
          class="uplift-row-content"
          :style="upliftContainerStyles"
        >
          <div
            v-if="showArrowIcon"
            class="uplift-row-icon"
          >
            <arrow-with-circle
              :direction="arrowDirection"
              :color="upliftArrowColor"
            />
          </div>
          <div
            class="uplift-row-text body-tiny-bold"
            :class="{ 'negative-color': upliftTextNegativeColor }"
            :style="{ color: customUpliftColor }"
          >
            {{ upliftText }}
          </div>
          <div class="uplift-row-additional-text body-tiny">
            {{ upliftAdditionalText }}
          </div>
          <div v-if="upliftTooltipContent">
            <Tooltip
              position="bottom-center"
              :text="upliftTooltipContent"
              :extended-hover="extendedHover"
              ><img :src="icons.info" />
            </Tooltip>
          </div>
        </div>
      </slot>
    </div>

    <ul class="additional-details">
      <li
        v-for="item in details"
        :key="item.text"
        class="additional-details-row"
      >
        <div class="additional-details-row-text">
          {{ item.text }}
        </div>
        <div class="additional-details-row-value">
          {{ item.value }}
        </div>
        <div
          v-if="item.info"
          class="additional-details-row-info-icon"
        >
          <Tooltip
            position="bottom-center"
            :text="item.info"
          >
            <img :src="icons.info" />
          </Tooltip>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
  interface Props {
    mainValueText?: string;
    mainValueColor?: string;
    mainValueAdditionalText?: string;
    upliftText?: string;
    upliftAdditionalText?: string;
    upliftContainerStyle?: any;
    upliftBackgroundColor?: string;
    tagText?: string;
    tagBackgroundColor?: string;
    upliftArrowDirectionUp?: boolean;
    upliftArrowNegativeColor?: boolean;
    upliftTextNegativeColor?: boolean;
    details?: Array<{ [key: string]: string }>;
    upliftTooltipContent?: string;
    extendedHover?: boolean;
    showArrowIcon?: boolean;
    customUpliftColor?: string;
  }
</script>
<script setup lang="ts">
  import InfoIcon from '../../assets/icons/info/moreInfo.svg';
  import Tooltip from '../Tooltip/Tooltip.vue';
  import Tags from '../Tags/Tags.vue';
  import ArrowWithCircle from '../../assets/vue-wrappers/arrowWithCircle.vue';
  import { DIRECTIONS } from '../../assets/vue-wrappers/utils/enums';
  import SemanticColors from '../../styles/colors/semantic.module.scss';
  import { computed } from 'vue';

  const negative = SemanticColors.semanticNegative;
  const positive = SemanticColors.semanticPositive;

  defineOptions({
    name: 'NmgKpiBox',
  });

  const props = withDefaults(defineProps<Props>(), {
    mainValueText: '',
    mainValueColor: '',
    mainValueAdditionalText: '',
    upliftText: '',
    upliftAdditionalText: '',
    upliftContainerStyle: () => ({}),
    upliftBackgroundColor: 'transparent',
    tagText: '',
    tagBackgroundColor: '',
    upliftArrowDirectionUp: false,
    upliftArrowNegativeColor: false,
    upliftTextNegativeColor: false,
    details: () => [], // NOTE: [{ text: '', value: '', info: '' },...]
    // default: () => [{ text: 'Phone collected:', value: '8,383', info: 'some phone info 📱' },
    // { text: 'Email collected:', value: '18,383', info: 'some email info 📫' }],
    upliftTooltipContent: '',
    extendedHover: false,
    showArrowIcon: true,
    customUpliftColor: '',
  });
  const arrowDirection = computed(() => {
    return props.upliftArrowDirectionUp ? DIRECTIONS.DOWN : DIRECTIONS.UP;
  });
  const upliftArrowColor = computed(() => {
    return props.upliftArrowNegativeColor ? negative : positive;
  });
  const icons = computed(() => {
    return { info: InfoIcon };
  });
  const upliftContainerStyles = computed(() => {
    const styles = {
      ...props.upliftContainerStyle,
      backgroundColor: props.upliftBackgroundColor,
    };
    if (!props.upliftBackgroundColor || props.upliftBackgroundColor === 'transparent') {
      styles.padding = '0';
    }

    return styles;
  });
</script>
<style lang="scss" scoped>
  @import '../../styles/colors/semantic.module.scss';
  @import '../../styles/typography/body.scss';
  @import '../../styles/colors/text.module.scss';

  $icon-size: 16px;

  .main-values {
    display: flex;
    align-items: center;
    color: $txt-primary;
    justify-content: center;
    gap: 8px;
    .main-value-text-details {
      font-size: 14px;
    }
  }

  .uplift-row {
    margin: 8px 0 0 0;
    font-size: 12px;

    &-content {
      display: flex;
      align-items: center;
      gap: 4px;
      color: $txt-secondary;
      border-radius: 100px;
      width: fit-content;
      padding: 8px 16px;
    }

    &-icon {
      height: $icon-size;
      width: $icon-size;

      &.downwards {
        transform: rotate(180deg);
      }
    }

    &-text {
      color: $semantic-positive;
      font-size: 12px;
      line-height: 18px;

      &.negative-color {
        color: $semantic-negative;
      }
    }

    &-additional-text {
      font-size: 12px;
    }
  }

  .additional-details {
    margin: 0;
    padding: 0;
    list-style: none;
    margin: 8px 0 12px 0;

    &-row {
      display: flex;
      align-items: center;
      gap: 4px;

      &-text {
        font-size: 12px;
        line-height: 18px;
        color: #000;
      }

      &-value {
        font-size: 12px;
        color: $txt-disabled;
      }

      &-info-icon {
      }
    }
  }

  :deep(.trigger) {
    display: flex !important;
  }
</style>
