import type { IRouteItem } from '@/router/iRouteItem';
import {
  PlanBillingAndUsageIcon,
  CompanyInfoIcon,
  ProfileIcon,
  UserManagementIcon,
  TagConfigurationIcon,
} from '@/design-library/src/assets/icons/navigation-menu';

export const ROUTES_PER_VIEW: Record<string, IRouteItem> = {
  settings: {
    path: '/settings',
    name: 'Settings',
    children: [
      {
        path: '/settings/company-info',
        name: 'Company Info',
        icon: CompanyInfoIcon,
      },
      {
        path: '/settings/profile',
        name: 'Profile',
        icon: ProfileIcon,
      },
      {
        path: '/settings/user-management',
        name: 'User Management',
        icon: UserManagementIcon,
      },
      {
        path: '/settings/plan-billing-and-usage',
        name: 'Plan Billing & Usage',
        icon: PlanBillingAndUsageIcon,
      },
      {
        path: '/settings/tag-configuration',
        name: 'Tag Configuration',
        icon: TagConfigurationIcon,
      },
    ],
  },
};
