import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { ViolationFactory } from '__fixtures__/models/Violation'

import ViolationsListControls from './ViolationsListControls'

const meta: Meta<typeof ViolationsListControls> = {
  title:
    'Components/VehicleResults/VehicleResult/ViolationsInspector/ViolationsListControls',
  component: ViolationsListControls,
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
                          {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                          <Story />
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

type Story = StoryObj<typeof ViolationsListControls>

const setShowFullFineDataFunction = () => null
const setShowFullViolationTextFunction = () => null
const setViolationsListVisibilityFunction = () => null

export const NoViolations: Story = {
  args: {
    setShowFullFineDataFunction,
    setShowFullViolationTextFunction,
    setViolationsListVisibilityFunction,
    vehicle: VehicleFactory.build({
      violations: [],
      violationsCount: 0,
    }),
  },
}
export const ListHiddenWithAtLeastOneViolation: Story = {
  args: {
    setShowFullFineDataFunction,
    setShowFullViolationTextFunction,
    setViolationsListVisibilityFunction,
    vehicle: VehicleFactory.build({
      violations: [ViolationFactory.build()],
      violationsCount: 1,
    }),
  },
}
export const ListVisibleWithViolationIconsAndSummaryFines: Story = {
  args: {
    setShowFullFineDataFunction,
    setShowFullViolationTextFunction,
    setViolationsListVisibilityFunction,
    vehicle: VehicleFactory.build({
      violations: [ViolationFactory.build()],
      violationsCount: 1,
    }),
    violationsListIsVisible: true,
  },
}
export const ListVisibleWithViolationIconsAndFullFines: Story = {
  args: {
    setShowFullFineDataFunction,
    setShowFullViolationTextFunction,
    setViolationsListVisibilityFunction,
    showFullFineData: true,
    vehicle: VehicleFactory.build({
      violations: [ViolationFactory.build()],
      violationsCount: 1,
    }),
    violationsListIsVisible: true,
  },
}
export const ListVisibleWithFullViolationTextAndSummaryFines: Story = {
  args: {
    setShowFullFineDataFunction,
    setShowFullViolationTextFunction,
    setViolationsListVisibilityFunction,
    showFullViolationText: true,
    vehicle: VehicleFactory.build({
      violations: [ViolationFactory.build()],
      violationsCount: 1,
    }),
    violationsListIsVisible: true,
  },
}
export const ListVisibleWithFullViolationTextAndFullFines: Story = {
  args: {
    setShowFullFineDataFunction,
    setShowFullViolationTextFunction,
    setViolationsListVisibilityFunction,
    showFullFineData: true,
    showFullViolationText: true,
    vehicle: VehicleFactory.build({
      violations: [ViolationFactory.build()],
      violationsCount: 1,
    }),
    violationsListIsVisible: true,
  },
}

export default meta
