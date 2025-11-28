import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator'

import CombinedViolationsFinesBreakdown from './CombinedViolationsFinesBreakdown'

const meta: Meta<typeof CombinedViolationsFinesBreakdown> = {
  title:
    'Components/VehicleResults/VehicleResult/FinesBreakdown/CombinedViolationsFinesBreakdown',
  component: CombinedViolationsFinesBreakdown,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof CombinedViolationsFinesBreakdown>

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
    <div className="row new-style">
      <div className="summary-section new-style">{children}</div>
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
    <div className="row">
      <div className="summary-section col-xs-12 col-sm-6">{children}</div>
    </div>
  </ParentHtml>
)

export const FineDataIsMissingNewStyleDisplay: Story = {
  args: {
    totalFined: 0,
    totalInJudgment: 0,
    totalOutstanding: 0,
    totalPaid: 0,
    totalReduced: 0,
  },
  decorators: [newStyleDisplayDecorator(ViolationCardListParentHtml)],
}
export const FineDataIsMissingOldStyleDisplay: Story = {
  args: {
    totalFined: 0,
    totalInJudgment: 0,
    totalOutstanding: 0,
    totalPaid: 0,
    totalReduced: 0,
  },
  decorators: [oldStyleDisplayDecorator(ViolationListParentHtml)],
}

export const FineOnlyNewStyleDisplay: Story = {
  args: {
    totalFined: 200,
    totalInJudgment: 0,
    totalOutstanding: 0,
    totalPaid: 0,
    totalReduced: 0,
  },
  decorators: [newStyleDisplayDecorator(ViolationCardListParentHtml)],
}
export const FineOnlyOldStyleDisplay: Story = {
  args: {
    totalFined: 200,
    totalInJudgment: 0,
    totalOutstanding: 0,
    totalPaid: 0,
    totalReduced: 0,
  },
  decorators: [oldStyleDisplayDecorator(ViolationListParentHtml)],
}

export const FineAndSubtractionsNewStyleDisplay: Story = {
  args: {
    totalFined: 200,
    totalInJudgment: 0,
    totalOutstanding: 75,
    totalPaid: 50,
    totalReduced: 125,
  },
  decorators: [newStyleDisplayDecorator(ViolationCardListParentHtml)],
}
export const FineAndSubtractionsOldStyleDisplay: Story = {
  args: {
    totalFined: 200,
    totalInJudgment: 0,
    totalOutstanding: 75,
    totalPaid: 50,
    totalReduced: 125,
  },
  decorators: [oldStyleDisplayDecorator(ViolationListParentHtml)],
}

export const InJudgmentNewStyleDisplay: Story = {
  args: {
    totalFined: 200,
    totalInJudgment: 50,
    totalOutstanding: 75,
    totalPaid: 50,
    totalReduced: 125,
  },
  decorators: [newStyleDisplayDecorator(ViolationCardListParentHtml)],
}
export const InJudgmentOldStyleDisplay: Story = {
  args: {
    totalFined: 200,
    totalInJudgment: 50,
    totalOutstanding: 75,
    totalPaid: 50,
    totalReduced: 125,
  },
  decorators: [oldStyleDisplayDecorator(ViolationListParentHtml)],
}

export default meta
