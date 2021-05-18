import FooterComponent from '@App/Components/AppShell/Footer/FooterComponent';
import HeaderComponent from '@App/Components/AppShell/Header/HeaderComponent';
import LeftSideBarComponent from '@App/Components/AppShell/LeftSideBar/LeftSideBarComponent';
import RouterContext, { RouterContextModel } from '@App/Components/RouterContext';
import React, { useContext } from 'react';
import { useCookies } from 'react-cookie';

import MainLayoutStyles from './styles.scss';

export interface MainLayoutComponentProps {
  children: any;
}

const MainLayoutComponent = (props: MainLayoutComponentProps) => {
  const { children } = props;
  const { location }: RouterContextModel = useContext(RouterContext);
  const [{ auth }]: any = useCookies(['auth']);

  return (
    <div id={MainLayoutStyles.wrapper}>
      <HeaderComponent auth={auth} />
      <main>
        <div className="container">
          <div className="row my-2 my-lg-4">
            <LeftSideBarComponent location={location.pathname} auth={auth} />
            {children}
          </div>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default MainLayoutComponent;
