import 'idempotent-babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

// IE11 compatibility
import 'core-js/features/string/starts-with';
import 'core-js/features/string/ends-with';

import App from './App';

OfflinePluginRuntime.install();

const element = document.getElementById('content');

ReactDOM.render(<App />, element);

document.body.classList.remove('loading');
