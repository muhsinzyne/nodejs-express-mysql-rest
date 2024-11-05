module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  ignorePatterns: ["dist/"],
  rules: {
    // Customize your rules here
    
  },
  overrides: [
    {
        files: ['scripts/*'], // Adjust this to your directory
        rules: {
            'no-undef': 'off', // Disable the no-undef rule for this directory
        },
    },
],
};
