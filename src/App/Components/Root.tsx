import useNotFoundRoute from '@App/Libs/useNotFoundRoute';
import React from 'react';
import { renderRoutes } from 'react-router-config';

const RootComponent: any = (props: { route: any; staticContext: any }) => {
  const {
    route: { routes },
    location,
  }: any = props;

  const check = useNotFoundRoute(routes, location.pathname);
  if (check) {
    return check;
  }

  return <div className="col">{renderRoutes(props.route.routes)}</div>;
};
export default RootComponent;
