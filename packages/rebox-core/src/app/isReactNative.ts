const isReactNative = typeof navigator === 'object' &&
    navigator.product === 'ReactNative';

export default isReactNative;

