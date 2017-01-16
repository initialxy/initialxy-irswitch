// @flow
'use strict';

import type {Element} from 'react';

import React from 'react';

export default class AppButton extends React.PureComponent {
  render(): Element<any> {
    return (
      <button className={[this.props.className, 'app_button'].join(' ')}>
        {this.props.children}
      </button>
    );
  }
}
