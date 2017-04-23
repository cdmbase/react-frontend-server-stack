import { isReactNative } from './isReactNative';

export const isClient = process.env.IS_BROWSER || isReactNative;
