import NotSupportedBrowserComponent from '@Components/NotSupportedBrowser/NotSupportedBrowserComponent';
import { DeviceDetection } from '@Libs/UA';
import React, { useEffect, useState } from 'react';
import DeviceDetectionContext from './DeviceDetectionContext';

export interface DeviceDetectionComponentProps {
  userAgent: string;
  checkOnDimension?: boolean;
  children?: any;
}

const DeviceDetectionComponent = ({ userAgent, checkOnDimension = true, children }: DeviceDetectionComponentProps) => {
  const [orientation, setOrientation] = useState('portrait');
  const [, setType] = useState('primary');
  const [, setAngle] = useState(0);
  const [dimension, setDimension] = useState({ width: null, height: null });
  const [ftlDetection, setFTLDetection] = useState({
    isFTLMobile: false,
    isFTLMobileOnly: false,
    isFTLTablet: false,
  });
  const deviceDetection = new DeviceDetection(userAgent);
  // let reload = false;
  const [windowRender, setWindowRender] = useState(false);

  const onOrientationChange = () => {
    let orientationTemp = 'portrait';
    let typeTemp = 'primary';
    let angleTemp: any = 0;
    if (window.orientation) {
      angleTemp = window.orientation;
      orientationTemp = Math.abs(angleTemp) === 90 ? 'landscape' : 'portrait';
    }

    if (window.screen.orientation) {
      [orientationTemp, typeTemp] = window.screen.orientation.type.split('-');
      angleTemp = window.screen.orientation;
    }
    setOrientation(orientationTemp);
    setType(typeTemp);
    setAngle(angleTemp);
  };

  const onWindowDimensionsChange = (e?: any) => {
    if (checkOnDimension) {
      if (window.innerWidth < 992) {
        if (window.innerWidth < 576) {
          setFTLDetection({
            isFTLMobile: true,
            isFTLMobileOnly: true,
            isFTLTablet: false,
          });
        } else {
          setFTLDetection({
            isFTLMobile: true,
            isFTLMobileOnly: false,
            isFTLTablet: false,
          });
        }
      } else if (window.innerWidth < 1200) {
        setFTLDetection({
          isFTLMobile: false,
          isFTLMobileOnly: false,
          isFTLTablet: true,
        });
      }
    }
    setDimension((d) => {
      // if (e && !reload) {
      //   if (d.width !== window.innerWidth) {
      //     reload = true;
      //     window.location.reload(true);
      //   }
      // }
      return { width: window.innerWidth, height: window.innerHeight };
    });
  };

  useEffect(() => {
    setWindowRender(true);
    onOrientationChange();
    onWindowDimensionsChange();
    if (window.screen.orientation && 'onchange' in window.screen.orientation) {
      window.screen.orientation.addEventListener('change', onOrientationChange);
    } else if ('onorientationchange' in window) {
      console.log('Using window.onorientationchange');
      window.addEventListener('orientationchange', onOrientationChange);
    } else {
      console.warn('No orientationchange events');
    }
    window.addEventListener('resize', onWindowDimensionsChange);

    return () => {
      if (window.screen.orientation && 'onchange' in window.screen.orientation) {
        console.log('Removing screen.orientation.onchange');
        window.screen.orientation.removeEventListener('change', onOrientationChange);
      } else if ('onorientationchange' in window) {
        console.log('Removing window.onorientationchange');
        window.removeEventListener('orientationchange', onOrientationChange);
      }
      window.removeEventListener('resize', onWindowDimensionsChange);
    };
  }, []);

  /**
  // REF: https://github.com/haldarmahesh/use-mobile-detect-hook/blob/master/src/index.js
  const isAndroid = Boolean(props.userAgent.match(/Android/i));
  const isIos = Boolean(props.userAgent.match(/iPhone|iPad|iPod/i));
  const isOpera = Boolean(props.userAgent.match(/Opera Mini/i));
  const isWindows = Boolean(props.userAgent.match(/IEMobile/i));

  const isMobile = Boolean(isAndroid || isIos || isOpera || isWindows);
  const isDesktop = !isMobile;

  // REF: https://stackoverflow.com/a/19999868
  const msie = props.userAgent.indexOf('MSIE ');
  const isIE = msie > 0 || !!props.userAgent.match(/Trident.*rv\:11\./);

  // REF: https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
  // const isIE = false || !!document.documentMode;
 */

  if (deviceDetection.isIE) {
    return <NotSupportedBrowserComponent />;
  }

  return (
    <DeviceDetectionContext.Provider
      value={{
        dimension,
        orientation,
        isFTLMobile: ftlDetection.isFTLMobile,
        isFTLMobileOnly: ftlDetection.isFTLMobileOnly,
        isFTLTablet: ftlDetection.isFTLTablet,
        /* eslint-disable @typescript-eslint/indent */
        isMobile:
          ftlDetection.isFTLMobile ||
          (typeof window === 'undefined'
            ? deviceDetection.isMobile
            : !deviceDetection.isIPad13
            ? deviceDetection.isMobile
            : windowRender && deviceDetection.isMobile),
        /* eslint-enable @typescript-eslint/indent */
        isTablet: ftlDetection.isFTLTablet || deviceDetection.isTablet,
        isMobileOnly: ftlDetection.isFTLMobileOnly || deviceDetection.isMobileOnly,
        isAndroid: deviceDetection.isAndroid,
        isIos: deviceDetection.isIOS,
        isOpera: deviceDetection.isOpera,
        isWinPhone: deviceDetection.isWinPhone,
        isBrowser: deviceDetection.isBrowser,
        isSmartTV: deviceDetection.isSmartTV,
        isConsole: deviceDetection.isConsole,
        isWearable: deviceDetection.isWearable,
        isMobileSafari: deviceDetection.isMobileSafari,
        isChromium: deviceDetection.isChromium,
        isChrome: deviceDetection.isChrome,
        isFirefox: deviceDetection.isFirefox,
        isSafari: deviceDetection.isSafari,
        osVersion: deviceDetection.osVersion,
        osName: deviceDetection.osName,
        fullBrowserVersion: deviceDetection.fullBrowserVersion,
        browserVersion: deviceDetection.browserVersion,
        browserName: deviceDetection.browserName,
        mobileVendor: deviceDetection.mobileVendor,
        mobileModel: deviceDetection.mobileModel,
        engineName: deviceDetection.engineName,
        engineVersion: deviceDetection.engineVersion,
        isEdge: deviceDetection.isEdge,
        isYandex: deviceDetection.isYandex,
        deviceType: deviceDetection.deviceType,
        isElectron: deviceDetection.isElectron,
        isIOS13: deviceDetection.isIOS13,
        isIPad13: deviceDetection.isIPad13,
        isIPhone13: deviceDetection.isIPhone13,
        isIPod13: deviceDetection.isIPod13,
      }}
    >
      {children}
    </DeviceDetectionContext.Provider>
  );
};

export default DeviceDetectionComponent;
