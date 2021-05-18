import useNotFoundRoute from '@App/Libs/useNotFoundRoute';
import React from 'react';
import { withCookies, useCookies } from 'react-cookie';
import { Redirect } from 'react-router';
import { renderRoutes } from 'react-router-config';

const AuthComponent: any = (props: any) => {
  const [cookies] = useCookies(['auth']);
  const {
    route: { routes },
    location,
  }: any = props;

  const check = useNotFoundRoute(routes, location.pathname);
  if (check) {
    return check;
  }

  // const secureRoutes = ['/dashboard', '/update-profile']

  // if (secureRoutes.indexOf(props.location.pathname) !== -1) {
  if (!cookies.auth) {
    return <Redirect to="/login" />;
  }
  // }

  return <div>{renderRoutes(routes)}</div>;
};

export default withCookies(AuthComponent);
