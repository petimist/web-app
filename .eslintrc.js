module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'max-len': [
      'error',
      {
        code: 150,
        ignorePattern: '\\s*import\\s*\\(\\s*.+\\s*\\)\\s*',
      },
    ],
    'import/prefer-default-export': 'off',
    'import/named': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: [2, 'always'],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
