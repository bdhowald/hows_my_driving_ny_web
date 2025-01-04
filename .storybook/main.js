import path from 'path'

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  webpackFinal: async (config) => {
    config.resolve.modules.push(path.resolve(__dirname, '../src'))
    config.resolve.alias = {
      react: path.resolve('node_modules/react'),
    }

    return config
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  staticDirs: ['../public'],
}
export default config
