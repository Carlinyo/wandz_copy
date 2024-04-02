import { defineStore } from 'pinia';

import { type IPredictionModel, PredModelActions } from '@wandzai/wandz-interfaces';
import { PredModelsApi } from '@/apis';
import cloneDeep from 'lodash/cloneDeep';
import { SNACK_BAR_TEXTS } from '@/components/Wandz/PredictionsManagement/const';
import type { IPredModelsStore } from '@/stores/wandz/types';

export const usePredictionManagementStore = defineStore('prediction-management', {
  state: () =>
    <IPredModelsStore>{
      /** current predictionModel to edit */
      predictionModelObj: {},
      /** current step in predictionManagementModal flow*/
      currentStep: 0,
      snackBarMsg: '',
      /** opened modal as pop-up on top of predictionsManagementPage view*/
      openedModal: undefined,
      /** current action to perform on predictionModelObj*/
      currentAction: undefined,
      /** all predictions for the specific clientTag and domain*/
      predictions: [] as IPredictionModel[],
    },
  actions: {
    async initStore() {
      await Promise.all([this.getPredictions()]);
    },
    async getPredictions() {
      await PredModelsApi.getPredictions()
        .then((res) => {
          this.predictions = res.data;
        })
        .catch((e) => {
          console.error(`Error while receiving all predictions: ${e}`);
        });
    },
    modelToObj(model: IPredictionModel) {
      this.predictionModelObj = cloneDeep(model);
    },
    resetAfterAction() {
      this.predictionModelObj = {};
      this.currentStep = 0;
      this.openedModal = undefined;
      this.currentAction = undefined;
    },
    updateSnackBar(action: PredModelActions) {
      this.snackBarMsg = SNACK_BAR_TEXTS[action];
    },
    validateModelNameIsAvailable(modelName: string, guid: string) {
      //TODO: change this to debounced function checking for the name in DB
      return !this.predictions.some((prediction: IPredictionModel) => {
        return prediction.name === modelName && prediction.guid !== guid;
      });
    },
    async [PredModelActions.SAVE_DRAFT]() {
      await PredModelsApi[PredModelActions.SAVE_DRAFT](this.predictionModelObj).then((res) => {
        this.predictions.push(res.data);
        this.resetAfterAction();
      });
    },
    async [PredModelActions.RENAME](newName: string) {
      await PredModelsApi[PredModelActions.RENAME](this.predictionModelObj?.guid as string, newName).then(() => {
        // update the list
        this.resetAfterAction();
      });
    },
    async [PredModelActions.ARCHIVE]() {
      await PredModelsApi[PredModelActions.ARCHIVE](this.predictionModelObj?.guid as string).then(() => {
        // change model
        // update the list
        this.resetAfterAction();
      });
    },
    async [PredModelActions.UN_PUBLISH]() {
      await PredModelsApi[PredModelActions.UN_PUBLISH](this.predictionModelObj?.guid as string).then(() => {
        // Remove model name from active models collection exposed in the tag
        // If the model is checked for autotrain + publish, set for manual publish
        // Change model status to training completed
        // update the list
        this.resetAfterAction();
      });
    },
    async [PredModelActions.DELETE]() {
      await PredModelsApi[PredModelActions.DELETE](this.predictionModelObj?.guid as string).then(() => {
        // remove model draft from DB
        // update the list
        this.resetAfterAction();
      });
    },
    async [PredModelActions.PUBLISH]() {
      await PredModelsApi[PredModelActions.PUBLISH](this.predictionModelObj as IPredictionModel).then(() => {
        // update the list
        this.updateSnackBar(PredModelActions.PUBLISH);
        this.resetAfterAction();
      });
    },
  },
});
