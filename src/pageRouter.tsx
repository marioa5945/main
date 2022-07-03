import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const HomePage = React.lazy(() => import('./container/home/'));
const AboutPage = React.lazy(() => import('./container/about'));
const Status404Page = React.lazy(() => import('./container/otherStatus/status404'));
// const DemosPage = React.lazy(loadComponent('packageLib', './router', remotePackageLibrary));
// const BlogPage = React.lazy(loadComponent('blog', './router', remoteBlog));

import Loading from '@src/components/loading/loading';

const PageRouter = (): JSX.Element => {
  return (
    <Suspense fallback={<Loading logoUrl={'./img/logo.png'} />}>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/about'} element={<AboutPage />} />
        {/* <Route path={'/demos'} component={DemosPage} />
          <Route path={'/blog'} component={BlogPage} /> */}
        <Route element={<Status404Page />} />
      </Routes>
    </Suspense>
  );
};

export default PageRouter;
