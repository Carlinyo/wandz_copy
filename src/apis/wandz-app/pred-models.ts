import BaseAPI from '@/utils/base-api';
import { type IPredictionModel, PredModelActions } from '@wandzai/wandz-interfaces';
import { WandzAppEndPoints } from '@/apis/types';

class PredModelsApi {
  /** predictions */
  static getPredictions(/**clientTag: string, domain: string*/) {
    return BaseAPI.get(`/${WandzAppEndPoints.PREDICTIONS}`, {
      params: {
        /**clientTag,
        domain*/
      },
    });
  }

  static getPredictionTemplates() {
    return BaseAPI.get(`/${WandzAppEndPoints.PREDICTIONS}/templates`);
  }

  static [PredModelActions.SAVE_DRAFT](predictionModelObj: IPredictionModel) {
    return BaseAPI.post(`/${WandzAppEndPoints.PREDICTIONS}/${PredModelActions.SAVE_DRAFT}`, predictionModelObj);
  }

  static [PredModelActions.RENAME](guid: string, updatedName: string) {
    return BaseAPI.put(`/${WandzAppEndPoints.PREDICTIONS}/${PredModelActions.RENAME}/${guid}`, {
      body: { updatedName },
    });
  }

  static [PredModelActions.ARCHIVE](guid: string) {
    return BaseAPI.put(`/${WandzAppEndPoints.PREDICTIONS}/${PredModelActions.ARCHIVE}/${guid}`, {});
  }

  static [PredModelActions.UN_PUBLISH](guid: string) {
    return BaseAPI.put(`/${WandzAppEndPoints.PREDICTIONS}/${PredModelActions.UN_PUBLISH}/${guid}`, {});
  }

  static [PredModelActions.DELETE](guid: string) {
    return BaseAPI.delete(`/${WandzAppEndPoints.PREDICTIONS}/${PredModelActions.DELETE}/${guid}`, {});
  }

  static [PredModelActions.PUBLISH](predictionModelObj: IPredictionModel) {
    return BaseAPI.put(
      `/${WandzAppEndPoints.PREDICTIONS}/${PredModelActions.PUBLISH}/${predictionModelObj.guid}`,
      predictionModelObj,
    );
  }
}

export default PredModelsApi;
