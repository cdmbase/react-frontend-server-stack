// Fails as it conflict with NodeRequire
// declare var require: {
//   (path: string): any;
//   <T>(path: string): T;
//   (paths: string[], callback: (...modules: any[]) => void): void;
//   ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
// };

declare var SETTINGS: any;