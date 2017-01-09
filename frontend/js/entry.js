// @flow
'use strict';

// This is needed to make sure babel-polyfill is run before the main script.
// Babel has a tendency to put requires after regenerator codes, which borks it.
import 'babel-polyfill';
import './bootstrap';
