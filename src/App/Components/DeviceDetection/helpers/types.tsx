export const DEVICE_TYPES = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  SMART_TV: 'smarttv',
  CONSOLE: 'console',
  WEARABLE: 'wearable',
  BROWSER: undefined,
};

export const BROWSER_TYPES = {
  CHROME: 'Chrome',
  FIREFOX: 'Firefox',
  OPERA: 'Opera',
  YANDEX: 'Yandex',
  SAFARI: 'Safari',
  INTERNET_EXPLORER: 'Internet Explorer',
  EDGE: 'Edge',
  CHROMIUM: 'Chromium',
  IE: 'IE',
  MOBILE_SAFARI: 'Mobile Safari',
};

export const OS_TYPES = {
  IOS: 'iOS',
  ANDROID: 'Android',
  WINDOWS_PHONE: 'Windows Phone',
};

const initialData = {
  isMobile: false,
  isTablet: false,
  isBrowser: false,
  isSmartTV: false,
  isConsole: false,
  isWearable: false,
};

export const checkType = (type) => {
  switch (type) {
    case DEVICE_TYPES.MOBILE:
      return { isMobile: true };
    case DEVICE_TYPES.TABLET:
      return { isTablet: true };
    case DEVICE_TYPES.SMART_TV:
      return { isSmartTV: true };
    case DEVICE_TYPES.CONSOLE:
      return { isConsole: true };
    case DEVICE_TYPES.WEARABLE:
      return { isWearable: true };
    case DEVICE_TYPES.BROWSER:
      return { isBrowser: true };
    default:
      return initialData;
  }
};

export const getCurrentBrowser = (name) => {
  switch (name) {
    case BROWSER_TYPES.CHROME:
    case BROWSER_TYPES.FIREFOX:
    case BROWSER_TYPES.OPERA:
    case BROWSER_TYPES.YANDEX:
    case BROWSER_TYPES.SAFARI:
    case BROWSER_TYPES.IE:
    case BROWSER_TYPES.EDGE:
    case BROWSER_TYPES.CHROMIUM:
      return true;
    default:
      return false;
  }
};
