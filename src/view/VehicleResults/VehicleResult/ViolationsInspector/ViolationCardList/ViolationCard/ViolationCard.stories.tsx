import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { ViolationFactory } from '__fixtures__/models/Violation'

import ViolationCard from './ViolationCard'

const meta: Meta<typeof ViolationCard> = {
  title:
    'Components/VehicleResults/VehicleResult/ViolationsInspector/ViolationCardList/ViolationCard',
  component: ViolationCard,
  args: {
    inspectViolationFunction: () => null,
  },
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 page-content-container">
            <div className="vehicles">
              <div className="vehicle card">
                <ul className="list-group-flush list-group">
                  <li className="list-group-item">
                    <div className="violation-card-list-wrapper">
                      <div className="violation-card-list">
                        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                        <Story />
                      </div>
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

type Story = StoryObj<typeof ViolationCard>

const fineData = {
  amountDue: 15,
  fineAmount: 65,
  interestAmount: 0.69,
  paymentAmount: 75,
  penaltyAmount: 25,
  reductionAmount: 0.69,
}

export const Default: Story = {
  args: {
    violation: ViolationFactory.build(fineData),
  },
}

export const NoBoroughData: Story = {
  args: {
    violation: ViolationFactory.build({
      ...fineData,
      getBorough: () => 'No Borough Available',
    }),
  },
}

export const FullFineData: Story = {
  args: {
    showFullFineData: true,
    violation: ViolationFactory.build(fineData),
  },
}

export const FullLocationData: Story = {
  args: {
    showFullLocationData: true,
    violation: ViolationFactory.build(fineData),
  },
}

export const FullFineAndLocationData: Story = {
  args: {
    showFullFineData: true,
    showFullLocationData: true,
    violation: ViolationFactory.build(fineData),
  },
}

export const NoDateTime: Story = {
  args: {
    violation: ViolationFactory.build({
      ...fineData,
      getViolationDateTime: () => 'N/A',
    }),
  },
}

export const NoFineData: Story = {
  args: {
    violation: ViolationFactory.build(),
  },
}

export const NoViolationDescription: Story = {
  args: {
    violation: ViolationFactory.build({
      ...fineData,
      humanizedDescription: undefined,
    }),
  },
}

export default meta
