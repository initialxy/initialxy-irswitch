// @flow
'use strict';

import App from './App.react';
import React from 'react';
import ReactDOM from 'react-dom';

// Dummy touch start listener to fix iOS :active state
document.body.addEventListener('touchstart', () => null);

ReactDOM.render(
  <App></App>,
  document.getElementById('root'),
);