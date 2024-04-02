export interface IRouteItem {
  path: string;
  name: string;
  icon?: any;
  allowedUserTypes?: number[]; // id of user group (1 - admin, 0 - non admin )
  children?: IRouteItem[];
}
