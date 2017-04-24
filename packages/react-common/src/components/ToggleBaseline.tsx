import { Store, toggleBaseline } from '@redux-bootstrap/core';
import Box from './Box';
import OutlineButton from './OutlineButton';
import * as React from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';

// Test vertical rhythm visually. Inspired by basehold.it

type ToggleBaselineProps = {
  baselineShown: boolean,
  toggleBaseline: typeof toggleBaseline,
};

const ToggleBaseline:React.SFC<ToggleBaselineProps> = (
  {
    baselineShown,
    toggleBaseline,
  }: ToggleBaselineProps,
) => (
  <Box flexDirection="row">
    <OutlineButton
      size={-1}
      //key={baselineShown} // To enforce blur after click.// opened issue #1356 with este
      onPress={toggleBaseline}
    >
      {baselineShown ? 'Hide Baseline' : 'Show Baseline'}
    </OutlineButton>
  </Box>
);

export default compose(
  connect(
    (state: Store.State) => ({
      baselineShown: state.app.baselineShown,
    }),
    { toggleBaseline },
  ),
)(ToggleBaseline);
