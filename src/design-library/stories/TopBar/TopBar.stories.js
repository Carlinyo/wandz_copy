import { action } from '@storybook/addon-actions';
import TopBar from '../../src/components/TopBar';

export default {
  title: 'TopBar',
  argTypes: {
    clients: {
      control: { type: 'object' },
    },
    profileInfo: {
      control: { type: 'object' },
    },
    profileOptions: {
      control: { type: 'object' },
    },
    settingsOptions: {
      control: { type: 'object' },
    },
    selectedClient: {
      control: { type: 'object' },
    },
    selectedClientDomain: {
      control: { type: 'text' },
    },
    showClientList: {
      control: { type: 'boolean' },
    },
    screenName: {
      control: { type: 'text' },
    },
  },
  args: {
    clients: [
      { id: '0010600001yLdN6AAK', name: ' Mika Test', tag: 'MIKABK104' },
      { id: '0010600001yLdN7AAK', name: ' Mika Test 2', tag: 'MIKABK105' },
      { id: '0010600001yLdN8AAK', name: ' Mika Test 3', tag: 'MIKABK106' },
    ],
    profileInfo: { name: 'eden', username: 'eden.vizanski@namogoo.com', image: null, group: 'admin', initials: 'E' },
    profileOptions: [
      {
        icon: 'https://platform.namogoo.com/img/logout.1d39bac7.svg',
        name: 'Logout',
        permissions: ['view'],
        action: {
          _custom: {
            type: 'function',
            display: '<span style="opacity:.5;">function</span> action()',
            tooltip: '<pre>async()=>{await e.push("/login"),await t.dispatch(i.kS)}</pre>',
            _reviveId: 85,
          },
        },
      },
    ],
    settingsOptions: [
      {
        name: 'Company Information',
        displayName: 'Company Information',
        navigateTo: '/settings/company',
        path: 'company',
        product: 'settings',
        permissions: ['share'],
        icon: 'https://platform.namogoo.com/img/companyInfoIcon.e842655d.svg',
      },
      {
        name: 'Profile',
        displayName: 'Profile',
        navigateTo: '/settings/information',
        path: 'information',
        product: 'settings',
        permissions: [],
        shouldTopBarDisplayNaveAndAvatar: true,
        icon: 'https://platform.namogoo.com/img/profileIcon.dd1309a2.svg',
      },
      {
        name: 'Permissions',
        displayName: 'Permissions',
        navigateTo: '/settings/permissions',
        path: 'permissions',
        product: 'settings',
        permissions: [],
        hasInnerNavigationProductTabs: true,
        icon: 'https://platform.namogoo.com/img/permissionsIcon.1a05deb2.svg',
      },
      {
        name: 'User Management',
        displayName: 'User Management',
        navigateTo: '/settings/user-management',
        path: 'user-management',
        product: 'settings',
        permissions: ['share'],
        icon: 'https://platform.namogoo.com/img/userManagementIcon.f02a1837.svg',
      },
      {
        icon: 'https://platform.namogoo.com/img/internalServices.ebcaf205.svg',
        product: 'settings',
        navigateTo: '/settings/account-management',
        permissions: ['WhatsNewEditor', 'CustomSelfServePackages', 'AccountManagement'],
        name: 'Internal-Services',
        innerNavigation: {
          whatsNewEditor: {
            name: "What's New Editor",
            displayName: "What's New Editor",
            navigateTo: '/settings/whats-new-editor',
            path: 'whats-new-editor',
            product: 'settings',
            permissions: ['WhatsNewEditor'],
          },
          accountManagement: {
            name: 'Account Management',
            displayName: 'Account Management',
            navigateTo: '/settings/account-management',
            path: 'account-management',
            product: 'settings',
            permissions: ['AccountManagement'],
          },
          settingCustomSelfServePackages: {
            name: 'Shopify Payment Request',
            displayName: 'Shopify Payment Request',
            navigateTo: '/settings/custom-self-serve-package',
            path: 'custom-self-serve-package',
            product: 'settings',
            permissions: ['CustomSelfServePackages'],
          },
          accountCreation: {
            name: 'Account Creation',
            displayName: 'Account Creation',
            navigateTo: '/settings/account-creation',
            path: 'account-creation',
            product: 'settings',
            permissions: ['AccountManagement'],
          },
        },
      },
    ],
    selectedClient: {
      id: '0010600001yLdN6AAK',
      tag: 'MIKABK104',
      accountType: 'Enterprise',
      accountStatus: 'Customer',
      accountOwner: 'Gal Charag',
      accountOwnerMail: 'gal.charag@namogoo.com',
      brandLogoSrc: null,
      brandColor: null,
      name: ' Mika Test',
      ds: 'Namogoo',
      salesforceId: '0010600001yLdN6AAK',
      groupKey: 'admin',
      hasAnalytics: 1,
      firstLogIn: true,
      isIbpTrial: false,
      isAppDeleted: false,
      tags: ['MIKABK104'],
      domains: [
        { domain: 'alex-test-can-be-removed.com', tag: 'MIKABK104' },
        { domain: 'audit-onboarding-test.myshopify.com', tag: 'MIKABK104' },
        { domain: 'bigcommerce-karin.mybigcommerce.com', tag: 'MIKABK104' },
        { domain: 'dsadsa.com', tag: 'MIKABK104' },
        { domain: 'magento-692374-3109819.cloudwaysapps.com', tag: 'MIKABK104' },
        { domain: 'magento-692374-3109912.cloudwaysapps.com', tag: 'MIKABK104' },
        { domain: 'magento-692374-3168240.cloudwaysapps.com', tag: 'MIKABK104' },
        { domain: 'nmg-test-1.com', tag: 'MIKABK104' },
        { domain: 'nmg-test-prod-10.myshopify.com', tag: 'MIKABK104' },
        { domain: 'nmg-test-prod.myshopify.com', tag: 'MIKABK104' },
        { domain: 'nmg-test-stg.myshopify.com', tag: 'MIKABK104' },
        { domain: 'nmg-test.mybigcommerce.com', tag: 'MIKABK104' },
        { domain: 'non-platform-november.myshopify.com', tag: 'MIKABK104' },
        { domain: 'test-onboarding-0703.myshopify.com', tag: 'MIKABK104' },
        { domain: 'test-time-zone.com', tag: 'MIKABK104' },
        { domain: 'woocommerce-692374-3101112.cloudwaysapps.com', tag: 'MIKABK104' },
        { domain: 'woocommerce-692374-3101138.cloudwaysapps.com', tag: 'MIKABK104' },
        { domain: 'woocommerce-692374-3122398.cloudwaysapps.com', tag: 'MIKABK104' },
        { domain: 'woocommerce-692374-3122406.cloudwaysapps.com', tag: 'MIKABK104' },
        { domain: 'www.mika.com', tag: 'MIKABK104' },
      ],
      domainsInfo: {
        'alex-test-can-be-removed.com': {
          currency: 'AED',
          source: null,
          storeType: null,
          timezoneOffset: -12,
          maxActiveCampaignsInTrial: 1,
          ibpStatus: 'Active',
          mlAbSplit: 90,
          rbAbSplit: 100,
          isActive: 1,
          tagStatus: 0,
          createdAt: '2023-07-12T15:06:56.000Z',
          countryCode: null,
        },
        'audit-onboarding-test.myshopify.com': {
          currency: 'ILS',
          source: 'shopify',
          storeType: 'shopify',
          timezoneOffset: -5,
          maxActiveCampaignsInTrial: 1,
          ibpStatus: 'Active',
          mlAbSplit: 90,
          rbAbSplit: 100,
          isActive: 1,
          tagStatus: 0,
          createdAt: '2023-03-26T11:29:12.000Z',
          countryCode: null,
        },
        'bigcommerce-karin.mybigcommerce.com': {
          currency: 'USD',
          source: null,
          storeType: null,
          timezoneOffset: 2,
          maxActiveCampaignsInTrial: 1,
          ibpStatus: 'Active',
          mlAbSplit: 90,
          rbAbSplit: 100,
          isActive: 1,
          tagStatus: 0,
          createdAt: '2022-10-30T17:30:32.000Z',
          countryCode: null,
        },
        'dsadsa.com': {
          currency: 'AED',
          source: 'onboarding',
          storeType: null,
          timezoneOffset: -12,
          maxActiveCampaignsInTrial: 1,
          ibpStatus: 'Active',
          mlAbSplit: 90,
          rbAbSplit: 100,
          isActive: 1,
          tagStatus: 0,
          createdAt: '2023-08-24T14:06:58.000Z',
          countryCode: null,
        },
        'magento-692374-3109819.cloudwaysapps.com': {
          currency: 'USD',
          source: 'magento',
          storeType: 'Magento',
          timezoneOffset: -6,
          maxActiveCampaignsInTrial: 1,
          ibpStatus: 'Active',
          mlAbSplit: 90,
          rbAbSplit: 100,
          isActive: 1,
          tagStatus: 0,
          createdAt: '2022-12-15T17:18:11.000Z',
          countryCode: null,
        },
        'magento-692374-3109912.cloudwaysapps.com': {
          currency: 'USD',
          source: 'magento',
          storeType: 'Magento',
          timezoneOffset: -6,
          maxActiveCampaignsInTrial: 1,
          ibpStatus: 'Active',
          mlAbSplit: 90,
          rbAbSplit: 100,
          isActive: 1,
          tagStatus: 0,
          createdAt: '2022-12-15T17:19:24.000Z',
          countryCode: null,
        },
        'magento-692374-3168240.cloudwaysapps.com': {
          currency: 'USD',
          source: 'magento',
          storeType: 'Magento',
          timezoneOffset: -6,
          maxActiveCampaignsInTrial: 1,
          ibpStatus: 'Active',
          mlAbSplit: 90,
          rbAbSplit: 100,
          isActive: 1,
          tagStatus: 0,
          createdAt: '2023-01-08T16:04:22.000Z',
          countryCode: null,
        },
        'nmg-test-1.com': {
          currency: 'AED',
          source: 'onboarding',
          storeType: null,
          timezoneOffset: -12,
          maxActiveCampaignsInTrial: 1,
          ibpStatus: 'Active',
          mlAbSplit: 90,
          rbAbSplit: 100,
          isActive: 1,
          tagStatus: 0,
          createdAt: '2023-03-16T15:39:52.000Z',
          countryCode: null,
        },
        'nmg-test-prod-10.myshopify.com': {
          currency: 'ILS',
          source: 'shopify',
          storeType: 'shopify',
          timezoneOffset: 2,
          maxActiveCampaignsInTrial: 1,
          ibpStatus: 'Trial',
          mlAbSplit: 90,
          rbAbSplit: 100,
          isActive: 1,
          tagStatus: 0,
          createdAt: '2022-10-12T12:30:16.000Z',
          countryCode: null,
        },
        'nmg-test-prod.myshopify.com': {
          currency: 'ILS',
          source: 'shopify',
          storeType: 'shopify',
          timezoneOffset: -5,
          maxActiveCampaignsInTrial: 1,
          ibpStatus: 'Active',
          mlAbSplit: 90,
          rbAbSplit: 100,
          isActive: 1,
          tagStatus: 0,
          createdAt: '2022-12-15T17:22:44.000Z',
          countryCode: null,
        },
        'nmg-test-stg.myshopify.com': {
          currency: 'ILS',
          source: 'shopify',
          storeType: 'shopify',
          timezoneOffset: -5,
          maxActiveCampaignsInTrial: 1,
          ibpStatus: 'Active',
          mlAbSplit: 90,
          rbAbSplit: 100,
          isActive: 1,
          tagStatus: 0,
          createdAt: '2022-12-15T17:21:04.000Z',
          countryCode: null,
        },
        'nmg-test.mybigcommerce.com': {
          currency: 'USD',
          source: null,
          storeType: null,
          timezoneOffset: 2,
          maxActiveCampaignsInTrial: 1,
          ibpStatus: 'Active',
          mlAbSplit: 90,
          rbAbSplit: 100,
          isActive: 1,
          tagStatus: 0,
          createdAt: '2023-01-02T14:49:53.000Z',
          countryCode: null,
        },
        'non-platform-november.myshopify.com': {
          currency: 'USD',
          source: null,
          storeType: null,
          timezoneOffset: -12,
          maxActiveCampaignsInTrial: 1,
          ibpStatus: 'Active',
          mlAbSplit: 90,
          rbAbSplit: 100,
          isActive: 1,
          tagStatus: 0,
          createdAt: '2022-11-06T14:35:33.000Z',
          countryCode: null,
        },
        'test-onboarding-0703.myshopify.com': {
          currency: 'ILS',
          source: 'shopify',
          storeType: 'shopify',
          timezoneOffset: -5,
          maxActiveCampaignsInTrial: 1,
          ibpStatus: 'Active',
          mlAbSplit: 90,
          rbAbSplit: 100,
          isActive: 1,
          tagStatus: 0,
          createdAt: '2023-03-07T15:05:22.000Z',
          countryCode: null,
        },
        'test-time-zone.com': {
          currency: 'AFN',
          source: 'onboarding',
          storeType: null,
          timezoneOffset: 5,
          maxActiveCampaignsInTrial: 1,
          ibpStatus: 'Active',
          mlAbSplit: 90,
          rbAbSplit: 100,
          isActive: 1,
          tagStatus: 0,
          createdAt: '2023-01-10T14:48:36.000Z',
          countryCode: null,
        },
        'woocommerce-692374-3101112.cloudwaysapps.com': {
          currency: 'USD',
          source: 'woocommerce',
          storeType: 'woocommerce',
          timezoneOffset: 0,
          maxActiveCampaignsInTrial: 1,
          ibpStatus: 'Active',
          mlAbSplit: 90,
          rbAbSplit: 100,
          isActive: 1,
          tagStatus: 0,
          createdAt: '2022-12-15T17:16:07.000Z',
          countryCode: null,
        },
        'woocommerce-692374-3101138.cloudwaysapps.com': {
          currency: 'USD',
          source: 'woocommerce',
          storeType: 'woocommerce',
          timezoneOffset: 0,
          maxActiveCampaignsInTrial: 1,
          ibpStatus: 'Active',
          mlAbSplit: 90,
          rbAbSplit: 100,
          isActive: 1,
          tagStatus: 0,
          createdAt: '2022-12-15T17:17:08.000Z',
          countryCode: null,
        },
        'woocommerce-692374-3122398.cloudwaysapps.com': {
          currency: 'USD',
          source: null,
          storeType: null,
          timezoneOffset: 2,
          maxActiveCampaignsInTrial: 1,
          ibpStatus: 'Active',
          mlAbSplit: 90,
          rbAbSplit: 100,
          isActive: 1,
          tagStatus: 0,
          createdAt: '2022-12-19T14:50:47.000Z',
          countryCode: null,
        },
        'woocommerce-692374-3122406.cloudwaysapps.com': {
          currency: 'USD',
          source: null,
          storeType: null,
          timezoneOffset: 2,
          maxActiveCampaignsInTrial: 1,
          ibpStatus: 'Active',
          mlAbSplit: 90,
          rbAbSplit: 100,
          isActive: 1,
          tagStatus: 0,
          createdAt: '2022-12-26T08:23:35.000Z',
          countryCode: null,
        },
        'www.mika.com': {
          currency: null,
          source: null,
          storeType: null,
          timezoneOffset: 0,
          maxActiveCampaignsInTrial: 1,
          ibpStatus: 'Trial - Read-only',
          mlAbSplit: 90,
          rbAbSplit: 100,
          isActive: 1,
          tagStatus: 1,
          createdAt: '2021-07-05T15:36:24.000Z',
          countryCode: null,
        },
      },
      ibpTrialStart: null,
      ibpTrialEnd: null,
      products: { 'new-chp': 1, privacy: 0, ibp: 1, 'shopping-extensions': 0, jos: 0, chp3: 1, digitalGovernance: 0 },
      freezeInformation: [],
      domain: 'alex-test-can-be-removed.com',
    },
    selectedClientDomain: 'https://www.namogoo.com',
    showClientList: true,
    screenName: 'Dashboard',
  },
};

export const topBar = (args, { argTypes }) => ({
  components: { TopBar },
  props: Object.keys(argTypes),
  methods: {
    // onInputChanged: action('Inputed'),
  },
  template: `
    <div class="body-medium">
        <top-bar
          :clients="clients"
          :screen-name="screenName"
          :profile-info="profileInfo"
          :profile-options="profileOptions"
          :settings-options="settingsOptions"
          :selected-client="selectedClient"
          :selected-client-domain="selectedClientDomain"
          :show-client-list="showClientList"
        />
    </div>
    `,
});
