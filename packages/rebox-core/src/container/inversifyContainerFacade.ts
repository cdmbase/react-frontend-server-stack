import { Container, interfaces, injectable } from 'inversify';

import { IInversifyContainerFacade, IUserModule } from './interfaces';
import { IOptions } from '../options/interfaces';

@injectable()
export default class InversifyContainerFacade implements IInversifyContainerFacade {
    /**
     * @type {interfaces.Container}
     */
    private readonly _container: interfaces.Container;
    private readonly _loadedUserModules: Map<Symbol, boolean>;

    /**
     * @param options
     */
    // constructor (options: TInputOptions) {
    // this.container
    //     .bind<IOptions>(ServiceIdentifiers.IOptions)
    //     .toDynamicValue(() => {
    //         return new Options(options);
    //     })
    //     .inSingletonScope();

    // }

    constructor() {
        this._container = new Container();
        this._loadedUserModules = new Map<Symbol, boolean>();
    }

    /**
     * @param serviceIdentifier
     * @return {T}
     */
    public get<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T {
        return this._container.get<T>(serviceIdentifier);
    }

    /**
     * @param serviceIdentifier
     * @param named
     * @returns {T}
     */
    public getNamed<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>, named: string | number | symbol): T {
        return this._container.getNamed<T>(serviceIdentifier, named);
    }

    public getAll<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T[] {
        return this._container.getAll<T>(serviceIdentifier);
    }

    public loadContainerModules(modules: interfaces.ContainerModule[] = []): void {
        this._container.load(...modules);
    }

    public loadModules(modules: IUserModule[] = []): void {
        modules.map(m => {
            if (!this._loadedUserModules.get(m.serviceId)) {
                this._container.load(m.containerModule);
                this._loadedUserModules.set(m.serviceId, true);
            }
        });
    }

    public unloadModules(modules: IUserModule[] = []): void {
        modules.forEach(m => {
            if (this._loadedUserModules.get(m.serviceId)) {
                this._container.unload(m.containerModule);
                this._loadedUserModules.set(m.serviceId, false);
            }
        });
    }
};
