module.exports = {
  globals: {
    NODE_ENV: 'test',
  },
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
  roots: ['<rootDir>/src'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};
