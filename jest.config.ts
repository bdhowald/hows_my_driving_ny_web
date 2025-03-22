import type { Config } from 'jest'

export default async (): Promise<Config> => {
  return {
    resetModules: true,
    setupFiles: ['<rootDir>/src/setupTests.js'],
    verbose: true,
  }
}
