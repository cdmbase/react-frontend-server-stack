import * as React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Container from './Container';
import Header from './Header';
import Footer from './Footer';
import { Box } from '@redux-bootstrap/react-common';
import { common } from '@redux-bootstrap/react-fela';
import * as themes from '../themes';
import { compose } from 'ramda';
import { Store } from '@redux-bootstrap/core';
import BaseRoot from './BaseRoot';

type AppProps = {
    children: any,
    currentLocale: string,
};

const App = (
    {
        children,
        currentLocale,
    }: AppProps,
) => (
        <BaseRoot >
            <Helmet
                htmlAttributes={{ lang: currentLocale }}
                meta={[
                    { charset: 'utf-8' },
                    {
                        name: 'viewport',
                        content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                    },
                    {
                        'http-equiv': 'x-ua-compatible', content: 'ie=edge'
                    },
                    {/*...favicon.meta,*/ }
                ]}
            />
            <Container>
                <Header />
                <Box
                    flex={1} // make footer sticky
                >
                    {children}
                </Box>
                <Footer />
            </Container>
        </BaseRoot>
    );

export default compose(
    common({ themes }),
    connect((state: Store.State) => ({
        currentLocale: state.intl.currentLocale,
    })),
)(App);