import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import RefreshLookupButton from './RefreshLookupButton'

const meta: Meta<typeof RefreshLookupButton> = {
  title: 'Components/VehicleResults/VehicleResult/Header/RefreshLookupButton',
  component: RefreshLookupButton,
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="vehicles">
              <div className="vehicle card">
                <div className="card-header">
                  {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                  <Story />
                </div>
              </div>
            </div>
          </div>
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

type Story = StoryObj<typeof RefreshLookupButton>

export const Default: Story = {
  args: {
    refreshLookupFunction: () => alert('this would have refreshed the lookup'),
  },
}

export default meta
