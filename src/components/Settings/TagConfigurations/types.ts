//TODO: remove this and get actual interface from server
export interface ITagDetails {
  tagId: string;
  jsSnippet: string;
  deploymentDate: string;
  tagMngSystem: string;
  version: string;
  build: string;
}

export enum SiteConfigsColumns {
  SITE_SECTION = 'siteSection',
  HREF = 'href',
  ACTIONS = 'actions',
}

//TODO: remove this and get actual interface from server
export interface ISectionItem {
  [SiteConfigsColumns.SITE_SECTION]: string;
  [SiteConfigsColumns.HREF]: string[];
}

export interface IDomainSiteConfigs {
  text: string;
  siteConfigs: ISectionItem[];
}

export enum Actions {
  EDIT = 'edit',
  DELETE = 'delete',
}
