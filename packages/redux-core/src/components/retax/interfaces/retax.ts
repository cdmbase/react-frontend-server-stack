import { IInjectableUserServiceMap } from '../../service';
import { IInversifyContainerFacade } from '../../../container';

export interface IReboxChildContext {
    container: IInversifyContainerFacade;
}

export interface IReboxProps extends IReboxChildContext {}

export interface IReboxComponentRuntimeConfig {
    actionsCreators?: IInjectableUserServiceMap;
}