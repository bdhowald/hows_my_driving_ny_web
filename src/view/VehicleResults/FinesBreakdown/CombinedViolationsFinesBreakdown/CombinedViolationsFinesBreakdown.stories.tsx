import * as React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import FinesBreakdown from 'view/VehicleResults/FinesBreakdown/FinesBreakdown'

const meta: Meta<typeof FinesBreakdown.CombinedViolationsFinesBreakdown> = {
  title:
    'Components/VehicleResults/FinesBreakdown/CombinedViolationsFinesBreakdown',
  component: FinesBreakdown.CombinedViolationsFinesBreakdown,
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="vehicles">
              <div className="vehicle card">
                <ul className="list-group-flush list-group">
                  <li className="no-padding list-group-item">
                    <div className="row">
                      <div className="summary-section col-xs-12 col-sm-6">
                        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it */}
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

type Story = StoryObj<typeof FinesBreakdown.CombinedViolationsFinesBreakdown>

export const FineDataIsMissing: Story = {
  args: {
    totalFined: 0,
    totalInJudgment: 0,
    totalOutstanding: 0,
    totalPaid: 0,
    totalReduced: 0,
  },
}

export const FineOnly: Story = {
  args: {
    totalFined: 200,
    totalInJudgment: 0,
    totalOutstanding: 0,
    totalPaid: 0,
    totalReduced: 0,
  },
}

export const FineAndSubtractions: Story = {
  args: {
    totalFined: 200,
    totalInJudgment: 0,
    totalOutstanding: 75,
    totalPaid: 50,
    totalReduced: 125,
  },
}

export const InJudgment: Story = {
  args: {
    totalFined: 200,
    totalInJudgment: 50,
    totalOutstanding: 75,
    totalPaid: 50,
    totalReduced: 125,
  },
}

export default meta
