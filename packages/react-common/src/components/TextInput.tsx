import { Theme } from '../themes/types';
import * as React from 'react';
import Text, { computeTextStyle, TextProps } from './Text';
import color from 'color';
import {isReactNative} from '@redux-bootstrap/core';

// Universal text input component. By default, it looks like editable text.
// For underline or the other effects, make a new component. Check Field.
// TODO: multiline and rows, use PlatformTextarea, react-autosize-textarea?

export type TextInputProps = TextProps & {
  disabled?: boolean,
  placeholderTextColor?: string,
};

interface TextInputContext {
  TextInput: () => React.ReactElement<TextInputProps>,
  theme: Theme,
};

const computePlaceholderColor = textColor =>
  color(textColor).fade(0.5).toString();

const TextInput:React.SFC<TextInputProps> = (
  props: TextInputProps,
  {
    TextInput: PlatformTextInput,
    theme,
  }: TextInputContext,
) => {
  const [textStyle] = computeTextStyle(theme, props);

  const {
    disabled = false,
    // textStyle has or, to workaround using string
    height = textStyle['lineHeight'] / theme.typography.lineHeight,
    // Some user agents (Chrome, RN Android) have default input padding.
    // We need to reset it to ensure consistent rendering across platforms.
    padding = 0,
    placeholderTextColor = computePlaceholderColor(textStyle['color']),
    style,
    ...restProps
  } = props;

  const platformProps = isReactNative
    ? {
        editable: !disabled,
        underlineColorAndroid: 'transparent',
        placeholderTextColor,
      }
    : {
        disabled,
      };
  const platformStyle = isReactNative
    ? {}
    : {
        outline: 'none',
        '::placeholder': {
          color: placeholderTextColor,
        },
      };
  return (
    <Text
      as={PlatformTextInput}
      // React Native TextInput needs explicit height.
      // Browsers need explicit height for correct vertical align.
      height={height}
      padding={padding}
      {...disabled ? { opacity: theme.states.disabled.opacity } : null}
      {...platformProps}
      {...restProps}
      style={(theme, textStyle) => ({
        ...platformStyle,
        ...(style && style(theme, textStyle)),
      })}
    />
  );
};

TextInput.contextTypes = {
  TextInput: React.PropTypes.func,
  theme: React.PropTypes.object,
};

export default TextInput;
