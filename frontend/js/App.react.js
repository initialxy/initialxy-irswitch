// @flow
'use strict';

import React from 'react';
import AppButton from './AppButton.react';
import VerticalSplitContainer from './VerticalSplitContainer.react'

export default class App extends React.PureComponent {
  render() {
    return (
      <VerticalSplitContainer
        className={[this.props.className, 'app'].join(' ')}>
        <AppButton>On</AppButton>
        <AppButton>Off</AppButton>
        <AppButton>Reset</AppButton>
      </VerticalSplitContainer>
    );
  }
}
