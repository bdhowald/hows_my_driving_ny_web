import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator'

import VehicleResult from './VehicleResult'

const meta: Meta<typeof VehicleResult> = {
  title: 'Components/VehicleResults/VehicleResult',
  component: VehicleResult,
  args: {
    refreshLookupFunction: () => Promise.resolve(),
    removeLookupFunction: () => null,
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof VehicleResult>

const vehicleDisplayResult = {
  expandResults: false,
  fromPreviousLookupUniqueIdentifier: false,
  isSuccessfulLookup: true,
  vehicle: VehicleFactory.build(),
} as const

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
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export const VehicleResultViolationsListHiddenNewStyleDisplay: Story = {
  args: {
    showViolationsList: false,
    vehicleDisplayResult,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const VehicleResultViolationsListHiddenOldStyleDisplay: Story = {
  args: {
    showViolationsList: false,
    vehicleDisplayResult,
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const VehicleResultViolationsListIsVisibleNewStyleDisplay: Story = {
  args: {
    showViolationsList: true,
    vehicleDisplayResult,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const VehicleResultViolationsListIsVisibleOldStyleDisplay: Story = {
  args: {
    showViolationsList: true,
    vehicleDisplayResult,
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const VehicleResultNoViolationsNewStyleDisplay: Story = {
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
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const VehicleResultNoViolationsOldStyleDisplay: Story = {
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
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export default meta
