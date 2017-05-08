# @redux-bootstrap/utils

This is a set of utils for creating redux actions, creators and reducers.

## Getting started
```
npm install --save @redux-bootstrap/redux-utils
```

## Creating a reducer
This helper creates a redux reducer. It relies on the fact that an action object must be FSA compliant.

```js
import { reducerFactory } from '@redux-bootstrap/utils';

const initialState = {
    value: 0,
};

const reducer = reducerFactory(
    initialState,
    {
        INC: (state, action) => state + action.payload,
        DEC: (state, action) => state - action.payload,
    }
);

reducer();

/*
{
    value: 0
}
*/
```

## Creating an action creator
```js
import { actionCreatorFactory } from '@redux-boostrap/utils';

const actionCreator = actionCreatorFactory(
    'INC'
);

actionCreator();

/*
{
    type: 'INC'
}
*/

actionCreator(5);

/*
{
    type: 'INC',
    payload: 5
}
*/
```

You could also provide a `payloadCreator` and `metaCreator` (similar to [redux-actions](https://github.com/acdlite/redux-actions)).

```js
import { actionCreatorFactory } from '@redux-boostrap/utils';

const actionsCreator = actionCreatorFactory(
    'INC',
    x => 2 * x,
    y => 3 * y
);

actionsCreator();

/*
{
    type: 'INC'
}
*/

actionsCreator(5);

/*
{
    type: 'INC',
    payload: 10,
    meta: 15
}
*/
```

##License

MIT License (MIT)