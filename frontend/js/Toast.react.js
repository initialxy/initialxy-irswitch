// @flow
'use strict';

import type {Element} from 'react';

import React from 'react';
import nullthrows from 'nullthrows'

export type ToastIcon = 'info' | 'warning' | 'error';

type Props = {
  className?: string;
  icon: ToastIcon;
  message: string;
};

export default class Toast extends React.PureComponent {
  props: Props;

  render(): Element<any> {
    let faClass = null;
    switch (this.props.icon) {
      case 'info': {
        faClass = 'fa-info-circle';
        break;
      }
      case 'warning': {
        faClass = 'fa-exclamation-triangle';
        break;
      }
      case 'error': {
        faClass = 'fa-exclamation-circle';
        break;
      }
    }

    return (
      <div className={[this.props.className, 'toast'].join(' ')}>
        <div className="toast_icon_container">
          <span
            aria-hidden="true"
            className={[
              'fa',
              nullthrows(faClass),
              'toast_icon',
              'toast_icon_' + this.props.icon,
            ].join(' ')}
          />
        </div>
        <div className="toast_contents">
          {this.props.message}
        </div>
      </div>
    );
  }
}

