import './resources/css/_global.scss';

import AppShell from '@App/Components/AppShell/AppShellComponent';
import DeviceDetectionComponent from '@App/Components/DeviceDetection/DeviceDetectionComponent';
import Main from '@App/Components/Main/MainComponent';
import * as reducers from '@App/Redux/reducers';
import ReduxClient from '@pawjs/redux/client';
import authSaga from '@Redux/Auth/saga';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { reducer as reduxFormReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import Cookies from 'universal-cookie';
// import WebFont from 'webfontloader';

// WebFont.load({
//   google: {
//     families: ['Lato:400,700'],
//   },
// });

/**
 * Enable this code only if want to load react shop on iframe.
 * Ways : server.js, appShellComponent in useEffect => loadScript.
window.iFrameResizer = {
  targetOrigin: 'http://localhost:8080'
};
import 'iframe-resizer/js/iframeResizer.contentWindow';
 */
// import 'bootstrap/scss/bootstrap-reboot.scss';
// import 'bootstrap/scss/bootstrap-grid.scss';
const AppReducers = {
  ...reducers,
  form: reduxFormReducer, // mounted under "form"
};

const appInitialState = {};

export default class Client {
  // eslint-disable-next-line
  constructor({ addPlugin }) {
    // Setup Cookie provider
    this.cookie = new Cookies(document.cookie);

    this.sagaMiddleware = createSagaMiddleware();

    // Setup redux client
    const reduxClient = new ReduxClient({ addPlugin });
    reduxClient.setReducers(AppReducers);
    reduxClient.addMiddleware(this.sagaMiddleware);
    addPlugin(reduxClient);
  }

  // eslint-disable-next-line
  apply(clientHandler) {
    // Add application shell
    clientHandler.hooks.renderRoutes.tapPromise('AddAppShell', async ({ setRenderedRoutes, getRenderedRoutes }) => {
      setRenderedRoutes(
        <CookiesProvider>
          <Main>
            <AppShell>{getRenderedRoutes()}</AppShell>
          </Main>
        </CookiesProvider>,
      );
    });

    // Wrap Cookies Provider
    clientHandler.hooks.beforeRender.tapPromise('WrapCookieProvider', async (app) => {
      // eslint-disable-next-line
      app.children = (
        <DeviceDetectionComponent userAgent={window.navigator.userAgent}>{app.children}</DeviceDetectionComponent>
      );
    });

    // Set Redux initial state
    clientHandler.hooks.reduxInitialState.tapPromise(
      'ReduxInitialState',
      async ({ getInitialState, setInitialState }) => {
        const initialState = Object.assign({}, getInitialState(), appInitialState);
        setInitialState(initialState);
      },
    );

    // Set Saga Middleware
    clientHandler.hooks.beforeRender.tapPromise('RunSagaMiddleware', async () => {
      await this.sagaMiddleware.run(authSaga);
    });

    // Update structure data
    clientHandler.hooks.locationChange.tap('RemoveStructureData', async () => {
      const elements = [
        'script[type="application/ld+json"]',
        'meta[name="product:product_link"]',
        'meta[name="product:brand"]',
        'meta[name="product:upc"]',
        'meta[property="og:updated_time"]',
        'meta[name="og:image"]',
        'meta[name="og:image:width"]',
        'meta[name="og:image:height"]',
        'meta[name="article:section"]',
        'meta[name="article:tag"]',
        'link[rel="canonical"]',
        'link[rel="keywords"]',
      ];
      elements.forEach((element) => {
        const findElements = document.querySelectorAll(element);
        findElements.forEach((e) => e.parentElement.removeChild(e));
      });
    });

    // Set Query param for loadData
    // clientHandler.hooks.beforeLoadData.tapPromise('loadQueryParams', async (setParams, getParams) => {
    //   const queryParam = (window.location.search && parseQueryString(window.location.search)) || {};
    //   setParams('queryParam', queryParam);
    // });

    // Set Cookies for loadData
    clientHandler.hooks.beforeLoadData.tapPromise('loadCookies', async (setParams) => {
      const cookies = new Cookies();
      setParams('cookies', cookies);
    });
  }
}
