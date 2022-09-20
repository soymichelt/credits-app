module.exports = {
  collectCoverageFrom: ['<rootDir>/src/***/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      isolatedModules: true
    },
  },
  moduleFileExtensions: [ "ts", "js" ],
  moduleNameMapper: {
    '@/(.*)$': ['<rootDir>/src/$1']
  },
  roots: [ '<rootDir>/src', '<rootDir>/tests' ],
  testEnvironment: 'node',
  testMatch: [ '**/__tests__/**/*.+(ts)', '**/?(*.)+(spec|test).+(ts)' ],
};