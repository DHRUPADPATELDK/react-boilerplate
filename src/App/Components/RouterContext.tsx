import React from 'react';

export interface RouteData {
  queryParam?: any;
  path?: string;
  url?: string;
  isExact?: boolean;
  params?: any;
  name?: string;
  layout?: string | 'auth' | null;

  // Extra params
  label?: string;
}

export interface RouterContextModel {
  history?: any;
  location?: any;
  match?: any;
  handleRoute?: (data?: RouteData) => void;
}

const initialContext: RouterContextModel = {};

export default React.createContext(initialContext);
