/** @type {import('prettier').Config} */
export default {
  useTabs: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
  endOfLine: 'lf',
  semi: true,
  tabWidth: 2,
  arrowParens: 'avoid',
};
