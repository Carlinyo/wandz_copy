import BaseAPI from '@/utils/base-api';
import { type IAudience } from '@wandzai/wandz-interfaces';
import { WandzAppEndPoints } from '@/apis/types';
import { resToBody } from '@/utils/common';

class AudiencesApi {
  static fetchAudiences(/**clientTag: string, domain: string*/): Promise<IAudience[]> {
    return BaseAPI.get(`/${WandzAppEndPoints.AUDIENCES}`, {
      params: {
        /**clientTag,
         domain*/
      },
    }).then(resToBody);
  }

  static duplicateAudience(id: number): Promise<void> {
    return BaseAPI.post(`/${WandzAppEndPoints.AUDIENCES}/duplicate?id=${id}`).then(resToBody);
  }

  static fetchAudienceVolume(id: number) {
    return BaseAPI.get(`/${WandzAppEndPoints.AI_FEATURES}/volume`, { params: { id } }).then(resToBody);
  }

  /** Only relevant for custom audiences */
  static deleteAudience(id: number): Promise<void> {
    return BaseAPI.delete(WandzAppEndPoints.AI_FEATURES, { params: { id } }).then(resToBody);
  }
}

export default AudiencesApi;
