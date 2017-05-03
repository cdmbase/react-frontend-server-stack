import { interfaces } from 'inversify';

export interface IUserModule {
    serviceIdentifier: Symbol;
    containerModule: interfaces.ContainerModule;
}

export interface IInversifyContainerFacade {
    /**
     * @param serviceIdentifier
     */
    get <T> (serviceIdentifier: interfaces.ServiceIdentifier<T>): T;

    /**
     * @param serviceIdentifier
     */
    getAll <T> (serviceIdentifier: interfaces.ServiceIdentifier<T>): T[];


    /**
     * @param serviceIdentifier
     * @param named
     */
    getNamed <T> (serviceIdentifier: interfaces.ServiceIdentifier<T>, named: string | number | symbol): T;

    loadContainerModule(modules: interfaces.ContainerModule[]): void;
    loadModules(modules: IUserModule[]): void;
    unloadModules(modules: IUserModule[]): void;
}