/**
 * These are the identifiers used with DI.
 * If you are using retax core without retax client or retax server, you HAVE to use these identifiers
 * or the DI won't work.
 */

// cookie proxies
export const COOKIE_PROXY = Symbol('CookieProxy');

// jsx builders
export const JSX_BUILDER = Symbol('JSXBuilder');

// react router facade
export const REACT_ROUTER_FACADE = Symbol('ReactRouterFacade');

