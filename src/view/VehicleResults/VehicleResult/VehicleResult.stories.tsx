import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import VehicleResult from './VehicleResult'

const meta: Meta<typeof VehicleResult> = {
  title: 'Components/VehicleResults/VehicleResult',
  component: VehicleResult,
  args: {
    refreshLookupFunction: () => Promise.resolve(),
    removeLookupFunction: () => null,
  },
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="vehicles">
              {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
              <Story />
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

type Story = StoryObj<typeof VehicleResult>

const vehicle = VehicleFactory.build()

const vehicleDisplayResult = {
  expandResults: false,
  fromPreviousLookupUniqueIdentifier: false,
  isSuccessfulLookup: true,
  vehicle: VehicleFactory.build(),
} as const

export const VehicleResultViolationsListHidden: Story = {
  args: {
    showViolationsList: false,
    vehicleDisplayResult,
  },
}
export const VehicleResultViolationsListIsVisible: Story = {
  args: {
    showViolationsList: true,
    vehicleDisplayResult,
  },
}
export const VehicleResultNoViolations: Story = {
  args: {
    showViolationsList: true,
    vehicleDisplayResult: {
      ...vehicleDisplayResult,
      ...{
        vehicle: VehicleFactory.build({
          violations: [],
          violationsCount: 0,
        }),
      },
    },
  },
}

export default meta
