/* Platform Pages */
// const Login = () => import(/* webpackChunkName: 'Login' */ '../views/Login/index.vue');
import MainLayoutView from '../views/MainLayoutView.vue';
import AudiencesView from '../views/Wandz/AudiencesView.vue';
import ModelManagementView from '../views/Wandz/ModelManagementView.vue';
import AiFeaturesView from '../views/Wandz/AiFeaturesView.vue';
import AnalyticsView from '../views/Wandz/AnalyticsView.vue';
import SettingsView from '../views/Settings/SettingsView.vue';
import {
  CompanyInformationPage,
  ProfilePage,
  UserManagementPage,
  PlanBillingUsagePage,
  TagConfigurationPage,
} from '@/components/Settings';

/** Vue router config */
export const ROUTER_CONFIG /*:  IRouterConfig[]*/ = [
  {
    path: '/',
    component: MainLayoutView,
    children: [
      {
        path: '/', // routePath
        component: ModelManagementView, // refToComponent,
        children: [],
      },
      {
        path: '/settings',
        name: 'settings',
        component: SettingsView,
        // beforeEnter: routeGuard,
        children: [
          /* COMPANY INFO */
          {
            path: '/settings/company-info',
            name: 'companyInfo',
            component: CompanyInformationPage,
          },
          /* MY PROFILE */
          {
            path: '/settings/profile',
            component: ProfilePage,
          },

          /* USER MANAGEMENT */
          {
            path: '/settings/user-management',
            component: UserManagementPage,
          },

          /* Plan Usage: */
          {
            path: '/settings/plan-billing-and-usage',
            component: PlanBillingUsagePage,
          },
          /* Tag Configuration: */
          {
            path: '/settings/tag-configuration',
            component: TagConfigurationPage,
          },
        ],
      },
      {
        path: '/models-management', // routePath
        component: ModelManagementView, // refToComponent,
        children: [],
      },
      {
        path: '/audience', // routePath
        component: AudiencesView, // refToComponent,
        children: [],
      },
      {
        path: '/ai-features-management', // routePath
        component: AiFeaturesView, // refToComponent,
        children: [],
      },
      {
        path: '/analytics', // routePath
        component: AnalyticsView, // refToComponent,
        children: [],
      },
    ],
  },
  {
    path: '/login',
    component: '', //LoginComponent ,
    children: [],
  },
];
