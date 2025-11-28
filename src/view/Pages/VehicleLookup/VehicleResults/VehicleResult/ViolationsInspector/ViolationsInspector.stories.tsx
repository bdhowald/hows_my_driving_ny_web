import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect } from '@storybook/test'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { ViolationFactory } from '__fixtures__/models/Violation'
import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator'

import ViolationsInspector from './ViolationsInspector'

const meta: Meta<typeof ViolationsInspector> = {
  title: 'Components/VehicleResults/VehicleResult/ViolationsInspector',
  component: ViolationsInspector,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof ViolationsInspector>

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

export const NoViolationsNewStyleDisplay: Story = {
  args: {
    showViolationsList: true,
    useNewStyleView: true,
    vehicle: VehicleFactory.build({
      violations: [],
      violationsCount: 0,
    }),
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
  parameters: {
    viewport: { defaultViewport: 'mobile2' },
  },
}
export const NoViolationsOldStyleDisplay: Story = {
  args: {
    showViolationsList: true,
    useNewStyleView: false,
    vehicle: VehicleFactory.build({
      violations: [],
      violationsCount: 0,
    }),
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
  parameters: {
    viewport: { defaultViewport: 'mobile2' },
  },
}

export const AtLeastOneViolationNewStyleDisplay: Story = {
  args: {
    showViolationsList: true,
    useNewStyleView: true,
    vehicle: VehicleFactory.build({
      violations: violationsWithFines,
      violationsCount: violationsWithFines.length,
    }),
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
  parameters: {
    viewport: { defaultViewport: 'mobile2' },
  },
}
export const AtLeastOneViolationWithViolationIconsAndSummaryFinesOldStyleDisplay: Story =
  {
    args: {
      showViolationsList: true,
      useNewStyleView: false,
      vehicle: VehicleFactory.build({
        violations: violationsWithFines,
        violationsCount: violationsWithFines.length,
      }),
    },
    decorators: [oldStyleDisplayDecorator(ParentHtml)],
    parameters: {
      viewport: { defaultViewport: 'mobile2' },
    },
  }
export const AtLeastOneViolationWithFullViolationTextAndSummaryFinesOldStyleDisplay: Story =
  {
    args: {
      showViolationsList: true,
      useNewStyleView: false,
      vehicle: VehicleFactory.build({
        violations: violationsWithFines,
        violationsCount: violationsWithFines.length,
      }),
    },
    decorators: [oldStyleDisplayDecorator(ParentHtml)],
    parameters: {
      viewport: { defaultViewport: 'tablet' },
    },
  }
export const AtLeastOneViolationWithViolationIconsAndFullFinesOldStyleDisplay: Story =
  {
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement)

      await userEvent.click(canvas.getByText('show fines details'))

      await expect(canvas.getByText('show fines summary')).toBeInTheDocument()
    },
    args: {
      showViolationsList: true,
      useNewStyleView: false,
      vehicle: VehicleFactory.build({
        violations: violationsWithFines,
        violationsCount: violationsWithFines.length,
      }),
    },
    decorators: [oldStyleDisplayDecorator(ParentHtml)],
    parameters: {
      viewport: { defaultViewport: 'mobile2' },
    },
  }
export const AtLeastOneViolationWithFullViolationTextAndFullFinesOldStyleDisplay: Story =
  {
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement)

      await userEvent.click(canvas.getByText('show fines details'))

      await expect(canvas.getByText('show fines summary')).toBeInTheDocument()
    },
    args: {
      showViolationsList: true,
      useNewStyleView: false,
      vehicle: VehicleFactory.build({
        violations: violationsWithFines,
        violationsCount: violationsWithFines.length,
      }),
    },
    decorators: [oldStyleDisplayDecorator(ParentHtml)],
    parameters: {
      viewport: { defaultViewport: 'tablet' },
    },
  }

export default meta
