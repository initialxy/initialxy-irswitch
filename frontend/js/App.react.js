// @flow
'use strict';

import type {Element} from 'react';
import type {ToastIcon} from './Toast.react';

import AppButton from './AppButton.react';
import Toast from './Toast.react';
import LoadingBar from './LoadingBar.react';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ResponsiveSplitContainer from './ResponsiveSplitContainer.react';
import nullthrows from 'nullthrows';
import {getUniqueID, sleep} from './Utils';

type State = {
  isLoading: boolean;
  toastIcon: ?ToastIcon;
  toastID: number;
  toastMessage: string;
};

export default class App extends React.PureComponent {
  state: State = {
    isLoading: false,
    toastID: 0,
    toastIcon: null,
    toastMessage: '',
  };

  _startLoading = () => {
    this.setState({isLoading: true});
  }

  _showToast = async () => {
    const id = getUniqueID();
    this.setState({
      toastID: id,
      toastIcon: 'error',
      toastMessage: 'Hello World!',
    });
    await sleep(3000);
    if (this.state.toastID === id) {
      this.setState({
        toastID: 0,
        toastIcon: null,
        toastMessage: '',
      });
    }
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
            onClick={() => {this._showToast()}}
          />
        </ResponsiveSplitContainer>
        <ReactCSSTransitionGroup
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          transitionName="app_loading_bar">
          {
            this.state.isLoading
              ? <LoadingBar className="app_loading_bar" />
              : null
          }
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          transitionName="app_toast">
          {
            this.state.toastMessage
              ? (
                <div className="app_toast_wrapper">
                  <Toast
                    className="app_toast"
                    icon={nullthrows(this.state.toastIcon)}
                    message={this.state.toastMessage}
                  />
                </div>
              )
              : null
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
