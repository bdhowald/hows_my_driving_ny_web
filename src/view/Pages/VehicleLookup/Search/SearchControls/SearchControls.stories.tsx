import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator/withStyleDisplayDecorator'

import SearchControls from './SearchControls'

const meta: Meta<typeof SearchControls> = {
  title: 'Components/Search/SearchControls',
  component: SearchControls,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof SearchControls>

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
                <div className="row">{children}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

const handleInputChange = () =>
  alert('this function would handle a change to the form element')
const handleSubmit = () => alert('this function would submit the form')

export const NoPlateEnteredNewStyleDisplay: Story = {
  args: {
    currentLookup: {
      plateId: undefined,
      plateType: undefined,
      state: 'NY',
    },
    handleInputChange,
    handleSubmit,
    lookupInFlight: false,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const NoPlateEnteredOldStyleDisplay: Story = {
  args: {
    currentLookup: {
      plateId: undefined,
      plateType: undefined,
      state: 'NY',
    },
    handleInputChange,
    handleSubmit,
    lookupInFlight: false,
  },
}

export const NoLookupInFlightWithPlateEnteredNewStyleDisplay: Story = {
  args: {
    currentLookup: {
      plateId: 'ABC1234',
      plateType: undefined,
      state: 'NY',
    },
    handleInputChange,
    handleSubmit,
    lookupInFlight: false,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const NoLookupInFlightWithPlateEnteredOldStyleDisplay: Story = {
  args: {
    currentLookup: {
      plateId: 'ABC1234',
      plateType: undefined,
      state: 'NY',
    },
    handleInputChange,
    handleSubmit,
    lookupInFlight: false,
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const PlateTypeSelectedNewStyleDisplay: Story = {
  args: {
    currentLookup: {
      plateId: 'ABC1234',
      plateType: 'commercial',
      state: 'NY',
    },
    handleInputChange,
    handleSubmit,
    lookupInFlight: false,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const PlateTypeSelectedOldStyleDisplay: Story = {
  args: {
    currentLookup: {
      plateId: 'ABC1234',
      plateType: 'commercial',
      state: 'NY',
    },
    handleInputChange,
    handleSubmit,
    lookupInFlight: false,
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const LookupInFlightNewStyleDisplay: Story = {
  args: {
    currentLookup: {
      plateId: 'ABC1234',
      plateType: undefined,
      state: 'NY',
    },
    handleInputChange,
    handleSubmit,
    lookupInFlight: true,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const LookupInFlightOldStyleDisplay: Story = {
  args: {
    currentLookup: {
      plateId: 'ABC1234',
      plateType: undefined,
      state: 'NY',
    },
    handleInputChange,
    handleSubmit,
    lookupInFlight: true,
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export default meta
