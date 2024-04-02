import * as am4core from '@amcharts/amcharts4/core';
const tooltip = '#00074F';
const textTyping = '#585961';
const disableGray = '#9FA0A8';

const dataColor1 = '#724DFF';
const dataColor2 = '#897AC6';
const dataColor3 = '#1A5BFF';
const dataColor4 = '#FFAD31';
const dataColor5 = '#FFAA00';
const dataColor6 = '#E9986F';
const dataColor7 = '#689E86';
const dataColor8 = '#83D4FF';
const dataColor9 = '#BA7D77';
const dataColor10 = '#BD5DB5';
const dataColor11 = '#7C76DB';
const dataColor12 = '#E3B51C';
const dataColor13 = '#D8A1C4';
const dataColor14 = '#D2386C';
const dataColor15 = '#558CEB';
const dataColor16 = '#E9D1BF';
const dataColor17 = '#F96268';
const dataColor18 = '#B396F2';
const dataColor19 = '#4DBBFF';
const dataColor20 = '#ED64A7';
const dataColor21 = '#B8927D';
const dataColor22 = '#C2A370';
const dataColor23 = '#E67300';
const dataColor24 = '#9BB300';
const dataColor25 = '#62B0DC';

export const pieChartColors = [
  dataColor1,
  dataColor2,
  dataColor3,
  dataColor4,
  dataColor5,
  dataColor6,
  dataColor7,
  dataColor8,
  dataColor9,
  dataColor10,
  dataColor11,
  dataColor12,
  dataColor13,
  dataColor14,
  dataColor15,
  dataColor16,
  dataColor17,
  dataColor18,
  dataColor19,
  dataColor20,
  dataColor21,
  dataColor22,
  dataColor23,
  dataColor24,
  dataColor25,
];
export const singleFunnelColor = [];
export const doubleChartColor = [dataColor6, dataColor2];
export const tripleBarChartColor = [dataColor3, dataColor4, dataColor2];
export const deviceTypeColors = [
  { name: 'mobile', color: dataColor2 },
  { name: 'pc', color: dataColor1 },
  { name: 'tablet', color: dataColor3 },
];

export const COMMON_COLORS = {
  WHITE: am4core.color('#ffffff'),
  BLACK: am4core.color('#000000'),
  DARK_BLUE: am4core.color(tooltip),
  TXT_PRIMARY: am4core.color('#131F3C'),
  TOOLTIP_TEXT: am4core.color('#131F3C'),
  TOOLTIP_BORDER: am4core.color('#D8DBE0'),
  TEXT_TYPING: am4core.color(textTyping),
  DISABLE_GRAY: am4core.color(disableGray),
  BG_SHAPES: am4core.color('#C6CBD3'),
  TXT_SECONDARY: am4core.color('#636C86'),
  TXT_UPLIFT: am4core.color('#138B5D'),
};

const dataRedTomato = '#E95D5D';
const dataPinkPitaya = '#F797D6';
const dataOrangeCarrot = '#FBC067';
const dataYellowBanana = '#FFE783';
const dataGreenApple = '#8BCF75';
const dataAzureSky = '#85E3F6';
const dataBlueOrchid = '#638CF4';
const dataPurpleEggplant = '#B170C2';

export const DATA_COLORS = [
  dataRedTomato,
  dataPinkPitaya,
  dataOrangeCarrot,
  dataYellowBanana,
  dataGreenApple,
  dataAzureSky,
  dataBlueOrchid,
  dataPurpleEggplant,
];

const lightestGray = '#E9EBEE';
const lightGray = '#D8DBE0';
const gray = '#C6CBD3';
const boldGray = '#9199AA';

export const QUALITY_FUNCTIONS_COLORS = {
  dataRedTomato,
  lightestGray,
  dataOrangeCarrot,
  lightGray,
  dataYellowBanana,
  gray,
  dataGreenApple,
  boldGray,
};

export default {
  pieChartColors,
  singleFunnelColor,
  deviceTypeColors,
  doubleChartColor,
  tripleBarChartColor,
  COMMON_COLORS,
  DATA_COLORS,
};
