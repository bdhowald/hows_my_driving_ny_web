module.exports = {
  extends: ['plugin:react/recommended'],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    'max-len': ['error', 120, 2],
    'react/prop-types': 0,
    'react/destructuring-assignment': 0,
    'react/no-access-state-in-setstate': 0,
    'react/jsx-one-expression-per-line': 0,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src'],
      },
    },
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
}