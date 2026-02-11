import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/app/**/*.ts',
  ],
  moduleNameMapper: {
    '^uuid$': '<rootDir>/src/test/doubles/__mocks__/uuid.ts'
  }
}

export default config;