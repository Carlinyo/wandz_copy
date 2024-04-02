import * as core from '@amcharts/amcharts4/core';
import * as charts from '@amcharts/amcharts4/charts';
import * as maps from '@amcharts/amcharts4/maps';
import themesAnimated from '@amcharts/amcharts4/themes/animated';

// NOTE: turning off for performance
// core.useTheme(am4themesAnimated);

const licenses = ['CH200419818313128', 'MP200419818313128'];
licenses.forEach(core.addLicense);

core.options.minPolylineStep = 1;
core.options.queue = false; // this makes multiple charts on a page to load simultaneously

//  NOTE: for some reason our charts don't appear with this option
//  core.options.onlyShowOnViewport = true;

export const am4charts = charts;
export const am4core = core;
export const am4maps = maps;
export const am4themesAnimated = themesAnimated;

export default {
  am4core,
  am4charts,
  am4maps,
  am4themesAnimated,
};
