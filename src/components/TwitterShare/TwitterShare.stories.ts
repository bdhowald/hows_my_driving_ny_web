import { fn } from '@storybook/test'

import TwitterShare from './TwitterShare'

export default {
  title: 'Components/TwitterShare',
  component: TwitterShare,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
}

export const ReadyToShare = {
  args: {
    vehicle: {
      state: 'NY',
      plate: 'ABC1234',
      violationsCount: 123,
      uniqueIdentifier: 'a1b2c3d4',
    },
  },
}
