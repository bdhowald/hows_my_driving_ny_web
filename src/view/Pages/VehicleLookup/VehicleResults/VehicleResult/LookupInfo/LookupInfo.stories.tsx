import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import LookupInfo from './LookupInfo'

const meta: Meta<typeof LookupInfo> = {
  title: 'Components/VehicleResults/VehicleResult/LookupInfo',
  component: LookupInfo,
  decorators: [
    (Story) => (
      <div className="site-container-wrapper">
        <div className="site-container container-fluid">
          <main>
            <div className="row">
              <div className="col-md-12 vehicle-lookup-content-container">
                <div className="vehicles">
                  <div className="vehicle card">
                    <ul className="list-group-flush list-group">
                      {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                      <Story />
                    </ul>
                  </div>
                </div>
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

type Story = StoryObj<typeof LookupInfo>

export const NoViolations: Story = {
  args: {
    vehicle: VehicleFactory.build({
      previousLookupDate: '2023-07-12T13:17:54.000Z',
      violations: [],
      violationsCount: 0,
    }),
  },
}
export const NoPreviousLookups: Story = {
  args: {
    vehicle: VehicleFactory.build(),
  },
}
export const ViolationsAndAPreviousLookup: Story = {
  args: {
    vehicle: VehicleFactory.build({
      previousLookupDate: '2023-07-12T13:17:54.000Z',
      previousViolationCount: 3,
    }),
  },
}
export const NewViolationsSincePreviousLookup: Story = {
  args: {
    vehicle: VehicleFactory.build({
      previousLookupDate: '2023-07-12T13:17:54.000Z',
      previousViolationCount: 2,
    }),
  },
}

export default meta
