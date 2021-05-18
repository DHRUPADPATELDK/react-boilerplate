export default class SourceMapWebpack {
  // eslint-disable-next-line
  apply(webpackHandler) {
    webpackHandler.hooks.beforeConfig.tap('AddSourceMapWebpack', (env, type, config) => {
      try {
        let conf = config;

        if (!Array.isArray(config)) {
          conf = [config];
        }
        conf.forEach((c) => {
          if (env !== 'production') {
            // override devtool: evn value ( at node_modules\@pawjs\pawjs\src\server\webpack-start.js )
            // REF: https://webpack.js.org/configuration/devtool/
            c.devtool = 'eval-source-map';
            if (!c.resolve) c.resolve = {};
            if (!c.resolve.alias) c.resolve.alias = {};
            if (!c.resolve.alias['react-dom']) c.resolve.alias['react-dom'] = '@hot-loader/react-dom';
          }
        });
      } catch (ex) {
        // eslint-disable-next-line
        console.log(ex);
      }
    });
  }
}
