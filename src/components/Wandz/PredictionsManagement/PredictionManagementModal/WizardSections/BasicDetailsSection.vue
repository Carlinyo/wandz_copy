<template>
  <div>
    <section-header :title="MODEL_STEP2_STRINGS.BASIC_TITLE" />
    <div class="inputs-wrapper">
      <text-input
        :label="MODEL_STEP2_STRINGS.MODEL_NAME_TITLE"
        v-model="modelName"
        :value="modelName"
        :placeholder="MODEL_STEP2_STRINGS.MODEL_NAME_PLACEHOLDER"
        :width="0"
      />
      <text-input
        :label="MODEL_STEP2_STRINGS.MODEL_DESCRIPTION_TITLE"
        v-model="modelDescription"
        :value="modelDescription"
        :placeholder="MODEL_STEP2_STRINGS.MODEL_DESCRIPTION_PLACEHOLDER"
        :width="0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { computed, watchEffect } from 'vue';

  import textInput from '@/design-library/src/components/TextInput/TextInput.vue';

  import { MODEL_STEP2_STRINGS } from '../consts';
  import SectionHeader from '../SectionHeader';
  import { usePredictionManagementStore } from '@/stores/wandz';
  import { WandzCommonEmits } from '@/components/Wandz/types';

  const createModelStore = usePredictionManagementStore();
  const { predictionModelObj } = storeToRefs(createModelStore);

  const emit = defineEmits([WandzCommonEmits.IS_VALID_SECTION_EVENT]);

  const modelName = computed({
    get: () => predictionModelObj.value.name,
    set: (value) => (predictionModelObj.value.name = value),
  });

  const modelDescription = computed({
    get: () => predictionModelObj.value.description,
    set: (value) => (predictionModelObj.value.description = value),
  });

  const isValid = computed(() => {
    return !!modelName.value.length;
  });

  watchEffect(() => {
    emit(WandzCommonEmits.IS_VALID_SECTION_EVENT, isValid.value);
  });
</script>

<style scoped lang="scss">
  .inputs-wrapper {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
</style>
