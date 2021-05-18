import React from 'react';

export interface DeviceDetectionContextModel {
  isFTLMobile?: boolean;
  isFTLTablet?: boolean;
  isFTLMobileOnly?: boolean;
  isMobile?: boolean;
  isTablet?: boolean;
  isMobileOnly?: boolean;
  isAndroid?: boolean;
  isIos?: boolean;
  isOpera?: boolean;
  isWinPhone?: boolean;
  isBrowser?: boolean;
  isSmartTV?: boolean;
  isConsole?: boolean;
  isWearable?: boolean;
  isMobileSafari?: boolean;
  isChromium?: boolean;
  isChrome?: boolean;
  isFirefox?: boolean;
  isSafari?: boolean;
  osVersion?: string;
  osName?: string;
  fullBrowserVersion?: string;
  browserVersion?: string;
  browserName?: string;
  mobileVendor?: string;
  mobileModel?: string;
  engineName?: string;
  engineVersion?: string;
  isEdge?: boolean;
  isYandex?: boolean;
  deviceType?: string;
  isIOS13?: boolean;
  isIPad13?: boolean;
  isIPhone13?: boolean;
  isIPod13?: boolean;
  isElectron?: boolean;
  orientation?: 'portrait' | 'landscape' | string;
  dimension?: {
    width?: number | null;
    height?: number | null;
  };
}

const initialContext: DeviceDetectionContextModel = {};

export default React.createContext(initialContext);
