import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator/withStyleDisplayDecorator'

import LookupInfo from './LookupInfo'

const meta: Meta<typeof LookupInfo> = {
  title: 'Components/VehicleResults/VehicleResult/LookupInfo',
  component: LookupInfo,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof LookupInfo>

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
                  <ul className="list-group-flush list-group">{children}</ul>
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

export const NoPreviousLookupsNewStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build(),
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const NoPreviousLookupsOldStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build(),
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const ViolationsAndAPreviousLookupNewStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build({
      previousLookupDate: '2023-07-12T13:17:54.000Z',
      previousViolationCount: 3,
    }),
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const ViolationsAndAPreviousLookupOldStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build({
      previousLookupDate: '2023-07-12T13:17:54.000Z',
      previousViolationCount: 3,
    }),
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const NewViolationsSincePreviousLookupNewStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build({
      previousLookupDate: '2023-07-12T13:17:54.000Z',
      previousViolationCount: 2,
    }),
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const NewViolationsSincePreviousLookupOldStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build({
      previousLookupDate: '2023-07-12T13:17:54.000Z',
      previousViolationCount: 2,
    }),
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export default meta
