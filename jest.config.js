module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  verbose: true,
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
  },
};
