import type { ITableHeader } from '@/design-library/src/types/interfaces/table';
import { ModelStatuses, PredModelActions } from '@wandzai/wandz-interfaces';
import { ModelsColumns, PredictionModalTypes } from '@/components/Wandz/PredictionsManagement/types';
import { OptimizationFunctions, PredictionTarget } from '@wandzai/wandz-interfaces/src/enums/pred-model';
import { StringComparisonOperators } from '@wandzai/wandz-interfaces/src/enums';
import dataColors from '@/design-library/src/styles/colors/data.module.scss';
import bgColors from '@/design-library/src/styles/colors/background.module.scss';
import textColors from '@/design-library/src/styles/colors/text.module.scss';
import semanticsColors from '@/design-library/src/styles/colors/semantic.module.scss';
import { PathToActionsIcons } from '@/components/Wandz/consts';

export const MODELS_TABLE_COLUMNS: ITableHeader[] = [
  {
    key: ModelsColumns.MODEL_NAME,
    value: 'Model Name',
    columnStyle: { width: '26%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
  },
  {
    key: ModelsColumns.PREDICTION_TARGET,
    value: 'Prediction Target',
    columnStyle: { width: '15%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
    customSort: (sortOrder: 1 | -1) => (a, b) => {
      const aVal = a?.ref?.[ModelsColumns.PREDICTION_TARGET].type;
      const bVal = b?.ref?.[ModelsColumns.PREDICTION_TARGET].type;
      return sortOrder * aVal.localeCompare(bVal);
    },
  },
  {
    key: ModelsColumns.STATUS,
    value: 'Status',
    columnStyle: { width: '13%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
  },
  {
    key: ModelsColumns.LAST_UPDATED,
    value: 'Last Updated',
    columnStyle: { width: '13%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
    customSort: (sortOrder: 1 | -1) => (a, b) => {
      const aVal = a?.ref?.[ModelsColumns.LAST_UPDATED];
      const bVal = b?.ref?.[ModelsColumns.LAST_UPDATED];
      return sortOrder * (aVal.getTime() - bVal.getTime());
    },
  },
  {
    key: ModelsColumns.MODEL_STRENGTH,
    value: 'Model Strength',
    columnStyle: { width: '15%' },
    sorting: {
      sortType: 'Number',
      sortOrder: 1,
    },
  },
  {
    key: ModelsColumns.OPTIMIZATION_FUNCTION,
    value: 'Leading Function',
    columnStyle: { width: '9%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
  },
  {
    key: ModelsColumns.ACTIONS,
    value: 'Actions',
    columnStyle: { width: '9%' },
    unsortable: true,
  },
];

export const STATUS_ACTIONS_MAP: Record<ModelStatuses, PredModelActions[]> = {
  [ModelStatuses.TRAINING_COMPLETED]: [
    PredModelActions.PUBLISH,
    PredModelActions.EDIT,
    PredModelActions.ARCHIVE,
    PredModelActions.DUPLICATE,
    PredModelActions.RENAME,
  ],
  [ModelStatuses.PUBLISHED]: [
    PredModelActions.UN_PUBLISH,
    PredModelActions.CHANGE_AUDIENCE,
    PredModelActions.DUPLICATE,
    PredModelActions.RENAME,
  ],
  [ModelStatuses.DRAFT]: [PredModelActions.EDIT, PredModelActions.RENAME, PredModelActions.DELETE],
  [ModelStatuses.IN_TRAINING]: [],
};

export const ACTIONS_LABELS_MAP: Record<PredModelActions, { label: string; iconPath?: string; color?: string }> = {
  [PredModelActions.PUBLISH]: {
    label: 'Publish',
    iconPath: `${PathToActionsIcons}/publish.svg`,
  },
  [PredModelActions.EDIT]: {
    label: 'Edit',
    iconPath: `${PathToActionsIcons}/edit.svg`,
  },
  [PredModelActions.ARCHIVE]: {
    label: 'Archive',
    iconPath: `${PathToActionsIcons}/archive.svg`,
  },
  [PredModelActions.DUPLICATE]: {
    label: 'Duplicate',
    iconPath: `${PathToActionsIcons}/duplicate.svg`,
  },
  [PredModelActions.UN_PUBLISH]: {
    label: 'Unpublish',
    iconPath: `${PathToActionsIcons}/unpublish.svg`,
    color: semanticsColors.semanticNegative,
  },
  [PredModelActions.CHANGE_AUDIENCE]: {
    label: 'Change Audience',
    iconPath: `${PathToActionsIcons}/edit.svg`,
  },
  [PredModelActions.DELETE]: {
    label: 'Delete',
    iconPath: `${PathToActionsIcons}/delete.svg`,
    color: semanticsColors.semanticNegative,
  },
  [PredModelActions.RENAME]: {
    label: 'Rename',
    iconPath: `${PathToActionsIcons}/rename.svg`,
  },
  [PredModelActions.TRAIN]: {
    label: 'Change Audience',
    iconPath: `${PathToActionsIcons}/train.svg`,
  },
};

export const TARGET_LABELS_MAP: Record<PredictionTarget, string> = {
  [PredictionTarget.EVENT]: 'Event',
  [PredictionTarget.SEGMENT]: 'Segment',
  [PredictionTarget.URL]: 'URL',
  [PredictionTarget.TIME_TO_RETURN]: 'Time To Return',
};

export const FUNCTION_LABELS_MAP: Record<OptimizationFunctions, string> = {
  [OptimizationFunctions.F1]: 'F1',
  [OptimizationFunctions.ACCURACY]: 'Accuracy',
  [OptimizationFunctions.PRECISION]: 'Precision',
  [OptimizationFunctions.RECALL]: 'Recall',
  [OptimizationFunctions.ROC_AUC]: 'AUC/ROC',
};

export const STRING_OPERATORS_LABELS_MAP: Record<StringComparisonOperators, string> = {
  [StringComparisonOperators.IS]: ' is',
  [StringComparisonOperators.IS_NOT]: 'is not',
  [StringComparisonOperators.STARTS_WITH]: 'starts with',
  [StringComparisonOperators.ENDS_WITH]: 'ends with',
  [StringComparisonOperators.CONTAINS]: 'contains',
  [StringComparisonOperators.NOT_CONTAINS]: 'not contains',
};

export const ACTIONS_MODAL_PROPS: Partial<
  Record<PredModelActions, { predictionModalToOpen?: PredictionModalTypes; modalProps?: { [key: string]: any } }>
> = {
  [PredModelActions.RENAME]: {
    predictionModalToOpen: PredictionModalTypes.RENAME,
    modalProps: {
      primaryButtonText: 'Rename',
      secondaryButtonText: 'Cancel',
      title: 'Edit Model Name',
      secondaryButtonStyleType: 'secondary',
      primaryButtonStyleType: 'primary',
      height: 234,
      inputProps: {
        label: 'Model Name',
        inputAssertion: true,
        errorMessage: 'Model name already exists',
      },
    },
  },
  [PredModelActions.UN_PUBLISH]: {
    predictionModalToOpen: PredictionModalTypes.CONFIRMATION,
    modalProps: {
      primaryButtonText: 'Unpublish',
      secondaryButtonText: 'Cancel',
      title: 'Unpublish Model',
      subtitle: 'Are you sure you want to unpublish this model?',
      secondaryButtonStyleType: 'secondary',
      primaryButtonStyleType: 'primary',
      primaryButtonProps: {
        customButtonStyle: {
          'background-color': semanticsColors.semanticNegative,
          color: textColors.txtInverted,
        },
      },
      height: 191,
    },
  },
  [PredModelActions.DELETE]: {
    predictionModalToOpen: PredictionModalTypes.CONFIRMATION,
    modalProps: {
      primaryButtonText: 'Delete',
      secondaryButtonText: 'Cancel',
      title: 'Delete Model',
      subtitle: 'Are you sure you want to delete this model?',
      note: '* Please Note: This action is irreversible',
      secondaryButtonStyleType: 'secondary',
      primaryButtonStyleType: 'primary',
      primaryButtonProps: {
        customButtonStyle: {
          'background-color': semanticsColors.semanticNegative,
          color: textColors.txtInverted,
        },
      },
      height: 213,
    },
  },
  [PredModelActions.ARCHIVE]: {
    predictionModalToOpen: PredictionModalTypes.CONFIRMATION,
    modalProps: {
      primaryButtonText: 'Archive',
      secondaryButtonText: 'Cancel',
      title: 'Archive Model',
      subtitle: 'Are you sure you want to archive this model?',
      note: '* Please Note: This action is irreversible',
      secondaryButtonStyleType: 'secondary',
      primaryButtonStyleType: 'primary',
      height: 213,
    },
  },
  [PredModelActions.EDIT]: {
    predictionModalToOpen: PredictionModalTypes.PREDICTION_FLOW,
    modalProps: {
      step: 2,
    },
  },
  [PredModelActions.PUBLISH]: {
    predictionModalToOpen: PredictionModalTypes.PUBLISH,
  },
  [PredModelActions.CHANGE_AUDIENCE]: {
    predictionModalToOpen: PredictionModalTypes.PUBLISH,
  },
  [PredModelActions.DUPLICATE]: {},
};

export const SNACK_BAR_TEXTS = <Record<PredModelActions, string>>{
  [PredModelActions.PUBLISH]: 'The model has been published successfully',
};
