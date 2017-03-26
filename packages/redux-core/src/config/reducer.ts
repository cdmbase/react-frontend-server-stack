import { Store } from '../types';

const initialState = {
    appName: '',
    appVersion: '',
    sentryUrl: '',
};

const reducer = (
    state: Store.ConfigState = initialState,
): Store.ConfigState => state;

export default reducer;