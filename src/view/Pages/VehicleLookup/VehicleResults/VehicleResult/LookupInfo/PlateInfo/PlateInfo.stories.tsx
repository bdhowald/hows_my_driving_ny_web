import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator'

import PlateInfo from './PlateInfo'

const meta: Meta<typeof PlateInfo> = {
  title: 'Components/VehicleResults/VehicleResult/LookupInfo/PlateInfo',
  component: PlateInfo,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof PlateInfo>

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
              <div className={`vehicles ${newStyleDisplayClassName}`}>
                <div className="vehicle card">
                  <ul className="list-group-flush list-group">
                    <li className="no-padding list-group-item">
                      <div className="row">
                        <div className="summary-section col-xs-12 col-sm-6">
                          {children}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export const HasPlateTypesNewStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build({ plateTypes: ['NYS'] }),
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const HasPlateTypesOldStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build({ plateTypes: ['NYS'] }),
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const HasPreviousLookupsNewStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build({
      previousLookupDate: '2023-07-12T13:17:54.000Z',
      previousViolationCount: 1,
      timesQueried: 2,
    }),
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const HasPreviousLookupsOldStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build({
      previousLookupDate: '2023-07-12T13:17:54.000Z',
      previousViolationCount: 1,
      timesQueried: 2,
    }),
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const NoPlateTypesNewStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build(),
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const NoPlateTypesOldStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build(),
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const NoPreviousLookupsNewStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build({ timesQueried: 1 }),
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const NoPreviousLookupsOldStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build({ timesQueried: 1 }),
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const QueriedRecentlyNewStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build({
      lookupDate: new Date().toISOString(),
    }),
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const QueriedRecentlyOldStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build({
      lookupDate: new Date().toISOString(),
    }),
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export default meta
