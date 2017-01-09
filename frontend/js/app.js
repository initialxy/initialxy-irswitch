// @flow
'use strict';

import React from 'react';

export default class App extends React.PureComponent {
  render() {
    return <div className={this.props.className}>Hello World!</div>;
  }
}
