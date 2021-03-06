import { TextProps } from './Text';
import { Theme } from '../themes/types';
import Text from './Text';
import * as React from 'react';

type HeadingContext = {
  theme: Theme,
};

const Heading:React.SFC<TextProps> = (props: TextProps, { theme }: HeadingContext) => {
  const {
    bold = true,
    fontFamily = theme.heading.fontFamily,
    marginBottom = theme.heading.marginBottom,
    ...restProps
  } = props;
  return (
    <Text
      bold={bold}
      fontFamily={fontFamily}
      marginBottom={marginBottom}
      {...restProps}
    />
  );
};

Heading.contextTypes = {
  theme: React.PropTypes.object,
};

export default Heading;
