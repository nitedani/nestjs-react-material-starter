const { join } = require('path');
const { cwd } = require('process');

module.exports = {
  purge: [
    join(cwd(), 'apps', 'webapp') + '/src/**/*.{js,jsx,ts,tsx}',
    join(cwd(), 'apps', 'webapp') + '/src/public/index.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
