module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        'react',
        '@typescript-eslint'
    ],
    rules: {
        'indent': ['error', 4, { SwitchCase: 1 }],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'semi-spacing': ['error'],
        'comma-dangle': ['error', 'never'],
        'comma-spacing': 'error',
        'key-spacing': 'error',
        'arrow-spacing': 'error',
        'space-infix-ops': 'error',
        'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
        'camelcase': 'error',
        'new-cap': 'error',
        'space-before-blocks': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        'no-unreachable': 'error',
        'computed-property-spacing': ['error', 'never'],
        'curly': ['error', 'all'],
        'no-unneeded-ternary': 'error'
    }
};
