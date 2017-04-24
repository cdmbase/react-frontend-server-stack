import { ButtonProps } from './Button';
import * as React from 'react';
import Button from './Button';

const OutlineButton:React.SFC<ButtonProps> = (props: ButtonProps) => (
  <Button
    // TODO: Recheck after Flow 0.38, propValues should not be required.
    gray={true} // eslint-disable-line react/jsx-boolean-value
    outline={true} // eslint-disable-line react/jsx-boolean-value
    textStyle={theme => ({ color: theme.colors.black })}
    {...props}
  />
);

export default OutlineButton;
