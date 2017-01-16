// @flow
'use strict';

import type {Element} from 'react';

import React from 'react';
import AppButton from './AppButton.react';
import ResponsiveSplitContainer from './ResponsiveSplitContainer.react'

export default class App extends React.PureComponent {
  render(): Element<any> {
    return (
      <ResponsiveSplitContainer
        className={[this.props.className, 'app'].join(' ')}>
        <AppButton>On</AppButton>
        <AppButton>Off</AppButton>
        <AppButton>Reset</AppButton>
      </ResponsiveSplitContainer>
    );
  }
}
