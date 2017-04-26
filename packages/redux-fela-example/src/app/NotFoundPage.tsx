import * as React from 'react';
import { linksMessages, notFoundMessages } from '@redux-bootstrap/react-common';

import { Box, PageHeader } from '@redux-bootstrap/react-common';
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl';
import { Link, Title } from '../components';

type NotFoundPageProps = { intl: InjectedIntl };

const NotFoundPage = ({ intl }: NotFoundPageProps) => (
    <Box>
        <Title message={linksMessages.notFound} intl={intl} />
        <PageHeader
            heading={intl.formatMessage(notFoundMessages.h1)}
            description={intl.formatMessage(notFoundMessages.p)}
        />
        <Link exact to='/'>
            <FormattedMessage {...notFoundMessages.continue} />
        </Link>
    </Box>
);

export default injectIntl(NotFoundPage);