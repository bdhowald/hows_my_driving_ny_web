import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import ShowFullFineDataButton from './ShowFullFineDataButton'

const meta: Meta<typeof ShowFullFineDataButton> = {
  title:
    'Components/VehicleResults/ViolationsInspector/ViolationsListControls/ShowFullFineDataButton',
  component: ShowFullFineDataButton,
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="vehicles">
              <div className="vehicle card">
                <ul className="list-group-flush list-group">
                  <li className="list-group-item">
                    <div className="violations-table-wrapper">
                      <div className="violations-table-header">
                        <div className="row">
                          {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                          <Story />
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

type Story = StoryObj<typeof ShowFullFineDataButton>

const setShowFullFineDataFunction = () => null

export const ListVisibleAndFullFineDataIsVisible: Story = {
  args: {
    setShowFullFineDataFunction,
    showFullFineData: true,
    violationsCount: 1,
    violationsListIsVisible: true,
  },
}
export const ListVisibleAndFullFineDataIsNotVisible: Story = {
  args: {
    setShowFullFineDataFunction,
    showFullFineData: false,
    violationsCount: 1,
    violationsListIsVisible: true,
  },
}

export default meta
