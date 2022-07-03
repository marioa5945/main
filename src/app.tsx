import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import Router from './pageRouter';
const domRoot = document.getElementById('root');
if (domRoot) {
  ReactDOM.createRoot(domRoot).render(
    <HashRouter>
      <Router />
    </HashRouter>
  );
}

if (module.hot) {
  module.hot.accept();
}
