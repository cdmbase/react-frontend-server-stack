import * as React from 'react';
import { defineMessages } from 'react-intl';

export const notFoundMessages = defineMessages({
  h1: {
    defaultMessage: 'This page isn\'t available',
    id: 'notFound.h1',
  },
  p: {
    defaultMessage: 'The link may be broken, or the page may have been removed.',
    id: 'notFound.p',
  },
  continue: {
    defaultMessage: 'Continue here please.',
    id: 'notFound.continue',
  },
});

export declare namespace intlMessages {
    export interface NotFound {
        mes: keyof (typeof notFoundMessages);
    }
};

