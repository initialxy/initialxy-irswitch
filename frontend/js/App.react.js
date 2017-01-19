// @flow
'use strict';

import type {Element} from 'react';

import AppButton from './AppButton.react';
import ProgressBar from './ProgressBar.react';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ResponsiveSplitContainer from './ResponsiveSplitContainer.react';

type State = {
  isLoading: boolean;
};

export default class App extends React.PureComponent {
  state: State = {
    isLoading: false,
  };

  _startLoading = () => {
    this.setState({isLoading: true});
  }

  render(): Element<any> {
    return (
      <div className={[this.props.className, 'app'].join(' ')}>
        <ResponsiveSplitContainer className="app_container">
          <AppButton
            color="tertiary"
            disabled={this.state.isLoading}
            hint="On"
            icon="plus"
            onClick={this._startLoading}
          />
          <AppButton
            color="secondary"
            disabled={this.state.isLoading}
            hint="Off"
            icon="minus"
            onClick={this._startLoading}
          />
          <AppButton
            color="primary"
            disabled={this.state.isLoading}
            hint="Reset"
            icon="bolt"
            onClick={this._startLoading}
          />
        </ResponsiveSplitContainer>
        <ReactCSSTransitionGroup
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          transitionName="app_progress_bar">
          {
            this.state.isLoading
              ? <ProgressBar className="app_progress_bar" />
              : null
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
