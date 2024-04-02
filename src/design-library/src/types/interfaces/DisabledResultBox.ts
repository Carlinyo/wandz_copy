import { VueConstructor } from 'vue';
import { IconTypes } from '../enums/DisabledResultBox';

import AnalyticsDisabled from '../../assets/icons/empty-states/AnalyticsDisabled.svg';
import SomethingWrongBox from '../../assets/icons/empty-states/SomethingWrongBox.svg';
import NoFoundResults from '../../assets/icons/empty-states/NoFoundResults.svg';
import ComputerClock from '../../assets/icons/empty-states/ComputerClock.svg';

export const ICON_MAPPING: Record<IconTypes, VueConstructor> = {
  [IconTypes.NO_DATA]: AnalyticsDisabled,
  [IconTypes.SOMETHING_WENT_WRONG]: SomethingWrongBox,
  [IconTypes.SEGMENT_TOO_SMALL]: NoFoundResults,
  [IconTypes.COMPUTER_CLOCK]: ComputerClock,
};
