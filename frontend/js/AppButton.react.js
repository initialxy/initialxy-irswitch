// @flow
'use strict';

import React from 'react';

export default class AppButton extends React.PureComponent {
  render() {
    return (
      <button className={[this.props.className, 'app_button'].join(' ')}>
        {this.props.children}
      </button>
    );
  }
}
