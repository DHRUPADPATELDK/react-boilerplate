import { ROUTE_SEO } from '@App/Libs/Constants';
import { beforeLoadData } from '@App/Libs/customClient';
import { updateLayout } from '@App/Redux/Layout';
import { updateRoute } from '@App/Redux/Route';

export default [
  {
    exact: true,
    component: () => import('../Scenes/Dashboard/DashboardScene'),
    path: '/dashboard',
    loadData: async (params) => {
      const { match, cookies, updateSeo, queryParam, store } = beforeLoadData(params);
      updateSeo(ROUTE_SEO.dashboard({ language: cookies.get('language') }));
      store.dispatch(
        updateLayout({
          left: true,
          right: false,
        }),
      );
      store.dispatch(
        updateRoute({
          queryParam,
          ...match,
          name: 'dashboard',
          layout: 'main',
          label: 'Dashboard',
        }),
      );
      return {};
    },
    seo: ROUTE_SEO.dashboard({}),
  },
];
