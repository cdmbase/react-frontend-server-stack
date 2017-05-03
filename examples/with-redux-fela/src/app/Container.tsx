import * as React from 'react';
import { Box } from '@redux-bootstrap/react-common';

type ContainerProps = {
    children?: any
};

const Container = ({ children }: ContainerProps) => (
    <Box
        margin="auto"
        paddingHoriztal={1}
        style={theme => ({
            maxWidth: theme.container.maxWidths.big,
            minHeight: '100vh', // make footer sticky
        })}
    >{children}</Box>
);

export default Container;