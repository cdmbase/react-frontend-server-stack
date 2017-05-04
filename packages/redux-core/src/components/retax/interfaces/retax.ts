import { IInjectableUserServiceMap } from '../../service';
import { IInversifyContainerFacade } from '../../../container';

export interface IRetaxChildContext {
    container: IInversifyContainerFacade;
}

export interface IRetaxProps extends IRetaxChildContext {}

export interface IRetaxComponentRuntimeConfig {
    actionsCreators?: IInjectableUserServiceMap;
}