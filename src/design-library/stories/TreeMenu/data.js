import one from '../../src/assets/icons/actions/copy.svg';
import two from '../../src/assets/icons/close-icons/newX.svg';

const icons = [one, two];

export const tree = {
  id: 'root',
  displayName: 'root',
  children: [
    {
      id: 16,
      displayName: 'visitor',
      dataPoint: 'visitor',
      disabled: false,
      icons,
      children: [
        {
          id: 17,
          displayName: 'localization',
          dataPoint: 'localization',
          icons,
          disabled: false,
          children: [
            {
              id: 98,
              displayName: 'postalCode',
              dataPoint: 'postalCode',
              disabled: false,
            },
            {
              id: 3,
              displayName: 'state',
              dataPoint: 'state',
              disabled: false,
            },
            {
              id: 5,
              displayName: 'timeZone',
              icons,
              dataPoint: 'timeZone',
              disabled: false,
            },
          ],
        },
        {
          id: 18,
          displayName: 'segments',
          dataPoint: 'segments',
          icons,
          disabled: false,
          children: [
            {
              id: 10000,
              isCustom: true,
              dataPoint: 'awf_sEGF',
              expression: 'cookie.?????? !== ????? ???? ',
              displayName: 'awf sEGF',
              icons,
              path: 'visitor.segments',
              allDomains: true,
            },
            {
              id: 8,
              displayName: 'isCustomer',
              dataPoint: 'isCustomer',
              disabled: false,
            },
            {
              id: 9,
              displayName: 'isTechSavvy',
              dataPoint: 'isTechSavvy',
              icons,
              disabled: false,
            },
          ],
        },
        {
          id: 19,
          displayName: 'weather',
          dataPoint: 'weather',
          disabled: false,
          children: [
            {
              id: 102,
              displayName: 'wind_mph',
              dataPoint: 'wind_mph',
              disabled: false,
            },
            {
              id: 14,
              displayName: 'temp_c',
              dataPoint: 'temp_c',
              disabled: false,
              children: [
                {
                  id: 148,
                  displayName: 'tempCRange',
                  dataPoint: 'tempCRange',
                  disabled: false,
                  subCategory: 'temp_c',
                },
                {
                  id: 150,
                  displayName: 'tempCValue',
                  dataPoint: 'tempCValue',
                  icons,
                  disabled: false,
                  subCategory: 'temp_c',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 21,
      displayName: 'device',
      dataPoint: 'device',
      disabled: false,
      children: [
        {
          id: 35,
          displayName: 'environmentPerformance',
          dataPoint: 'environmentPerformance',
          disabled: false,
          icons,
          children: [
            {
              id: 37,
              displayName: 'cpuStrength',
              dataPoint: 'cpuStrength',
              disabled: false,
              children: [
                {
                  id: 118,
                  displayName: 'cpuStrengthScore(1to5)sdfs',
                  dataPoint: 'cpuStrengthScore(1to5)',
                  disabled: false,
                  icons,
                  subCategory: 'cpuStrength',
                },
                {
                  id: 117,
                  displayName: 'cpuStrengthValue',
                  dataPoint: 'cpuStrengthValue',
                  disabled: false,
                  icons,
                  subCategory: 'cpuStrength',
                },
              ],
            },
            {
              id: 36,
              displayName: 'networkStrength',
              dataPoint: 'networkStrength',
              disabled: false,
              icons,
              children: [
                {
                  id: 120,
                  displayName: 'networkStrengthScore(1to5)',
                  dataPoint: 'networkStrengthScore(1to5)',
                  disabled: false,
                  subCategory: 'networkStrength',
                },
                {
                  id: 119,
                  displayName: 'networkStrengthValue',
                  dataPoint: 'networkStrengthValue',
                  disabled: false,
                  subCategory: 'networkStrength',
                },
              ],
            },
          ],
        },
        {
          id: 22,
          displayName: 'general',
          dataPoint: 'general',
          disabled: false,
          children: [
            {
              id: 30,
              displayName: 'zoom',
              dataPoint: 'zoom',
              disabled: false,
            },
            {
              id: 24,
              displayName: 'resolution',
              dataPoint: 'resolution',
              icons,
              disabled: false,
              children: [
                {
                  id: 26,
                  displayName: 'pxHeight',
                  dataPoint: 'pxHeight',
                  disabled: false,
                  icons,
                  subCategory: 'resolution',
                },
                {
                  id: 25,
                  displayName: 'pxWidth',
                  dataPoint: 'pxWidth',
                  disabled: false,
                  subCategory: 'resolution',
                },
              ],
            },
            {
              id: 114,
              displayName: 'settings',
              dataPoint: 'settings',
              disabled: false,
              children: [
                {
                  id: 115,
                  displayName: 'doNotTrack',
                  dataPoint: 'doNotTrack',
                  disabled: false,
                  icons,
                  subCategory: 'settings',
                },
              ],
            },
          ],
        },
        {
          id: 38,
          displayName: 'installs',
          dataPoint: 'installs',
          disabled: false,
          children: [
            {
              id: 39,
              displayName: 'undefined',
              dataPoint: 'adBlocker',
              disabled: false,
            },
            {
              id: 41,
              displayName: 'shopperExtensions',
              dataPoint: 'shopperExtensions',
              disabled: false,
              children: [
                {
                  id: 43,
                  displayName: 'amazonAssist',
                  dataPoint: 'amazonAssist',
                  disabled: false,
                  subCategory: 'shopperExtensions',
                },
                {
                  id: 42,
                  displayName: 'honey',
                  dataPoint: 'honey',
                  disabled: false,
                  subCategory: 'shopperExtensions',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default {
  tree,
};
