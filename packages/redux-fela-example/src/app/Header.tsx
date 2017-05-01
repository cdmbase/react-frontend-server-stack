import { Store } from '@redux-bootstrap/core';
import { Box } from '@redux-bootstrap/react-common';
import * as React from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from '../components';

const HeaderLink = ({ to, message, ...props }) => (
    <FormattedMessage {...message}>
        {message => (
            <Link
                backgroundColor="primary"
                bold
                color="white"
                paddingHorizontal={0.5}
                paddingVertical={0.5}
                to={to}
                {...props}
            >{message}
            </Link>
        )}
    </FormattedMessage>
);

type HeaderProps = {
    viewer?: Store.User,
}

const Header = ({ viewer }: HeaderProps) => (
    <Box
        backgroundColor="primary"
        flexWrap="wrap"
        flexDirection="row"
        marginVertical={0.5}
        marginHorizontal={0.5}
    >
    </Box>
);

export default compose(
    connect((state: Store.State) => ({ viewer: state.users.viewer })),
)(Header);