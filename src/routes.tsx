import DefaultSkeleton from '@App/Components/DefaultSkeleton';
import { beforeLoadData } from '@App/Libs/customClient';
import { fetchLoginUserSuccess } from '@App/Redux/Auth';
import AuthRoute from '@App/Routes/AuthRoute';
import DashboardRoute from '@App/Routes/DashboardRoute';
import HomeRoute from '@App/Routes/HomeRoute';
import NotFoundScene from '@App/Scenes/NotFound/NotFoundScene';
import RouterHandler from '@pawjs/pawjs/src/router/handler';

// import CheckoutRoute from '@App/Routes/CheckoutRoute';
// Get application routes and merge them with spread operator
const appRoutes = [
  {
    path: '/',
    abstract: true,
    component: () => import('@App/Components/Root'),
    loadData: async (params) => {
      const { cookies, store } = beforeLoadData(params);
      if (typeof window === `undefined` && cookies && cookies.get('auth')) {
        const auth = cookies.get('auth');
        try {
          // TODO: Make API request to find login user data
          // const loginUser = {};
          // store.dispatch(
          //   fetchLoginUserSuccess({
          //     accessToken: auth.accessToken,
          //     user: loginUser,
          //   }),
          // );
          store.dispatch(fetchLoginUserSuccess(auth));
        } catch (e) {
          console.log(e);
        }
      }
      return {};
    },
    routes: [
      ...HomeRoute,
      ...AuthRoute,
      {
        // We can set any path name from child routes specified instead of "/": WRONG
        path: '/',
        abstract: true,
        component: () => import('@App/Components/Auth/AuthComponent'),
        routes: [...DashboardRoute],
      },
    ],
  },
];

export default class Routes {
  // eslint-disable-next-line
  apply = (routeHandler: RouterHandler) => {
    // // PWA Schema
    // routeHandler.setPwaSchema(config.PWA_SCHEMA);

    // // SEO Schema
    // routeHandler.setDefaultSeoSchema(config.SEO_SCHEMA);

    // Setting Delay option to 0 so that skeleton loading works seamless
    routeHandler.setDefaultAllowedLoadDelay(0);

    // Set default skeleton
    routeHandler.setDefaultLoaderComponent(DefaultSkeleton);

    // Set default 404 component
    routeHandler.set404Component(NotFoundScene);

    // On initialization of routes, add application routes
    routeHandler.hooks.initRoutes.tapPromise('AppRoutes', async () => routeHandler.addRoutes(appRoutes));
  };
}
