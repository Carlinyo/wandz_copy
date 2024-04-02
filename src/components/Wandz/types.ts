export enum WandzCommonEmits {
  /** AI-FEATURES */
  AI_FEATURE_CREATE_CLICKED = 'aiFeatureCreateClicked',
  AI_FEATURE_CLICKED = 'aiFeatureClicked',
  AI_FEATURE_UPDATED = 'aiFeatureUpdated',
  AI_FEATURE_DATA_TYPE_UPDATED = 'aiFeatureDataTypeUpdated',
  AI_FEATURE_DELETED = 'aiFeatureDeleted',
  CLOSE_DRAWER = 'closeDrawer',

  /** MODELS-PRED */
  IS_VALID_STEP_EVENT = 'is-valid-step',
  IS_VALID_SECTION_EVENT = 'is-valid-section',
  RULE_CHANGED = 'changed-rule',
}

export enum LocalStorageItems {
  RECENT_SEARCHED_AI_FEATURES = 'recentSearchedAiFeatures',
}
