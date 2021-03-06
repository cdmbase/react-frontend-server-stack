import * as React from 'react';
import { defineMessages } from 'react-intl';

export const linksMessages = defineMessages({
    intl: {
        defaultMessage: 'Intl',
        id: 'app.links.intl',
    },
    fields: {
        defaultMessage: 'Fields',
        id: 'app.links.fields',
    },
    users: {
        defaultMessage: 'Users',
        id: 'app.links.users',
    },
    home: {
        defaultMessage: 'Home',
        id: 'app.links.home',
    },
    me: {
        defaultMessage: 'Me',
        id: 'app.links.me',
    },
    notFound: {
        defaultMessage: 'Page Not Found',
        id: 'app.links.notFound',
    },
    offiline: {
        defaultMessage: 'Offline',
        id: 'app.links.offline',
    },
    profile: {
        defaultMessage: 'Profile',
        id: 'app.links.profile',
    },
    settings: {
        defaultMessage: 'Settings',
        id: 'app.links.settings',
    },
    signIn: {
        defaultMessage: 'Sign in',
        id: 'app.links.signIn',
    },
    todos: {
        defaultMessage: 'Todos',
        id: 'app.links.todos',
    },
});


export declare namespace intlMessages {
    export interface Links {
        mes: keyof (typeof linksMessages);
    }
};