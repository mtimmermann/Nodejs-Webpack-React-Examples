module.exports = {
  parser: 'babel-eslint',
  rules: {
    strict: 0
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jquery: true,
    node: true,
  },
  extends: 'airbnb',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['react'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js','.jsx']
      }
    }
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-unused-vars': ['warn'],
    'no-console': 0,

    //'import/extensions': ['.jsx'],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
    'react/prefer-stateless-function': [0, { 'ignorePureComponents': true }],
    'react/jsx-filename-extension': [1, { 'extensions': ['.jsx'] }],

    'func-names': ['error', 'never'],

    'padded-blocks': ['off'],

    // Advanced Rules
    'no-unused-expressions': 'warn',
    'no-useless-concat': 'warn',
    'block-scoped-var': 'error',
    'consistent-return': 'error',

    //'object-shorthand': ['error', 'consistent'],

    // Definition for rule 'jsx-a11y/href-no-hash' was not found
    // https://github.com/facebookincubator/create-react-app/issues/2631
    'jsx-a11y/href-no-hash': 'off',
    //'jsx-a11y/anchor-is-valid': ['warn', { 'aspects': ['invalidHref'] }]

    // Turn off: 'Absolute imports should come before relative ignore'
    //   Turned off by default w/ esling, airbnb turns it back on
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js#L112
    // disallow non-import statements appearing before import statements
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md
    'import/first': ['off'],

    'import/no-extraneous-dependencies': ['error', { devDependencies: true }]
  }
};
