<template>
  <div
    class="nmg-menu shadow-bold border-radius-medium"
    v-if="showMenu"
    v-on-clickaway="clickOutside"
    @click.stop="() => {}"
  >
    <div
      v-for="(item, idx) in items"
      :key="item.text"
      class="nmg-menu-item"
      :class="{ selected: item.isSelected, disabled: item.isDisabled }"
      @click.stop="onClick(item, idx)"
    >
      <div
        class="nmg-menu-item-inner"
        :class="{ selected: item.isSelected }"
      >
        <div class="header-wrapper">
          <div
            v-if="item.iconSrc"
            class="main-img-cont"
          >
            <img :src="item.iconSrc" />
          </div>

          <div class="header-text-wrapper">
            <span class="header txt-primary body-small-bold">{{ item.header }}</span>
            <tags
              class="tags"
              v-if="item.tagsType || item.tagsText"
              :type="item.tagsType"
              :text="item.tagsText"
            ></tags>
          </div>
          <div class="additional-img-cont">
            <img
              v-if="item.iconSrcAdditional"
              :src="item.iconSrcAdditional"
            />
          </div>
        </div>
        <div
          class="text-wrapper body-small"
          :class="{ noIcon: !item.iconSrc }"
        >
          <span class="text txt-secondary">
            {{ item.text }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Tags from '../Tags';
  import { directive as onClickaway } from 'vue3-click-away';
  export default {
    name: 'MenuWithDescription',
    components: { Tags },
    directives: {
      onClickaway,
    },
    props: {
      items: {
        type: Array,
        required: true,
        default: () => [], // NOTE: [{ header: '', text:'', value: '', iconSrc: '', iconSrcAdditional: '', isSelected: false, tagsType: '', tagsText: '' }]
      },
      showMenu: {
        type: Boolean,
        default: true,
      },
    },
    methods: {
      onClick(item, idx) {
        this.items.forEach((item) => {
          item.isSelected = false;
        });
        this.items[idx].isSelected = true;
        this.$emit('on-item-click', item, idx);
      },
      clickOutside() {
        this.$emit('close');
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/colors/background.module';
  @import '../../styles/colors/text.module';
  @import '../../styles/colors/borders';

  .nmg-menu {
    width: 100%;
    background-color: $bg-element;
    overflow: hidden;
    border: 1px solid $border-ui-color;

    &-item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      &:not(.selected):hover .nmg-menu-item-inner {
        background-color: $bg-element-hover;
      }
    }
    &-item-inner {
      width: 100%;
      margin: auto;
      padding: 16px;

      &.selected {
        background-color: $bg-element-active;
      }
      .header-wrapper {
        display: flex;
        gap: 8px;
        align-items: center;
        .header-text-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .main-img-cont {
          width: 24px;
          height: 24px;
          img {
            width: 24px;
            height: 24px;
          }
        }
        .additional-img-cont {
          width: 16px;
          height: 16px;
          margin-left: auto;
        }
      }
      .text-wrapper {
        padding-left: 32px;
        padding-right: 18px;
        &.noIcon {
          padding: 0px !important;
        }
      }
    }
  }

  .nmg-menu-item.disabled .header,
  .nmg-menu-item.disabled .text {
    color: $txt-disabled;
  }

  .nmg-menu-item.disabled .main-img-cont img,
  .nmg-menu-item.disabled .additional-img-cont img {
    opacity: 0.3;
  }
</style>
