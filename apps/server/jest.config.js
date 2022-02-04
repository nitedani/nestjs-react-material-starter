module.exports = {
  rootDir: 'src',
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: require.resolve('./tsconfig.json'),
    },
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest'],
    '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|html)$':
      'jest-transform-stub',
  },
  testRegex: '/src/.*\\.(test|spec).(ts|tsx|js)$',
  collectCoverageFrom: ['src/**/*.{js,jsx,tsx,ts}'],
  coverageProvider: 'v8',
};
