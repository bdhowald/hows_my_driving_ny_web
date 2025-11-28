import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator'

import VehicleResults from './VehicleResults'

const meta: Meta<typeof VehicleResults> = {
  title: 'Components/VehicleResults/VehicleResults',
  component: VehicleResults,
  decorators: [
    (Story) => (
      <div className="site-container-wrapper">
        <div className="site-container container-fluid">
          <main>
            <div className="row">
              <div className="col-md-12 vehicle-lookup-content-container">
                {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                <Story />
              </div>
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

type Story = StoryObj<typeof VehicleResults>

const ParentHtml = ({
  children,
  useNewStyleDisplay,
}: {
  children: ReactNode
  useNewStyleDisplay: boolean
}) => {
  const newStyleDisplayClassName = useNewStyleDisplay ? 'new-style' : ''

  return (
    <div className="site-container-wrapper">
      <div className="site-container container-fluid">
        <main>
          <div className="row">
            <div
              className={`col-md-12 vehicle-lookup-content-container ${newStyleDisplayClassName}`}
            >
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

const removeLookupFunction = () =>
  alert('this would have removed the lookup from the screen')

export const LookupInFlightNewStyleDisplay: Story = {
  args: {
    lookupInFlight: true,
    removeLookupFunction,
    vehicleDisplayResults: [],
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const LookupInFlightOldStyleDisplay: Story = {
  args: {
    lookupInFlight: true,
    removeLookupFunction,
    vehicleDisplayResults: [],
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const ResultsWithViolationsListVisibleNewStyleDisplay: Story = {
  args: {
    lookupInFlight: false,
    removeLookupFunction,
    vehicleDisplayResults: [
      {
        expandResults: true,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle: VehicleFactory.build(),
      },
    ],
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const ResultsWithViolationsListVisibleOldStyleDisplay: Story = {
  args: {
    lookupInFlight: false,
    removeLookupFunction,
    vehicleDisplayResults: [
      {
        expandResults: true,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle: VehicleFactory.build(),
      },
    ],
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const ResultsWithViolationsListHiddenNewStyleDisplay: Story = {
  args: {
    lookupInFlight: false,
    removeLookupFunction,
    vehicleDisplayResults: [
      {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle: VehicleFactory.build(),
      },
    ],
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const ResultsWithViolationsListHiddenOldStyleDisplay: Story = {
  args: {
    lookupInFlight: false,
    removeLookupFunction,
    vehicleDisplayResults: [
      {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle: VehicleFactory.build(),
      },
    ],
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const ResultsWithMultipleVehiclesNewStyleDisplay: Story = {
  args: {
    lookupInFlight: false,
    removeLookupFunction,
    vehicleDisplayResults: [
      {
        expandResults: true,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle: VehicleFactory.build({
          plate: 'ABC1234',
          state: 'NY',
        }),
      },
      {
        expandResults: true,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle: VehicleFactory.build({
          plate: 'DEF5678',
          state: 'NY',
        }),
      },
    ],
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const ResultsWithMultipleVehiclesOldStyleDisplay: Story = {
  args: {
    lookupInFlight: false,
    removeLookupFunction,
    vehicleDisplayResults: [
      {
        expandResults: true,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle: VehicleFactory.build({
          plate: 'ABC1234',
          state: 'NY',
        }),
      },
      {
        expandResults: true,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle: VehicleFactory.build({
          plate: 'DEF5678',
          state: 'NY',
        }),
      },
    ],
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export default meta
