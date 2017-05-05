/**
 * These are the identifiers used with DI.
 * If you are using rebox core without rebox client or rebox server, you HAVE to use these identifiers
 * or the DI won't work.
 */

export const ServiceIdentifiers: any = {
    IOptions: Symbol('IOptions'),
};

// components
export const REBOX_PROVIDER_COMPONENT = Symbol('ReboxProviderComponent');
export const REBOX_CONSUMER_COMPONENT = Symbol('ReboxConsumerComponent');
export const COMPONENTS = { REBOX_PROVIDER_COMPONENT, REBOX_CONSUMER_COMPONENT }

// config stores
export const REBOX_CONFIG_STORE = Symbol('ReboxConfigStore');

// cookie proxies
export const COOKIE_PROXY = Symbol('CookieProxy');

// inversify container facade
export const INVERSIFY_CONTAINER_FACADE = Symbol('InversifyContainerFacade');

// jsx builders
export const JSX_BUILDER = Symbol('JSXBuilder');

// react router facade
export const REACT_ROUTER_FACADE = Symbol('ReactRouterFacade');

// redux facade
export const REDUX_FACADE = Symbol('ReduxFacade');

// state proxies
export const STATE_PROXY = Symbol('StateProxy');

// boostrapping context
export const CONTEXT = Symbol('Context');

// mediator
export const MEDIATOR = Symbol('Mediator');

// lifecycle
export const LIFECYCLE_ACTIONS_CREATOR = Symbol('LifecycleActionsCreator');
