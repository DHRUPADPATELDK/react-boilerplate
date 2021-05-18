import { ROUTE_SEO } from '@App/Libs/Constants';
import { beforeLoadData } from '@App/Libs/customClient';
import { updateLayout } from '@App/Redux/Layout';
import { updateRoute } from '@App/Redux/Route';
import { nodeCache } from '@Libs/cache';

const HomeRoute = {
  exact: true,
  component: () => import('../Scenes/Home/HomeScene'),
  loadData: async (params: any) => {
    const { match, cookies, updateSeo, queryParam, store } = beforeLoadData(params);
    if (queryParam && queryParam.clearCache) {
      console.log('--------------------------');
      console.log(nodeCache.getStats());
      console.log('--------------------------');
      console.log('Flush cache');
      nodeCache.flushAll();
    }
    updateSeo(ROUTE_SEO.home({ language: cookies.get('language') }));
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
        name: 'home',
        layout: 'main',
        label: 'Home',
      }),
    );
    return {};
  },
  seo: ROUTE_SEO.home({}),
};

export default [
  {
    path: '/',
    ...HomeRoute,
  },
  {
    path: '/home',
    ...HomeRoute,
  },
];
