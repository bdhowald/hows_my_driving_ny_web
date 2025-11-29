import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator/withStyleDisplayDecorator'

import SearchButton from './SearchButton'

const meta: Meta<typeof SearchButton> = {
  title: 'Components/Search/SearchControls/SearchButton',
  component: SearchButton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof SearchButton>

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
              <div className={`jumbotron ${newStyleDisplayClassName}`}>
                <div className="row">
                  <form className="form">
                    <div className="form-row">{children}</div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export const NoLookupInFlightAndNoPlateIdPresentNewStyleDisplay: Story = {
  args: {
    lookupInFlight: false,
    plateIdPresent: false,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const NoLookupInFlightAndNoPlateIdPresentOldStyleDisplay: Story = {
  args: {
    lookupInFlight: false,
    plateIdPresent: false,
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const LookupInFlightAndNoPlateIdPresentNewStyleDisplay: Story = {
  args: {
    lookupInFlight: true,
    plateIdPresent: false,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const LookupInFlightAndNoPlateIdPresentOldStyleDisplay: Story = {
  args: {
    lookupInFlight: true,
    plateIdPresent: false,
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const PlateIdPresentAndNoLookupInFlightNewStyleDisplay: Story = {
  args: {
    lookupInFlight: false,
    plateIdPresent: true,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const PlateIdPresentAndNoLookupInFlightOldStyleDisplay: Story = {
  args: {
    lookupInFlight: false,
    plateIdPresent: true,
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const PlateIdPresentAndLookupInFlightNewStyleDisplay: Story = {
  args: {
    lookupInFlight: true,
    plateIdPresent: true,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const PlateIdPresentAndLookupInFlightOldStyleDisplay: Story = {
  args: {
    lookupInFlight: true,
    plateIdPresent: true,
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export default meta
