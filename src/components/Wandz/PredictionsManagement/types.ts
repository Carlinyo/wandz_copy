export enum ModelsColumns {
  MODEL_NAME = 'name',
  PREDICTION_TARGET = 'targetRules',
  STATUS = 'status',
  LAST_UPDATED = 'lastUpdated',
  MODEL_STRENGTH = 'modelStrength',
  OPTIMIZATION_FUNCTION = 'optimizationFunction',
  ACTIONS = 'actions',
}

export enum ModelsManagementTabs {
  ONGOING = 'Ongoing Models',
  ARCHIVED = 'Archived Models',
}

export enum PredictionModalTypes {
  PREDICTION_FLOW = 'predictionFlow',
  PUBLISH = 'publish',
  CONFIRMATION = 'confirmation',
  RENAME = 'rename',
}
