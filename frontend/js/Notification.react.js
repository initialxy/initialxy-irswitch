// @flow
'use strict';

import type {Element} from 'react';

import React from 'react';

type Props = {
  className?: string;
  message: string;
};

export default class Notification extends React.PureComponent {
  props: Props;

  render(): Element<any> {
    return (
      <div className={[this.props.className, 'notification'].join(' ')}>
        <div className="notification_icon_container">
          <span
            aria-hidden="true"
            className={[
              'fa',
              'fa-exclamation-circle',
              'notification_icon',
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
