import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator/withStyleDisplayDecorator'

import RefreshLookupButton from './RefreshLookupButton'

const meta: Meta<typeof RefreshLookupButton> = {
  title: 'Components/VehicleResults/VehicleResult/Header/RefreshLookupButton',
  component: RefreshLookupButton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof RefreshLookupButton>

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
                  <div className="card-header">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export const DefaultNewStyleDisplay: Story = {
  args: {
    refreshLookupFunction: () => alert('this would have refreshed the lookup'),
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const DefaultOldStyleDisplay: Story = {
  args: {
    refreshLookupFunction: () => alert('this would have refreshed the lookup'),
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export default meta
