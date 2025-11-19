import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Search from './Search'

const meta: Meta<typeof Search> = {
  title: 'Components/Search/Search',
  component: Search,
  args: {
    setExistingQueriesInFlightFunction: () => null,
    setQueriedVehiclesFunction: () => null,
    setSearchErrorFunction: () => null,
  },

  decorators: [
    (Story) => (
      <div className="site-container-wrapper">
        <div className="site-container container-fluid">
          <main>
            <div className="row">
              {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
              <Story />
            </div>
          </main>
        </div>
      </div>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof Search>

export const SearchAtPageLoad: Story = {
  args: {
    lookupInFlight: true,
    queriedVehicles: [],
  },
}

export default meta
