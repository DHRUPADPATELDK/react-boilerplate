import UAParser from 'ua-parser-js';

import { BROWSER_TYPES, DEVICE_TYPES, OS_TYPES } from './types';

const { CHROME, CHROMIUM, IE, INTERNET_EXPLORER, OPERA, FIREFOX, SAFARI, MOBILE_SAFARI, EDGE, YANDEX } = BROWSER_TYPES;
const { MOBILE, TABLET, SMART_TV, BROWSER, WEARABLE, CONSOLE } = DEVICE_TYPES;
const { ANDROID, WINDOWS_PHONE, IOS } = OS_TYPES;

export const getNavigatorInstance = () => {
  if (typeof window !== 'undefined') {
    if (window.navigator || navigator) {
      return window.navigator || navigator;
    }
  }

  return false;
};

export const isIOS13Check = (type) => {
  const nav = getNavigatorInstance();
  return (
    nav &&
    nav.platform &&
    (nav.platform.indexOf(type) !== -1 || (nav.platform === 'MacIntel' && nav.maxTouchPoints > 1 && !window.MSStream))
  );
};

export class DeviceDetection {
  // REF: https://github.com/duskload/react-device-detect/blob/master/src/components/helpers/selectors.js
  private browser: any = {};
  private cpu: any = {};
  private device: any = {};
  private engine: any = {};
  private os: any = {};
  private ua: string;

  public isMobileType = () => this.device.type === MOBILE;
  public isTabletType = () => this.device.type === TABLET;

  public isMobileAndTabletType = () => {
    switch (this.device.type) {
      case MOBILE:
      case TABLET:
        return true;
      default:
        return false;
    }
  };

  private isSmartTVType = () => this.device.type === SMART_TV;
  private isBrowserType = () => this.device.type === BROWSER;
  private isWearableType = () => this.device.type === WEARABLE;
  private isConsoleType = () => this.device.type === CONSOLE;
  private isAndroidType = () => this.os.name === ANDROID;
  private isWinPhoneType = () => this.os.name === WINDOWS_PHONE;
  private isIOSType = () => this.os.name === IOS;
  private isChromeType = () => this.browser.name === CHROME;
  private isFirefoxType = () => this.browser.name === FIREFOX;
  private isChromiumType = () => this.browser.name === CHROMIUM;
  private isEdgeType = () => this.browser.name === EDGE;
  private isYandexType = () => this.browser.name === YANDEX;
  private isSafariType = () => this.browser.name === SAFARI || this.browser.name === MOBILE_SAFARI;
  private isMobileSafariType = () => this.browser.name === MOBILE_SAFARI;
  private isOperaType = () => this.browser.name === OPERA;
  private isIEType = () => this.browser.name === INTERNET_EXPLORER || this.browser.name === IE;
  private isElectronType = () => {
    const nav = getNavigatorInstance();
    const ua = nav && nav.userAgent.toLowerCase();

    return typeof ua === 'string' ? /electron/.test(ua) : false;
  };

  private getIOS13 = () => {
    const nav = getNavigatorInstance();
    return (
      nav &&
      (/iPad|iPhone|iPod/.test(nav.platform) || (nav.platform === 'MacIntel' && nav.maxTouchPoints > 1)) &&
      !window.MSStream
    );
  };

  private getIPad13 = () => isIOS13Check('iPad');
  private getIphone13 = () => isIOS13Check('iPhone');
  private getIPod13 = () => isIOS13Check('iPod');

  private getBrowserFullVersion = () => this.browser.version;
  private getBrowserVersion = () => this.browser.major;
  private getOsVersion = () => (this.os.version ? this.os.version : 'none');
  private getOsName = () => (this.os.name ? this.os.name : 'none');
  private getBrowserName = () => this.browser.name;
  private getMobileVendor = () => (this.device.vendor ? this.device.vendor : 'none');
  private getMobileModel = () => (this.device.model ? this.device.model : 'none');
  private getEngineName = () => this.engine.name;
  private getEngineVersion = () => this.engine.version;
  private getUseragent = () => this.ua;
  private getDeviceType = () => this.device.type;

  public isSmartTV: boolean;
  public isConsole: boolean;
  public isWearable: boolean;
  public isMobileSafari: boolean;
  public isChromium: boolean;
  public isMobile: boolean;
  public isMobileOnly: boolean;
  public isTablet: boolean;
  public isBrowser: boolean;
  public isAndroid: boolean;
  public isWinPhone: boolean;
  public isIOS: boolean;
  public isChrome: boolean;
  public isFirefox: boolean;
  public isSafari: boolean;
  public isOpera: boolean;
  public isIE: boolean;
  public osVersion: string;
  public osName: string;
  public fullBrowserVersion: string;
  public browserVersion: string;
  public browserName: string;
  public mobileVendor: string;
  public mobileModel: string;
  public engineName: string;
  public engineVersion: string;
  public getUA: string;
  public isEdge: boolean;
  public isYandex: boolean;
  public deviceType: string;
  public isIOS13: boolean;
  public isIPad13: boolean;
  public isIPhone13: boolean;
  public isIPod13: boolean;
  public isElectron: boolean;

  // eslint-disable-next-line
  constructor(ua: string) {
    const UA: any = new UAParser(ua);
    this.browser = UA.getBrowser();
    this.cpu = UA.getCPU();
    this.device = UA.getDevice();
    this.engine = UA.getEngine();
    this.os = UA.getOS();
    this.ua = ua;

    this.isSmartTV = this.isSmartTVType();
    this.isConsole = this.isConsoleType();
    this.isWearable = this.isWearableType();
    this.isMobileSafari = this.isMobileSafariType() || this.getIPad13();
    this.isChromium = this.isChromiumType();
    this.isMobile = this.isMobileAndTabletType() || this.getIPad13();
    this.isMobileOnly = this.isMobileType();
    this.isTablet = this.isTabletType() || this.getIPad13();
    this.isBrowser = this.isBrowserType();
    this.isAndroid = this.isAndroidType();
    this.isWinPhone = this.isWinPhoneType();
    this.isIOS = this.isIOSType() || this.getIPad13();
    this.isChrome = this.isChromeType();
    this.isFirefox = this.isFirefoxType();
    this.isSafari = this.isSafariType();
    this.isOpera = this.isOperaType();
    this.isIE = this.isIEType();
    this.osVersion = this.getOsVersion();
    this.osName = this.getOsName();
    this.fullBrowserVersion = this.getBrowserFullVersion();
    this.browserVersion = this.getBrowserVersion();
    this.browserName = this.getBrowserName();
    this.mobileVendor = this.getMobileVendor();
    this.mobileModel = this.getMobileModel();
    this.engineName = this.getEngineName();
    this.engineVersion = this.getEngineVersion();
    this.getUA = this.getUseragent();
    this.isEdge = this.isEdgeType();
    this.isYandex = this.isYandexType();
    this.deviceType = this.getDeviceType();
    this.isIOS13 = this.getIOS13();
    this.isIPad13 = this.getIPad13();
    this.isIPhone13 = this.getIphone13();
    this.isIPod13 = this.getIPod13();
    this.isElectron = this.isElectronType();
  }
}
