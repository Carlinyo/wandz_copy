<template>
  <div class="element-container treshold-recalculation">
    <div class="treshold-recalculation-details">
      <div class="flex-item">
        <div class="container-title txt-primary">{{ title }}</div>
        <tooltip title="info"><img :src="infoIcon" /></tooltip>
      </div>
      <div class="small-label-title txt-secondary">
        {{ subtitle }}
      </div>
      <div class="flex-item button-and-input">
        <numeric-input-stepper
          :score="actionsScore"
          :min="INPUT_CONFIG.MIN"
          :max="INPUT_CONFIG.MAX"
          :step="INPUT_CONFIG.STEP"
          :show-error="showMessage"
          @change-score="changeScore"
        />
        <custom-button
          style-type="primary"
          class="keeped-text"
          :disabled="btnDisabled"
          :custom-width="128"
          @click="reCalculate"
        >
          <div v-if="!loading">{{ TEXTS.BUTTON_TEXT }}</div>
          <spinning-wheel v-else />
        </custom-button>
      </div>
    </div>
    <div
      v-if="hasBack"
      class="flex-end flex-item actions-flex-item"
    >
      <div
        class="flex-item semantic-info action overline-title"
        @click="cancel"
      >
        <img :src="RevertLeftIcon" />{{ TEXTS.CANCEL }}
      </div>
    </div>
    <div
      v-else-if="calculated"
      class="flex-item actions-flex-item"
    >
      <div
        class="flex-item semantic-info action overline-title keeped-text"
        @click="backToDefault"
      >
        <img :src="RevertLeftIcon" />{{ TEXTS.BACK_TO_DEFAULT }} {{ score }}
      </div>
      <div class="txt-secondary small-label-title keeped-text">{{ TEXTS.OR }}</div>
      <div
        @click="save"
        class="semantic-info action overline-title keeped-text"
      >
        {{ TEXTS.SAVE_CHANGES }}
      </div>
    </div>
    <snackbar
      v-if="snackbar"
      :text="TEXTS.SNACKBAR_TEXT"
      :timerToDisappear="3"
      @snackbarClickButtonX="closeSnackbar"
      @hide-by-timer="closeSnackbar"
      class="snackbar"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import Tooltip from '@/design-library/src/components/Tooltip/Tooltip.vue';
  import NumericInputStepper from '@/design-library/src/components/NumericInputStepper/NumericInputStepper.vue';
  import CustomButton from '@/design-library/src/components/Button/Button.vue';
  import SpinningWheel from '@/design-library/src/components/SpinningWheel';
  import infoIcon from '@/design-library/src/assets/icons/info/info.svg';
  import RevertLeftIcon from '@/design-library/src/assets/icons/arrows/revert-left.svg';
  import { TEXTS, INPUT_CONFIG } from './consts';
  import { TRESHOLD_RECALCULATION_ACTIONS } from '@/design-library/src/types/enums/TresholdRecalculation';
  import Snackbar from '@/design-library/src/components/Snackbars/Snackbars.vue';
  import debounce from 'debounce';

  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  });

  const emit = defineEmits(['changeScore']);

  const snackbar = ref(false);
  const actionsScore = ref(props.score);
  const showMessage = ref(true);

  const actions = ref([TRESHOLD_RECALCULATION_ACTIONS.DEFAULT]);

  const lastAction = computed(() => {
    return actions.value.at(-1);
  });

  const btnDisabled = computed(() => {
    return TEXTS.RULES.BUTTON_DEFAULT.includes(lastAction.value) || actionsScore.value === props.score;
  });

  const hasBack = computed(() => {
    return TEXTS.RULES.HAS_BACK.includes(lastAction.value) && actionsScore.value !== props.score;
  });

  const calculated = computed(() => {
    return TEXTS.RULES.CALCULATED.includes(lastAction.value);
  });

  const loading = computed(() => {
    return lastAction.value === TRESHOLD_RECALCULATION_ACTIONS.CALCULATING;
  });

  const changeScore = (e: number): void => {
    actions.value.push(TRESHOLD_RECALCULATION_ACTIONS.CHANGED);
    actionsScore.value = e;
    showMessage.value = true;
  };

  const closeSnackbar = (): void => {
    snackbar.value = false;
  };

  const reCalculate = (): void => {
    showMessage.value = false;
    actions.value.push(TRESHOLD_RECALCULATION_ACTIONS.CALCULATING);
    debounce(() => {
      actions.value.pop();
      actions.value.push(TRESHOLD_RECALCULATION_ACTIONS.CALCULATED);
    }, 2000)();
  };

  const revertActionsArray = (): void => {
    actions.value = [TRESHOLD_RECALCULATION_ACTIONS.DEFAULT];
  };

  const save = (): void => {
    revertActionsArray();
    snackbar.value = true;
    emit('changeScore', actionsScore.value);
  };

  const backToDefault = (): void => {
    revertActionsArray();
    actionsScore.value = props.score;
  };

  const removeChanges = (): void => {
    actions.value = actions.value.filter((el) => el !== TRESHOLD_RECALCULATION_ACTIONS.CHANGED);
  };

  const cancel = (): void => {
    const LastAction: string[] = actions.value.filter((el) => el !== TRESHOLD_RECALCULATION_ACTIONS.CHANGED);
    if (LastAction.at(-1) === TRESHOLD_RECALCULATION_ACTIONS.CALCULATED) {
      removeChanges();
    } else {
      revertActionsArray();
    }
    actionsScore.value = props.score;
  };
</script>

<style lang="scss" scoped>
  .flex-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
  }

  .actions-flex-item {
    padding: 0 18.5px;
    gap: 30px;
  }

  .flex-end {
    justify-content: flex-end;
  }

  .treshold-recalculation {
    width: 100%;
    height: 233px;
    &-details {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }

  .action {
    cursor: pointer;
  }

  .snackbar {
    left: unset !important;
    top: unset !important;
    right: 20px;
    bottom: 20px;
  }

  .button-and-input {
    gap: 30px;
  }

  .keeped-text {
    white-space: nowrap;
  }
</style>
