import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import ShowViolationsButton from './ShowViolationsButton'

const meta: Meta<typeof ShowViolationsButton> = {
  title:
    'Components/VehicleResults/VehicleResult/ViolationsInspector/ViolationCardList/ViolationCardListControls/ShowViolationsButton',
  component: ShowViolationsButton,
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
                      <li className="list-group-item">
                        <div className="violation-card-list-wrapper">
                          <div className="violation-card-list-controls">
                            <div className="row">
                              <div className="d-grid gap-2">
                                {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                                <Story />
                              </div>
                            </div>
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
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof ShowViolationsButton>

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
