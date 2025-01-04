import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect } from '@storybook/test'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { ViolationFactory } from '__fixtures__/models/Violation'

import ViolationsInspector from './ViolationsInspector'

const meta: Meta<typeof ViolationsInspector> = {
  title: 'Components/VehicleResults/ViolationsInspector',
  component: ViolationsInspector,
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="vehicles">
              <div className="vehicle card">
                <ul className="list-group-flush list-group">
                  {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                  <Story />
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

type Story = StoryObj<typeof ViolationsInspector>

const violationsWithFines = [
  ViolationFactory.build({
    amountDue: 77,
    fineAmount: 50,
    formattedTime: '2021-02-17T14:11:00.000-04:00',
    humanizedDescription: 'School Zone Speed Camera Violation',
    interestAmount: 12.69,
    location: 'Victory Blvd. @ Eddy St.',
    paymentAmount: 10,
    penaltyAmount: 25,
    reductionAmount: 0.69,
    violationCode: '36',
    violationCounty: 'Staten Island',
  }),
  ViolationFactory.build({
    formattedTime: '2018-04-26T14:11:00.000-04:00',
  }),
]

export const NoViolations: Story = {
  args: {
    showViolationsList: true,
    vehicle: VehicleFactory.build({
      violations: [],
      violationsCount: 0,
    }),
  },
  parameters: {
    viewport: { defaultViewport: 'mobile2' },
  },
}
export const AtLeastOneViolationWithViolationIconsAndSummaryFines: Story = {
  args: {
    showViolationsList: true,
    vehicle: VehicleFactory.build({
      violations: violationsWithFines,
      violationsCount: violationsWithFines.length,
    }),
  },
  parameters: {
    viewport: { defaultViewport: 'mobile2' },
  },
}
export const AtLeastOneViolatioWithFullViolationTextAndSummaryFines: Story = {
  args: {
    showViolationsList: true,
    vehicle: VehicleFactory.build({
      violations: violationsWithFines,
      violationsCount: violationsWithFines.length,
    }),
  },
  parameters: {
    viewport: { defaultViewport: 'tablet' },
  },
}
export const AtLeastOneViolationWithViolationIconsAndFullFines: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByText('show fines details'))

    await expect(canvas.getByText('show fines summary')).toBeInTheDocument()
  },
  args: {
    showViolationsList: true,
    vehicle: VehicleFactory.build({
      violations: violationsWithFines,
      violationsCount: violationsWithFines.length,
    }),
  },
  parameters: {
    viewport: { defaultViewport: 'mobile2' },
  },
}
export const AtLeastOneViolationWithFullViolationTextAndFullFines: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByText('show fines details'))

    await expect(canvas.getByText('show fines summary')).toBeInTheDocument()
  },
  args: {
    showViolationsList: true,
    vehicle: VehicleFactory.build({
      violations: violationsWithFines,
      violationsCount: violationsWithFines.length,
    }),
  },
  parameters: {
    viewport: { defaultViewport: 'tablet' },
  },
}

export default meta
