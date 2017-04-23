import React from 'react';
import { linksMessage } from '@redux-bootstrap/core';

import { FormattedMessage } from 'react-intl';
import { Link } from '../components';
import { compose } from 'ramda';
import { connect } from 'react-redux';


const HeaderLink = ({ to, message, ...props }) => (
    <FormattedMessage { ...message}>
        {message => (
            <Link
            backgroundColor="primary"
            bold
            color="white"
            paddingHorizontal={0.5}
            paddingVertical={0.5}
            to={to}
            {...props}
            >
            {message}
            </Link>
        )}
        </FormattedMessage>
);

type HeaderProps = {
    viewer?: User,
};

