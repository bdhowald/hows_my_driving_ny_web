import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  ViolationFactory,
  ViolationInJudgmentFactory,
} from '__fixtures__/models/Violation'

import Sort from 'constants/sortOptions'
import Violation from 'models/Violation/Violation'

import ViolationCardGroup from './ViolationCardGroup'

const meta: Meta<typeof ViolationCardGroup> = {
  title:
    'Components/VehicleResults/VehicleResult/ViolationsInspector/ViolationCardList/ViolationCardGroup',
  component: ViolationCardGroup,
  decorators: [
    (Story) => (
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
                          <div className="violation-card-list bg-body">
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

type Story = StoryObj<typeof ViolationCardGroup>

const showOffCanvasFunction = (_: Violation) => null

const violations = [
  ViolationInJudgmentFactory.build({
    amountDue: 87.69,
    fineAmount: 100,
    paymentAmount: 20,
    penaltyAmount: 7.69,
  }),
  ViolationFactory.build({
    amountDue: 105,
    fineAmount: 100,
    interestAmount: 10,
    paymentAmount: 20,
    penaltyAmount: 25,
    reductionAmount: 10,
  }),
  ViolationFactory.build(),
]

export const Default: Story = {
  args: {
    bucket: violations,
    bucketName: '2024',
    currentSortType: Sort.DATE,
    index: 'NY:ABC1234:-2024-date-true',
    showFullFineData: false,
    showFullLocationData: false,
    showOffCanvasFunction,
    sortAscending: true,
  },
}

export const ShowFullFineData: Story = {
  args: {
    bucket: violations,
    bucketName: '2024',
    currentSortType: Sort.DATE,
    index: 'NY:ABC1234:-2024-date-true',
    showFullFineData: true,
    showFullLocationData: false,
    showOffCanvasFunction,
    sortAscending: true,
  },
}

export const ShowFullLocationData: Story = {
  args: {
    bucket: violations,
    bucketName: '2024',
    currentSortType: Sort.DATE,
    index: 'NY:ABC1234:-2024-date-true',
    showFullFineData: false,
    showFullLocationData: true,
    showOffCanvasFunction,
    sortAscending: true,
  },
}

export const ShowFullFineAndLocationData: Story = {
  args: {
    bucket: violations,
    bucketName: '2024',
    currentSortType: Sort.DATE,
    index: 'NY:ABC1234:-2024-date-true',
    showFullFineData: true,
    showFullLocationData: true,
    showOffCanvasFunction,
    sortAscending: true,
  },
}

export default meta
