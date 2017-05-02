import config from './config';

const createInitialState = () => ({
  config: {
    appName: config.appName,
    appVersion: config.appVersion,
    // sentryUrl: config.sentryUrl,
  },
//   device: deviceReducer(),
//   intl: {
//     ...intlReducer(),
//     currentLocale: config.defaultLocale,
//     defaultLocale: config.defaultLocale,
//     locales: config.locales,
//     messages,
//   },
});

export default createInitialState;