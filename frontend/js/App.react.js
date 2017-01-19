// @flow
'use strict';

import type {Element} from 'react';

import AppButton from './AppButton.react';
import Notification from './Notification.react';
import ProgressBar from './ProgressBar.react';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ResponsiveSplitContainer from './ResponsiveSplitContainer.react';
import {getUniqueID, sleep} from './Utils';

type State = {
  isLoading: boolean;
  notificationID: number;
  notificationMessage: string;
};

export default class App extends React.PureComponent {
  state: State = {
    isLoading: false,
    notificationID: 0,
    notificationMessage: '',
  };

  _startLoading = () => {
    this.setState({isLoading: true});
  }

  _showNotification = async () => {
    const id = getUniqueID();
    this.setState({notificationID: id, notificationMessage: 'Hello World!'});
    await sleep(3000);
    if (this.state.notificationID === id) {
      this.setState({notificationID: 0, notificationMessage: ''});
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
            onClick={() => {this._showNotification()}}
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
        <ReactCSSTransitionGroup
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          transitionName="app_notification">
          {
            this.state.notificationMessage
              ? (
                <Notification
                  className="app_notification"
                  message={this.state.notificationMessage}
                />
              )
              : null
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
