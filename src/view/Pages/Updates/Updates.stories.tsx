import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator'

import Updates from './Updates'

const meta: Meta<typeof Updates> = {
  title: 'Pages/Updates',
  component: Updates,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof Updates>

const ParentHtml = ({ children }: { children: ReactNode }) => (
  <div className="site-container-wrapper">
    <div className="site-container container-fluid">
      <main>
        <div className="row">{children}</div>
      </main>
    </div>
  </div>
)

export const UpdatesPageNewStyleDisplay: Story = {
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}

export const UpdatesPageOldStyleDisplay: Story = {
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export default meta
