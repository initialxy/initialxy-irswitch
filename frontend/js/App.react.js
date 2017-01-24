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
import {sendOn, sendOff, sendReset} from './API';

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

  _preRequest(): void {
    this.setState({isLoading: true});
  }

  _postRequest(
    response: GenericResponse,
    willWaitForAPI: boolean = false,
  ): void {
    this.setState({
      isInactive: willWaitForAPI && response.status === 'success',
      isLoading: false,
    });
  }

  _postWaitForAPI(): void{
    if (this.state.isInactive) {
      this.setState({isInactive: false});
    }
  }

  async _showToast(message: string, icon: ToastIcon): Promise<void> {
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

  async _handleResponseAndWait(
    response: GenericResponse,
    willWaitForAPI: boolean = false,
  ): Promise<void> {
    if (response.status !== 'success') {
      await this._showToast(nullthrows(response.errorMessage), 'error');
    } else if (willWaitForAPI) {
      await waitUntilAPIAlive();
    }
  }

  async _onTurnOn(): Promise<void> {
    this._preRequest();
    const response = await sendOn();
    this._postRequest(response);
    await this._handleResponseAndWait(response);
  }

  async _onTurnOff(): Promise<void> {
    this._preRequest();
    const response = await sendOff();
    this._postRequest(response, true);
    await this._handleResponseAndWait(response, true);
    this._postWaitForAPI()
  }

  async _onReset(): Promise<void> {
    this._preRequest();
    const response = await sendReset();
    this._postRequest(response, true);
    await this._handleResponseAndWait(response, true);
    this._postWaitForAPI()
  }

  render(): Element<any> {
    const shouldDisableUI = this.state.isLoading || this.state.isInactive;
    // Normally onClick={this._onFoo} will work fine once binded, but Flow
    // complains about return type from an async function is Promise instead of
    // void, so they are wrapped in arrow function.
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
