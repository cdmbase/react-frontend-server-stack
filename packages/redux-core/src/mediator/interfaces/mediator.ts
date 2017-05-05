import { IInversifyContainerFacade } from '../../container';

export interface IReboxMediator {
    run(container: IInversifyContainerFacade): Promise<JSX.Element>;
}
