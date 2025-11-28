import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator'

import PlateSearchInput from './PlateSearchInput'

const meta: Meta<typeof PlateSearchInput> = {
  title: 'Components/Search/SearchControls/PlateSearchInput',
  component: PlateSearchInput,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof PlateSearchInput>

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
                    <div className="form-row">
                      <div className="col-md">
                        <div className="form-group">{children}</div>
                      </div>
                    </div>
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

const onChangeFunction = () => null

export const NoPlateNewStyleDisplay: Story = {
  args: {
    currentLookup: {
      plateId: undefined,
      plateType: undefined,
      state: 'NY',
    },
    onChangeFunction,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const NoPlateOldStyleDisplay: Story = {
  args: {
    currentLookup: {
      plateId: undefined,
      plateType: undefined,
      state: 'NY',
    },
    onChangeFunction,
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const PlateEnteredNewStyleDisplay: Story = {
  args: {
    currentLookup: {
      plateId: 'ABC1234',
      plateType: undefined,
      state: 'NY',
    },
    onChangeFunction,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const PlateEnteredOldStyleDisplay: Story = {
  args: {
    currentLookup: {
      plateId: 'ABC1234',
      plateType: undefined,
      state: 'NY',
    },
    onChangeFunction,
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export default meta
