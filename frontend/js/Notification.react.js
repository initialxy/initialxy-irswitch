// @flow
'use strict';

import type {Element} from 'react';

import React from 'react';
import nullthrows from 'nullthrows'

export type NotificationIcon = 'info' | 'warning' | 'error';

type Props = {
  className?: string;
  icon: NotificationIcon;
  message: string;
};

export default class Notification extends React.PureComponent {
  props: Props;

  render(): Element<any> {
    let faClass = null;
    switch (this.props.icon) {
      case 'info':
        faClass = 'fa-info-circle';
        break;
      case 'warning':
        faClass = 'fa-exclamation-triangle';
        break;
      case 'error':
        faClass = 'fa-exclamation-circle';
        break;
    }

    return (
      <div className={[this.props.className, 'notification'].join(' ')}>
        <div className="notification_icon_container">
          <span
            aria-hidden="true"
            className={[
              'fa',
              nullthrows(faClass),
              'notification_icon',
              'notification_icon_' + this.props.icon,
            ].join(' ')}
          />
        </div>
        <div className="notification_contents">
          {this.props.message}
        </div>
      </div>
    );
  }
}

