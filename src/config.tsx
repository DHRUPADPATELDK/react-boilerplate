import ModalStyles from '@App/Components/Modals.scss';
import icon128 from '@App/Public/images/icon-128x128.png';
import icon144 from '@App/Public/images/icon-144x144.png';
import icon152 from '@App/Public/images/icon-152x152.png';
import icon192 from '@App/Public/images/icon-192x192.png';
import icon384 from '@App/Public/images/icon-384x384.png';
import icon512 from '@App/Public/images/icon-512x512.png';
import icon72 from '@App/Public/images/icon-72x72.png';
import icon96 from '@App/Public/images/icon-96x96.png';
import SocialShareImg from '@App/Public/images/logo.svg';

const READY_FOR_LIVE = process.env.READY_FOR_LIVE ? JSON.parse(process.env.READY_FOR_LIVE) : false;
const APP_NAME = process.env.APP_NAME || '';
const APP_DESCRIPTION = process.env.APP_DESCRIPTION || '';

const SEO_META: any = [
  {
    name: 'robots',
    content: READY_FOR_LIVE ? 'index,follow,noodp' : 'noindex, nofollow',
  },
  {
    name: 'author',
    content: 'Cloud Monastery',
  },
  {
    name: 'theme-color',
    content: '#308ccc',
  },
  {
    name: 'apple-mobile-web-app-status-bar-style',
    content: '#308ccc',
  },
  {
    name: 'msapplication-TileColor',
    content: '#308ccc',
  },
  {
    name: 'application-name',
    content: APP_NAME,
  },
  {
    name: 'apple-mobile-web-app-title',
    content: APP_NAME,
  },
  {
    name: 'site_name',
    content: APP_NAME,
  },
  {
    name: 'generator',
    content: 'Cloud Monastery',
  },
];

let isIos = false;
if (typeof window !== 'undefined') {
  isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

if (isIos) {
  // viewport for IOS
  SEO_META.push({
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
  });
} else {
  SEO_META.push({
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0, maximum-scale=2.0, minimum-scale=1.0',
  });
}

export const config = {
  APP_NAME,
  APP_DESCRIPTION,
  READY_FOR_LIVE,
  DEFAULT_LANGUAGE: 'en',
  ENDPOINT: process.env.ENDPOINT || 'http://localhost:3000',
  API_ENDPOINT: process.env.API_ENDPOINT,
  IMAGE_ENDPOINT: process.env.IMAGE_ENDPOINT,
  TEST_DATA: process.env.TEST_DATA,
  START_YEAR: 2011,
  LANGUAGE_LIST: [
    { name: 'English', code: 'en' },
    { name: 'Nederlands', code: 'nl' },
  ],
  CURRENCY_LIST: {
    USD: 'US Dollar',
  },
  CURRENCY_SIGN: {
    USD: '$',
  },
  DEFAULT_CURRENCY_FORMAT: {
    USD: { prefix: '$ ' },
  },
  SOCIAL_MEDIA: {
    FACEBOOK_LINK: 'https://www.facebook.com',
    TWITTER_LINK: 'https://twitter.com',
    INSTAGRAM_LINK: 'https://www.instagram.com',
  },
  PWA_SCHEMA: {
    name: APP_NAME,
    display: 'standalone',
    title: APP_NAME,
    description: APP_DESCRIPTION,
    // eslint-disable-next-line @typescript-eslint/camelcase
    short_name: APP_NAME,
    icons: [
      {
        src: icon72,
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: icon96,
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: icon128,
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: icon144,
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: icon152,
        sizes: '152x152',
        type: 'image/png',
      },
      {
        src: icon192,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: icon384,
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: icon512,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  SEO_SCHEMA: {
    title: APP_NAME,
    name: APP_NAME,
    description: APP_DESCRIPTION,
    type: 'website',
    url: 'https://cloudmonastery.com',
    // eslint-disable-next-line @typescript-eslint/camelcase
    site_name: APP_NAME,
    image: SocialShareImg,
    meta: SEO_META,
  },
  DEFAULT_MODAL_SETTINGS: {
    contentLabel: '',
    shouldCloseOnOverlayClick: true,
    className: ModalStyles.modal,
    overlayClassName: ModalStyles.overlay,
    bodyOpenClassName: ModalStyles.bodyOpen,
    beforeClose: ModalStyles.beforeClose,
    closeTimeoutMS: 200,
  },
  DEFAULT_TOAST_SETTINGS: {
    position: 'bottom-center',
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
  },
};
