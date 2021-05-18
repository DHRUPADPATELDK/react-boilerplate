import React from 'react';

import AuthLayoutStyles from './styles.scss';

export interface AuthLayoutComponentProps {
  children: any;
}

const AuthLayoutComponent = (props: AuthLayoutComponentProps) => {
  const { children } = props;
  return (
    <div id={AuthLayoutStyles.authWrapper}>
      <div className={AuthLayoutStyles.pageContent}>{children}</div>
    </div>
  );
};

export default AuthLayoutComponent;
