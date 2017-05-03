import { Store } from '../types';


export const setCurrentLocale = (locale: string): Store.Action => ({
    type: 'SET_CURRENT_LOCALE',
    payload: { locale },
});
