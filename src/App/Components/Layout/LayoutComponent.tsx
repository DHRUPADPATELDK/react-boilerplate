import React from 'react';

import AuthLayoutComponent from './AuthLayout/AuthLayoutComponent';
import MainLayoutComponent from './MainLayout/MainLayoutComponent';

export interface LayoutComponentProps {
  layout: string;
  children: string;
}

const LayoutComponent: any = (props: LayoutComponentProps) => {
  const { layout, children } = props;
  if (layout === 'main') {
    return <MainLayoutComponent>{children}</MainLayoutComponent>;
  }
  if (layout === 'auth') {
    return <AuthLayoutComponent>{children}</AuthLayoutComponent>;
  }

  return children;
};

export default LayoutComponent;
