import { Store } from '../types';

const initialState = {
    currentLocale: null,
    defaultLocale: null,
    initialNow: null,
    locales: null,
    messages: null,
};

const reducer = (state: Store.IntlState = initialState, action?: Store.Action): Store.IntlState => {

    if (!action) {
        return state;
    }

    switch (action.type) {

        case 'SET_CURRENT_LOCALE': {
            return { ...state, currentLocale: action.payload.locale };
        }
        default:
            return state;
    }
};

export default reducer;