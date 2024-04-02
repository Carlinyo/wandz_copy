<template>
  <div
    @click="onTabClick"
    class="tab-container"
    :class="{ 'bold-selected': selected }"
  >
    <span>{{ displayNameGenerator(item) }}</span>
  </div>
</template>

<script setup>
  const props = defineProps({
    displayNameGenerator: {
      type: Function,
      default: (data) => data.name,
    },
    item: {
      type: Object,
      default: () => ({}),
    },
    selected: {
      type: Boolean,
      default: false,
    },
  });

  defineOptions({
    name: 'SimpleTab',
  });

  const emit = defineEmits(['on-item-click']);

  const onTabClick = () => {
    emit('on-item-click', props.item);
  };
</script>

<style scoped lang="scss">
  .tab-container {
    color: #000000;
    cursor: pointer;
    font-size: 14px;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .bold-selected {
    font-family: Figtree;
  }
</style>
