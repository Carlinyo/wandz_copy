import type { ITableHeader } from '@/design-library/src/types/interfaces/table';
import type { ITableMenuItem } from '@/design-library/src/types/interfaces/table-menu';
import editIcon from '@/design-library/src/assets/icons/actions/edit.svg';
import deleteIcon from '@/design-library/src/assets/icons/actions/delete.svg';
import SemanticColors from '@/design-library/src/styles/colors/semantic.module.scss';
import type { IDomainSiteConfigs, ITagDetails } from './types';
import { Actions, SiteConfigsColumns } from './types';

export const TAG_CONFIGURATION_STRINGS = {
  TAG_DETAILS_TITLE: 'Tag Details',
  TAG_ID: 'Tag ID',
  JS_SNIPPET: 'JavaScript Snippet',
  TAG_DEP_DATE: 'Tag Deployment Date',
  TAG_MNG_SYS: 'Tag Management System',
  CONTACT_SUPPORT: 'Contact Support ',
  TAG_ID_NOTE: (version: string, build: string) => `Tag version: ${version} | Build number: ${build}`,
  SUPPORT_EMAIL: 'support@example.com',
  EMAIL_SUBJECT: ' Tag Configuration Support',
  BTN_TEXT: 'Save',
};

export const SITE_CONFIGURATIONS_STRINGS = {
  SITE_CONFIGS_TITLE: 'Site Configuration',
  DOMAIN: 'Domain',
  ADD_NEW_SECTION: 'Add New Section',
  MODAL_TITLE: 'Add New Site Section',
  SITE_SECTION: 'Site Section',
  HREF: 'HREF',
  BTN_TEXT: 'Save',
};

export const MANAGEMENT_SYSTEMS = ['Tealium', 'Chita', 'Shopify', 'Adobe'];

// TODO: remove this and get the actual data from server
export const DEMO_TAG_DETAILS: ITagDetails = {
  tagId: 'AB123CDE',
  jsSnippet: 'l<script type="text/javascript" src="https:...',
  deploymentDate: 'April 14, 2023',
  tagMngSystem: MANAGEMENT_SYSTEMS[0],
  version: '2.2.1',
  build: '3.2',
};

export const SITE_SECTION_TABLE_HEADERS: ITableHeader[] = [
  {
    key: SiteConfigsColumns.SITE_SECTION,
    value: 'Site Section',
    columnStyle: { width: '20%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
  },
  {
    key: SiteConfigsColumns.HREF,
    value: 'HREF',
    columnStyle: { width: '70%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
  },
  {
    key: SiteConfigsColumns.ACTIONS,
    value: 'Actions',
    columnStyle: { width: '10%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
  },
];

const getSiteConfigsBySections = (sections: string[]) => {
  const res = [];
  for (const section of sections) {
    res.push({
      [SiteConfigsColumns.SITE_SECTION]: section,
      [SiteConfigsColumns.HREF]: [],
    });
  }
  return res;
};

export const DOMAINS_LIST: IDomainSiteConfigs[] = [
  {
    text: 'aaa.com',
    siteConfigs: getSiteConfigsBySections(['Sign in', 'Cart']),
  },
  {
    text: 'bbbb.com',
    siteConfigs: getSiteConfigsBySections(['Sign in', 'Checkout']),
  },
  {
    text: 'cccc.com',
    siteConfigs: getSiteConfigsBySections(['Product', 'Category']),
  },
  {
    text: 'xxxx.com',
    siteConfigs: getSiteConfigsBySections(['Sign in', 'Product', 'Cart']),
  },
];

export const SiteConfigsTableMenuAction: Partial<ITableMenuItem>[] = [
  {
    key: Actions.EDIT,
    text: 'Edit',
    iconSrc: editIcon,
  },
  {
    key: Actions.DELETE,
    text: 'Delete',
    iconSrc: deleteIcon,
    style: { color: SemanticColors.semanticNegative },
  },
];
