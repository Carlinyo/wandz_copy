import type { IPredictionModel, PredModelActions } from '@wandzai/wandz-interfaces';
import type { PredictionModalTypes } from '@/components/Wandz/PredictionsManagement/types';

export interface IPredModelsStore {
  /** current predictionModel to edit */
  predictionModelObj: Partial<IPredictionModel>;
  /** current step in predictionManagementModal flow*/
  currentStep: number;
  snackBarMsg: string;
  /** opened modal as pop-up on top of predictionsManagementPage view*/
  openedModal?: PredictionModalTypes;
  /** current action to perform on predictionModelObj*/
  currentAction?: PredModelActions;
  /** all predictions for the specific clientTag and domain*/
  predictions: IPredictionModel[];
}

export enum AiFeaturesActions {
  FETCH_ALL = 'fetchAll',
  FETCH_FEATURE_DISTRIBUTION = 'fetchFeatureDistribution',
}
