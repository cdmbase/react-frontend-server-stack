import * as React from 'react';

import { IRetaxChildContext } from './interfaces';
import { InversifyContainerFacade } from '../../container';

abstract class RetaxConsumer<P, S> extends React.Component<P, S>{
    public static contextTypes: React.ValidationMap<any> = {
        container: React.PropTypes.instanceOf(InversifyContainerFacade),
    };

    public context: IRetaxChildContext;
}

export default RetaxConsumer;