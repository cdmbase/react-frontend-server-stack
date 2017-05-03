import { Container, interfaces, injectable } from 'inversify';

import { IInversifyContainerFacade } from './interfaces';
import { IOptions } from '../options/interfaces';

export class InversifyContainerFacade implements IInversifyContainerFacade {
    /**
     * @type {interfaces.Container}
     */
    private readonly container: interfaces.Container;
    private readonly loadedUserModules: Map<Symbol, boolean>;

    /**
     * @param options
     */
    constructor (options: TInputOptions) {
        this.container = new Container();
        this.loadedUserModules = new Map<Symbol, boolean>();

        this.container
            .bind<IOptions>(ServiceIdentifiers.IOptions)
            .toDynamicValue(() => {
                return new Options(options);
            })
            .inSingletonScope();

    }

    /**
     * @param serviceIdentifier
     * @return {T}
     */
    public get <T> (serviceIdentifier: interfaces.ServiceIdentifiers<T>): T {
        return this.container.get<T>(serviceIdentifier);
    }

    /**
     * @param serviceIdentifier
     * @param named
     * @returns {T}
     */
    public getNamed<T> (serviceIdentifier: interfaces.ServiceIdentifiers<T>, named: string | number | symbol): T {
        return this.container.getNamed<T>(serviceIdentifier, named);
    }

    public loadContainerModules(modules: interfaces.ContainerModule[] = []): void {
        this.container.load(...modules);
    }

    public loadModules(modules: IUserModule[] = []): void {
        modules.map(m => {
            if (!this.loadedUserModules.get(m.serviceIdentifier)) {
                this.container.load(m.containerModule);
                this.loadedUserModules.set(m.serviceIdentifier, true);
            }
        });
    }

    public unloadModules(modules: IUserModule[] = []): void {
        modules.forEach(m => {
            if (this.loadedUserModules.get(m.serviceIdentifier)) {
                this.container.unload(m.containerModule);
                this.loadedUserModules.set(m.serviceIdentifier, false);
            }
        });
    }
};
