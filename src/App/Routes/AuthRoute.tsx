import { ROUTE_SEO } from '@App/Libs/Constants';
import { beforeLoadData } from '@App/Libs/customClient';
import { updateLayout } from '@App/Redux/Layout';
import { updateRoute } from '@App/Redux/Route';

export default [
  {
    exact: true,
    component: () => import('../Scenes/Login/LoginContainer'),
    path: '/login',
    loadData: async (params) => {
      const { match, cookies, updateSeo, queryParam, store } = beforeLoadData(params);
      updateSeo(ROUTE_SEO.login({ language: cookies.get('language') }));
      store.dispatch(
        updateLayout({
          left: false,
          right: false,
        }),
      );
      store.dispatch(
        updateRoute({
          queryParam,
          ...match,
          name: 'login',
          layout: 'auth',
          label: 'Login',
        }),
      );
      return null;
    },
    seo: ROUTE_SEO.login({}),
  },
];
