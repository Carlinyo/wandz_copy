import type { IAudience, ICustomAudience } from '@wandzai/wandz-interfaces';

export enum AudiencesTableColumns {
  NAME = 'name',
  AVG_DAILY = 'avgDaily',
  CREATION_DATE = 'createdAt',
  CREATED_BY = 'createdBy',
  DESCRIPTION = 'description',
  ACTIONS = 'actions',
}

export enum AudienceActions {
  AUDIENCE_INFO = 'audienceInfo',
  DUPLICATE = 'duplicate',
  DELETE = 'delete',
}

export type IUiAudience = (IAudience | ICustomAudience) & { isCustom: boolean };
