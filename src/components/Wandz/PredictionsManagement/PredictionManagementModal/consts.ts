import {
  Step1PickModelType,
  Step2BasicConfigurations,
  Step3TrainingConfiguration,
} from '@/components/Wandz/PredictionsManagement/PredictionManagementModal/Steps';

import dataColors from '@/design-library/src/styles/colors/data.module.scss';
import type { IDropdownItem } from '@/design-library/src/types/interfaces/IDropdownItem';

import {
  OptimizationFunctions,
  DaysRanges,
  ExcludeCategories,
  IntentTypes,
  RetentionPeriods,
  LogicOperators,
  PredictionTarget,
  StringComparisonOperators,
} from '@wandzai/wandz-interfaces';
import { ModelAttributes } from './types';
import type { IBaseConfigPredictionModel } from '@wandzai/wandz-interfaces/src/interfaces/pred-model';

export const MAX_TRAINING_PERCENTAGE = 80;
export const MIN_TRAINING_PERCENTAGE = 40;
export const MAX_ALLOWED_RULES = 2;

export const WANDZ_STRINGS = {
  CREATE_PREDICTION_MODEL: 'Create a Prediction Model',
  PRE_BUILT_MODEL: 'Pre-built model',
  CUSTOM_TEMPLATE: 'Custom Template',
  BTN_NEXT: 'Next',
  BTN_TRAIN: 'Train',
  SAVE_AS_DRAFT: 'Save as Draft',
  FIELD_IS_REQUIRED: 'This field is required',
};

export const CHANGE_PREDICTION_MODAL_PROPS: Partial<any> = {
  primaryButtonText: 'Confirm',
  secondaryButtonText: 'Cancel',
  primaryButtonStyleType: 'primary',
  secondaryButtonStyleType: 'secondary',
  title: 'Change prediction model type',
  subtitle: 'Are you sure you want to change the model type?',
  modalProps: {
    note: '* Please Note: This action is irreversible.\n Any changes made to the model settings might be lost.',
  },
  height: 230,
  width: 400,
};

export const MODEL_STEP2_STRINGS = {
  BASIC_TITLE: 'Basic Details',
  MODEL_NAME_TITLE: 'Modal Name',
  MODEL_NAME_PLACEHOLDER: 'Enter Modal Name',
  MODEL_DESCRIPTION_TITLE: 'Model Description (optional)',
  MODEL_DESCRIPTION_PLACEHOLDER: 'Enter Model Description',
  PREDICTION_TARGET_TITLE: 'Prediction Target',
};

export const MODEL_STEP3_STRINGS: Record<string, string> = {
  AUDIENCE_FOR_TRAINING: 'Audience for Training',
  EXCLUDE_BOTS: 'Exclude Bots',
  EXCLUDE_BOTS_TOOLTIP: 'Exclude Bots Tooltip Text',
  RECOMMENDED: '(Recommended)',
  ALL: 'All',
  SPECIFIC_SEGMENT: 'Specific Segment',
  SPECIFIC_AUDIENCE: 'Specific Audience',
  EDIT: 'Edit',
  FILTER_BY_AUDIENCE: 'Filter by Specific Audience',
  TRAINING_SCHEDULE: 'Training Schedule',
  MODEL_QUALITY_FUNCTION: 'Model Quality Function',
  MODEL_QUALITY_FUNCTION_TOOLTIP: 'Model Quality Function Tooltip',
  MODEL_MODIFY_ATTRIBUTES: 'Modify Model Attributes',
  CATEGORIES_TO_EXCLUDE: 'Choose Categories to exclude',
  TRAINING_TEST_CONTROL_HEADER: 'Training Set vs. Test Set',
  TRAINING_TEST_CONTROL_HEADER_TOOLTIP: 'Training Set vs. Test Set tooltip',
  TRAINING_TEST_CONTROL_MAX_ERR_MSG: `Maximum training set is ${MAX_TRAINING_PERCENTAGE}% for effective modeling`,
  TRAINING_TEST_CONTROL_MIN_ERR_MSG: `Minimum training set is ${MIN_TRAINING_PERCENTAGE}% for effective modeling`,
  EXCLUDE_CATEGORIES_ERR_MSG: 'This field is required',
};

export const PREDICTION_TITLES = {
  CHOOSE_PRE_BUILT_MODEL: 'Choose a pre-built model',
};

export const MODEL_STEPS_MENU = [
  {
    title: 'Model Type',
    disabled: false,
    done: false,
  },
  {
    title: 'Name & Target',
    disabled: true,
    done: false,
  },
  {
    title: 'Training Configuration',
    disabled: true,
    done: false,
  },
];

export const COMPONENTS_STEPS_LIST = [Step1PickModelType, Step2BasicConfigurations, Step3TrainingConfiguration];

export const DEFAULT_RULE = {
  type: PredictionTarget.URL,
  operator: StringComparisonOperators.CONTAINS,
  condition: LogicOperators.AND,
  value: '',
};

export const CUSTOM_MODEL_TYPE: { props: any; modelType: IBaseConfigPredictionModel } = {
  props: {
    iconBgColor: dataColors.dataAzureSkyLight,
  },
  modelType: {
    intent: IntentTypes.CUSTOM,
    name: 'Create your own model',
    description: 'Start from scratch by creating a custom model',
    targetRules: [DEFAULT_RULE],
    trainedAudiences: {
      excludeBots: true,
      audiences: null,
    },
    optimizationFunction: OptimizationFunctions.F1,
    reTrainInterval: DaysRanges.WEEKLY,
    trainingPeriod: DaysRanges.WEEKLY,
    advancedConfig: {
      excludedCategories: null,
      trainingSetPercentages: MAX_TRAINING_PERCENTAGE,
    },
  },
};

export const DISTRIBUTION_GRAPH_LABELS = {
  GRAPH_TITLE: 'Audience Distribution',
  AVERAGE_LINE: 'Sufficient\nVolume',
  TOTAL_AUDIENCE_SIZE: 'Total\nAudience Size',
  AUDIENCE_HITTING_TARGET: 'Audience\n Hitting Target',
  PREVIEW_BTN: 'Preview',
  REFRESH_PREVIEW: 'Refresh Preview',
  COMPLETE_ALL_FIELDS_MESSAGE: 'Complete all fields to preview the updated size',
  WARNING_TITLE: 'Insufficient Volume',
  WARNING_MESSAGE: 'Changes made to the form\nled to an unhealthy result.\nFix one of the fields and try again.',
};

export const GRAPH_COLORS = {
  LEFT: ['#e1a4f1', '#f1e6f5'],
  RIGHT: ['#fbdaa3', '#fef1de'],
};

export const CUSTOM_RANGE_KEY = 'custom';

export const TIME_FRAME_DROPDOWN_ITEMS: IDropdownItem[] = [
  {
    text: 'Last 7 Days',
    value: DaysRanges.WEEKLY,
  },
  {
    text: 'Last 14 Days',
    value: DaysRanges.BI_WEEKLY,
  },
  {
    text: 'Last 30 Days',
    value: DaysRanges.MONTHLY,
  },
  {
    key: CUSTOM_RANGE_KEY,
    text: 'Custom Range',
    value: CUSTOM_RANGE_KEY,
  },
];

export const RETRAIN_OPTIONS: IDropdownItem[] = [
  {
    text: 'Every 7 days',
    value: DaysRanges.WEEKLY,
  },
  {
    text: 'Every 14 days',
    value: DaysRanges.BI_WEEKLY,
  },
  {
    text: 'Every 30 days',
    value: DaysRanges.MONTHLY,
  },
  {
    text: 'Don’t retrain',
    value: null,
  },
];

export const OPTIMIZATION_OPTIONS: IDropdownItem[] = [
  {
    text: 'F1',
    value: OptimizationFunctions.F1,
  },
  {
    text: 'Accuracy',
    value: OptimizationFunctions.ACCURACY,
  },
  {
    text: 'Precision',
    value: OptimizationFunctions.PRECISION,
  },
  {
    text: 'Recall',
    value: OptimizationFunctions.RECALL,
  },
  {
    text: 'AUC/ROC',
    value: OptimizationFunctions.ROC_AUC,
  },
];

export const MODEL_ATTRIBUTES_OPTIONS: Record<ModelAttributes, string> = {
  [ModelAttributes.ALL]: 'Use all available attributes (recommended badge)',
  [ModelAttributes.EXCLUDE]: 'Exclude categories from model',
};

export const EXCLUDE_CATEGORIES_OPTIONS: Record<ExcludeCategories, string> = {
  [ExcludeCategories.UNHEALTHY]: 'Unhealthy AI Features',
  [ExcludeCategories.CUSTOM]: 'Your Custom AI Features',
  [ExcludeCategories.WANDZ]: 'Wandz AI Features',
};

export const MODAL_PRIMARY_BUTTON: Partial<any>[] = [
  {
    primaryButtonText: WANDZ_STRINGS.BTN_NEXT,
    primaryButtonStyleType: 'secondary',
  },
  {
    primaryButtonText: WANDZ_STRINGS.BTN_NEXT,
    primaryButtonStyleType: 'secondary',
  },
  {
    primaryButtonText: WANDZ_STRINGS.BTN_TRAIN,
    primaryButtonStyleType: 'primary',
  },
];

export const TARGET_RULES_CONDITION_OPTIONS: Record<LogicOperators, string> = {
  [LogicOperators.OR]: 'Or',
  [LogicOperators.AND]: 'And',
};

export const TARGET_RULES_CONFIGURATIONS: { [key: string]: any } = {
  [PredictionTarget.URL]: {
    text: 'Visited URL',
    placeHolder: 'Enter URL',
  },
  [PredictionTarget.EVENT]: {
    text: 'Event',
    placeHolder: 'Choose Event',
  },
  [PredictionTarget.SEGMENT]: {
    text: 'Segment',
    placeHolder: 'Choose Segment',
  },
  [PredictionTarget.TIME_TO_RETURN]: {
    text: 'Returning Period',
    placeHolder: 'Return Period',
  },
};

export const TIME_TO_RETURN_OPTIONS: Record<RetentionPeriods, string> = {
  [RetentionPeriods._24_H]: '24 Hours',
  [RetentionPeriods._48H]: '48 Hours',
  [RetentionPeriods._72H]: '72 Hours',
  [RetentionPeriods._1W]: '1 Week',
  [RetentionPeriods._2W]: '2 Weeks',
};

export const TARGET_URL_OPERATORS: Record<StringComparisonOperators, string> = {
  [StringComparisonOperators.ANY]: 'Any',
  [StringComparisonOperators.IS]: 'Is',
  [StringComparisonOperators.IS_NOT]: 'Is not',
  [StringComparisonOperators.STARTS_WITH]: 'Starts with',
  [StringComparisonOperators.ENDS_WITH]: 'Ends with',
  [StringComparisonOperators.CONTAINS]: 'Contains',
  [StringComparisonOperators.NOT_CONTAINS]: 'Does not contain',
};

export const TARGET_RULES_TARGET_OPTIONS = (intent: IntentTypes) => [
  {
    text: TARGET_RULES_CONFIGURATIONS[PredictionTarget.URL].text,
    value: PredictionTarget.URL,
    placeHolder: TARGET_RULES_CONFIGURATIONS[PredictionTarget.URL].placeHolder,
  },
  {
    text: TARGET_RULES_CONFIGURATIONS[PredictionTarget.EVENT].text,
    value: PredictionTarget.EVENT,
    placeHolder: TARGET_RULES_CONFIGURATIONS[PredictionTarget.EVENT].placeHolder,
  },
  {
    text: TARGET_RULES_CONFIGURATIONS[PredictionTarget.SEGMENT].text,
    value: PredictionTarget.SEGMENT,
    placeHolder: TARGET_RULES_CONFIGURATIONS[PredictionTarget.SEGMENT].placeHolder,
  },
  ...(intent === IntentTypes.RETURN
    ? [
        {
          text: TARGET_RULES_CONFIGURATIONS[PredictionTarget.TIME_TO_RETURN].text,
          value: PredictionTarget.TIME_TO_RETURN,
          placeHolder: TARGET_RULES_CONFIGURATIONS[PredictionTarget.TIME_TO_RETURN].placeHolder,
        },
      ]
    : []),
];

export const INTENT_RULES_STRINGS = {
  [IntentTypes.CUSTOM]: {
    headers: [MODEL_STEP2_STRINGS.PREDICTION_TARGET_TITLE],
  },
  [IntentTypes.RETURN]: {
    headers: ['a returning visitor'],
    infoText:
      'This model predicts which visitors are likely to return to the website within the next chosen timeframe.',
  },
  [IntentTypes.PURCHASE]: {
    headers: ['a purchase'],
    infoText:
      'This model predicts which visitors are likely to make a purchase (arrive at your thank you page) during the visit.',
  },
  [IntentTypes.REACH_CART]: {
    headers: ['reaching cart'],
    infoText: 'This model predicts which visitors are likely to reach the cart and/or add items to their basket.',
  },
  [IntentTypes.REACH_CHECKOUT]: {
    headers: ['reaching checkout'],
    infoText: 'This model predicts which visitors are likely to reach the checkout.',
  },
  [IntentTypes.ABANDON_JOURNEY]: {
    headers: ['an abandoned session'],
    infoText:
      'This model predicts which visitors are not going to make a purchase (arrive at your thank you page) during this visit',
  },
  [IntentTypes.REPEAT_PURCHASE]: {
    headers: ['a repeat purchase'],
    infoText: 'This model predicts which customers are likely to make another purchase.',
  },
  [IntentTypes.JOIN_REWARD]: {
    headers: ['joining a rewards program'],
    infoText: 'This model predicts which visitors are likely to join your rewards, loyalty, or membership programs.',
  },
  [IntentTypes.CONDUCT_SEARCH]: {
    headers: ['conducting a search'],
    infoText: 'This model predicts which visitors are likely to initiate a search on the site.',
  },
  [IntentTypes.ABANDON_CHECKOUT]: {
    headers: ['checkout', 'abandonment'],
    infoText:
      'This model predicts the likelihood of visitors who have reached the checkout stage leaving without completing their purchase.',
  },
};

/** Define which intents will not show conditions on second rule */
export const UNIQUE_INTENT_TYPES = [IntentTypes.ABANDON_CHECKOUT];

export default {
  WANDZ_STRINGS,
  CHANGE_PREDICTION_MODAL_PROPS,
  MODEL_STEP2_STRINGS,
  MODEL_STEP3_STRINGS,
  MODEL_STEPS_MENU,
  PREDICTION_TITLES,
  COMPONENTS_STEPS_LIST,
  CUSTOM_MODEL_TYPE,
  RETRAIN_OPTIONS,
  OPTIMIZATION_OPTIONS,
  TIME_FRAME_DROPDOWN_ITEMS,
  CUSTOM_RANGE_KEY,
  MODEL_ATTRIBUTES_OPTIONS,
  EXCLUDE_CATEGORIES_OPTIONS,
  MAX_TRAINING_PERCENTAGE,
  MIN_TRAINING_PERCENTAGE,
  MODAL_PRIMARY_BUTTON,
  TARGET_RULES_CONFIGURATIONS,
  TARGET_RULES_TARGET_OPTIONS,
  TARGET_URL_OPERATORS,
  DEFAULT_RULE,
  TIME_TO_RETURN_OPTIONS,
  TARGET_RULES_CONDITION_OPTIONS,
  UNIQUE_INTENT_TYPES,
  INTENT_RULES_STRINGS,
  MAX_ALLOWED_RULES,
};
