import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import Header from './Header'

const meta: Meta<typeof Header> = {
  title: 'Components/VehicleResults/VehicleResult/Header',
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="vehicles">
                <div className="vehicle card">
                  {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                  <Story />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MemoryRouter>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof Header>

export const Default: Story = {
  args: {
    removeLookupFunction: () =>
      alert('this would have removed the lookup from the screen'),
    vehicle: VehicleFactory.build(),
  },
}

export const WithPreviousLookupSubheader: Story = {
  args: {
    fromPreviousLookupUniqueIdentifier: true,
    removeLookupFunction: () =>
      alert('this would have removed the lookup from the screen'),
    vehicle: VehicleFactory.build(),
  },
}

export default meta
