export const mainElement = 'nmg-top-bar-container';
export const staticElementClass = 'static';

export const ALL_ANNOUNCEMENT_TYPE = 'all';
export const NEW_FEATURE_TYPE = 'new';
export const FEATURE_ENHANCEMENT_TYPE = 'enhancement';
export const NEW_ACTIVATION_TYPE = 'activation';

export const ALL_ANNOUNCEMENT_TEXT = 'All Announcement';
export const NEW_FEATURE_TEXT = 'Feature';
export const FEATURE_ENHANCEMENT_TEXT = 'Feature Enhancement';
export const NEW_ACTIVATION_TEXT = 'Activation';

export const DEFAULT_PRODUCT_VALUE = 'Platform';
export const PRODUCT_DISABLE_TOOLTIP_CONTENT = 'Locked';

const apricotOrange = '#E9986F';
const brandPink = '#FC85AD';
const brandBlue = '#85A6FC';

export const notificationsFilterOptions = {
  [ALL_ANNOUNCEMENT_TYPE]: {
    type: ALL_ANNOUNCEMENT_TYPE,
    text: ALL_ANNOUNCEMENT_TEXT,
  },
  [NEW_FEATURE_TYPE]: {
    type: NEW_FEATURE_TYPE,
    text: NEW_FEATURE_TEXT,
    color: brandBlue,
  },
  [FEATURE_ENHANCEMENT_TYPE]: {
    type: FEATURE_ENHANCEMENT_TYPE,
    text: FEATURE_ENHANCEMENT_TEXT,
    color: apricotOrange,
  },
  [NEW_ACTIVATION_TYPE]: {
    type: NEW_ACTIVATION_TYPE,
    text: NEW_ACTIVATION_TEXT,
    color: brandPink,
  },
};

export default {
  ALL_ANNOUNCEMENT_TYPE,
  NEW_FEATURE_TYPE,
  FEATURE_ENHANCEMENT_TYPE,
  NEW_ACTIVATION_TYPE,
  ALL_ANNOUNCEMENT_TEXT,
  NEW_FEATURE_TEXT,
  FEATURE_ENHANCEMENT_TEXT,
  NEW_ACTIVATION_TEXT,
  DEFAULT_PRODUCT_VALUE,
  PRODUCT_DISABLE_TOOLTIP_CONTENT,
  staticElementClass,
  mainElement,
};
