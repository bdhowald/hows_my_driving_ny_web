import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import type { Meta, StoryObj } from '@storybook/react'

import SiteContainer from './SiteContainer'

const meta: Meta<typeof SiteContainer> = {
  title: 'Components/SiteContainer',
  component: SiteContainer,
  decorators: [
    (Story) => (
      <MemoryRouter>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </MemoryRouter>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof SiteContainer>

export const DefaultSiteContainer: Story = {}

export default meta
