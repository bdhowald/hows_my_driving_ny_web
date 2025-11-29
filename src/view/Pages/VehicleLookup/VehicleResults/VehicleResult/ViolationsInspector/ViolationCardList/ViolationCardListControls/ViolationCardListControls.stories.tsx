import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { newStyleDisplayDecorator } from 'tests/utils/withStyleDisplayDecorator/withStyleDisplayDecorator'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import ViolationCardListControls from './ViolationCardListControls'

const meta: Meta<typeof ViolationCardListControls> = {
  title:
    'Components/VehicleResults/VehicleResult/ViolationsInspector/ViolationCardList/ViolationCardListControls',
  component: ViolationCardListControls,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof ViolationCardListControls>

const ParentHtml = ({ children }: { children: ReactNode }) => (
  <div className="site-container-wrapper">
    <div className="site-container container-fluid">
      <main>
        <div className="row">
          <div className="col-md-12 vehicle-lookup-content-container new-style">
            <div className="vehicles new-style">
              <div className="vehicle card">
                <ul className="list-group-flush list-group">
                  <li className="list-group-item">
                    <div className="violation-card-list-wrapper">
                      {children}
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

const vehicleWithViolations = VehicleFactory.build()
const vehicleWithNoViolations = VehicleFactory.build({
  violations: [],
  violationsCount: 0,
})

const setViolationsListVisibilityFunction = () => null
const toggleShowFullFineDataFunction = () => null
const toggleShowFullLocationDataFunction = () => null

export const VehicleWithNoViolationsListVisible: Story = {
  args: {
    setViolationsListVisibilityFunction,
    vehicle: vehicleWithNoViolations,
    violationsListIsVisible: true,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}

export const VehicleWithViolationsListNotVisible: Story = {
  args: {
    setViolationsListVisibilityFunction,
    vehicle: vehicleWithViolations,
    violationsListIsVisible: false,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}

export const VehicleWithViolationsListVisibleFinesSummaryAndLocationSummary: Story =
  {
    args: {
      setViolationsListVisibilityFunction,
      showFullFineData: false,
      showFullLocationData: false,
      toggleShowFullFineDataFunction,
      toggleShowFullLocationDataFunction,
      vehicle: vehicleWithViolations,
      violationsListIsVisible: true,
    },
    decorators: [newStyleDisplayDecorator(ParentHtml)],
  }

export const VehicleWithViolationsListVisibleFinesDetailsAndLocationSummary: Story =
  {
    args: {
      setViolationsListVisibilityFunction,
      showFullFineData: true,
      showFullLocationData: false,
      toggleShowFullFineDataFunction,
      toggleShowFullLocationDataFunction,
      vehicle: vehicleWithViolations,
      violationsListIsVisible: true,
    },
    decorators: [newStyleDisplayDecorator(ParentHtml)],
  }

export const VehicleWithViolationsListVisibleFinesSummaryAndLocationDetails: Story =
  {
    args: {
      setViolationsListVisibilityFunction,
      showFullFineData: false,
      showFullLocationData: true,
      toggleShowFullFineDataFunction,
      toggleShowFullLocationDataFunction,
      vehicle: vehicleWithViolations,
      violationsListIsVisible: true,
    },
    decorators: [newStyleDisplayDecorator(ParentHtml)],
  }

export const VehicleWithViolationsListVisibleFinesDetailsAndLocationDetails: Story =
  {
    args: {
      setViolationsListVisibilityFunction,
      showFullFineData: true,
      showFullLocationData: true,
      toggleShowFullFineDataFunction,
      toggleShowFullLocationDataFunction,
      vehicle: vehicleWithViolations,
      violationsListIsVisible: true,
    },
    decorators: [newStyleDisplayDecorator(ParentHtml)],
  }

export default meta
