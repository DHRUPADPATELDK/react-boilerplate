import RouterContext, { RouteData, RouterContextModel } from '@App/Components/RouterContext';
import LayoutContext, { HandleLayoutProps, LayoutContextModel } from '@Components/LayoutContext';
import React, { useContext, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import { NavLink } from 'react-router-dom';

import NotFoundStyles from './styles.scss';

export interface NotFoundSceneProps {
  loadedData?: { redux: { layout: HandleLayoutProps; route?: RouteData } };
}

const NotFoundScene = (props: NotFoundSceneProps) => {
  const {
    loadedData: { redux: { layout, route } } = {
      redux: { layout: { left: false, right: false }, route: { name: 'notFound' } },
    },
  } = props;
  const { handleRoute }: RouterContextModel = useContext(RouterContext);
  const { handleLayout, translate }: LayoutContextModel = useContext(LayoutContext);

  useEffect(() => {
    handleLayout(layout || { left: false, right: false });
    handleRoute(route);
  }, []);

  return (
    <div className={NotFoundStyles.wrapper}>
      <MetaTags>
        <title>{translate('pageNotFound')}</title>
      </MetaTags>
      <h1 className="mainHeading text-primary">{translate('notFound.label')}</h1>
      <p>{translate('notFound.note')}</p>
      <NavLink to="/" exact={true} className="btn btn-secondary">
        {translate('notFound.homePage')}
      </NavLink>
    </div>
  );
};

export default NotFoundScene;
