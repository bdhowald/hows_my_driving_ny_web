import React, { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import type { Meta, StoryObj } from '@storybook/react'

import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator'

import SiteContainer from './SiteContainer'

const meta: Meta<typeof SiteContainer> = {
  title: 'Components/SiteContainer',
  component: SiteContainer,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof SiteContainer>

const ParentHtml = ({ children }: { children: ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
)

export const DefaultSiteContainerNewStyleDisplay: Story = {
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}

export const DefaultSiteContainerOldStyleDisplay: Story = {
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export default meta
