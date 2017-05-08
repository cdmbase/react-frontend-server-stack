import { injectable, inject } from 'inversify';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'history';
import { Request, Response, NextFucntion } from 'express';
import {
    commonModule,
    serverModule,
    contextModuleFactory,
    lifecyclModuleFactory,
    IReboxMediator,
    MEDIATOR,
    IReduxFacade,
    REDUX_FACADE
} from '@rebox/core';

import { IReboxMiddlewareFactory, IReboxMiddleware } from './interfaces';

import { IServerConfigStore } from '../configStores';
import { SERVER_CONFIG_STORE } from '../container';

@injectable()
export default class RenderingMiddlewareFactory implements IReboxMiddlewareFactory {
    constructor(
        @inject(SERVER_CONFIG_STORE) private _configStore: IServerConfigStore,
        @inject(CONTAINER_MEDIATORY) private _containerMediator: IContainerMediator
    ) {}

    public create(): IReboxMiddleware {
        const { reboxConfig, dynamicIndex } = this._configStore.config;

        return async(req: Request, res: Response, next: NextFucntion) => {
            try {
                // configure history
                const history = createMemoryHistory();

                // create IOC container
                const container = this._containerMediator.create([
                    commonModule,
                    serverModule,
                    contextModuleFactory({ history, reboxConfig, request: { req, res }}),
                    lifecycleModuleFactory({reboxConfig.lifecycle}),
                ]);

                // builder the app
                const mediator = container.getService<IReboxMediator>(MEDIATOR);
                const reduxFacade = container.getService<IReduxFacade>(REDUX_FACADE);
                const app = await mediator.run(container);

                // reload the container (useful if the user uses code splitting)
                this._containerMediatory.reload(container);

                // render!
                const finalApp = dynamicIndex(app, reduxFacade.store);
                const markup = renderToString(finalApp);

                res.send(markup);
            } catch (e) {
                next(e);
            }
        };
    }
}