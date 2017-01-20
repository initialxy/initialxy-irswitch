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

type State = {
  isMount: boolean;
};

export default class LoadingBar extends React.PureComponent {
  props: Props;
  static defaultProps = defaultProps;

  state: State = {
    isMount: false,
  };

  constructor(props: Props): void {
    super(props);

    // Hack to deal with iOS, which sometimes doesn't start the animation upon
    // mount.
    setTimeout(() => this.setState({isMount: true}), 100);
  }

  render(): Element<any> {
    return (
      <div className={[
        this.props.className,
        'loading_bar',
        this.props.isCritical ? 'critical' : '',
      ].join(' ')}>
        <div
          className={[
            'loading_bar_loader',
            this.state.isMount ? 'loading_bar_mount' : '',
          ].join(' ')}
        />
      </div>
    );
  }
}
