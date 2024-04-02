import { defineStore } from 'pinia';
import { onBeforeMount, ref } from 'vue';
import { UserRoles } from '@wandzai/wandz-interfaces';
import type { IUser } from '@/types';

export const useSessionStore = defineStore('session', () => {
  const user = ref<IUser>();
  const clientTag = ref<string>();
  const domains = ref<string[]>([]);
  let selectedDomain = ref<string>();

  const setSelectedDomain = (domain: string) => {
    selectedDomain.value = domain;
  };

  const initStore = async () => {
    //await Promise.all([]);
    user.value = { name: 'test user', email: 'test_email@test.com', accountRole: UserRoles.ADMIN };
    clientTag.value = 'WANDZ123';
    domains.value = ['domainA.com', 'domainB.com', 'domainC.com'];
    selectedDomain.value = domains.value[0];
  };
  onBeforeMount(async () => await initStore());

  return {
    user,
    clientTag,
    selectedDomain,
    domains,
    setSelectedDomain,
  };
});
