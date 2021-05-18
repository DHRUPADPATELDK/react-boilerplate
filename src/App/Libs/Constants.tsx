import HomePageOgImage from '@Public/images/logo_og.png';
import { config } from 'config';

export const SHOP_NAME = config.APP_NAME;

export const ROUTE_SEO = {
  notFound: ({ language = config.DEFAULT_LANGUAGE }) => {
    const titles = {
      nl: 'Pagina niet gevonden',
      en: 'Page not found',
    };
    const description = {
      nl: '',
      en: '',
    };
    return {
      title: `${titles[language]} - ${SHOP_NAME}`,
      description: `${description[language]} - ${SHOP_NAME}`,
    };
  },
  home: ({ language = config.DEFAULT_LANGUAGE }) => {
    const titles = {
      nl: 'Home',
      en: 'Home',
    };
    const description = {
      nl: '',
      en: '',
    };
    return {
      title: `${titles[language]} - ${SHOP_NAME}`,
      description: `${description[language]} - ${SHOP_NAME}`,
      image: `${HomePageOgImage}`,
    };
  },
  login: ({ language = config.DEFAULT_LANGUAGE }) => {
    const titles = {
      nl: 'Inloggen',
      en: 'Login',
    };
    const description = {
      nl: 'Inloggen',
      en: 'Login',
    };
    return {
      title: `${titles[language]} - ${SHOP_NAME}`,
      description: `${description[language]} - ${SHOP_NAME}`,
    };
  },
  dashboard: ({ language = config.DEFAULT_LANGUAGE }) => {
    const titles = {
      nl: 'Dashboard',
      en: 'Dashboard',
    };
    const description = {
      nl: 'Dashboard',
      en: 'Dashboard',
    };
    return {
      title: `${titles[language]} - ${SHOP_NAME}`,
      description: `${description[language]} - ${SHOP_NAME}`,
    };
  },
};
