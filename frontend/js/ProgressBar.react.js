// @flow
'use strict';

import type {Element} from 'react';

import React from 'react';

type Props = {
  className?: string;
  isCritical: boolean;
};

const defaultProps = {
  isCritical: false,
}

export default class ProgressBar extends React.PureComponent {
  props: Props;
  static defaultProps = defaultProps;

  render(): Element<any> {
    return (
      <div className={[
        this.props.className,
        'progress_bar',
        this.props.isCritical ? 'critical' : '',
      ].join(' ')}>
        <div className="progress_bar_loader" />
      </div>
    );
  }
}
