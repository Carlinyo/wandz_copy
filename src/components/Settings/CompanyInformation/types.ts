import type { GeneralStatuses } from '@/components/Wandz/Common/types';

export enum DomainsColumns {
  DOMAIN = 'domain',
  STATUS = 'status',
  TIMEZONE = 'timeZone',
  CURRENCY = 'currency',
}

// TODO: remove this and use the actual interface from wandz-interfaces when exists.
export interface IDomainItem {
  domain: string;
  status: GeneralStatuses;
  timeZone: string;
  currency: string;
}
