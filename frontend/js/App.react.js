// @flow
'use strict';

import type {Element} from 'react';
import type {GenericResponse} from './Types';
import type {ToastIcon} from './Toast.react';

import AppButton from './AppButton.react';
import Toast from './Toast.react';
import LoadingBar from './LoadingBar.react';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ResponsiveSplitContainer from './ResponsiveSplitContainer.react';
import nullthrows from 'nullthrows';
import {getUniqueID, sleep, waitUntilAPIAlive} from './Utils';
import {sendOn, sendOff, sendReset} from './Api.js';

type State = {
  isInactive: boolean;
  isLoading: boolean;
  toastIcon: ?ToastIcon;
  toastID: number;
  toastMessage: string;
};

export default class App extends React.PureComponent {
  state: State = {
    isInactive: false,
    isLoading: false,
    toastID: 0,
    toastIcon: null,
    toastMessage: '',
  };

  _showToast = async (message: string, icon: ToastIcon) => {
    const id = getUniqueID();
    this.setState({
      toastID: id,
      toastIcon: icon,
      toastMessage: message,
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

  _showError = async (response: GenericResponse) => {
    await this._showToast(nullthrows(response.errorMessage), 'error');
  }

  _handleResponseAndWait = async (response: GenericResponse) => {
    if (response.status === 'success') {
      this.setState({
        isInactive: response.status === 'success',
        isLoading: false,
      });
      await waitUntilAPIAlive();
      this.setState({isInactive: false});
    } else {
      this.setState({isLoading: false});
      await this._showError(response);
    }
  }

  _onTurnOn = async() => {
    this.setState({isLoading: true});
    const response = await sendOn();
    this.setState({isLoading: false});
    if (response.status === 'error') {
      await this._showError(response);
    }
  }

  _onTurnOff = async () => {
    this.setState({isLoading: true});
    const response = await sendOff();
    this._handleResponseAndWait(response);
  }

  _onReset = async () => {
    this.setState({isLoading: true});
    const response = await sendReset();
    this._handleResponseAndWait(response);
  }

  render(): Element<any> {
    const shouldDisableUI = this.state.isLoading || this.state.isInactive;
    // Normally onClick={this._onFoo} will work fine, but Flow complains about
    // return type from an async function is Promise instead of void, so they
    // are wrapped in arrow function again.
    return (
      <div className={[this.props.className, 'app'].join(' ')}>
        <ResponsiveSplitContainer className="app_container">
          <AppButton
            color="tertiary"
            disabled={shouldDisableUI}
            hint="On"
            icon="plus"
            onClick={() => {this._onTurnOn()}}
          />
          <AppButton
            color="secondary"
            disabled={shouldDisableUI}
            hint="Off"
            icon="minus"
            onClick={() => {this._onTurnOff()}}
          />
          <AppButton
            color="primary"
            disabled={shouldDisableUI}
            hint="Reset"
            icon="bolt"
            onClick={() => {this._onReset()}}
          />
        </ResponsiveSplitContainer>
        <ReactCSSTransitionGroup
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          transitionName="app_loading_bar">
          {
            shouldDisableUI
              ? (
                <LoadingBar
                  className="app_loading_bar"
                  isCritical={this.state.isInactive}
                />
              )
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
