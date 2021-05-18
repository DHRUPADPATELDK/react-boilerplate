import AppShell from '@App/Components/AppShell/AppShellComponent';
import DeviceDetectionComponent from '@App/Components/DeviceDetection/DeviceDetectionComponent';
import Main from '@App/Components/Main/MainComponent';
import * as reducers from '@App/Redux/reducers';
import { API, deepClone } from '@Libs/helper';
import ReduxServer from '@pawjs/redux/server';
import FaviconIco from '@Public/images/favicon.ico';
import FaviconIco152 from '@Public/images/touch-icon-ipad-retina.png';
import FaviconIco76 from '@Public/images/touch-icon-ipad.png';
import FaviconIco120 from '@Public/images/touch-icon-iphone-retina.png';
import FaviconIcoIphone from '@Public/images/touch-icon-iphone.png';
import authSaga from '@Redux/Auth/saga';
import { config } from 'config';
import dotenv from 'dotenv';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { MetaTagsContext } from 'react-meta-tags';
import MetaTagsServer from 'react-meta-tags/server';
import { reducer as reduxFormReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import Cookies from 'universal-cookie';
import cookiesMiddleware from 'universal-cookie-express';

import ApiMiddleware from './API';

dotenv.config();

const AppReducers = {
  ...reducers,
  form: reduxFormReducer, // mounted under "form"
};

const appInitialState = {};

export default class Server {
  // eslint-disable-next-line
  constructor({ addMiddleware, addPlugin }) {
    // Add Custom API Middleware
    addMiddleware(ApiMiddleware());

    // Add Cookies Middleware
    addMiddleware(cookiesMiddleware());

    this.sagaMiddleware = createSagaMiddleware();

    // Setup Redux server
    const reduxServer = new ReduxServer({ addPlugin });
    reduxServer.setReducers(AppReducers);
    reduxServer.addMiddleware(this.sagaMiddleware);
    addPlugin(reduxServer);

    // MetaTag variables
    this.metaTagsInstance = null;
    this.meta = {};
  }

  // eslint-disable-next-line
  apply(serverHandler) {
    // Add application shell
    serverHandler.hooks.renderRoutes.tap('AddAppShell', async ({ setRenderedRoutes, getRenderedRoutes }, req) => {
      //make sure you get a new metatags instance for each request
      this.metaTagsInstance = MetaTagsServer();
      setRenderedRoutes(
        <CookiesProvider cookies={req.universalCookies}>
          <MetaTagsContext extract={this.metaTagsInstance.extract}>
            <Main>
              <AppShell>{getRenderedRoutes()}</AppShell>
            </Main>
          </MetaTagsContext>
        </CookiesProvider>,
      );
    });

    // Wrap Cookies Provider
    serverHandler.hooks.beforeAppRender.tapPromise('WrapCookiesProvider', async (app, req) => {
      // eslint-disable-next-line
      app.children = (
        <DeviceDetectionComponent userAgent={req.headers['user-agent']}>{app.children}</DeviceDetectionComponent>
      );
    });

    // Set Redux initial state
    serverHandler.hooks.reduxInitialState.tapPromise(
      'ReduxInitialState',
      async ({ getInitialState, setInitialState }, req, res) => {
        const cookies = new Cookies(req.headers.cookie);
        if (!cookies.get('language')) {
          cookies.set('language', config.DEFAULT_LANGUAGE);
          res.cookie('language', config.DEFAULT_LANGUAGE, { path: '/' });
        }
        const state = deepClone(appInitialState);
        /**
         * This feature is deprecated in new version of pawjs
         * store variable is being provided in loadData function
        // Assign pre loaded data to redux initial state
        app.htmlProps.preloadedData.forEach((data) => {
          if (data && data.redux && typeof data.redux === 'object') {
            state = {
              ...state,
              ...data.redux,
            };
          }
        });
         */
        const initialState = Object.assign({}, getInitialState(), state);
        setInitialState(initialState);
      },
    );

    // Set Saga Middleware
    serverHandler.hooks.beforeAppRender.tapPromise('RunSagaMiddleware', async () => {
      await this.sagaMiddleware.run(authSaga);
    });

    // ServerSide rendering of Meta instance on HEAD.
    serverHandler.hooks.beforeHtmlRender.tapPromise('AddMetaTags', async (Application) => {
      const {
        htmlProps: { head },
      } = Application;

      this.meta = this.metaTagsInstance.getTags();
      head.push(this.meta);
    });

    // Can add inline css direct to head
    serverHandler.hooks.beforeHtmlRender.tapPromise('AddInlineCSS', async (Application, req, res) => {
      const {
        htmlProps: { head, pwaSchema },
      } = Application;
      const cookies = new Cookies(req.headers.cookie);
      if (!cookies.get('language')) {
        cookies.set('language', config.DEFAULT_LANGUAGE);
        res.cookie('language', config.DEFAULT_LANGUAGE, { path: '/' });
      }
      if (cookies.get('language') === 'en') {
        pwaSchema.lang = 'en-US';
      } else if (cookies.get('language') === 'nl') {
        pwaSchema.lang = 'nl-NL';
      }
      head.push(<link key="link1" rel="apple-touch-icon" href={FaviconIcoIphone} />);
      head.push(<link key="link2" rel="apple-touch-icon" sizes="76x76" href={FaviconIco76} />);
      head.push(<link key="link3" rel="apple-touch-icon" sizes="120x120" href={FaviconIco120} />);
      head.push(<link key="link4" rel="apple-touch-icon" sizes="152x152" href={FaviconIco152} />);
      head.push(<link key="favicon" rel="shortcut icon" href={FaviconIco} />);
      head.push(<base key="base" href="/" />);
      // head.push(
      //   <script
      //     key="custom_script_from_head"
      //     dangerouslySetInnerHTML={{
      //       __html: `
      //       try {
      //         // START
      //         // Service Worker Update code
      //         // REF: https://deanhume.com/displaying-a-new-version-available-progressive-web-app/

      //         // Refresh Code : newWorker.postMessage({ action: 'skipWaiting' });
      //         if ('serviceWorker' in navigator) {
      //           var newWorker;
      //           navigator.serviceWorker.ready.then((reg) => {
      //             reg.addEventListener('updatefound', () => {
      //               // An updated service worker has appeared in reg.installing!
      //               newWorker = reg.installing;
      //               newWorker.addEventListener('statechange', () => {
      //                 // Has service worker state changed?
      //                 switch (newWorker.state) {
      //                   case 'installed':
      //                     newWorker.postMessage({ action: 'install' });
      //                     window.location.reload();

      //                     break;
      //                 }
      //               });
      //             });
      //           });
      //         }
      //         // END
      //       } catch(e) {
      //         console.log('error from head script', e);
      //       }
      //       `,
      //     }}
      //   />,
      // );
    });

    // Set Query param for loadData
    serverHandler.hooks.beforeLoadData.tapPromise('loadQueryParams', async (setParams, getParams, request) => {
      if (request.query) {
        setParams('queryParam', request.query);
      }
    });

    // Set Cookies for loadData
    serverHandler.hooks.beforeLoadData.tapPromise('loadCookies', async (setParams, getParams, req) => {
      const cookies = new Cookies(req.headers.cookie);
      setParams('cookies', cookies);
      const axiosInstance = API(true);
      // Add a request interceptor
      axiosInstance.interceptors.request.use(
        (c) => {
          const auth = cookies.get('auth');
          if (auth && auth.accessToken) {
            c.headers['authorization'] = auth.accessToken;
          }
          return c;
        },
        (error) => {
          // Do something with request error
          return Promise.reject(error);
        },
      );
    });
  }
}
