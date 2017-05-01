export namespace Store {

interface FluxStandardAction {
  type: string | symbol | any;
  payload?: any;
  error?: boolean | any;
  meta?: any
}

// Core

    export interface Deps {
        FBSDK?: any;
        getState?: () => State;
        getUid?: () => string;
        now?: () => number;
        uuid: { v4: Function };
        validate?: (json: Object) => any;
    };

// Models

    export interface User {
        displayName: string;
        email?: string;
        id: string;
        photoURL?: string;
    }

    export interface AppState {
        baselineShown: boolean;
        currentTheme: string;
        error?: Error;
        menuShown: boolean;
        online: boolean;
        started: boolean;
    }

    export interface AuthState {
        formDisabled: boolean;
        error?: Error;
    }

    export interface ConfigState {
        appName: string;
        appVersion: string;
        sentryUrl: string;
    }

    export interface DeviceState {
        host: string;
    }

    export interface IntlState {
        currentLocale?: string;
        defaultLocale?: string;
        initialNow?: number;
        locales?: string[];
        messages?: Object;
    }

    export interface UsersState {
        online?: User[];
        viewer?: User;
    };

// State

    export interface State {
        app: Store.AppState;
        auth: Store.AuthState;
        config: Store.ConfigState;
        device: Store.DeviceState;
        fields: any;
        found: Object; // found router
        intl: Store.IntlState;
        users: Store.UsersState;
        [key: string]: any;
    };

// Actions

    export type Action =
        | { type: 'APP_ERROR', payload: { error: Error } }
        | { type: 'APP_ONLINE', payload: { online: boolean } }
        | { type: 'APP_SHOW_MENU', payload: { menuShown: boolean } }
        | { type: 'APP_STARTED' }
        | { type: 'CLEAR_ALL_COMPLETED_TODOS' }
        | { type: 'CLEAR_ALL_TODOS' }
        | { type: 'DELETE_TODO', payload: { id: string } }
        | { type: 'ON_AUTH', payload: { firebaseUser?: Object } }
        | { type: 'ON_USERS_PRESENCE', payload: { presence: Object } }
        | { type: 'RESET_PASSWORD', payload: { email: string } }
        | { type: 'SAVE_USER_DONE' }
        | { type: 'SET_CURRENT_LOCALE', payload: { locale: string } }
        | { type: 'SET_THEME', payload: { theme: string } }
        | { type: 'SIGN_IN', payload: { providerName: string, options?: Object } }
        | { type: 'SIGN_IN_DONE', payload: { user?: User } }
        | { type: 'SIGN_IN_FAIL', payload: { error: Error } }
        | { type: 'SIGN_OUT' }
        | { type: 'SIGN_UP', payload: { providerName: string, options?: Object } }
        | { type: 'SIGN_UP_DONE', payload: { user?: User } }
        | { type: 'SIGN_UP_FAIL', payload: { error: Error } }
        | { type: 'TOGGLE_BASELINE' };

}



