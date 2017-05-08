import { IInversifyContainerFacade } from '../../container';

export interface IJSXBuilder {
    build(container: IInversifyContainerFacade): JSX.Element;
}