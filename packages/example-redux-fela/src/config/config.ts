


const config = {
  appName: require('../../package.json').name,
  // Use appVersion defined in
  appVersion: require('../../package.json').version,
  defaultLocale: 'en',
  googleAnalyticsId: SETTINGS.googleAnalyticsId,
  isProduction: process.env.NODE_ENV === 'production',
  locales: ['en'],
  // Enable hot reload on remote device. Note it prevents offline testing,
  // because it depends on ip.address(), which doesn't work with disabled wifi.
  // How do we access a website running on localhost from mobile browser?
  // stackoverflow.com/questions/3132105
  remoteHotReload: false,
  sentryUrl: SETTINGS.public.sentryUrl,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || 3002,
};

export default config;