jest.unmock('inversify');
jest.unmock('../inversifyContainerFacade');
import 'reflect-metadata';

import { interfaces, ContainerModule } from 'inversify';
import { IUserModule } from '../interfaces';
import InversifyContainerFacade from '../inversifyContainerFacade';

describe('InversifyContainerFacade', () => {
    const module1Id = Symbol('module1');
    const module2Id = Symbol('module2');
    const module1 = new ContainerModule((bind: interfaces.Bind) => bind(module1Id).toConstantValue(1));
    const module2 = new ContainerModule((bind: interfaces.Bind) => bind(module2Id).toConstantValue(2));

    const baseModules: IUserModule[] = [
        {
            containerModule: module1,
            serviceId: module1Id,
        },
        {
            containerModule: module2,
            serviceId: module2Id,
        },
    ];

    it('loads modules into the container', () => {
        const containerFacade = new InversifyContainerFacade();

        containerFacade.loadModules(baseModules);
        expect((<any>containerFacade)._loadedUserModules.get(module1Id)).toEqual(true);
        expect((<any>containerFacade)._loadedUserModules.get(module2Id)).toEqual(true);

        expect(containerFacade.get(module1Id)).toEqual(1);
        expect(containerFacade.get(module2Id)).toEqual(2);

        const module3Id = Symbol('module3');
        const module3 = new ContainerModule((bind: interfaces.Bind) => bind(module3Id).toConstantValue(3));

        const userModules2: IUserModule[] = [
            {
                containerModule: module3,
                serviceId: module3Id,
            },
        ];

        containerFacade.loadModules(userModules2);

        expect((<any>containerFacade)._loadedUserModules.get(module3Id)).toEqual(true);

        expect(containerFacade.get(module3Id)).toEqual(3);
    });

    it('unloads modules from the kernel', () => {
        const containerFacade = new InversifyContainerFacade();

        containerFacade.loadModules(baseModules);
        containerFacade.unloadModules(baseModules);

        const module1Func = () => containerFacade.get(module1Id);
        expect(module1Func).toThrowError('No matching bindings found for serviceIdentifier: Symbol(module1)');

        const module2Func = () => containerFacade.get(module2Id);
        expect(module2Func).toThrowError('No matching bindings found for serviceIdentifier: Symbol(module2)');
        expect((<any>containerFacade)._loadedUserModules.get(module2Id)).toEqual(false);
        expect((<any>containerFacade)._loadedUserModules.get(module2Id)).toEqual(false);
    });

    it('get all services with a same id', () => {
        const containerFacade = new InversifyContainerFacade();

        const moduleId = Symbol('module');
        const myModule = new ContainerModule((bind: interfaces.Bind) => {
            bind(moduleId).toConstantValue(1);
            bind(moduleId).toConstantValue(2);
        });

        const modules: IUserModule[] = [
            {
                containerModule: myModule,
                serviceId: moduleId,
            },
        ];

        containerFacade.loadModules(modules);

        expect((<any>containerFacade)._loadedUserModules.get(moduleId)).toEqual(true);
        expect(containerFacade.getAll(moduleId)).toEqual([1, 2]);
    });

    it('loads raw container module into the container', () => {
        const containerFacade = new InversifyContainerFacade();

        const moduleId = Symbol('module');

        const modules: interfaces.ContainerModule[] = [
            new ContainerModule((bind: interfaces.Bind) => bind(moduleId).toConstantValue(1)),
        ];

        containerFacade.loadContainerModules(modules);

        expect(containerFacade.get(moduleId)).toEqual(1);
    });
});