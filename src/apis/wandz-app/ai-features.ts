import BaseAPI from '@/utils/base-api';
import {
  type IAiFeatureDistributionResponse,
  type IAiFeaturesBasicConfig,
  type IAiFeaturesResponse,
} from '@wandzai/wandz-interfaces';
import { WandzAppEndPoints } from '@/apis/types';
import { resToBody } from '@/utils/common';

class AiFeaturesApi {
  static fetchAiFeatures(/**clientTag: string, domain: string*/): Promise<IAiFeaturesResponse> {
    return BaseAPI.get(`/${WandzAppEndPoints.AI_FEATURES}`, {
      params: {
        /**clientTag,
        domain*/
      },
    }).then(resToBody);
  }

  /** Only relevant for custom ai-features */
  static editAiFeature(id: number, updatedData: Partial<IAiFeaturesBasicConfig>): Promise<void> {
    return BaseAPI.put(`/${WandzAppEndPoints.AI_FEATURES}/${id}`, updatedData).then(resToBody);
  }

  static deleteAiFeature(id: number): Promise<void> {
    return BaseAPI.delete(WandzAppEndPoints.AI_FEATURES, { params: { id } }).then(resToBody);
  }

  static fetchAiFeatureDistribution(id: number): Promise<IAiFeatureDistributionResponse> {
    return BaseAPI.get(`/${WandzAppEndPoints.AI_FEATURES}/distribution`, { params: { id } }).then(resToBody);
  }
}

export default AiFeaturesApi;
