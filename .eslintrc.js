const path = require('path')

module.exports = {
  parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends: [
    'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript', // this line does the trick
  ],
  parserOptions: {
    ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',  // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,  // Allows for the parsing of JSX
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/indent": ['error', 2],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-empty-function": "off",
    "react/prop-types": "off"
  },
  settings: {
    react: {
      version: 'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    "import/resolver": {
      "webpack": {
        "config": path.resolve(__dirname, './node_modules/@pawjs/pawjs/src/webpack/inc/webpack-resolver-config.js'),
      },
      alias: {
        map: [
          ['@App', path.resolve(__dirname, 'src/App/')],
          ['@Components', path.resolve(__dirname, 'src/App/Components/')],
          ['@Fixtures', path.resolve(__dirname, 'src/App/Fixtures/')],
          ['@Libs', path.resolve(__dirname, 'src/App/Libs/')],
          ['@Redux', path.resolve(__dirname, 'src/App/Redux/')],
          ['@Scenes', path.resolve(__dirname, 'src/App/Scenes/')],
          ['@Routes', path.resolve(__dirname, 'src/App/Routes/')],
          ['@Public', path.resolve(__dirname, 'src/App/Public/')],
          ['@Translation', path.resolve(__dirname, 'src/App/Translation/')],
          ['config', path.resolve(__dirname, 'src/config.tsx')],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
};
