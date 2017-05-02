import { TextProps, Text } from '@redux-bootstrap/react-common';
import * as React from 'react';

type LinkProps = TextProps & {
    to: string,
}

const Anchor = ({ to, ...props}) => (
    <a
    href={to}
    rel="noopener noreferrer"
    target="_blank"
    {...props}
    />
);

const Link = ({
    color = 'primary',
    style,
    ...props
}: LinkProps) => {
    const linkStyle = {
        ':hover': {
            textDecoration: 'underline',
        },
    };
    return (
        <Text
            as={Anchor}
            color={color}
            decoration="none"
            style={(theme, textStyle) => ({
                ...linkStyle,
                ...(style && style(theme, {...textStyle, ...linkStyle})),
            })}
            {...props}
            />
    );
};

export default Link;