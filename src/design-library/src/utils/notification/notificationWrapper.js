export const notificationsStatusTypes = {
  success: 'success',
  failed: 'failed',
  general: 'general',
};

const statusTypesToClasses = {
  [notificationsStatusTypes.success]: [
    'alert-success',
    'flex-container-special-success',
    'ibp-img-success-style',
    'msg-text-special-success',
    'exit-button-special-success',
  ],
  [notificationsStatusTypes.failed]: [
    'alert-error',
    'flex-container-special-success',
    'prepend-icon',
    'msg-text-special-success',
    'exit-button-special-success',
  ],
  [notificationsStatusTypes.general]: [
    'general',
    'flex-container-special-success',
    'prepend-icon',
    'msg-text-special-success',
    'exit-button-special-success',
  ],
};

export const buildNotificationJson = (status, message, timeout = 10000, exitButton = true) => {
  const commonClasses = statusTypesToClasses[status];

  return {
    message: `<span style="font-family: 'Figtree'; font-weight: 500;">${message}</span>`,
    horizontalAlign: 'center',
    verticalAlign: 'bottom',
    type: 'message',
    timeout,
    exitButton,
    CSQMSuccessClass: commonClasses,
    setBackgroundMsg: '#1971D8' /** semantic info */,
  };
};

export const genericErrorNotificationJson = buildNotificationJson(
  'failed',
  'Something went wrong. Please try again in a few minutes.',
  0,
);

export default {
  notificationsStatusTypes,
  genericErrorNotificationJson,
  buildNotificationJson,
};
