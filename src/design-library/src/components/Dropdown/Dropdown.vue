<template>
  <Tooltip
    :show-tooltip="isOverflow"
    :text="getSelectedItems"
    tooltip-type="icon"
    tooltip-content-max-width="400px"
    position="bottom"
    allow-overflow
    custom-class-name="tw-w-full"
    :style="`width: ${width}${widthTerm}; position: relative`"
  >
    <div
      class="nmg-dropdown-chips tw-w-full"
      :class="{
        open: isDropdownOpen,
        multi: multiSelect,
        dense,
        disabled,
        inline,
      }"
      :data-automation-id="dataAutoId && `${dataAutoId}-container`"
      tabindex="0"
      @focusout="clickOutside"
    >
      <div
        v-if="showPrependIcon"
        class="prepend-icon"
      >
        <img
          :src="prependIcon"
          alt=""
        />
      </div>
      <div
        v-on-clickaway="clickOutside"
        class="clickable-content"
        :class="{ error, 'without-first-line': !showFirstLineLabel, disabled }"
        @click.stop="toggleDropdownOpen()"
      >
        <div
          :data-automation-id="dataAutoId && `${dataAutoId}-title`"
          class="title"
          :class="{ centered: centeredTitle }"
        >
          <div
            v-if="showFirstLineLabel"
            class="first-line-label"
            :class="{
              disabled: disabled,
              'tw-mb-1': title || mandatory || tooltip,
            }"
          >
            <div class="first-line-label body-tiny">
              <div v-if="mandatory">
                <span v-text="title" />
                <span
                  class="mandatory-char"
                  v-text="'*'"
                />
              </div>
              <div
                v-else
                v-text="title"
              />
            </div>
            <div
              v-if="tooltip"
              class="first-line-icon"
              :class="{ centered: centeredTitle }"
            >
              <tooltip
                :position="'bottom-start'"
                custom-class-name="nmg-dropdown"
                :text="tooltip"
              >
                <img
                  :src="mainIcon"
                  alt=""
                />
              </tooltip>
            </div>
          </div>
          <div
            class="selected-items border border-radius-small tw-px-4 tw-py-2 tw-flex tw-items-center tw-gap-2 tw-flex-wrap tw-relative"
            :class="[
              size == 'small' ? 'tw-h-5' : 'tw-h-8',
              `size-${size}`,
              error ? 'border-error' : '',
              isDropdownOpen ? '!tw-rounded-b-none border-focus' : '',
              size == 'small' ? 'tw-pl-2' : 'tw-pl-4',
            ]"
          >
            <div
              v-if="colorSwatchMap"
              class="color-swatch"
              :style="{
                backgroundColor: colorSwatchMap[selectedItemsList[0]],
              }"
            />
            <div
              v-if="multiSelect && !allItemsSelected && selectedItemsList.length"
              ref="pillsContainer"
              :class="['pills', selectedItemsList.length ? 'has-pills' : '']"
            >
              <div
                v-for="(item, index) in pillsForDisplay"
                :key="item.textLabel"
                class="pill-wrapper"
              >
                <pill
                  :text="item.textLabel"
                  :tooltip-text="item.textLabel"
                  :custom-text-style="customPillTextStyle"
                  popover-display="flex"
                  @pillClick="onPillDelete($event, index)"
                />
              </div>
            </div>
            <div
              v-if="shouldDisplayPillCounter"
              class="counter-pill"
              :style="counterPillStyles"
            >
              <pill
                popover-display="flex"
                :text="'+' + numOfUndisplayedPills"
                :closeable="false"
                :tooltip-text="undisplayedPillsText"
              />
            </div>
            <div
              v-if="multiSelect && allItemsSelected && itemsForDisplay.length"
              class="all-items-selected"
            >
              {{ allItemsSelectedTitle }}
            </div>
            <div
              v-if="showFirstLineLabel && multiSelect && !allItemsSelected && subTitle && !itemsForDisplay.length"
              class="body-small txt-placeholder"
            >
              {{ subTitle }}
            </div>
            <div
              v-if="!multiSelect && selectedItemsList"
              ref="dropdownTooltip"
              class="single-item-selected body-small txt-primary"
            >
              {{ formatter(selectedItemsList[0]) }}
            </div>
            <div
              v-if="showFirstLineLabel && !selectedItemsList.length && subTitle"
              class="body-small txt-placeholder"
            >
              {{ subTitle }}
            </div>
            <div
              v-if="showTriangleIcon"
              class="triangle-container tw-top-1/2 tw-transform -tw-translate-y-1/2"
              @click.stop="toggleDropdownOpen()"
            >
              <div
                class="triangle"
                :class="{ open: isDropdownOpen }"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="isDropdownOpen"
        class="popup"
        :class="{ error: error && !treeMenuType, shadow }"
        :style="{ top: `${dropdownPosition}px` }"
      >
        <div
          v-if="multiSelect || useSearch"
          class="sticky-header"
        >
          <div
            v-if="useSearch"
            class="search-input-container"
          >
            <nmg-search
              :width="width"
              class="search-input"
              v-model="searchText"
              @click.stop="() => {}"
            />
          </div>
          <div
            v-if="allItemsSelectedTitle && multiSelect"
            class="all-item list-item"
            @click.stop="selectAll"
          >
            <checkbox
              v-if="multiSelect"
              :checked="!!selectedItemsList.length"
              class="checkbox"
              :type="allItemsSelected ? 'regular' : 'indeterminate'"
              @click.stop="() => {}"
            />
            {{ allItemsSelectedTitle }}
            <span class="characters">{{ selectedItemsList.length }} of {{ items.length }} </span>
          </div>
        </div>
        <div v-if="treeMenuType">
          <tree-menu
            v-if="isDropdownOpen"
            :width="width"
            :with-border="false"
            :tree="treeItems"
            @leaf-click="handleItemClick(null, $event)"
          />
        </div>
        <div
          v-else
          class="parent-element"
          :class="{ open: isDropdownOpen }"
        >
          <div
            class="child-element list"
            style="width: 100%"
            :data-automation-id="dataAutoId && `${dataAutoId}-select-box`"
          >
            <component
              :is="scrollableContainerElement"
              ref="vs"
              class="vue-scroll-wrapper"
              :style="vueScrollStyles"
              :ops="ops"
            >
              <div
                v-for="(item, itemInd) in itemsForDisplay"
                :key="`item-${itemInd}`"
                :data-automation-id="`select-box-item--${item}`"
                :class="{
                  // ...(size == 'small' ? {'tw-h-5': true} : {'tw-h-8': true}),
                  selected: isSelected(item),
                  'disabled-item': item.disabled,
                  'list-item': true,
                  ...(colorSwatchMap
                    ? {
                        ['tw-pl-10']: true,
                      }
                    : {}),
                }"
                @click.stop="handleItemClick($event, item)"
              >
                <checkbox
                  v-if="multiSelect"
                  :disabled="item.disabled"
                  class="checkbox"
                  :checked="isSelected(item)"
                />
                <radio
                  v-if="singleSelect"
                  :disabled="item.disabled"
                  class="radio"
                  :checked="isSelected(item)"
                />
                <div
                  v-if="colorSwatchMap"
                  class="color-swatch"
                  :style="{
                    backgroundColor: colorSwatchMap[item],
                  }"
                />
                <img
                  v-if="countryType"
                  :src="item.flag"
                  alt=""
                />
                <span v-if="!countryType">{{ formatter(item) }}</span>
                <span v-if="countryType">{{ formatter(item.country) }}</span>
              </div>
            </component>
          </div>
        </div>
      </div>
    </div>
    <span
      v-if="error && errorMessage"
      class="error-message"
    >
      {{ errorMessage }}</span
    >
  </Tooltip>
</template>
<script setup lang="ts">
  import { ref, computed, onBeforeMount, watch, nextTick } from 'vue';
  import { directive as vOnClickaway } from 'vue3-click-away';
  // import VueScroll from 'vuescroll/dist/vuescroll-native';
  import Checkbox from '../Checkbox/Checkbox.vue';
  import Radio from '../Radio/Radio.vue';
  import Pill from '../Pills/Pills.vue';
  import Tooltip from '../Tooltip/Tooltip.vue';
  import TreeMenu from '../TreeMenu/TreeMenu.vue';
  import searchIcon from '../../assets/icons/search/dropdown-search.svg';
  import moreInfo from '../../assets/icons/info/moreInfo.svg';
  import NmgSearch from '../Search/Search.vue';
  // import {
  //   VueScrollConfigKeepShow as VueScrollConfig
  // } from '@namogoo/nmg-design-library/src/utils/vue-scroll';

  import { DROPDOWN_TYPE, getMaxDisplayableItemsForContainer } from './utils';
  import { PropType } from 'vue';
  import { IDropdownItem } from '@/types/interfaces/IDropdownItem';

  defineOptions({
    name: 'DropdownChips',
  });

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
    allItemsSelectedTitle: {
      type: String,
      default: 'All selected',
    },
    type: {
      type: String,
      default: 'multiSelect',
      validator: (value) => Object.values(DROPDOWN_TYPE).indexOf(value) !== -1,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    useSearch: {
      type: Boolean,
      default: true,
    },
    useVueScroll: {
      type: Boolean,
      default: true,
    },
    scrollHeight: {
      type: Number,
      default: null,
      required: false,
    },
    scrollMaxHeight: {
      type: Number,
      default: null,
      required: false,
    },
    items: {
      type: Array as PropType<IDropdownItem[]>,
      default: () => [],
    },
    treeItems: {
      type: Object,
      default: () => ({}),
      // NOTE: Node attributes:
      // id: any > **REQUIRED, must be unique**
      // displayName: String -> **REQUIRED**, text to display
      // icons: Array<String> -> icon src's
      // disabled: Boolean -> disable node
      // children: Array<Node> -> siblings
    },
    selectedItems: {
      type: Array, //  array with 1 element for single
      default: () => [],
      required: false,
    },
    formatter: {
      type: Function,
      default: (item) => item,
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      required: false,
    },
    width: {
      type: Number,
      default: null,
    },
    widthTerm: {
      type: String as PropType<'%' | 'px'>,
      default: 'px',
    },
    counterPillStyles: {
      type: Object,
      default: () => ({}),
    },
    maxTooltipLinesForPills: {
      type: Number,
      default: 10,
    },
    dataAutoId: {
      type: String,
      default: '',
    },
    showFirstLineLabel: {
      type: Boolean,
      default: true,
    },
    shadow: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    mainIcon: {
      type: String,
      default: moreInfo,
    },
    prependIcon: {
      type: String,
      default: moreInfo,
    },
    showPrependIcon: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: String,
      default: '',
    },
    showTriangleIcon: {
      type: Boolean,
      default: true,
    },
    resetSelectedItemsListToSelectAll: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
    },
    mandatory: {
      type: Boolean,
      default: false,
    },
    colorSwatchMap: {
      type: Object,
      default: () => null,
    },
  });

  const emit = defineEmits([
    'pill-delete',
    'dropdown-open',
    'dropdown-close',
    'all-selected',
    'dropdown-click',
    'dropdown-toggle',
  ]);

  const pillsContainer = ref(null);
  const dropdownTooltip = ref(null);

  const isOverflow = ref(false);
  const isDropdownOpen = ref(false);
  const searchText = ref('');
  const numOfUndisplayedPills = ref(0);

  const customPillTextStyle = ref(
    Object.freeze({
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '242px',
    }),
  );

  const selectedItemsList = ref<Array<any>>([]);

  const ops = ref({
    maxHeight: 44,
    // ...VueScrollConfig
  });

  const treeMenuElementClasses = computed(() => {
    return [
      'item-info',
      'search-icon',
      'search-input',
      'search-input-container',
      'text-and-icons',
      'tree-menu',
      'tree-menu-list-item',
      'tree-menu-list-item category',
      'search-input-wrapper',
      'search-icon small',
      'nmg-dropdown-chips',
      'nmg-dropdown-chips shadow',
      'trigger',
      'nmg-button buttonImageSmall',
      'button-image',
      'button-slot-text',
    ];
  });

  const selectableItems = computed(() => {
    return props.items.filter((item) => !item.disabled);
  });
  const shouldDisplayPillCounter = computed(() => {
    return (
      numOfUndisplayedPills.value && multiSelect.value && !allItemsSelected.value && selectedItemsList.value.length
    );
  });
  const getSelectedItems = computed(() => {
    return props.selectedItems.toString();
  });

  const undisplayedPillsText = computed(() => {
    const unseenPills = pillsForDisplay.value
      .slice(-numOfUndisplayedPills.value)
      .map((item) => `<div>${item.textLabel}</div>`);
    const appearingText = unseenPills.slice(0, props.maxTooltipLinesForPills);
    const unseenDiff = unseenPills.length - appearingText.length;
    const moreItemsText = unseenDiff ? `+ ${unseenDiff} more` : '';
    return [...appearingText, moreItemsText].join('');
  });

  const scrollableContainerElement = computed(() => {
    // if (props.useVueScroll) return VueScroll;
    return 'div';
  });

  const numberOfSelectedItems = computed(() => {
    return selectedItemsList.value.length;
  });
  const multiSelect = computed(() => {
    return props.type === DROPDOWN_TYPE.MULTI || countryType.value;
  });

  const singleSelect = computed(() => {
    return props.type === DROPDOWN_TYPE.SINGLE;
  });

  const regular = computed(() => {
    return props.type === DROPDOWN_TYPE.REGULAR;
  });

  const countryType = computed(() => {
    return props.type === DROPDOWN_TYPE.COUNTRY;
  });

  const treeMenuType = computed(() => {
    return props.type === DROPDOWN_TYPE.TREE_MENU;
  });

  const itemsForDisplay = computed(() => {
    if (!countryType.value) {
      return props.useSearch && searchText.value
        ? props.items.filter((item) => props.formatter(item).toLowerCase().includes(searchText.value.toLowerCase()))
        : props.items;
    }
    return props.useSearch && searchText.value
      ? props.items.filter((item) => item.country.toLowerCase().includes(searchText.value.toLowerCase()))
      : props.items;
  });

  const pillsForDisplay = computed(() => {
    if (multiSelect.value && Array.isArray(selectedItemsList.value)) {
      return selectedItemsList.value.map((item) => ({
        textLabel: countryType.value ? item.country : props.formatter(item),
        ...item,
      }));
    }
    return [];
  });

  const allItemsSelected = computed(() => {
    return selectableItems.value.length === selectedItemsList.value.length;
  });

  const centeredTitle = computed(() => {
    return !selectedItemsList.value.length && !props.subTitle;
  });

  const vueScrollStyles = computed(() => {
    if (!props.scrollHeight && !props.scrollMaxHeight) return {};
    if (props.scrollMaxHeight) return { maxHeight: `${props.scrollMaxHeight}px!important` };
    return { height: `${props.scrollHeight}px!important` };
  });

  const dropdownPosition = computed(() => {
    if (props.size === 'small') {
      return !props.showFirstLineLabel || !props.title ? 44 : 60;
    }

    if (props.size === 'medium') {
      return !props.showFirstLineLabel || !props.title ? 37 : 52;
    }
    return 40;
  });

  const onPillDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    selectedItemsList.value.splice(index, 1);
    emit('pill-delete', selectedItemsList.value);
    resetSelectedItemsListToAllIfNeeded();
  };
  const checkOverflow = () => {
    // const element = this.$refs['dropdown-tooltip'];
    if (dropdownTooltip.value) {
      const { clientWidth, scrollWidth } = dropdownTooltip.value;
      isOverflow.value = scrollWidth > clientWidth;
      return;
    }
    isOverflow.value = false;
  };

  const preventPillClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const clickOutside = (e) => {
    const targetContains = (className) => e && e.target && e.target.classList.contains(className);
    const relatedTargetContains = (className) => e && e.relatedTarget && e.relatedTarget.classList.contains(className);

    // We don't want to close if the click is on the scroll or search
    const isScrollClick = targetContains('__bar-is-vertical') || targetContains('__vuescroll');
    const isSearchClick = targetContains('search-input') || relatedTargetContains('search-input');
    const isSearchClearClick = targetContains('search-icon') || relatedTargetContains('search-icon');
    const isSearchWrapperClick =
      targetContains('search-input-container') || relatedTargetContains('search-input-container');

    const isChipsClicked =
      e &&
      e.relatedTarget &&
      e.relatedTarget.classList.contains('nmg-dropdown-chips') &&
      e.relatedTarget.classList.contains('open');
    const isCheckboxClicked = e && e.relatedTarget && e.relatedTarget.classList.contains('checkbox');
    const isTreeMenu =
      treeMenuType.value &&
      e &&
      e.target &&
      ((e.target.parentElement &&
        e.target.parentElement.className &&
        treeMenuElementClasses.value.includes(e.target.parentElement.className)) ||
        (e.target._prevClass && treeMenuElementClasses.value.includes(e.target._prevClass)));

    if (
      isScrollClick ||
      isSearchClick ||
      isSearchClearClick ||
      isChipsClicked ||
      isCheckboxClicked ||
      isTreeMenu ||
      isSearchWrapperClick
    ) {
      return;
    }
    close();
  };

  const close = () => {
    isDropdownOpen.value = false;
  };

  const toggleDropdownOpen = (val = undefined) => {
    isDropdownOpen.value = val || !isDropdownOpen.value;
  };

  const isSelected = (item) => {
    if (multiSelect.value && Array.isArray(selectedItemsList.value)) {
      return selectedItemsList.value.some((e) => !item.disabled && props.formatter(e) === props.formatter(item));
    }
    return (
      !item.disabled &&
      (item === selectedItemsList.value[0] || item?.value ? item.value === selectedItemsList.value[0]?.value : false)
    );
  };

  const selectAll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectableItems.value.length !== selectedItemsList.value.length) {
      selectedItemsList.value = selectableItems.value;
    } else {
      selectedItemsList.value = [];
    }
    emit('all-selected', selectedItemsList.value);
  };

  const handleItemClick = (e, item) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!item.disabled) {
      if (multiSelect.value) {
        if (selectedItemsList.value.every((e) => props.formatter(e) !== props.formatter(item))) {
          selectedItemsList.value.push(item);
        } else {
          selectedItemsList.value = selectedItemsList.value.filter((e) => props.formatter(e) !== props.formatter(item));
        }
        emit('dropdown-click', selectedItemsList.value);
      } else {
        selectedItemsList.value = [];
        selectedItemsList.value.push(item);
        emit('dropdown-click', item);
        toggleDropdownOpen();
        emit('dropdown-toggle', selectedItemsList.value);
      }
    }
  };

  const updateSelectedItem = (item) => {
    selectedItemsList.value = item || [];
  };

  const resetSelectedItemsListToAllIfNeeded = () => {
    if (
      props.resetSelectedItemsListToSelectAll &&
      multiSelect.value &&
      props.allItemsSelectedTitle &&
      !selectedItemsList.value.length
    ) {
      selectedItemsList.value = selectableItems.value;
      emit('all-selected', selectedItemsList.value);
    }
  };

  watch(
    () => isDropdownOpen.value,
    () => {
      if (!isDropdownOpen.value) {
        emit('dropdown-open', selectedItemsList.value);
        resetSelectedItemsListToAllIfNeeded();
      } else {
        emit('dropdown-close', this);
      }
    },
  );

  watch(
    () => props.selectedItems,
    (newVal) => {
      selectedItemsList.value = newVal;
      nextTick(() => {
        checkOverflow();
      });
    },
    { immediate: true },
  );

  watch(
    () => selectedItemsList.value,
    (newVal) => {
      if (!multiSelect.value) return;
      nextTick(() => {
        const { length } = newVal;
        if (!pillsContainer.value) return;
        numOfUndisplayedPills.value = length - getMaxDisplayableItemsForContainer(pillsContainer.value);
      });
    },
    { immediate: true },
  );

  onBeforeMount(() => {
    selectedItemsList.value = props.selectedItems;
    nextTick(() => {
      checkOverflow();
    });
  });

  defineExpose({
    searchIcon,
    moreInfo,
  });
</script>

<style lang="scss">
  .custom-tooltip[x-placement^='bottom-start'] {
    &.nmg-dropdown {
      margin-top: 11px;
      margin-left: 6.5px;
    }
  }
</style>
<style lang="scss" scoped>
  @import '../../styles/borders/borders.scss';
  @import '../../styles/colors/borders.scss';
  @import '../../styles/colors/background.module';
  @import '../../styles/corners/corners.scss';
  @import '../../styles/colors/text.module';
  @import '../../styles/colors/semantic.module';

  /* the tooltip wrapper prevents the input field to grow to 100% */
  :deep(.trigger),
  :deep(.v-popover) {
    width: 100%;
  }

  .disabled-item {
    cursor: not-allowed !important;

    &:hover {
      background-color: white !important;
    }
  }

  .nmg-dropdown-chips {
    position: relative;
    display: flex;
    color: $txt-primary;

    &.open {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    &.error {
      border: 1.5px solid $border-error-color;
    }

    .selected-items {
      position: relative;
      background-color: $bg-element;
    }

    &.disabled {
      pointer-events: none;

      .selected-items {
        background-color: $bg-disabled;
        color: $txt-disabled;

        .single-item-selected {
          color: $txt-disabled;
        }
      }

      .triangle-container .triangle {
        border-top: 6px solid $txt-disabled;
      }
    }

    &.clickable-content {
      pointer-events: none;
      opacity: 0.7;
    }

    .clickable-content {
      width: 100%;
      display: block;
      flex-direction: column;
      cursor: pointer;

      &.without-first-line {
        justify-content: center;
      }

      &.disabled {
        opacity: 0.7;
      }

      .title {
        display: flex;
        flex-direction: column;

        .first-line-label {
          color: $txt-primary;
          font-size: 12px;
          display: flex;
          line-height: 16px;
        }

        &.disabled {
          opacity: 0.7;
        }

        .first-line-icon {
          height: 16px;
          padding-left: 4px;

          &.centered {
            margin-top: 0;
          }

          img {
            width: 16px;
            height: 16px;
          }
        }
      }

      .selected-items {
        padding-top: 7px;

        &.border-error {
          border: 1px solid $border-error-color;
        }

        .pill-wrapper {
          padding-right: 8px;
        }

        .pills {
        }

        .all-items-selected {
        }

        .single-item-selected {
          color: $txt-primary;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 300px;
        }
      }
    }

    .scrollable-pills {
      margin-right: 36px;
      display: flex;
      overflow-x: scroll;

      .pill-wrapper {
        .pill-wrapper {
          padding-right: 8px;
          width: max-content;
        }
      }
    }

    .parent-element {
      overflow-y: hidden;

      .vue-scroll-wrapper {
        width: 100% !important;
      }

      &.open {
      }

      .list {
        max-height: 200px;
        overflow-x: hidden;
        overflow-y: auto;
        border-bottom-left-radius: $border-radius-medium;
        border-bottom-right-radius: $border-radius-medium;

        .list-item {
          &:not(:first-child) {
            margin-top: 3px !important;
          }

          border-radius: 0;

          .radio {
          }
        }
      }
    }

    .list {
      background-color: $bg-element;

      &-item {
        cursor: pointer;
        color: #10111b;
        font-size: 14px;
        display: flex;
        box-sizing: border-box;
        align-items: center;
        justify-content: flex-start;
        background-color: $bg-element;
        //height: 50px;
        height: 40px;
        gap: 15px;
        margin: 0 !important;
        padding: 0 16px;

        &:hover {
          background-color: $bg-element-hover;
        }

        &.selected {
          background-color: $bg-element-active;
        }
      }
    }

    .all-item {
      background-color: $bg-element;
      border-top: 0;
      border-bottom: 0;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 16px;
        right: 16px;
        height: 1px;
        background-color: $border-ui-color;
      }

      &:hover {
        background-color: $bg-element-hover;
      }

      .characters {
        color: $txt-primary;
        font-size: 12px;
        line-height: 16px;
        margin-left: auto;
      }
    }
  }

  .pills {
    overflow: hidden;
    max-width: 300px;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .multi {
    .pills {
      gap: initial;

      &.has-pills {
        height: 22px;
      }
    }

    .selected-items {
      display: grid;
      padding-top: 7px;
      grid-template-columns: 11fr min-content;
      //width: 318px;
    }
  }

  .size-small {
    height: 40px;
    box-sizing: border-box;
  }

  .multi .selected-items.size-small {
    padding-top: 7px;
  }

  .size-small .all-items-selected {
    padding-top: 3px;
  }

  .search-input-container {
    position: relative;
  }

  .triangle-container {
    position: absolute;
    right: 15px;
    cursor: pointer;
    height: 6px;

    .triangle {
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid $semantic-info-icon;
      border-radius: 3px;

      &.open {
        transform: rotate(180deg);
      }
    }
  }

  .popup {
    position: absolute;
    z-index: 500;
    width: 100%;
    border: 1px solid $border-ui-color;
    border-top: 0;
    border-bottom-left-radius: $border-radius-medium;
    border-bottom-right-radius: $border-radius-medium;
    //overflow: hidden;
    box-sizing: border-box;

    &.shadow {
    }

    &.error {
      border-top: none;
    }
  }

  .dense {
    display: flex;
    min-height: 48px;
  }

  .nmg-dropdown-chips.dense {
    .clickable-content {
      min-height: 48px;
      height: 48px;
      flex-direction: row;
      display: flex;

      .title {
        padding: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 4px;

        .first-line-label {
          margin-right: 4px;

          &.disabled {
            opacity: 0.7;
          }
        }
      }

      .selected-items {
        padding: 0;
        display: flex;
        align-items: center;
      }
    }

    .popup {
      top: 49px;
    }
  }

  .inline {
    width: auto !important;
    display: inline-flex;
    padding-right: 30px;
    border: 0;
    background: transparent;
    height: 30px !important;
    min-height: 30px !important;
    top: 0 !important;

    .clickable-content {
      height: 30px;
      min-height: 30px;

      .title {
        padding: 0;
      }
    }

    .first-line-label {
      display: none !important;
    }

    &.disabled {
      border: none !important;
      background-color: transparent !important;
    }

    .popup {
      border-top: solid 1px #585961;
      width: max-content;
      top: 30px;
    }

    .triangle {
      border: none;
      width: 10px;
      height: 10px;
      background-image: url('../../assets/icons/arrows/ChevronDown.svg');
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  .prepend-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    //height: 48px;
    height: auto;
    margin-right: 16px;
  }

  .error-message {
    padding-top: 4px;
    color: $semantic-negative;
    font-size: 12px;
    line-height: 11px;
    position: absolute;
  }

  .mandatory-char {
    color: $semantic-negative;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: $bg-shapes;
  }

  .color-swatch {
    width: 10px;
    height: 10px;
    border-radius: 2px;
  }
</style>
