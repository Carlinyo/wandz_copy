import type { Statuses } from '@/components/Wandz/Common/types';
import { ModelStatuses } from '@wandzai/wandz-interfaces';
import dataColors from '@/design-library/src/styles/colors/data.module.scss';
import bgColors from '@/design-library/src/styles/colors/background.module.scss';
import textColors from '@/design-library/src/styles/colors/text.module.scss';
import { GeneralStatuses } from '@/components/Wandz/Common/types';

export const STATUS_LABELS_MAP: Record<Statuses, { label: string; color: string }> = {
  [ModelStatuses.TRAINING_COMPLETED]: {
    label: 'Training Completed',
    color: dataColors.dataBlueOrchid,
  },
  [ModelStatuses.PUBLISHED]: {
    label: 'Published',
    color: dataColors.dataGreenApple,
  },
  [ModelStatuses.DRAFT]: {
    label: 'Draft',
    color: bgColors.bgShapes,
  },
  [ModelStatuses.IN_TRAINING]: {
    label: 'In Training',
    color: dataColors.dataOrangeCarrot,
  },
  [GeneralStatuses.ACTIVE]: {
    label: 'Active',
    color: dataColors.dataGreenApple,
  },
  [GeneralStatuses.INACTIVE]: {
    label: 'Inactive',
    color: bgColors.bgShapes,
  },
  [GeneralStatuses.INVITED]: {
    label: 'Invited',
    color: dataColors.dataOrangeCarrot,
  },
};

export const ARCHIVE_LABELS: { label: string; color: string } = {
  label: 'Archived',
  color: textColors.txtPrimary,
};
