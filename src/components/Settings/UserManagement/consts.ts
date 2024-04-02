import type { ITableHeader } from '@/design-library/src/types/interfaces/table';
import { GeneralStatuses } from '@/components/Wandz/Common/types';
import type { ITableMenuItem } from '@/design-library/src/types/interfaces/table-menu';
import SemanticColors from '@/design-library/src/styles/colors/semantic.module.scss';
import TextColors from '@/design-library/src/styles/colors/text.module.scss';
import editIcon from '@/design-library/src/assets/icons/actions/edit.svg';
import removeIcon from '@/design-library/src/assets/icons/actions/delete.svg';
import reinviteIcon from '@/design-library/src/assets/icons/actions/share.svg';
import { Actions, Modals, Roles, UsersTableColumns } from '@/components/Settings/UserManagement/types';

export const USER_MODAL_STRINGS = {
  INVITE_TITLE: 'Invite New User',
  EDIT_TITLE: 'Edit User',
  INVITE_CTA: 'Invite',
  EDIT_CTA: 'Save Changes',
  USER_DETAILS_TITLE: 'User Details',
  EMAIL_ADDRESS: 'Email Address',
  EMAIL_ADDRESS_PLACEHOLDER: 'Enter Email Address',
  PRODUCT_ROLE: 'Product Role',
  CANCEL: 'Cancel',
};

export const USER_MANAGEMENT_STRINGS = {
  SEARCH_PLACEHOLDER: 'Search',
  BTN_TEXT: 'Invite New User',
  TABLE_TITLE: 'User Management',
  NEW: 'New',
  INVITE_SENT_MSG: 'A new invitation has been sent',
};

export const USERS_TABLE_HEADERS: ITableHeader[] = [
  {
    key: UsersTableColumns.NAME,
    value: 'Name',
    columnStyle: { width: '20%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
  },
  {
    key: UsersTableColumns.USER_EMAIL,
    value: 'User Email',
    columnStyle: { width: '25%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
  },
  {
    key: UsersTableColumns.JOB_TITLE,
    value: 'Job Title',
    columnStyle: { width: '15%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
  },
  {
    key: UsersTableColumns.ACCOUNT_ROLE,
    value: 'Account Role',
    columnStyle: { width: '12%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
  },
  {
    key: UsersTableColumns.LAST_ACTIVE,
    value: 'Last Active',
    columnStyle: { width: '10%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
  },
  {
    key: UsersTableColumns.STATUS,
    value: 'Status',
    columnStyle: { width: '10%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
  },
  {
    key: UsersTableColumns.ACTIONS,
    value: 'Actions',
    columnStyle: { width: '5%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
  },
];

export const UsersTableMenuAction: Partial<ITableMenuItem>[] = [
  {
    key: Actions.EDIT,
    text: 'Edit User',
    iconSrc: editIcon,
  },
  {
    key: Actions.REINVITE,
    text: 'Reinvite',
    iconSrc: reinviteIcon,
  },
  {
    key: Actions.REMOVE,
    text: 'Remove User',
    iconSrc: removeIcon,
    style: { color: SemanticColors.semanticNegative },
  },
];

// TODO: remove this and use the actual interface from wandz-interfaces when exists
export interface IUserItem {
  name?: string;
  userEmail: string;
  jobTitle?: string;
  accountRole: number;
  lastActive?: string;
  status?: string;
  isNew?: boolean;
}

export const ROLES_MAPPING = {
  1: Roles.MEMBER,
  2: Roles.VIEWER,
  3: Roles.ADMIN,
};

// TODO: this is just a demo data! we should read the actual data from server when it's ready
export const EXAMPLE_DATA: IUserItem[] = [
  {
    name: 'r3fsa mytest',
    userEmail: 'fdasfds@gmail.com',
    jobTitle: 'Product Designer',
    accountRole: 1,
    lastActive: 'Sep,4,2023',
    status: GeneralStatuses.INVITED,
    isNew: true,
  },
  {
    name: 'bvcxbc ddfw',
    userEmail: 'fdfd@gmail.com',
    jobTitle: 'CTO',
    accountRole: 2,
    lastActive: 'Sep,4,2023',
    status: GeneralStatuses.ACTIVE,
  },
  {
    name: 'tfcccAASDdest mytest',
    userEmail: 'tfdsfadsfest@gmail.com',
    jobTitle: 'Product Designer',
    accountRole: 3,
    lastActive: 'Sep,4,2023',
    status: GeneralStatuses.INACTIVE,
  },
  {
    name: 'tes345454t mytest',
    userEmail: '2342423@gmail.com',
    jobTitle: 'Product Designer',
    accountRole: 3,
    lastActive: 'Sep,4,2023',
    status: GeneralStatuses.ACTIVE,
  },
  {
    name: '312 mytest',
    userEmail: '312@gmail.com',
    jobTitle: 'Product Designer',
    accountRole: 3,
    lastActive: 'Sep,4,2023',
    status: GeneralStatuses.ACTIVE,
  },
];

export const MODAL_PROPS_FOR_SUBMIT_MODAL = {
  [Modals.REINVITE]: (userEmail: string) => {
    return {
      primaryButtonText: 'Send Invite',
      secondaryButtonText: 'Cancel',
      title: `You are about to re-send a platform invitation to ${userEmail}`,
      subtitle: 'Are you sure you want to proceed?',
      secondaryButtonStyleType: 'secondary',
      primaryButtonStyleType: 'primary',
      height: 213,
      width: 428,
    };
  },
  [Modals.REMOVE]: (userEmail: string) => {
    return {
      primaryButtonText: 'Remove User',
      secondaryButtonText: 'Cancel',
      title: 'Remove User',
      subtitle: `Are you sure you want to remove ${userEmail}?`,
      secondaryButtonStyleType: 'secondary',
      primaryButtonStyleType: 'primary',
      primaryButtonProps: {
        customButtonStyle: {
          'background-color': SemanticColors.semanticNegative,
          color: TextColors.txtInverted,
        },
      },
      height: 213,
      width: 428,
    };
  },
};
