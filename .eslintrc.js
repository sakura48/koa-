// https://eslint.org/docs/user-guide/configuring

module.exports = {
    extends: 'standard',
    env: {
        es6: true,
        node: true,
    },
    parser: 'babel-eslint',
    parserOptions: {
        "sourceType": "module"
    },
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}