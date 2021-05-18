import NotFoundScene from '@App/Scenes/NotFound/NotFoundScene';
import React from 'react';
import { matchRoutes } from 'react-router-config';

export interface LoginUserInterface {
  routes?: any;
  pathname?: string;
}

const useNotFoundRoute = (routes, pathname) => {
  // Check routes match or not.
  const checkRoutes = matchRoutes(routes, pathname);

  if (checkRoutes.length === 0) {
    return <NotFoundScene />;
  }
};

export default useNotFoundRoute;
