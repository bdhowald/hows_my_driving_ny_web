import React, { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator/withStyleDisplayDecorator'

import ShareLookupMenu from './ShareLookupMenu'

const meta: Meta<typeof ShareLookupMenu> = {
  title: 'Components/VehicleResults/VehicleResult/ShareLookupMenu',
  component: ShareLookupMenu,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof ShareLookupMenu>

const ParentHtml = ({
  children,
  useNewStyleDisplay,
}: {
  children: ReactNode
  useNewStyleDisplay: boolean
}) => {
  const bodyRef = React.createRef<HTMLUListElement>()

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
                  <ul ref={bodyRef}></ul>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </MemoryRouter>
  )
}

const fakeRef = React.createRef<HTMLUListElement>()

const vehicle = VehicleFactory.build()

export const DefaultNewStyleDisplay: Story = {
  args: {
    bodyRef: fakeRef,
    vehicle,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}

export const DefaultOldStyleDisplay: Story = {
  args: {
    bodyRef: fakeRef,
    vehicle,
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export default meta
