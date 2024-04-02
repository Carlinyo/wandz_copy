import { BucketsIds, DataTypes, DistributionWarnings, ParameterLocations } from '@wandzai/wandz-interfaces';

import ProfileIcon from '@/design-library/src/assets/icons/misc/custom-profile.svg';
import ProfileEmptyIcon from '@/design-library/src/assets/icons/misc/custom-profile-empty.svg';

import type { ITabItem } from '@/design-library/src/types/interfaces/tab-item';
import type { IDropdownItem } from '@/design-library/src/types/interfaces/IDropdownItem';

export const AI_FEATURES_CREATE_BUTTON = 'Create New AI Feature';

/** Search modal */
export const RECENTS = 'recents';
export const CLEAR = 'Clear';

export const MAX_ITEMS_TO_SHOW_ON_SEARCH = 4;
export const AI_FEATURES_SEARCH_WIDTH = 344;
export const AI_FEATURES_SEARCH_PH = 'What AI feature are you looking for?';
export const CUSTOM_AI_FEATURES_EMPTY_MESSAGE =
  "Improve your prediction models' training results by adding custom features";

/** Should be copied to wandz-ai s3 bucket */
export const AI_FEATURES_ICONS_PREFIX = 'https://wandz-ai-features-icons.s3.eu-central-1.amazonaws.com/';

export const CATEGORIES_DISPLAY_NAMES = <Record<BucketsIds, string>>{
  [BucketsIds.POPULAR]: 'Popular',
  [BucketsIds.VISITOR]: 'Visitor',
  [BucketsIds.JOURNEY]: 'Journey',
  [BucketsIds.DEVICE]: 'Device',
  [BucketsIds.CUSTOM]: 'My Custom AI Features',
};

export const PARAMETER_LOCATIONS_STRINGS: Record<ParameterLocations, string> = {
  [ParameterLocations.cookie]: 'Cookies',
  [ParameterLocations.sessionStorage]: 'Session Storage',
  [ParameterLocations.localStorage]: 'Local Storage',
  [ParameterLocations.url]: 'URL',
  [ParameterLocations.window]: 'Window variable',
};

export const AI_FEATURES_TABLE_TABS: ITabItem[] = [
  {
    key: BucketsIds.POPULAR,
    name: CATEGORIES_DISPLAY_NAMES[BucketsIds.POPULAR],
  },
  {
    key: BucketsIds.VISITOR,
    name: CATEGORIES_DISPLAY_NAMES[BucketsIds.VISITOR],
  },
  {
    key: BucketsIds.JOURNEY,
    name: CATEGORIES_DISPLAY_NAMES[BucketsIds.JOURNEY],
  },
  {
    key: BucketsIds.DEVICE,
    name: CATEGORIES_DISPLAY_NAMES[BucketsIds.DEVICE],
  },
  {
    key: BucketsIds.CUSTOM,
    name: CATEGORIES_DISPLAY_NAMES[BucketsIds.CUSTOM],
    tabIconSelected: ProfileIcon,
    tabIconNotSelected: ProfileEmptyIcon,
  },
];

/** Drawer */
/** Distribution tab */
export const INNER_TOOLTIP_TEXT = 'Visitors';
export const DIST_TAB_DATE_RANGE_TXT = 'Date Range: Last 14 Days';
export const DIST_DESCRIPTION = "See visitor's distribution per time range.";

/** Advanced Info tab */
export const ADVANCED_INFO_HEADER = 'Advanced Info';

/** File name in S3 bucket */
export const CUSTOM_AI_FEATURE_SVG = 'CustomAIFeature';

export const AI_FEATURES_TYPES = {
  [DataTypes.ARRAY]: 'Array',
  [DataTypes.BOOLEAN]: 'Boolean',
  [DataTypes.CATEGORY]: 'Categorical',
  [DataTypes.NUMBER]: 'Numeric',
};

export const AI_FEATURES_DISTRIBUTION_WARNINGS: Record<DistributionWarnings, string> = {
  [DistributionWarnings.PARAMETER_TYPE_GAP]:
    "There is a gap between the AI feature parameter type you defined and the partner type detected in the code. Until fixed, it won't be used to train or retrain models",
  [DistributionWarnings.DATA_NOT_ARRIVING]:
    "Data from this AI feature is not arriving as expected, resulting in null values. Until data is received, it won't be used to train or retrain models.",
  [DistributionWarnings.INSUFFICIENT_VOLUME]:
    'The data volume for this AI feature is insufficient for effective model training. Please consider adding AI features with larger data volumes to improve model performance.',
};

export const EMPTY_DISTRIBUTION_TITLE = 'We’re on it!';
export const EMPTY_DISTRIBUTION_SUB_TITLE =
  'We’re collecting and organizing your data.  Check back in a day or two for updates.';

export const AI_FEATURES_TYPES_ITEMS: IDropdownItem[] = Object.entries(AI_FEATURES_TYPES).map(([k, v]) => ({
  value: k,
  text: v,
}));

export const DRAWER_HEADER_INPUT_HEIGHT = 40;

export const DRAWER_BUTTONS_TEXTS = {
  EDIT: 'Edit',
  CANCEL: 'Cancel',
  SAVE: 'Save Changes',
  DELETE: 'Delete',
};

export const DELETE_AI_FEATURE_MODAL_PROPS = (isLoading: boolean) => ({
  primaryButtonText: 'Delete',
  secondaryButtonText: 'Cancel',
  title: 'Delete AI Feature',
  subtitle: 'Are you sure you want to delete this AI Feature?',
  note: '* Please Note: This action is irreversible',
  primaryButtonProps: {
    isLoading,
    styleType: 'danger',
  },
  height: 213,
});

export const SNACKBAR_DELETION_MESSAGE = (aiFeatureName: string) => `“${aiFeatureName}” was deleted.`;
