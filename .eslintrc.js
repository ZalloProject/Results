module.exports = {
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    extends: ['airbnb', 'prettier'],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
      window: true,
      document: true,
    },
    parser: 'babel-eslint',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': ['error'],
      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.js', '.jsx']
        }
      ],
      'react/prop-types': 0,
      'no-underscore-dangle': 0,
      'import/imports-first': ['error', 'absolute-first'],
      'import/newline-after-import': 'error',
      'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }],
      'react/jsx-one-expression-per-line': 0
    },
  };