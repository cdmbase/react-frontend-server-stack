export * from './retax';
export * from './actionsCreator';
export * from './api';
export * from './service';

  pit('mediates the flow of retax', async () => {
    const mediator = new Mediator(
      <any>context,
      <any>cookieProxy,
      <any>stateProxy,
      <any>reduxFacade,
      <any>routerFacade,
      <any>lifecycleActions,
      <any>builder
    );