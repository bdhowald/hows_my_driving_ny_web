import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import ViolationCardListControls from './ViolationCardListControls'

const meta: Meta<typeof ViolationCardListControls> = {
  title:
    'Components/VehicleResults/ViolationsInspector/ViolationCardList/ViolationCardListControls',
  component: ViolationCardListControls,
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="vehicles">
              <div className="vehicle card">
                <ul className="list-group-flush list-group">
                  <li className="list-group-item">
                    <div className="violation-card-list-wrapper">
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

type Story = StoryObj<typeof ViolationCardListControls>

const vehicleWithViolations = VehicleFactory.build()
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
