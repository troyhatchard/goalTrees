module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  ignorePatterns: [
    '/docs',
    '/documents',
    '/logs',
    '/node_modules'
  ],
  rules: {
    'object-curly-newline': 'off',
    'no-useless-catch': 'off',
    'padded-blocks': 'warn',
    'no-trailing-spaces': 'warn',
    'no-unused-vars': 'warn',
    'object-curly-spacing': 'warn',
    'no-multiple-empty-lines': 'warn',
    'space-before-function-paren': 'warn',
    'eol-last': 'warn',
    indent: 'warn',
    'max-len': ['warn', { code: 100 }],
    'lines-between-class-members': 'warn',
    'no-useless-constructor': 'off',
    curly: 'off'
    // 'one-var': 'warn'
  }
}
