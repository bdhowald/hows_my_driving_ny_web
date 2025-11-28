import React, { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import type { Meta, StoryObj } from '@storybook/react'

import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator'

import Navigation from './Navigation'

const meta: Meta<typeof Navigation> = {
  title: 'Components/Navigation',
  component: Navigation,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof Navigation>

const ParentHtml = ({ children }: { children: ReactNode }) => (
  <MemoryRouter>
    <div className="site-container-wrapper">
      <div className="site-container container-fluid">{children}</div>
    </div>
  </MemoryRouter>
)

export const DefaultNavigationLargeSizeNewStyleDisplay: Story = {
  decorators: [newStyleDisplayDecorator(ParentHtml)],
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
}

export const DefaultNavigationLargeSizeOldStyleDisplay: Story = {
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
}

export const DefaultNavigationMediumSizeNewStyleDisplay: Story = {
  decorators: [newStyleDisplayDecorator(ParentHtml)],
  parameters: {
    viewport: { defaultViewport: 'tablet' },
  },
}

export const DefaultNavigationMediumSizeOldStyleDisplay: Story = {
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
  parameters: {
    viewport: { defaultViewport: 'tablet' },
  },
}

export const DefaultNavigationSmallSizeNewStyleDisplay: Story = {
  decorators: [newStyleDisplayDecorator(ParentHtml)],
  parameters: {
    viewport: { defaultViewport: 'mobile2' },
  },
}

export const DefaultNavigationSmallSizeOldStyleDisplay: Story = {
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
  parameters: {
    viewport: { defaultViewport: 'mobile2' },
  },
}

export const DefaultNavigationVerySmallSizeNewStyleDisplay: Story = {
  decorators: [newStyleDisplayDecorator(ParentHtml)],
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
}

export const DefaultNavigationVerySmallSizeOldStyleDisplay: Story = {
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
}

export default meta
