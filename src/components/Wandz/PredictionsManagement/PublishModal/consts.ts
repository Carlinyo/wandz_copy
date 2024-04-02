import { RetrainPublishPolicies } from '@wandzai/wandz-interfaces';

export const PUBLISH_MODEL_STRINGS = {
  MODEL_TITLE: 'Publish Model',
  PREDICTION_TO: 'Prediction To',
  TARGET: 'Target',
  TRAINED_ON: 'Trained On',
  TRAINING_DATE_RANGE: 'Training Date Range',
  AUDIENCE: 'Audience',
  MODEL_QUALITY_FUNCTIONS: 'Model Quality Functions',
  AUDIENCE_FOR_PUBLISH_TITLE: 'Audience for Publish',
  ALL: 'ALL',
  SPECIFIC_SEGMENT: 'Specific Segment',
  EXCLUDE_BOTS: 'Exclude Bots',
  RECOMMENDED: '(Recommended)',
  PRIMARY_BTN_TEXT: 'Publish',
  SECONDARY_BTN_TEXT: 'Cancel',
};

export const AUTO_PUBLISH_SETTINGS = {
  TITLE: 'Auto-publication Settings',
  TITLE_TOOLTIP: 'Some tooltip',
  CHOICES: [
    {
      text: 'Publish only if the re-trained model is best performing',
      value: RetrainPublishPolicies.BEST,
    },
    {
      text: 'Always publish the latest trained model',
      value: RetrainPublishPolicies.AUTO,
    },
    {
      text: "Don't auto-publish",
      value: RetrainPublishPolicies.MANUAL,
    },
  ],
};

export const CODE_SNIPPET = {
  PATH_TITLE: 'Here’s the full path to the prediction model',
  PATH_CODE: 'window.cjos.exampletext.loremipsum.dolorsitamet.contsru',
  REGISTER_TITLE: 'To register, place this in your code',
  REGISTER_CODE:
    'if (!window.CJOS) window.cjos = [];\n' +
    'CJOS.push((\n' +
    '      action: ‘register’, // create activation\n' +
    '      params: {\n' +
    '          dataPoint: (Data_Point), //Call the DP whenever it change\n' +
    '          callback: [callback function] //callback mean to do this activity if the DP above\n' +
    'changes\n' +
    '     }\n' +
    '));',
};

export const FAST_PUBLISH_MODAL = {
  TITLE: 'Just one more step!',
  CONTENT: {
    LINE1: 'Don’t waste time waiting for the results -',
    LINE2_1: 'publish a ready made model, pre-trained on more than ',
    LINE2_2: '1.5B users',
    LINE3: 'As your model trains and improves, it will upgrade itself seamlessly.',
  },
  GET_BETTER_STR: 'To get a better understanding go to our',
  HELP_CENTER: 'Help Center',
  BTN_TEXT: 'Publish Model',
  CONTINUE: 'Continue with training only',
};
