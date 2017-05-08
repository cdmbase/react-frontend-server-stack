import {
    IUserService,
    IUserServiceMap,
    IInjectableUserServiceMap
} from '../../service';

/**
 * This is the type of the object passed in the annotation
 */
export interface IActionsCreatorServiceRuntimeConfig {
    apis?: IInjectableUserServiceMap;
    actionCreators?: IInjectableUserServiceMap;
}

/**
 * This is the type of the configure function of the action creator
 */
export interface IActionsCreatorServiceConfig {
    apis?: IUserServiceMap;
    actionsCreators?: IUserServiceMap;
}

/**
 * A service allowing to create an actions creator.
 */
export interface IActionsCreatorService extends IUserService {
    apis: IUserServiceMap;

    configure(config: IActionsCreatorServiceConfig): void;
}

/**
 * A service constructor allowing to create an actions creator.
 */
export interface IActionsCreatorServiceConstructor {
    new(apis?: IUserService[], actionsCreator?: IUserService[]): IActionsCreatorService;
}