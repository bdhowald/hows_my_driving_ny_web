import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import SearchButton from './SearchButton'

const meta: Meta<typeof SearchButton> = {
  title: 'Components/Search/SearchButton',
  component: SearchButton,
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 page-content-container">
            <div className="jumbotron">
              <div className="row">
                <form className="form">
                  <div className="form-row">
                    {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                    <Story />
                  </div>
                </form>
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

type Story = StoryObj<typeof SearchButton>

export const NoLookupInFlightAndNoPlateIdPresent: Story = {
  args: {
    lookupInFlight: false,
    plateIdPresent: false,
  },
}
export const LookupInFlightAndNoPlateIdPresent: Story = {
  args: {
    lookupInFlight: true,
    plateIdPresent: false,
  },
}
export const PlateIdPresentAndNoLookupInFlight: Story = {
  args: {
    lookupInFlight: false,
    plateIdPresent: true,
  },
}
export const PlateIdPresentAndLookupInFlight: Story = {
  args: {
    lookupInFlight: true,
    plateIdPresent: true,
  },
}

export default meta
