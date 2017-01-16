// @flow
'use strict';

import type {Element} from 'react';

import React from 'react';

export default class ResponsiveSplitContainer extends React.PureComponent {
  render(): Element<any> {
    return (
      <div
        className={[
          this.props.className,
          'responsive_split_container',
        ].join(' ')}>
        {this.props.children}
      </div>
    );
  }
}
