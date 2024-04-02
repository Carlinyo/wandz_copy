import BaseAPI from '@/utils/base-api';
import { WandzAppEndPoints } from '@/apis/types';

class ConfigurationsApi {
  /** predictions */
  static getEventsList(/**clientTag: string, domain: string*/) {
    return BaseAPI.get(`/${WandzAppEndPoints.CONFIGURATION}/interacted-events`, {
      params: {
        /**clientTag,
                 domain*/
      },
    });
  }
}

export default ConfigurationsApi;
