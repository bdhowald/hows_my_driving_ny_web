import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import ShowFullLocationDataButton from './ShowFullLocationDataButton'

const meta: Meta<typeof ShowFullLocationDataButton> = {
  title:
    'Components/VehicleResults/ViolationsInspector/ViolationCardList/ViolationCardListControls/ShowFullLocationDataButton',
  component: ShowFullLocationDataButton,
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="vehicles">
              <div className="vehicle card">
                <ul className="list-group-flush list-group">
                  <li className="list-group-item">
                    <div className="violation-card-list-wrapper">
                      <div className="violation-card-list-controls">
                        <div className="row">
                          <div className="d-grid gap-2">
                            {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                            <Story />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof ShowFullLocationDataButton>

const toggleShowFullLocationDataFunction = () => null

export const ListVisibleAndFullLocationDataIsVisible: Story = {
  args: {
    showFullLocationData: true,
    toggleShowFullLocationDataFunction,
    violationsCount: 1,
    violationsListIsVisible: true,
  },
}
export const ListVisibleAndFullLocationDataIsNotVisible: Story = {
  args: {
    showFullLocationData: false,
    toggleShowFullLocationDataFunction,
    violationsCount: 1,
    violationsListIsVisible: true,
  },
}

export default meta
