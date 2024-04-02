import type { ITableHeader } from '@/design-library/src/types/interfaces/table';
import { GeneralStatuses } from '@/components/Wandz/Common/types';
import { DomainsColumns } from '@/components/Settings/CompanyInformation/types';
import type { IDomainItem } from '@/components/Settings/CompanyInformation/types';

export const COMPANY_INFO_STRINGS = {
  GENERAL_INFO_TITLE: 'General Information',
  COMPANY_NAME: 'Company Name',
  INDUSTRY: 'Industry',
  DOMAINS_TITLE: 'Domains',
  BTN_TEXT: 'Save',
  ADD_DOMAINS: 'To add additional domains,',
  CONTACT_SUPPORT: 'contact support',
};

export const INDUSTRY_OPTIONS = [
  { value: 1, text: '1' },
  { value: 2, text: '2' },
  { value: 3, text: '3' },
  { value: 4, text: '4' },
];

export const DOMAINS_TABLE_HEADERS: ITableHeader[] = [
  {
    key: DomainsColumns.DOMAIN,
    value: 'Domain',
    columnStyle: { width: '26%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
  },
  {
    key: DomainsColumns.STATUS,
    value: 'Status',
    columnStyle: { width: '15%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
  },
  {
    key: DomainsColumns.TIMEZONE,
    value: 'Time zone',
    columnStyle: { width: '13%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
  },
  {
    key: DomainsColumns.CURRENCY,
    value: 'Currency',
    columnStyle: { width: '13%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
  },
];

//TODO: REMOVE THIS (demo data for display)
export const DOMAINS_LIST_EXAMPLE: IDomainItem[] = [
  {
    domain: 'aaa.com',
    status: GeneralStatuses.ACTIVE,
    timeZone: 'UTC +3:00',
    currency: 'USD - United States Dollars',
  },
  {
    domain: 'bbb.com',
    status: GeneralStatuses.ACTIVE,
    timeZone: 'UTC +3:00',
    currency: 'USD - United States Dollars',
  },
  {
    domain: 'ccc.com',
    status: GeneralStatuses.INACTIVE,
    timeZone: 'UTC +3:00',
    currency: 'USD - United States Dollars',
  },
  {
    domain: 'a11aa.com',
    status: GeneralStatuses.ACTIVE,
    timeZone: 'UTC +3:00',
    currency: 'USD - United States Dollars',
  },
  {
    domain: 'bb11b.com',
    status: GeneralStatuses.ACTIVE,
    timeZone: 'UTC +3:00',
    currency: 'USD - United States Dollars',
  },
  {
    domain: 'ccc111.com',
    status: GeneralStatuses.INACTIVE,
    timeZone: 'UTC +3:00',
    currency: 'USD - United States Dollars',
  },
];
