import { IInversifyContainerFacade } from '../../container';

export interface IRetaxMediator {
    run(container: IInversifyContainerFacade): Promise<JSX.Element>;
}
