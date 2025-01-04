import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import FetchViolations from './FetchViolations'

const meta: Meta<typeof FetchViolations> = {
  title: 'Components/FetchViolations/FetchViolations',
  component: FetchViolations,
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
            <Story />
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

type Story = StoryObj<typeof FetchViolations>

export const NoLookups: Story = {}

export default meta
