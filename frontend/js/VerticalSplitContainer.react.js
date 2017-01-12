// @flow
'use strict';

import React from 'react';

export default class VerticalSplitContainer extends React.PureComponent {
  render() {
    return (
      <div
        className={[
          this.props.className,
          'vertical_split_container',
        ].join(' ')}>
        {this.props.children}
      </div>
    );
  }
}
