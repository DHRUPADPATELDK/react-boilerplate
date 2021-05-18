import path from 'path';

export default class ResolverWebpack {
  // eslint-disable-next-line
  apply(webpackHandler) {
    webpackHandler.hooks.beforeConfig.tap('ResolvePath', (env, type, config) => {
      try {
        let conf = config;

        if (!Array.isArray(config)) {
          conf = [config];
        }
        conf.forEach((c) => {
          if (c.resolve && c.resolve.alias) {
            // eslint-disable-next-line no-param-reassign
            c.resolve.alias = {
              ...c.resolve.alias,
              '@App': path.resolve(__dirname, '../App/'),
              '@Components': path.resolve(__dirname, '../App/Components/'),
              '@Fixtures': path.resolve(__dirname, '../App/Fixtures/'),
              '@Libs': path.resolve(__dirname, '../App/Libs/'),
              '@Redux': path.resolve(__dirname, '../App/Redux/'),
              '@Scenes': path.resolve(__dirname, '../App/Scenes/'),
              '@Routes': path.resolve(__dirname, '../App/Routes/'),
              '@Public': path.resolve(__dirname, '../App/Public/'),
              '@Translation': path.resolve(__dirname, '../App/Translation/'),
              config: path.resolve(__dirname, '../config.tsx'),
            };
          }
        });
      } catch (ex) {
        // eslint-disable-next-line
        console.log(ex);
      }
    });
  }
}
