<template>
  <div
    class="card-wrapper"
    :class="{
      selected,
      'border-radius-small border shadow': !isComingSoon,
      'coming-soon': isComingSoon,
    }"
  >
    <template v-if="isComingSoon">
      <img
        class="coming-soon-icon"
        :src="ComingSoonIcon"
        v-if="isComingSoon"
      />
      <div class="txt-secondary body-micro">
        {{ title }}
      </div>
    </template>
    <template v-else>
      <img
        :src="CheckedIcon"
        class="selected-icon"
        v-if="selected"
      />
      <div class="txt-primary bold-title">
        {{ title }}
      </div>
      <div class="description-wrapper">
        <div class="txt-secondary body-tiny">
          {{ description }}
        </div>
        <div class="icon-wrapper">
          <div
            class="icon-circle"
            v-if="icon"
            :style="{
              background: iconBgColor,
            }"
          >
            <img :src="icon" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import CheckedIcon from '../../assets/icons/check-marks/checked-new.svg';
  import ComingSoonIcon from '../../assets/icons/misc/CommingSoon.svg';

  const props = defineProps({
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
    isSelected: {
      type: Boolean,
      default: false,
    },
    isComingSoon: {
      type: Boolean,
      default: false,
    },
    iconBgColor: {
      type: String,
      default: '#F1EBF8',
    },
  });
  const selected = computed(() => props.isSelected && !props.isComingSoon);
</script>

<style scoped lang="scss">
  @import '../../styles/spacing/spacing.scss';

  .card-wrapper {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: $SP16;
    height: 96px;
    position: relative;

    &.coming-soon {
      align-items: center;
      gap: $SP8;
      padding: $SP8;

      .body-micro {
        text-align: center;
      }
    }

    &:hover:not(.coming-soon) {
      cursor: pointer;
    }
  }

  .description-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
  }

  .icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 40px;
  }

  .icon-circle {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    height: 40px;
    width: 40px;
  }

  .selected-icon {
    position: absolute;
    right: -7px;
    top: -7px;
    width: 16px;
    height: 16px;
  }

  .coming-soon-icon {
    width: 71px;
    height: 50px;
  }
</style>
