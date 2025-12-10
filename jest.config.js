module.exports = {
  clearMocks: true,
  setupFilesAfterEnv: [
    './test/tools/jestSetup.js',
    './test/tools/testingUtility.js',
  ],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  testPathIgnorePatterns: ['/node_modules/', '/cypress/'],
  transform: {
    '.+\\.[t|j]s$': 'babel-jest',
    '\\.(m|c)js$': 'babel-jest', // *.cjs, *.mjs
  },
  moduleDirectories: ['node_modules', '<rootDir>/test/tools'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  coverageDirectory: '<rootDir>/coverage',
  // NOTE: paths are relative from where Jest is run
  collectCoverageFrom: [
    '<rootDir>/index.js', // until this file is finally moved into ./src some day (breaking change)!
    '<rootDir>/src/**/[^.]*.{js,jsx,ts,tsx}', // ignore .files like .eslintrc.js with `/[^.]` in this glob pattern
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__fixtures__/',
    '/__mocks__/',
    '/__tests__/',
  ],
};
