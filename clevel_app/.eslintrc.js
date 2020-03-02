module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
    '@vue/prettier',
    'eslint:recommended',
  ],
  plugins: ['prettier', 'vue'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/prefer-default-export': 0,
    'no-shadow': 0,
    'prettier/prettier': ['error'],
  },
};
