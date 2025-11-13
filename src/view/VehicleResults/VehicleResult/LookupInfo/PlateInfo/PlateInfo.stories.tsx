import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import PlateInfo from './PlateInfo'

const meta: Meta<typeof PlateInfo> = {
  title: 'Components/VehicleResults/VehicleResult/LookupInfo/PlateInfo',
  component: PlateInfo,
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 page-content-container">
            <div className="vehicles">
              <div className="vehicle card">
                <ul className="list-group-flush list-group">
                  <li className="no-padding list-group-item">
                    <div className="row">
                      <div className="summary-section col-xs-12 col-sm-6">
                        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it */}
                        <Story />
                      </div>
                    </div>
                  </li>
                </ul>
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

type Story = StoryObj<typeof PlateInfo>

export const HasPlateTypes: Story = {
  args: {
    vehicle: VehicleFactory.build({ plateTypes: ['NYS'] }),
  },
}
export const HasPreviousLookups: Story = {
  args: {
    vehicle: VehicleFactory.build({
      previousLookupDate: '2023-07-12T13:17:54.000Z',
      previousViolationCount: 1,
      timesQueried: 2,
    }),
  },
}
export const NoPlateTypes: Story = {
  args: {
    vehicle: VehicleFactory.build(),
  },
}
export const NoPreviousLookups: Story = {
  args: {
    vehicle: VehicleFactory.build({ timesQueried: 1 }),
  },
}
export const QueriedRecently: Story = {
  args: {
    vehicle: VehicleFactory.build({
      lookupDate: new Date().toISOString(),
    }),
  },
}

export default meta
