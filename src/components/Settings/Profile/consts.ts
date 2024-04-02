export const PROFILE_PAGE_STRINGS = {
  TITLE: 'My Details',
  FULL_NAME: 'Full Name',
  FULL_NAME_PLACEHOLDER: 'Enter Full Name',
  EMAIL: 'Email',
  JOB_TITLE: 'Job Title',
  JOB_TITLE_PLACE_HOLDER: 'Enter Job Title',
  LAST_ACTIVE: 'Last Active',
  DATE_JOINED: 'Date Joined',
  BTN_TEXT: 'Save',
};

// TODO: remove this and use the actual interface from wandz-interfaces when exists
export interface IProfileInfo {
  fullName: string;
  email: string;
  jobTitle: string;
  lastActive: string;
  dateJoined: string;
}
