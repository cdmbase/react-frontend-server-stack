import * as React from 'react';
import { IReboxProps, IReboxChildContext } from './interfaces';
import { InversifyContainerFacade } from '../../container';

export default class ReboxProvider extends React.Component<IReboxProps, void> {
    public static propTypes: React.ValidationMap<any> = {
        container: React.PropTypes.instanceOf(InversifyContainerFacade).isRequired,
    };

    public getChildContext(): IReboxChildContext {
        return {
            container: this.props.container,
        };
    }

    public render(): any {
        return React.Children.only(this.props.children);
    }
}
