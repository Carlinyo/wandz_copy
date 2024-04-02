import { UserRoles } from '@wandzai/wandz-interfaces';

export interface IUser {
  name: string;
  email: string;
  accountRole: UserRoles;
}
