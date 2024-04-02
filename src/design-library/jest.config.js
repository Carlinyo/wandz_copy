const path = require('path');

module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  moduleFileExtensions: ['js', 'ts', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
  },
  transform: {},
  testPathIgnorePatterns: [
    // '<rootDir>/tests/unit/specs/health-check/health-check.spec.js',
  ],
  verbose: true,
  coverageDirectory: path.resolve(__dirname, 'jest-stare', 'coverage'),
  collectCoverage: true,
  reporters: ['default', ['jest-junit', { outputDirectory: '<rootDir>/tests/output/unit' }]],
  coverageReporters: ['text', 'cobertura', 'json'],
  coverageDirectory: '<rootDir>/tests/output/unit/coverage',
  collectCoverageFrom: ['src/**/*.{js,vue}', '!**/node_modules/**'],
};
