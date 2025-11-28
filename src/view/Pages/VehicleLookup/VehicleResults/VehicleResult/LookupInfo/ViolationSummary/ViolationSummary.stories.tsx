import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator'

import ViolationSummary from './ViolationSummary'

const meta: Meta<typeof ViolationSummary> = {
  title: 'Components/VehicleResults/VehicleResult/LookupInfo/ViolationSummary',
  component: ViolationSummary,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof ViolationSummary>

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

export const NoViolationsNewStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build({
      previousLookupDate: '2023-07-12T13:17:54.000Z',
      violations: [],
      violationsCount: 0,
    }),
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const NoViolationsOldStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build({
      previousLookupDate: '2023-07-12T13:17:54.000Z',
      violations: [],
      violationsCount: 0,
    }),
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const ViolationsNewStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build(),
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const ViolationsOldStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build(),
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const NewViolationsSincePreviousLookupNewStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build({
      previousLookupDate: '2023-07-12T13:17:54.000Z',
      previousViolationCount: 2,
      violationsCount: 3,
    }),
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const NewViolationsSincePreviousLookupOldStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build({
      previousLookupDate: '2023-07-12T13:17:54.000Z',
      previousViolationCount: 2,
      violationsCount: 3,
    }),
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export default meta
