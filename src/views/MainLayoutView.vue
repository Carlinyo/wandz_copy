<script setup lang="ts">
  import TopBar from '../design-library/src/components/TopBar/TopBar.vue';
  import SidebarMenu from '../design-library/src/components/SidebarMenu/SidebarMenu.vue';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { ROUTES_PER_VIEW } from '@/router/RoutesInfo';

  const router = useRouter();

  const userInfo = ref({
    name: 'name',
    username: 'some_user@namogoo.com',
    image: null,
    group: 'admin',
    initials: 'E',
  });

  const clients = ref([
    {
      id: '0010600001yLdN6AAK',
      name: ' Mika Test',
      tag: 'MIKABK104',
    },
    {
      id: '0010600001yLdN6AAK',
      name: ' Mika Test',
      tag: 'MIKABK104',
    },
    {
      id: '0010600001yLdN6AAK',
      name: ' Mika Test',
      tag: 'MIKABK104',
    },
  ]);

  const settingsOptions = () => {
    return ROUTES_PER_VIEW.settings.children;
  };
  const handlePageClicked = (page) => {
    // Push the new route to the router
    router.push(page.link); // Assuming there's a "link" property in your page object
  };
  const handleSettingsPageClicked = (page) => {
    router.push(page.path);
  };
</script>

<template>
  <div class="main-layout-view">
    <div
      id="view-container"
      ref="viewContainer"
      class="view-container"
    >
      <top-bar
        screen-name="Dashboard"
        :clients="clients"
        :profile-info="userInfo"
        :settings-options="settingsOptions()"
        @on-page-select="handleSettingsPageClicked"
      />
      <sidebar-menu @page-clicked="handlePageClicked" />

      <div class="view-container-body">
        <router-view class="view" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .view-container {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow-x: hidden;
    display: flex;

    .view-container-body {
      box-sizing: border-box;
      position: relative;
      top: 54px;
      width: 100%;
      padding: 32px 48px;

      .view {
        margin: auto;
        padding-bottom: 16px;
      }
    }
  }

  @media (max-width: 1230px) {
    .view-container {
      max-width: 1280px;
      overflow-x: auto;

      .view {
        max-width: 100%;
        min-width: 1280px;
      }
    }
    .nmg-topbar {
      width: 100%;
      min-width: 1280px;
    }
    .nmg-footer-container {
      min-width: 1280px;
    }
  }

  @media print {
    .view-container {
      left: 0;
      right: 0;
      bottom: 0;
      top: 15px;
      overflow-y: auto;
      overflow-x: hidden;
      position: relative;
    }
  }
</style>
