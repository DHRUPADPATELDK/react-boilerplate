import React, { ReactNode } from 'react';
/* eslint-disable import/named */
import { InitializeOptions, TranslateChildFunction, TranslatePlaceholderData } from 'react-localize-redux';
/* eslint-disable import/named */

export interface HandleLayoutProps {
  left: boolean;
  right: boolean;
}

export interface LayoutContextModel {
  handleLayout?: (layout: HandleLayoutProps) => void;
  doLogout?: () => void;
  translate?: (
    id?: string,
    data?: TranslatePlaceholderData,
    options?: InitializeOptions,
    children?: TranslateChildFunction | ReactNode,
  ) => string;
}

const initialContext: LayoutContextModel = {};

export default React.createContext(initialContext);
