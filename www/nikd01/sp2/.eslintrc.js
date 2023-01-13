// eslint-disable-next-line no-undef
module.exports = {
    env: {
        jest: true,
        browser: true,
        es2021: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'prettier',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
    ],
    plugins: ['prettier', 'react', 'react-hooks'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 13,
        sourceType: 'module',
    },
    rules: {
        'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        'react/forbid-prop-types': [2, { forbid: ['any'] }],
        'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
        'no-param-reassign': 'off',
        'react/no-unescaped-entities': 'off',
        'jsx-a11y/control-has-associated-label': 'off',
        'no-console': 'error',
    },
};
