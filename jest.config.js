module.exports = {
  collectCoverageFrom: ['<rootDir>/src/***/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  moduleFileExtensions: [ "ts", "js" ],
  moduleNameMapper: {
    '@/(.*)$': ['<rootDir>/src/$1']
  },
  roots: [ '<rootDir>/src', '<rootDir>/tests' ],
  testEnvironment: 'node',
  testMatch: [ '**/__tests__/**/*.+(ts)', '**/?(*.)+(spec|test).+(ts)' ],
};