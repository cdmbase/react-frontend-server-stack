import * as React from 'react';

import { IReboxChildContext } from './interfaces';
import { InversifyContainerFacade } from '../../container';

abstract class ReboxConsumer<P, S> extends React.Component<P, S>{
    public static contextTypes: React.ValidationMap<any> = {
        container: React.PropTypes.instanceOf(InversifyContainerFacade),
    };

    public context: IReboxChildContext;
}

export default ReboxConsumer;