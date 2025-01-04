import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import VehicleResults from './VehicleResults'

const meta: Meta<typeof VehicleResults> = {
  title: 'Components/VehicleResults/VehicleResults',
  component: VehicleResults,
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
            <Story />
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

type Story = StoryObj<typeof VehicleResults>

const removeLookupFunction = () =>
  alert('this would have removed the lookup from the screen')

export const LookupInFlight: Story = {
  args: {
    lookupInFlight: true,
    removeLookupFunction,
    vehicleDisplayResults: [],
  },
}

export const ResultsWithViolationsListVisible: Story = {
  args: {
    lookupInFlight: false,
    removeLookupFunction,
    vehicleDisplayResults: [
      {
        expandResults: true,
        fromPreviousLookupUniqueIdentifier: false,
        vehicle: VehicleFactory.build(),
      },
    ],
  },
}

export const ResultsWithViolationsListHidden: Story = {
  args: {
    lookupInFlight: false,
    removeLookupFunction,
    vehicleDisplayResults: [
      {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        vehicle: VehicleFactory.build(),
      },
    ],
  },
}

export const ResultsWithMultipleVehicles: Story = {
  args: {
    lookupInFlight: false,
    removeLookupFunction,
    vehicleDisplayResults: [
      {
        expandResults: true,
        fromPreviousLookupUniqueIdentifier: false,
        vehicle: VehicleFactory.build(),
      },
      {
        expandResults: true,
        fromPreviousLookupUniqueIdentifier: false,
        vehicle: VehicleFactory.build(),
      },
    ],
  },
}

export default meta
