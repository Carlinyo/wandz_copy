import type { ModelStatuses } from '@wandzai/wandz-interfaces';

export enum SpecificAudienceFilters {
  channels = 'channels',
  devices = 'devices',
  segments = 'segments',
}

export enum GeneralStatuses {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  INVITED = 'invited',
}

export type Statuses = ModelStatuses | GeneralStatuses;
