import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { ViolationFactory } from '__fixtures__/models/Violation'

import ViolationCardList from './ViolationCardList'

const meta: Meta<typeof ViolationCardList> = {
  title: 'Components/VehicleResults/ViolationsInspector',
  component: ViolationCardList,
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="vehicles">
              <div className="vehicle card">
                <ul className="list-group-flush list-group">
                  <li className="list-group-item">
                    <div
                      className="violation-card-list-wrapper"
                      style={{ width: '100%' }}
                    >
                      {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                      <Story />
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

type Story = StoryObj<typeof ViolationCardList>

const vehicleWithViolations = VehicleFactory.build()
const vehicleWithOneViolation = VehicleFactory.build({
  violations: [ViolationFactory.build()],
  violationsCount: 1,
})
const vehicleWithNoViolations = VehicleFactory.build({
  violations: [],
  violationsCount: 0,
})

const setViolationsListVisibilityFunction = () => null

export const VehicleWithViolationsListVisible: Story = {
  args: {
    setViolationsListVisibilityFunction,
    vehicle: vehicleWithViolations,
    violationsListIsVisible: true,
  },
}

export const VehicleWithViolationsListVisibleAndOnlyOneViolation: Story = {
  args: {
    setViolationsListVisibilityFunction,
    vehicle: vehicleWithOneViolation,
    violationsListIsVisible: true,
  },
}

export const VehicleWithViolationsListNotVisible: Story = {
  args: {
    setViolationsListVisibilityFunction,
    vehicle: vehicleWithViolations,
    violationsListIsVisible: false,
  },
}

export const VehicleWithNoViolationsListVisible: Story = {
  args: {
    setViolationsListVisibilityFunction,
    vehicle: vehicleWithNoViolations,
    violationsListIsVisible: true,
  },
}

export default meta
