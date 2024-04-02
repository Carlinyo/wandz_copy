<template>
  <div class="settings-container">
    <div class="tabs-menu-container">
      <top-tabs
        :tabs="settingRoutes"
        :box-style="false"
        :tab-index="selectedTab"
        :background-color="false"
        @on-tab-click="handleTabClicked"
      />
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
  import TopTabs from '@/design-library/src/components/TopTabs/TopTabs.vue';
  import { onMounted, ref, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { ROUTES_PER_VIEW } from '@/router/RoutesInfo';
  import type { IRouteItem } from '@/router/iRouteItem';

  const route = useRoute();
  const router = useRouter();

  const selectedTab = ref(0); // default
  onMounted(async () => {
    // In case we enter to other tab in settings which is not the first tab
    setSelectedTab(route.path);
  });

  watch(
    () => route.path,
    async () => {
      setSelectedTab(route.path);
    },
  );

  const settingRoutes = ref(ROUTES_PER_VIEW.settings.children);

  const handleTabClicked = (data: IRouteItem) => {
    router.push(data.path);
  };

  const setSelectedTab = (path: string) => {
    selectedTab.value = ROUTES_PER_VIEW.settings.children!.findIndex((elem) => elem.path === path);
  };
</script>

<style scoped lang="scss">
  @import '@/design-library/src/styles/borders/borders';

  .tabs-menu-container {
    width: 100%;
    padding-left: 48px;
    padding-top: 16px;
    border-bottom: $border;
    background-color: white;
    position: fixed;
    z-index: 101;
    margin-top: -32px;
    margin-left: -48px;
  }
</style>
