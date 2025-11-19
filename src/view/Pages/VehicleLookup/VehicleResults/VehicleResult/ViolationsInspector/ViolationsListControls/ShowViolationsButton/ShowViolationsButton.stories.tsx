import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { ViolationFactory } from '__fixtures__/models/Violation'

import ShowViolationsButton from './ShowViolationsButton'

const meta: Meta<typeof ShowViolationsButton> = {
  title:
    'Components/VehicleResults/VehicleResult/ViolationsInspector/ViolationsListControls/ShowViolationsButton',
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
                        <div className="violations-table-wrapper">
                          <div className="violations-table-header">
                            <div className="row">
                              {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                              <Story />
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

const setViolationsListVisibilityFunction = () => null

export const ListVisibleWithNoViolations: Story = {
  args: {
    setViolationsListVisibilityFunction,
    vehicle: VehicleFactory.build({
      violations: [],
      violationsCount: 0,
    }),
    violationsListIsVisible: true,
  },
}
export const ListVisibleWithOneViolation: Story = {
  args: {
    setViolationsListVisibilityFunction,
    vehicle: VehicleFactory.build({
      violations: [ViolationFactory.build()],
      violationsCount: 1,
    }),
    violationsListIsVisible: true,
  },
}
export const ListVisibleWithMultipleViolations: Story = {
  args: {
    setViolationsListVisibilityFunction,
    vehicle: VehicleFactory.build({
      violations: [ViolationFactory.build(), ViolationFactory.build()],
      violationsCount: 2,
    }),
    violationsListIsVisible: true,
  },
}
export const ListNotVisibleWithNoViolations: Story = {
  args: {
    setViolationsListVisibilityFunction,
    vehicle: VehicleFactory.build({
      violations: [],
      violationsCount: 0,
    }),
    violationsListIsVisible: false,
  },
}
export const ListNotVisibleWithOneViolation: Story = {
  args: {
    setViolationsListVisibilityFunction,
    vehicle: VehicleFactory.build({
      violations: [ViolationFactory.build()],
      violationsCount: 1,
    }),
    violationsListIsVisible: false,
  },
}
export const ListNotVisibleWithMultipleViolations: Story = {
  args: {
    setViolationsListVisibilityFunction,
    vehicle: VehicleFactory.build({
      violations: [ViolationFactory.build(), ViolationFactory.build()],
      violationsCount: 2,
    }),
    violationsListIsVisible: false,
  },
}

export default meta
