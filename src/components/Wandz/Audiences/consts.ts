import type { ITableHeader } from '@/design-library/src/types/interfaces/table';
import { AudienceActions, AudiencesTableColumns } from '@/components/Wandz/Audiences/types';
import semanticsColors from '@/design-library/src/styles/colors/semantic.module.scss';
import { PathToActionsIcons } from '@/components/Wandz/consts';
import type { ITableMenuItem } from '@/design-library/src/types/interfaces/table-menu';
import type { IModalProps } from '@/design-library/src/types/interfaces/modal';

/** HEADER */
export const SEARCH_PH = 'Search';
export const SEARCH_WIDTH = 344;
export const CREATE_BUTTON_TEXT = 'Create New Audience';

export const SEARCHED_TERM_MIN_LENGTH = 2;

/** TABLE */
export const AUDIENCES_TABLE_COLUMNS: ITableHeader[] = [
  {
    key: AudiencesTableColumns.NAME,
    value: 'Audience Name',
    columnStyle: { width: '22%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
  },
  {
    key: AudiencesTableColumns.AVG_DAILY,
    value: 'Avg. Daily Size',
    info: 'This is my tooltip',
    columnStyle: { width: '18%' },
    sorting: {
      sortType: 'Number',
      sortOrder: 1,
    },
  },
  {
    key: AudiencesTableColumns.CREATION_DATE,
    value: 'Creation Date',
    columnStyle: { width: '15%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
  },
  {
    key: AudiencesTableColumns.CREATED_BY,
    value: 'Created By',
    columnStyle: { width: '15%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
  },
  {
    key: AudiencesTableColumns.DESCRIPTION,
    value: 'Description',
    columnStyle: { width: '20%' },
    sorting: {
      sortType: 'String',
      sortOrder: 1,
    },
  },
  {
    key: AudiencesTableColumns.ACTIONS,
    value: 'Actions',
    columnStyle: { width: '10%' },
    unsortable: true,
  },
];

export const ACTIONS_LABELS_MAP: Record<AudienceActions, { label: string; iconPath?: string; color?: string }> = {
  [AudienceActions.AUDIENCE_INFO]: {
    label: 'Audience Info',
    iconPath: `${PathToActionsIcons}/publish.svg`,
  },
  [AudienceActions.DELETE]: {
    label: 'Delete',
    iconPath: `${PathToActionsIcons}/delete.svg`,
    color: semanticsColors.semanticNegative,
  },
  [AudienceActions.DUPLICATE]: {
    label: 'Duplicate',
    iconPath: `${PathToActionsIcons}/archive.svg`,
  },
};

const tableMenuItemBuilder = (action: AudienceActions): ITableMenuItem => ({
  key: action,
  text: ACTIONS_LABELS_MAP[action].label,
  iconSrc: ACTIONS_LABELS_MAP[action].iconPath,
  isSelected: false,
  style: {
    color: ACTIONS_LABELS_MAP[action].color,
  },
});

export const BASIC_ACTIONS: ITableMenuItem[] = [
  tableMenuItemBuilder(AudienceActions.DUPLICATE),
  tableMenuItemBuilder(AudienceActions.AUDIENCE_INFO),
];

export const ACTIONS_MAPPED_TAB_ITEMS: Record</** boolean string for <isCustom>*/ any, ITableMenuItem[]> = {
  true: [...BASIC_ACTIONS, tableMenuItemBuilder(AudienceActions.DELETE)],
  false: BASIC_ACTIONS,
};

/** MODAL */
export const MODAL_PROPS = <IModalProps>{
  primaryButtonText: 'Create',
  secondaryButtonText: 'Cancel',
  title: 'Create new Audience',
};
