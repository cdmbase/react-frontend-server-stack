import { interfaces, ContainerModule } from 'inversify';
import { ReboxProvider, ILifecycleService, ILifecycleServiceConstructor } from '../../components';
import { IReactRouterFacade, ReactRouterFacade } from '../../reactRouter';
import { IReduxFacade, ReduxFacade } from '../../redux';
import { IReboxMediator, ReboxMediator } from '../../mediator';
import { IContext } from '../../context';


import {
    MEDIATOR,
    COMPONENTS,
    REACT_ROUTER_FACADE,
    REDUX_FACADE,
    CONTEXT,
    LIFECYCLE_ACTIONS_CREATOR,
} from '../serviceIdentifiers';

export default new ContainerModule((bind: interfaces.Bind) => {
    bind<IReboxMediator>(MEDIATOR).to(ReboxMediator).inSingletonScope();
    bind<IReactRouterFacade>(REACT_ROUTER_FACADE).to(ReactRouterFacade).inSingletonScope();
    bind<IReduxFacade>(REDUX_FACADE).to(ReduxFacade).inSingletonScope();

    bind<typeof ReboxProvider>(COMPONENTS.REBOX_PROVIDER_COMPONENT).toConstructor(ReboxProvider);

});

export function contextModuleFactory(context: IContext): interfaces.ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
        bind<IContext>(CONTEXT).toConstantValue(context);
    });
}

export function lifecycleModuleFactory(LifecycleActionsCreator: ILifecycleServiceConstructor): interfaces.ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
        if (LifecycleActionsCreator) {
            bind<ILifecycleService>(LIFECYCLE_ACTIONS_CREATOR).to(LifecycleActionsCreator);
        } else {
            bind<ILifecycleService>(LIFECYCLE_ACTIONS_CREATOR).toConstantValue(undefined);
        }
    });
}
