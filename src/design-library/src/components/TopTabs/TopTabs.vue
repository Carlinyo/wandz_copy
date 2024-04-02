<template>
  <div
    class="nav-tabs"
    :class="{ 'background-modal': backgroundColor }"
  >
    <div
      class="header-wrapper"
      :style="{ paddingLeft: `${tabsLeftPadding}px` }"
    >
      <div
        class="header"
        :class="{ titlePadding: titlePadding }"
      >
        {{ title }}
      </div>
      <div
        class="tabs"
        :class="{
          'box-style': boxStyle,
          'embedded-box': embeddedBox,
          'spaced-tabs': spacedTabs,
          'tw-h-12': size === 'large',
          'tw-h-10': size === 'medium',
        }"
      >
        <div
          v-if="useFadeEffect && prev"
          class="fade-left"
        />
        <div
          v-if="useFadeEffect && next"
          class="fade-right"
        />
        <component
          :is="scrollableContainerElement"
          class="horizontal"
          :style="tabStylesWithoutScroll"
          :displacement="0.7"
          @scroll-debounce="onScrollDebounce"
        >
          <template v-slot:btn-next>
            <div
              id="nextButton"
              ref="nextButton"
              class="next"
              style="margin-right: 8px"
            >
              <img
                :src="rightChevron"
                alt=""
              />
            </div>
          </template>
          <template v-slot:btn-prev>
            <div
              id="prevButton"
              ref="prevButton"
              class="next"
              style="margin-left: 8px"
            >
              <img
                :src="leftChevron"
                alt=""
              />
            </div>
          </template>
          <div
            v-for="(tab, idx) in tabs"
            :id="tab.id"
            :key="tab.name"
            class="tab border-radius-small"
            :data-automation-id="`top-tabs-${tab.name}`"
            :class="[idx === tabIndex ? 'selected' : '', tab.disabled ? 'disabled' : '', isBox ? 'border' : '']"
            :style="tabCustomStyle"
            @click.stop="(event) => onTabClick(tab, idx, event)"
            @mouseover="mouseOver(idx)"
            @mouseleave="mouseLeave"
          >
            <div class="box">
              <div class="inline">
                <div v-if="calcTabIconToShow(tab, idx)">
                  <img
                    class="tab-icon"
                    :src="calcTabIconToShow(tab, idx)"
                  />
                </div>
                <div
                  class="name"
                  :class="getTabNameClass(idx, tab)"
                >
                  {{ `${tab.name}${showCount ? ' (' + tab.itemsCount + ')' : ''}` }}
                </div>
                <Tooltip
                  v-if="tab.info"
                  :text="tab.info"
                  position="bottom-center"
                  class="info-icon"
                >
                  <img
                    class="tw-rotate-180"
                    :src="icons.info"
                  />
                </Tooltip>
              </div>
            </div>
            <div
              v-if="!isBox"
              :class="[idx === tabIndex ? 'bar' : '', !tab.disabled && idx === +hoveredTab ? 'bar-hovered' : '']"
            />
          </div>
        </component>
      </div>
    </div>
    <div
      v-if="showGreyLine"
      class="line"
    />
    <div
      v-if="embeddedBox"
      class="embedded-line"
    />
    <div class="slot-container">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
  // import VueHorizontal from 'vue-horizontal';
  import Tooltip from '../Tooltip/Tooltip.vue';
  import InfoIcon from '../../assets/icons/info/moreInfo.svg';
  import leftChevron from '../../assets/icons/arrows/left-chevron.svg';
  import rightChevron from '../../assets/icons/arrows/right-chevron.svg';
  import type { PropType } from 'vue';
  import type { ITabItem } from '@/types/interfaces/tab-item';

  const icons = Object.freeze({
    info: InfoIcon,
  });

  export default {
    name: 'NmgNavTabs',
    components: { Tooltip },
    emits: ['on-tab-click'],
    props: {
      tabs: {
        type: Array as PropType<ITabItem[]>,
        default: () => [],
      },
      tabIndex: {
        // NOTE: this is the tab index that is currently selected,
        // click on tab is emitted to parent to change this on demand
        type: Number,
        default: 0,
      },
      title: {
        type: String,
        default: '',
      },
      boxStyle: {
        type: Boolean,
        default: false,
      },
      embeddedBox: {
        type: Boolean,
        default: false,
      },
      horizontalScroll: {
        type: Boolean,
        default: false,
      },
      useFadeEffect: {
        type: Boolean,
        default: false,
      },
      hoverColor: {
        type: String,
        default: '',
      },
      backgroundColor: {
        type: Boolean,
        default: true,
      },
      titlePadding: {
        type: Boolean,
        default: false,
      },
      showGreyLine: {
        type: Boolean,
        default: false,
      },
      spacedTabs: {
        type: Boolean,
        default: false,
      },
      tabsLeftPadding: {
        type: Number,
        default: 0,
      },
      size: {
        type: String,
        default: 'medium', // medium, large
      },
      showCount: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        hoveredTab: '',
        leftChevron,
        rightChevron,
        parentWidth: '',
        next: '',
        prev: '',
      };
    },
    computed: {
      tabCustomStyle() {
        const fallbackHoverColor = this.isBox ? '#FFFFFF' : '#F3F5F8';

        return { '--hovercolor': this.hoverColor || fallbackHoverColor };
      },
      icons() {
        return icons;
      },
      scrollableContainerElement() {
        // return this.horizontalScroll ? VueHorizontal : 'div';
        return 'div';
      },
      tabStylesWithoutScroll() {
        return this.horizontalScroll ? 'width: 100%;' : 'display: flex;';
      },
      isBox() {
        return this.boxStyle || this.embeddedBox;
      },
    },
    mounted() {
      this.parentWidth = this.$parent?.$parent?.$el.clientWidth;
    },
    methods: {
      onScrollDebounce(data) {
        this.next = data.hasNext;
        this.prev = data.hasPrev;
      },
      onTabClick(tab, idx, event) {
        if (tab.disabled) return;
        this.scrollTabIntoView(event);
        this.$emit('on-tab-click', tab, idx);
      },
      mouseOver(idx) {
        this.hoveredTab = idx;
      },
      mouseLeave() {
        this.hoveredTab = '';
      },
      scrollTabIntoView(event) {
        event.target.closest('.tab').scrollIntoViewIfNeeded();
      },
      calcTabIconToShow(tab, idx) {
        // match selected/not selected icons according to tab index:
        if (tab.tabIconSelected && this.tabIndex === idx) {
          return tab.tabIconSelected;
        }
        if (tab.tabIconNotSelected && this.tabIndex !== idx) {
          return tab.tabIconNotSelected;
        }
        return null;
      },
      getTabNameClass(idx, tab) {
        let classList = '';

        if (this.isBox) {
          if (tab.disabled) {
            classList += ' txt-disabled';
          } else {
            classList += ' txt-primary';
          }

          if (idx === this.tabIndex) {
            classList += ' bold-title';
          } else {
            classList += ' regular-title';
          }

          return classList;
        }

        if (tab.disabled) {
          classList += ' txt-disabled';
        } else if (idx === this.tabIndex) {
          classList += ' txt-primary';
        } else {
          classList += ' txt-secondary';
        }

        if (this.size === 'medium' && idx === this.tabIndex) {
          classList += ' bold-title';
        }

        if (this.size === 'medium' && idx !== this.tabIndex) {
          classList += ' regular-title';
        }

        if (this.size === 'large') {
          classList += ' container-title tw-mb-0';
        }

        return classList;
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import '../../styles/colors/text.module';
  @import '../../styles/colors/semantic.module';
  @import '../../styles/colors/background.module';
  @import '../../styles/colors/borders';

  .next {
    img {
      width: 16px;
      height: 16px;
    }
  }
  .prev {
    img {
      width: 16px;
      height: 16px;
    }
  }
  .nav-tabs {
    width: 100%;

    &.background-modal {
      background-color: $bg-element;
    }
    .line {
      width: 100%;
      position: relative;
      left: 0;
      height: 1px;
      background-color: $border-ui-color;
    }
    .header-wrapper {
      display: flex;
      align-items: center;
      .header {
        height: 36px;
        line-height: 36px;
        color: $txt-primary;
        font-size: 14px;
        &.titlePadding {
          padding-right: 20px;
        }
      }
      .tabs {
        display: flex;
        position: relative;
        .fade-left {
          background: linear-gradient(90deg, rgba(255, 255, 255, 0) -75%, #ffffff 50%);
          transform: rotate(180deg);
          width: 40px;
          height: 37px;
          position: absolute;
          z-index: 1;
        }
        .fade-right {
          background: linear-gradient(90deg, rgba(255, 255, 255, 0) -75%, #ffffff 50%);
          width: 40px;
          height: 37px;
          position: absolute;
          right: 0;
          z-index: 1;
        }
        .tab {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
          padding: 8px 24px;

          &:hover:not(.disabled) {
            color: $txt-primary;
          }
          .bar {
            position: absolute;
            height: 4px;
            background-color: $semantic-primary-brand !important;
            width: 100%;
            bottom: 0;
          }
          .box {
            width: 100%;
          }
          &.selected .box {
            position: relative;
            color: $txt-primary;
          }
          &.disabled {
            cursor: default !important;
          }
        }

        .greyLine {
          position: absolute;
          bottom: -1px;
          left: 0;
          height: 1px;
          width: 100%;
          background-color: $border-ui-color;
        }

        .tab {
          &.selected {
            border-color: $border-ui-selected-color;
          }
          &:not(.selected):not(.disabled):hover {
            background-color: var(--hovercolor);

            .name {
              color: $txt-primary !important;
            }
          }
        }

        &.spaced-tabs {
          .tab {
            margin-right: 4px;
            background-color: $bg-primary;

            &.selected {
              background-color: $bg-element;
            }
            .box {
              padding-left: 16px;
              padding-right: 16px;
            }
          }
        }
        &.embedded-box {
          .tab {
            &.selected {
              border-color: $border-ui-color;
              background-color: $bg-element;
              border-bottom-color: white;
            }
            &:not(.selected):not(.disabled):hover {
              background-color: $bg-element-hover;
            }
          }
        }
      }

      .inline {
        display: inline-flex;
        align-items: center;
        gap: 8px;

        .info-icon {
          margin-left: 4px;
          height: 16px;
        }

        .tab-icon {
          width: 16px;
          height: 16px;
        }
      }
    }
  }

  .horizontal {
    display: flex;
  }

  .box-style {
    .horizontal {
      gap: 8px;
    }
  }

  .tabs.box-style .tab {
    background: $bg-element;
    color: $txt-primary;

    &.disabled {
      color: $txt-disabled;
      background: $bg-disabled;
    }
  }

  .embedded-box {
    .tab {
      margin-right: 0;
      border-bottom-left-radius: unset;
      border-bottom-right-radius: unset;
      border-color: $border-ui-color;
      background-color: $bg-secondary-element;
      z-index: 3;
    }
    .horizontal {
      gap: 4px;
    }
  }
  .embedded-line {
    bottom: 1px;
    z-index: 2;
    width: 100%;
    position: relative;
    left: 0;
    height: 1px;
    background-color: $border-ui-color;
  }
</style>
