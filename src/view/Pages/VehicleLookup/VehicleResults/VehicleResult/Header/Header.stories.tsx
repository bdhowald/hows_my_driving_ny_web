import React, { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator'

import Header from './Header'

const meta: Meta<typeof Header> = {
  title: 'Components/VehicleResults/VehicleResult/Header',
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof Header>

const ParentHtml = ({
  children,
  useNewStyleDisplay,
}: {
  children: ReactNode
  useNewStyleDisplay: boolean
}) => {
  const newStyleDisplayClassName = useNewStyleDisplay ? 'new-style' : ''

  return (
    <MemoryRouter>
      <div className="site-container-wrapper">
        <div className="site-container container-fluid">
          <main>
            <div className="row">
              <div
                className={`col-md-12 vehicle-lookup-content-container ${newStyleDisplayClassName}`}
              >
                <div className={`vehicles ${newStyleDisplayClassName}`}>
                  <div className="vehicle card">{children}</div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </MemoryRouter>
  )
}

export const DefaultNewStyleDisplay: Story = {
  args: {
    removeLookupFunction: () =>
      alert('this would have removed the lookup from the screen'),
    vehicle: VehicleFactory.build(),
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const DefaultOldStyleDisplay: Story = {
  args: {
    removeLookupFunction: () =>
      alert('this would have removed the lookup from the screen'),
    vehicle: VehicleFactory.build(),
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const WithPreviousLookupSubheaderNewStyleDisplay: Story = {
  args: {
    fromPreviousLookupUniqueIdentifier: true,
    removeLookupFunction: () =>
      alert('this would have removed the lookup from the screen'),
    vehicle: VehicleFactory.build(),
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const WithPreviousLookupSubheaderOldStyleDisplay: Story = {
  args: {
    fromPreviousLookupUniqueIdentifier: true,
    removeLookupFunction: () =>
      alert('this would have removed the lookup from the screen'),
    vehicle: VehicleFactory.build(),
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export default meta
