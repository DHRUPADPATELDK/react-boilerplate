import { parseQueryString } from '@Libs/helper';

const beforeLoadData = (params) => {
  const extraParams = {};
  // for client side
  if (typeof window !== `undefined`) {
    extraParams['queryParam'] = window.location.search && parseQueryString(window.location.search);

    // extraParams['cookies'] = document.cookie && parseCookies(document.cookie);
  }

  return {
    ...params,
    ...extraParams,
  };
};

export { beforeLoadData };
