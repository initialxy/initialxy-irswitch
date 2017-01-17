// @flow
'use strict';

import type {Element} from 'react';

import React from 'react';
import nullthrows from 'nullthrows';

type Props = {
  children?: Array<Element<any>>;
  className?: string;
  color?: 'primary' | 'secondary' | 'tertiary';
  icon: 'bolt' | 'minus' | 'plus';
  hint?: string;
};

export default class AppButton extends React.PureComponent {
  props: Props;
  
  render(): Element<any> {
    let colorClass = null;
    switch (this.props.color) {
      case 'primary':
        colorClass = 'primary';
        break;
      case 'secondary':
        colorClass = 'secondary';
        break
      case 'tertiary':
        colorClass = 'tertiary';
        break;
    }

    let iconClass = null;
    switch (this.props.icon) {
      case 'bolt':
        iconClass = 'fa-bolt';
        break;
      case 'minus':
        iconClass = 'fa-minus-circle';
        break
      case 'plus':
        iconClass = 'fa-plus-circle';
        break;
    }

    return (
      <button
        className={[
          this.props.className,
          'app_button',
          colorClass,
        ].join(' ')}
        title={this.props.hint || ''}>
        <span
          aria-hidden="true"
          className={['fa', nullthrows(iconClass)].join(' ')}
        />
        {this.props.children}
        {
          this.props.hint
            ? <div className="app_button_hint">{this.props.hint}</div>
            : null
        }
      </button>
    );
  }
}
