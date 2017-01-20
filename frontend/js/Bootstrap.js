// @flow
'use strict';

import App from './App.react';
import React from 'react';
import ReactDOM from 'react-dom';
import nullthrows from 'nullthrows';

// Dummy touch start listener to fix iOS :active state
nullthrows(document.body).addEventListener('touchstart', () => null);

ReactDOM.render(
  <App></App>,
  document.getElementById('root'),
);