import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createHashHistory } from 'history';

// const history = createHashHistory();

// const loadComponent = (scope: string, module: string, url: string) => async (): Promise<{
//   default: React.ComponentType<unknown>;
// }> => {
//   const useDynamicScript = (url: string) => {
//     const element = document.createElement('script');
//     element.src = url;
//     element.type = 'text/javascript';
//     element.async = true;
//     document.head.appendChild(element);

//     return new Promise((resolve) => {
//       element.onload = () => {
//         resolve(true);
//       };
//       element.onerror = () => {
//         resolve(false);
//       };
//     });
//   };

//   await useDynamicScript(url);
//   // @ts-ignore
//   await __webpack_init_sharing__('default');
//   // @ts-ignore
//   const container = window[scope];
//   // @ts-ignore
//   await container.init(__webpack_share_scopes__.default);
//   // @ts-ignore
//   const factory = await window[scope].get(module);
//   return factory();
// };

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
