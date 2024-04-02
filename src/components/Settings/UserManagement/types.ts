export enum UsersTableColumns {
  NAME = 'name',
  USER_EMAIL = 'userEmail',
  JOB_TITLE = 'jobTitle',
  ACCOUNT_ROLE = 'accountRole',
  LAST_ACTIVE = 'lastActive',
  STATUS = 'status',
  ACTIONS = 'actions',
}

export enum Actions {
  EDIT = 'edit',
  REINVITE = 'reinvite',
  REMOVE = 'remove',
}

export enum Modals {
  ADD_OR_EDIT_USER = 'add-or-edit',
  REINVITE = 'reinvite',
  REMOVE = 'remove',
}

// TODO: remove the next consts and enums and read the actual values from server when ready
export enum Roles {
  MEMBER = 'Member',
  VIEWER = 'Viewer',
  ADMIN = 'Admin',
}
