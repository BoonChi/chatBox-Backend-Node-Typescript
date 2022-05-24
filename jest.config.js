/* eslint-disable */
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.(t|j)s'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/mock/',
    '<rootDir>/src/main.ts',
    '.module.ts$',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  modulePathIgnorePatterns: [
    '<rootDir>/dist',
    '<rootDir>/coverage',
    '<rootDir>/test',
    '<rootDir>/src/mock',
    '<rootDir>/src/config',
    '<rootDir>/src/database',
    '<rootDir>/src/graphql',
    '<rootDir>/src/migration',
  ],
};
