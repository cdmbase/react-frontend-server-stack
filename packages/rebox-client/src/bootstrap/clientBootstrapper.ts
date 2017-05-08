import { injectable, inject } from 'inversify';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';

import { IClientBootstrapper } from './interfaces';

import {
    IContainerMediator, CONTAINER_MEDIATOR,
} from 'retax-di';

import {
    commonModule,
    clientModule,
    contextModuleFactory,
    lifecycleModuleFactory,
    IInversifyContainerFacade,
    IReboxConfig,
    MEDIATORY, IReboxMediator,
} from '@rebox/core';

@injectable()
export class ClientBootstrapper implements IClientBootstrapper {
    private _reboxConfig: IReboxConfig;
    private _containerFacade: IInversifyContainerFacade;

    constructor(
        @inject(CONTAINER_MEDIATOR) private _containerMediator: IContainerMediator
    ){}

    public config(config: IReboxConfig): void {
        this._reboxConfig = config;
    }

    public async bootstrap(element: Element): Promise<void> {
        // configure history
        const history = browserHistory;
        const location = history.createLocation(window.location);
        history.replace(location);

        // create IOC container
        this._containeFacade = this._containerMediator.create([
            commonModule,
            clientModule,
            contextModuleFactory({ history, reboxConfig: this._reboxConfig}),
            lifecycleModuleFactory(this._reboxConfig.lifecycle),
        ]);

        // build the app
        const mediator = this._containerFacade.getService<IReboxMediator>(MEDIATOR);
        const app = await mediator.run(this._containerFacade);

        // reload the container (usefull if the user uses code splitting)
        this._containerMediator.reload(this._containerFacade);

        // render!
        render(app, element);
    }
}