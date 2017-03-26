import { Store } from '../types';

const initialState = {
    baselineShown: false,
    currentTheme: 'defaultTheme',
    error: null,
    menuShown: false,
    online: false,
    started: false
};

const reducer = (state: Store.AppState = initialState, action: Store.Action): Store.AppState => {


    switch (action.type) {
        case 'APP_ERROR':
            return { ...state, error: action.payload.error };

        case 'APP_SHOW_MENU':
            return { ...state, menuShown: action.payload.menuShown };

        case 'APP_ONLINE':
            return { ...state, online: action.payload.online };

        case 'APP_STARTED':
            return { ...state, started: true };

        case 'TOGGLE_BASELINE':
            return { ...state, baselineShown: !state.baselineShown };

        case 'SET_THEME':
            return { ...state, currentTheme: action.payload.theme };

        default:
            return state;

    }
}

export default reducer;
