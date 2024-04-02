import unpublishSvg from '@/design-library/src/assets/icons/actions/unpublish.svg';
import publishSvg from '@/design-library/src/assets/icons/actions/publish.svg';
import editSvg from '@/design-library/src/assets/icons/actions/edit.svg';
import archiveSvg from '@/design-library/src/assets/icons/actions/archive.svg';
import duplicateSvg from '@/design-library/src/assets/icons/actions/duplicate.svg';
import graphStatsAscend from '@/design-library/src/assets/icons/actions/graph-stats-ascend.svg';
import { ANAlYTICS_TOP_BAR_ACTIONS, ANAlYTICS_TOP_BAR_BUTTONS } from '@/design-library/src/types/enums/AnalyticsTopBar';
import { type IMenuItem } from '@/design-library/src/types/interfaces/AnalyticsTopBar';
import { ModelStatuses } from '@wandzai/wandz-interfaces';

export const PUBLISHED_ACTIONS: IMenuItem[] = [
  { text: 'Change Audience', iconSrc: editSvg, methodName: 'changeAudience' },
  { text: 'See last training results', iconSrc: graphStatsAscend, methodName: 'openStates' },
  { text: 'Unpublish', iconSrc: unpublishSvg, methodName: 'unpublish' },
  { text: 'Duplicate', iconSrc: duplicateSvg, methodName: 'duplicate' },
];

export const TRAINING_COMPLETED_ACTIONS: IMenuItem[] = [
  { text: 'Publish', iconSrc: publishSvg, methodName: 'publish' },
  { text: 'Edit', iconSrc: editSvg, methodName: 'edit' },
  { text: 'Archive', iconSrc: archiveSvg, methodName: 'archive' },
  { text: 'Duplicate', iconSrc: duplicateSvg, methodName: 'dublicate' },
];

const title = 'XX Modal';
const subtitle = 'Are you sure you want to XX this model?';
const content = '* Please Note: This action is irreversible';

export const ARCHIVE = 'Archive';
export const UNPUBLISH = 'Unpublish';

export const getModalData = (action: ANAlYTICS_TOP_BAR_ACTIONS | string) => {
  const modalContent = action === ARCHIVE ? content : '';
  const status = action === ARCHIVE ? ModelStatuses.DRAFT : ModelStatuses.TRAINING_COMPLETED;
  return {
    action: action,
    statusOnConfirm: status,
    title: title.replace('XX', action),
    subtitle: subtitle.replace('XX', action.toLowerCase()),
    primaryButton: ANAlYTICS_TOP_BAR_BUTTONS[action],
    content: modalContent,
  };
};
