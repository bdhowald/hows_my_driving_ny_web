import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import SearchControls from './SearchControls'

const meta: Meta<typeof SearchControls> = {
  title: 'Components/Search/SearchControls',
  component: SearchControls,
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
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

type Story = StoryObj<typeof SearchControls>

const handleInputChange = () =>
  alert('this function would handle a change to the form element')
const handleSubmit = () => alert('this function would submit the form')

export const NoPlateEntered: Story = {
  args: {
    currentLookup: {
      plateId: undefined,
      plateType: undefined,
      state: 'NY',
    },
    handleInputChange,
    handleSubmit,
    lookupInFlight: false,
  },
}
export const NoLookupInFlightWithPlateEntered: Story = {
  args: {
    currentLookup: {
      plateId: 'ABC1234',
      plateType: undefined,
      state: 'NY',
    },
    handleInputChange,
    handleSubmit,
    lookupInFlight: false,
  },
}
export const PlateTypeSelected: Story = {
  args: {
    currentLookup: {
      plateId: 'ABC1234',
      plateType: 'commercial',
      state: 'NY',
    },
    handleInputChange,
    handleSubmit,
    lookupInFlight: false,
  },
}
export const LookupInFlight: Story = {
  args: {
    currentLookup: {
      plateId: 'ABC1234',
      plateType: undefined,
      state: 'NY',
    },
    handleInputChange,
    handleSubmit,
    lookupInFlight: true,
  },
}

export default meta
