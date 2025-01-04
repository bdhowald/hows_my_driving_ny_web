import * as React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import SingleViolationFinesBreakdown from './SingleViolationFinesBreakdown'

const meta: Meta<typeof SingleViolationFinesBreakdown> = {
  title:
    'Components/VehicleResults/FinesBreakdown/SingleViolationFinesBreakdown',
  component: SingleViolationFinesBreakdown,
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="vehicles">
              <div className="vehicle card">
                <ul className="list-group-flush list-group">
                  <li className="list-group-item">
                    <div className="violations-table-wrapper">
                      <div className="table-responsive violations-table-body-wrapper">
                        <table className="table table-striped table-sm violations-table">
                          <tbody>
                            <tr className="violation-row">
                              <td className="fines">
                                {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                                <Story />
                              </td>
                            </tr>
                          </tbody>
                        </table>
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

type Story = StoryObj<typeof SingleViolationFinesBreakdown>

export const NoFineData: Story = {
  args: {
    dueAmount: 0,
    fineAmount: 0,
    interestAmount: 0,
    isViolationInJudgment: false,
    paymentAmount: 0,
    penaltyAmount: 0,
    reductionAmount: 0,
    showFullFineData: true,
  },
}

export const FineOnly: Story = {
  args: {
    dueAmount: 50,
    fineAmount: 50,
    interestAmount: 0,
    isViolationInJudgment: false,
    paymentAmount: 0,
    penaltyAmount: 0,
    reductionAmount: 0,
    showFullFineData: true,
  },
}

export const FineAndAdditions: Story = {
  args: {
    dueAmount: 80,
    fineAmount: 50,
    interestAmount: 20,
    isViolationInJudgment: false,
    paymentAmount: 0,
    penaltyAmount: 10,
    reductionAmount: 0,
    showFullFineData: true,
  },
}

export const FineAndSubtractions: Story = {
  args: {
    dueAmount: 20,
    fineAmount: 50,
    interestAmount: 0,
    isViolationInJudgment: false,
    paymentAmount: 20,
    penaltyAmount: 0,
    reductionAmount: 10,
    showFullFineData: true,
  },
}

export const InJudgment: Story = {
  args: {
    dueAmount: 87.69,
    fineAmount: 50,
    interestAmount: 20,
    isViolationInJudgment: true,
    paymentAmount: 0,
    penaltyAmount: 17.69,
    reductionAmount: 0,
    showFullFineData: true,
  },
}

export const AllFields: Story = {
  args: {
    dueAmount: 70,
    fineAmount: 50,
    interestAmount: 20,
    isViolationInJudgment: false,
    paymentAmount: 10,
    penaltyAmount: 15,
    reductionAmount: 5,
    showFullFineData: true,
  },
}

export default meta
