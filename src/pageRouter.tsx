import React, { Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createHashHistory } from 'history';

const history = createHashHistory();

const HomePage = React.lazy(() => import('./container/home/'));
const ResumePage = React.lazy(() => import('./container/resume/'));
import Loading from '@components/loading/';

const PageRouter: React.FC = () => {
  return (
    <Suspense fallback={<Loading logoUrl={'/img/logo.png'} />}>
      <Router history={history}>
        <Switch>
          <Route exact={true} path={'/'} component={HomePage} />
          <Route path={'/home'} component={HomePage} />
          <Route path={'/resume'} component={ResumePage} />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default PageRouter;
