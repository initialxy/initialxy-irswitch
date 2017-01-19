// @flow
'use strict';

import App from './App.react';
import nullthrows from 'nullthrows';
import React from 'react';
import ReactDOM from 'react-dom';

// Dummy touch start listener to fix iOS :active state
nullthrows(document.body).addEventListener('touchstart', () => null);

ReactDOM.render(
  <App></App>,
  document.getElementById('root'),
);