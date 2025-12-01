import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator/withStyleDisplayDecorator'

import UserSettings from './UserSettings'

const meta: Meta<typeof UserSettings> = {
  title: 'Pages/UserSettings',
  component: UserSettings,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof UserSettings>

const ParentHtml = ({ children }: { children: ReactNode }) => (
  <div className="site-container-wrapper">
    <div className="site-container container-fluid">
      <main>
        <div className="row">{children}</div>
      </main>
    </div>
  </div>
)

export const UserSettingsPageNewStyleDisplay: Story = {
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}

export const UserSettingsPageOldStyleDisplay: Story = {
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export default meta
