<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import MainLayoutView from './views/MainLayoutView.vue';
</script>

<template>
  <div id="app">
    <router-view class="parent-view">
      <MainLayoutView />
    </router-view>
  </div>
</template>

<style scoped lang="scss"></style>
