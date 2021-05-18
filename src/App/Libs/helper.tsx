import axios, { AxiosInstance, Method } from 'axios';
import { config } from 'config';

import { nodeCache } from './cache';

let axiosInstance = null;

const generateQueryString = (queryObject) => {
  let queryString = '';
  if (queryObject) {
    const queryKeys = Object.keys(queryObject);
    // eslint-disable-next-line
    queryKeys.forEach((key, index) => {
      if (queryObject[key]) {
        if (queryObject[key].toString().length) {
          queryString += `${key}=${queryObject[key]}&`;
        }
      }
    });
    if (queryKeys.length > 0 && queryString[queryString.length - 1] === '&') {
      queryString = queryString.slice(0, -1);
    }
  }
  return queryString;
};

const parseQueryString = (queryString) => {
  const search = queryString.substring(1);
  try {
    if (search) {
      return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    } else {
      return {};
    }
  } catch (e) {
    return {};
  }
};

const parseCookies = (cookies) => {
  return cookies.split(';').reduce((res, c) => {
    const [key, val] = c.trim().split('=').map(decodeURIComponent);
    const allNumbers = (str) => /^\d+$/.test(str);
    try {
      return Object.assign(res, { [key]: allNumbers(val) ? val : JSON.parse(val) });
    } catch (e) {
      return Object.assign(res, { [key]: val });
    }
  }, {});
};

const removeEmpty = (obj) => {
  for (const propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === '' ||
      (Array.isArray(obj[propName]) && !obj[propName].length)
    ) {
      delete obj[propName];
    }
  }
  return obj;
};

const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const downloadBlobToFile = (blob, fileName) => {
  try {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    // the filename you want
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (e) {
    console.log(e);
  }
};

const API = (force = false): AxiosInstance => {
  if (axiosInstance && !force) {
    return axiosInstance;
  }

  axiosInstance = axios.create({
    baseURL: config.API_ENDPOINT,
  });

  return axiosInstance;
};

interface FetchOptionsProps {
  method?: Method;
  body?: any;
  headers?: any;
  cache?: boolean;
  cacheTTL?: number; // in second
  queryParams?: any;
}

const fetch: (url: string, options?: FetchOptionsProps) => any = async (url, options = {}) => {
  const { method = 'GET', body = {}, headers = {}, cache = false, cacheTTL } = options;
  let { queryParams = {} } = options;
  let finalUrl = `${process.env.API_ENDPOINT}${url}`;
  if (typeof window !== 'undefined') {
    queryParams = {
      ...queryParams,
      l: parseCookies(window.document.cookie).language || 'nl',
    };
  }

  if (queryParams) {
    const queryString = generateQueryString(queryParams);
    if (queryString) {
      finalUrl = `${finalUrl}?${queryString}`;
    }
  }
  let cacheKey = '';
  if (cache) {
    cacheKey = Buffer.from(
      JSON.stringify({
        finalUrl,
        body,
      }),
    ).toString('base64');
    const cacheData = nodeCache.get(cacheKey);
    if (cacheData) {
      return cacheData;
    }
  }
  try {
    const response = await API().request({ method, url, headers, data: body, params: queryParams });
    const res = response.data;
    if (cache) {
      if (cacheTTL) {
        nodeCache.set(cacheKey, res, cacheTTL);
      } else {
        nodeCache.set(cacheKey, res);
      }
    }
    return res;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message || 'Bad response from server');
    } else {
      throw new Error(error.message || 'Bad response from server');
    }
  }
};

export { generateQueryString, parseQueryString, parseCookies, removeEmpty, deepClone, downloadBlobToFile, fetch, API };
