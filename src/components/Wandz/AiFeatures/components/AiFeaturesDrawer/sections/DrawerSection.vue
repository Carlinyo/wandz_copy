<template>
  <section>
    <div
      class="section-title"
      v-text="title"
    />
    <slot name="content" />
  </section>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'DrawerSection',
  });

  defineProps({
    title: {
      type: String,
      default: '',
    },
  });
</script>

<style scoped lang="scss">
  @import '@/design-library/src/styles/colors/background.module';

  section {
    .section-title {
      position: relative;
      padding: 8px 50px 8px 0;
      border-radius: 0 24px 24px 0;
      width: fit-content;
      z-index: 1;
      margin-bottom: 16px;

      &:before {
        background-color: $bg-primary;
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        border-radius: 0 24px 24px 0;
        z-index: -1;
        right: 32px;
        top: 0;
      }
    }
  }
</style>
