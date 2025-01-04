import type { Config } from 'jest'

export default async (): Promise<Config> => {
  return {
    resetModules: true,
    verbose: true,
  }
}
