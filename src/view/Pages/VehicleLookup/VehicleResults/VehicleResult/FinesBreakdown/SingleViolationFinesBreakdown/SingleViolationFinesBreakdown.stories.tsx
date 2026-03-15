import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator/withStyleDisplayDecorator'

import SingleViolationFinesBreakdown from './SingleViolationFinesBreakdown'

const meta: Meta<typeof SingleViolationFinesBreakdown> = {
  title:
    'Components/VehicleResults/VehicleResult/FinesBreakdown/SingleViolationFinesBreakdown',
  component: SingleViolationFinesBreakdown,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof SingleViolationFinesBreakdown>

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
                  <ul className="list-group-flush list-group">
                    <li className="list-group-item no-padding">{children}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

const ViolationCardListParentHtml = ({
  children,
  useNewStyleDisplay,
}: {
  children: ReactNode
  useNewStyleDisplay: boolean
}) => (
  <ParentHtml useNewStyleDisplay={useNewStyleDisplay}>
    <div className="violation-card-list-wrapper">
      <div className="violation-card-list bg-body">
        <div className={'violation-card expanded-details'}>
          <div className="violation-card-row"></div>
          <div className="violation-card-row">{children}</div>
        </div>
      </div>
    </div>
  </ParentHtml>
)

const ViolationListParentHtml = ({
  children,
  useNewStyleDisplay,
}: {
  children: ReactNode
  useNewStyleDisplay: boolean
}) => (
  <ParentHtml useNewStyleDisplay={useNewStyleDisplay}>
    <div className="violations-table-wrapper">
      <div className="table-responsive violations-table-body-wrapper">
        <table className="table table-striped table-sm violations-table">
          <tbody>
            <tr className="violation-row">
              <td className="fines">{children}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </ParentHtml>
)

export const NoFineDataNewStyleDisplay: Story = {
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
  decorators: [newStyleDisplayDecorator(ViolationCardListParentHtml)],
}
export const NoFineDataOldStyleDisplay: Story = {
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
  decorators: [oldStyleDisplayDecorator(ViolationListParentHtml)],
}

export const FineOnlyNewStyleDisplay: Story = {
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
  decorators: [newStyleDisplayDecorator(ViolationCardListParentHtml)],
}
export const FineOnlyOldStyleDisplay: Story = {
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
  decorators: [oldStyleDisplayDecorator(ViolationListParentHtml)],
}

export const FineAndAdditionsNewStyleDisplay: Story = {
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
  decorators: [newStyleDisplayDecorator(ViolationCardListParentHtml)],
}
export const FineAndAdditionsOldStyleDisplay: Story = {
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
  decorators: [oldStyleDisplayDecorator(ViolationListParentHtml)],
}

export const FineAndSubtractionsNewStyleDisplay: Story = {
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
  decorators: [newStyleDisplayDecorator(ViolationCardListParentHtml)],
}
export const FineAndSubtractionsOldStyleDisplay: Story = {
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
  decorators: [oldStyleDisplayDecorator(ViolationListParentHtml)],
}

export const InJudgmentNewStyleDisplay: Story = {
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
  decorators: [newStyleDisplayDecorator(ViolationCardListParentHtml)],
}
export const InJudgmentOldStyleDisplay: Story = {
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
  decorators: [oldStyleDisplayDecorator(ViolationListParentHtml)],
}

export const AllFieldsNewStyleDisplay: Story = {
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
  decorators: [newStyleDisplayDecorator(ViolationCardListParentHtml)],
}
export const AllFieldsOldStyleDisplay: Story = {
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
  decorators: [oldStyleDisplayDecorator(ViolationListParentHtml)],
}

export default meta
