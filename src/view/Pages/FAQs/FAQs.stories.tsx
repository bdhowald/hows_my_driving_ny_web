import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator/withStyleDisplayDecorator'

import FAQs from './FAQs'

const meta: Meta<typeof FAQs> = {
  title: 'Pages/FAQs',
  component: FAQs,
  decorators: [
    (Story) => (
      <div className="site-container-wrapper">
        <div className="site-container container-fluid">
          <main>
            <div className="row">
              {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
              <Story />
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

type Story = StoryObj<typeof FAQs>

const ParentHtml = ({ children }: { children: ReactNode }) => (
  <div className="site-container-wrapper">
    <div className="site-container container-fluid">{children}</div>
  </div>
)

export const FaqsPageNewStyleDisplay: Story = {
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}

export const FaqsPageOldStyleDisplay: Story = {
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export default meta
