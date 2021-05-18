import dashboardTranslations from '@Translation/dashboard.json';
import footerTranslations from '@Translation/footer.json';
import globalTranslations from '@Translation/global.json';
import headerTranslations from '@Translation/header.json';
import leftBarTranslations from '@Translation/leftBar.json';
import loginTranslations from '@Translation/login.json';
import notFoundTranslations from '@Translation/notFound.json';
import validatorTranslations from '@Translation/validator.json';
import { config } from 'config';
import React from 'react';
import { useCookies } from 'react-cookie';
import { renderToStaticMarkup } from 'react-dom/server';
import { LocalizeProvider } from 'react-localize-redux';

const MainComponent = (props: any) => {
  const [cookies] = useCookies(['language']);

  return (
    <LocalizeProvider
      initialize={{
        languages: config.LANGUAGE_LIST,
        translation: {
          ...globalTranslations,
          ...headerTranslations,
          ...footerTranslations,
          ...leftBarTranslations,
          ...dashboardTranslations,
          ...loginTranslations,
          ...notFoundTranslations,
          ...validatorTranslations,
        },
        options: {
          defaultLanguage: cookies.language || config.DEFAULT_LANGUAGE || 'en',
          renderInnerHtml: true,
          renderToStaticMarkup,
        },
      }}
    >
      {props.children}
    </LocalizeProvider>
  );
};

export default MainComponent;
