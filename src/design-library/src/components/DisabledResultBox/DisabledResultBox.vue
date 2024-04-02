<template>
  <div class="disable-container">
    <img
      :src="iconToShow"
      :class="{ 'small-icon': smallIcon }"
    />
    <div
      v-if="title"
      class="title"
      v-html="title"
    />
    <div class="inner-text-wrapper">
      <inline-text-button
        v-if="btnText"
        class="inner-text-with-button"
        pre-text=""
        :button-text="btnText"
        :post-text="innerText"
        :on-click="btnClick"
      >
        {{ btnText }}
      </inline-text-button>
      <div
        v-else
        class="inner-text small-label-title"
        v-html="innerText"
        @click="innerTextClick"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { PropType } from 'vue';
  import InlineTextButton from '../InlineTextButton';
  import { IconTypes } from '../../types/enums/DisabledResultBox';
  import { ICON_MAPPING } from '../../types/interfaces/DisabledResultBox';

  export default {
    name: 'DisabledResultBox',
    components: {
      InlineTextButton,
    },
    props: {
      title: {
        type: String,
        default: '',
      },
      innerText: {
        type: String,
        default: '',
      },
      btnText: {
        type: String,
        default: '',
      },
      iconName: {
        type: String as PropType<IconTypes>,
        default: IconTypes.NO_DATA,
      },
      smallIcon: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      iconToShow() {
        return ICON_MAPPING[this.iconName] || ICON_MAPPING[IconTypes.NO_DATA];
      },
    },
    methods: {
      innerTextClick() {
        this.$emit('innerTextClick');
      },
      btnClick() {
        this.$emit('btnClick');
      },
    },
  };
</script>

<style scoped lang="scss">
  .disable-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;

    .title {
      margin-top: 24px;
      font-size: 14px;
      font-weight: 600;
    }
    .inner-text-wrapper {
      display: flex;
      align-items: baseline;
      .inner-text {
        margin-top: 8px;
        text-align: center;
      }
      .inner-text-with-button {
        margin-top: 8px;
        text-align: center;
      }
    }
    .small-icon {
      height: 44px;
      width: 44px;
    }
  }
</style>
