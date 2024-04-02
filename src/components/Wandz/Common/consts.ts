import { Channels, Devices } from '@wandzai/wandz-interfaces';
import { SpecificAudienceFilters } from '@/components/Wandz/Common/types';
import type { IBaseAudiencesConfig } from '@wandzai/wandz-interfaces/src/interfaces/pred-model';

export const DEVICES_DISPLAY_NAME = {
  [Devices.MOB]: 'Mobile',
  [Devices.PC]: 'Desktop',
  [Devices.TABLET]: 'Tablet',
};
export const DEVICES_DISPLAY_NAME_TO_VALUE = {
  [DEVICES_DISPLAY_NAME[Devices.MOB]]: Devices.MOB,
  [DEVICES_DISPLAY_NAME[Devices.PC]]: Devices.PC,
  [DEVICES_DISPLAY_NAME[Devices.TABLET]]: Devices.TABLET,
};

export const CHANNELS_DISPLAY_NAMES = {
  [Channels.DIRECT]: 'Direct',
  [Channels.GOOGLE]: 'Google',
  [Channels.GOOGLE_ADS]: 'Google Ads',
  [Channels.EMAIL]: 'Email',
  [Channels.FB]: 'Facebook',
  [Channels.FB_ADS]: 'Facebook Ads',
  [Channels.INST]: 'Instagram',
  [Channels.TIKTOK]: 'TikTok',
  [Channels.YOUTUBE]: 'YouTube',
  [Channels.TWITTER]: 'Twitter',
  [Channels.BING]: 'Bing',
  [Channels.OTHER]: 'Other',
};

export const CHANNELS_DISPLAY_NAMES_TO_VALUE = {
  [CHANNELS_DISPLAY_NAMES[Channels.DIRECT]]: Channels.DIRECT,
  [CHANNELS_DISPLAY_NAMES[Channels.GOOGLE]]: Channels.GOOGLE,
  [CHANNELS_DISPLAY_NAMES[Channels.GOOGLE_ADS]]: Channels.GOOGLE_ADS,
  [CHANNELS_DISPLAY_NAMES[Channels.EMAIL]]: Channels.EMAIL,
  [CHANNELS_DISPLAY_NAMES[Channels.FB]]: Channels.FB,
  [CHANNELS_DISPLAY_NAMES[Channels.FB_ADS]]: Channels.FB_ADS,
  [CHANNELS_DISPLAY_NAMES[Channels.INST]]: Channels.INST,
  [CHANNELS_DISPLAY_NAMES[Channels.TIKTOK]]: Channels.TIKTOK,
  [CHANNELS_DISPLAY_NAMES[Channels.YOUTUBE]]: Channels.YOUTUBE,
  [CHANNELS_DISPLAY_NAMES[Channels.TWITTER]]: Channels.TWITTER,
  [CHANNELS_DISPLAY_NAMES[Channels.BING]]: Channels.BING,
  [CHANNELS_DISPLAY_NAMES[Channels.OTHER]]: Channels.OTHER,
};

export const AUDIENCE_FILTERS: IBaseAudiencesConfig = {
  [SpecificAudienceFilters.channels]: 'Traffic Source',
  [SpecificAudienceFilters.devices]: 'Device',
  [SpecificAudienceFilters.segments]: 'Segment',
};
