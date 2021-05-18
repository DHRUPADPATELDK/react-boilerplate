import 'react-toastify/dist/ReactToastify.css';

import { API } from '@App/Libs/helper';
import { logoutUser } from '@App/Redux/Auth';
import LayoutContext, { HandleLayoutProps } from '@Components/LayoutContext';
import RouterContext, { RouteData } from '@Components/RouterContext';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { updateLayout } from '@Redux/Layout/action';
import { updateRoute } from '@Redux/Route/action';
import { config } from 'config';
import React, { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Translate, withLocalize } from 'react-localize-redux';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

import DeviceDetectionContext, { DeviceDetectionContextModel } from '../DeviceDetection/DeviceDetectionContext';
import LayoutComponent from '../Layout/LayoutComponent';

library.add(faArrowAltCircleRight);

Modal.setAppElement('#app');

export interface AppShellComponentProps {
  children: any;
  location: any;
  history: any;
  match: any;
}

const AppShellComponent: any = (props: AppShellComponentProps) => {
  const { children, location, history, match } = props;
  const dispatch = useDispatch();
  const [{ language, auth }, , removeCookie]: any = useCookies(['language', 'auth']);
  const { isIos }: DeviceDetectionContextModel = useContext(DeviceDetectionContext);
  const routeData = useSelector((state: any) => state.route);
  let trans = null;
  const axiosInstance: any = API();

  const checkSWUpdate = () => {
    // Service Worker Update code
    // REF: https://deanhume.com/displaying-a-new-version-available-progressive-web-app/

    // Refresh Code : newWorker.postMessage({ action: 'skipWaiting' });
    if ('serviceWorker' in navigator) {
      let newWorker;
      // console.log('navigator.serviceWorker'), navigator.serviceWorker;
      navigator.serviceWorker.ready.then((reg) => {
        // console.log('reg', reg);
        reg.addEventListener('updatefound', () => {
          // console.log('updatefound');
          // An updated service worker has appeared in reg.installing!
          newWorker = reg.installing;
          newWorker.addEventListener('statechange', () => {
            // console.log('statechange');

            // Has service worker state changed?
            switch (newWorker.state) {
              case 'installed':
                // console.log('newWorker.state', newWorker.state);
                // console.log('navigator.serviceWorker.controller', navigator.serviceWorker.controller);

                // There is a new service worker available, show the notification
                if (navigator.serviceWorker.controller) {
                  console.log('Update Available');
                  // newWorker.postMessage({ action: 'skipWaiting' });
                  toast.dismiss();
                  toast.info(
                    () => (
                      <>
                        {trans('updateTitle')}&nbsp;
                        <b
                          onClick={() => {
                            newWorker.postMessage({ action: 'install' });
                            window.location.reload();
                          }}
                        >
                          {trans('updateBtnTitle')}
                        </b>
                      </>
                    ),
                    config.DEFAULT_TOAST_SETTINGS,
                  );
                }
                break;
            }
          });
        });
      });
    }
  };

  let mounted = true;

  const doLogout = () => {
    if (auth) {
      // WHEN IMPLEMENT INTO PROJECT OPEN BELOW COMMENT
      dispatch(logoutUser({ sessionId: auth.session }));
      removeCookie('auth', { path: '/' });
    }
  };

  useEffect(() => {
    // if (auth && auth.accessToken && !(loginUser && loginUser.user && loginUser.user.id)) {
    //   doLogout();
    // }

    if (mounted) {
      checkSWUpdate();
      setInterval(() => checkSWUpdate(), 30 * 60000); // 30 Minute

      if (isIos) {
        const elm: any = document.querySelectorAll('meta[name="viewport"]');
        if (elm.length > 0) {
          elm[0].content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0';
          // elm[0].parentElement.removeChild(elm[0]);
        }
      }
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (language === 'nl') {
      document.getElementsByTagName('html')[0].setAttribute('lang', 'nl-NL');
    } else if (language === 'en') {
      document.getElementsByTagName('html')[0].setAttribute('lang', 'en-US');
    }
    return () => {};
  }, [language]);

  const setTrans = (t) => {
    trans = t;
    return null;
  };

  // Scroll to top on change of browser location
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {};
  }, [location]);

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    (c: any) => {
      if (auth && auth.accessToken) {
        // const auth = getLoggedInUser();
        if (auth && auth.accessToken) {
          c.headers['authorization'] = auth.accessToken;
        }
      }
      return c;
    },
    (error: any) => {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response: any) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    (error: any) => {
      if (error && error.response && error.response.status === 401) {
        doLogout();
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject((error.response && error.response.data) || error);
    },
  );

  return (
    <Translate>
      {({ translate }: any) => (
        <LayoutContext.Provider
          value={{
            translate,
            doLogout,
            handleLayout: (layout: HandleLayoutProps) => dispatch(updateLayout(layout)),
          }}
        >
          <RouterContext.Provider
            value={{
              history,
              location,
              match,
              handleRoute: (route: RouteData) => dispatch(updateRoute(route)),
            }}
          >
            {setTrans(translate)}
            <LayoutComponent layout={routeData.layout}>{children}</LayoutComponent>
            <ToastContainer />
          </RouterContext.Provider>
        </LayoutContext.Provider>
      )}
    </Translate>
  );
};

const componentWithLocalize: any = withLocalize(AppShellComponent);

export default withRouter(componentWithLocalize);
