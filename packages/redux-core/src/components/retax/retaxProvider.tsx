import * as React from 'react';
import { IRetaxProps, IRetaxChildContext } from './interfaces';
import { InversifyContainerFacade } from '../../container';

export default class RetaxProvider extends React.Component<IRetaxProps, void> {
    public static propTypes: React.ValidationMap<any> = {
        container: React.PropTypes.instanceOf(InversifyContainerFacade).isRequired,
    };

    public getChildContext(): IRetaxChildContext {
        return {
            container: this.props.container,
        };
    }

    public render(): any {
        return React.Children.only(this.props.children);
    }
}
