<template>
  <div class="copied-code-block-wrapper">
    <div class="top-line-wrapper">
      <div class="bold-title">{{ title }}</div>
      <div class="icons-wrapper">
        <div
          class="icon help-button"
          @click="helpClicked"
        >
          <img :src="helpIcon" />
        </div>
        <div
          class="icon copy-code-button"
          @click="copyToClipboard"
        >
          <img :src="copyToClip" />
        </div>
      </div>
    </div>
    <div class="code-area border-radius-small bg-secondary-element">
      <pre v-highlightjs>
      <code class="js-code" :class="lang">{{ codeBlock }}</code>
    </pre>
    </div>
    <div
      class="snackbar-wrapper"
      v-if="showSnackbar"
    >
      <Snackbar
        :text="snackbarText"
        :timerToDisappear="3"
        @snackbarClickButtonX="closeSnackbar"
        @hide-by-timer="closeSnackbar"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import copyToClip from '../../assets/icons/actions/copy-to-clip.svg';
  import helpIcon from '../../assets/icons/info/help.svg';
  import Snackbar from '../Snackbars/Snackbars.vue';

  import { ref } from 'vue';

  const props = defineProps({
    codeBlock: {
      type: String,
    },
    lang: {
      type: String,
      default: 'javascript',
    },
    title: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits(['help-clicked']);

  const showSnackbar = ref(false);
  const snackbarText = ref('');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.codeBlock);
    snackbarText.value = 'Script copied';
    showSnackbar.value = true;
  };

  const helpClicked = () => {
    emit('help-clicked');
  };

  const closeSnackbar = () => {
    showSnackbar.value = false;
  };
</script>

<style lang="scss" scoped>
  @import '@/design-library/src/styles/borders/borders';

  .copied-code-block-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .top-line-wrapper {
      display: flex;
      justify-content: space-between;

      .icons-wrapper {
        display: flex;
        gap: 8px;

        .icon {
          cursor: pointer;
        }
      }
    }

    .code-area {
      padding: 8px 16px;
      border: $border;

      pre,
      code {
        display: -webkit-box;
        overflow: auto;
      }
    }

    .snackbar-wrapper {
      position: fixed;
    }
  }
</style>
