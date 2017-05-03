import { Store } from '../types';

const initialState = {
    host: '',
};

const reducer = (state: Store.DeviceState = initialState): Store.DeviceState => state;

export default reducer;
