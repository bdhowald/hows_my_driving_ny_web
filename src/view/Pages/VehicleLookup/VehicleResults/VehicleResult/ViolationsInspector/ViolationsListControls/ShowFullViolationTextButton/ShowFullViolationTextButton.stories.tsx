import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import ShowFullViolationTextButton from './ShowFullViolationTextButton'

const meta: Meta<typeof ShowFullViolationTextButton> = {
  title:
    'Components/VehicleResults/VehicleResult/ViolationsInspector/ViolationsListControls/ShowFullViolationTextButton',
  component: ShowFullViolationTextButton,
  decorators: [
    (Story) => (
      <div className="site-container-wrapper">
        <div className="site-container container-fluid">
          <main>
            <div className="row">
              <div className="col-md-12 vehicle-lookup-content-container">
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
          </main>
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

type Story = StoryObj<typeof ShowFullViolationTextButton>

const setShowFullViolationTextFunction = () => null

export const ListVisibleAndFullViolationTextIsVisible: Story = {
  args: {
    setShowFullViolationTextFunction,
    showFullViolationText: true,
    violationsCount: 1,
    violationsListIsVisible: true,
  },
}
export const ListVisibleAndFullViolationTextIsNotVisible: Story = {
  args: {
    setShowFullViolationTextFunction,
    showFullViolationText: false,
    violationsCount: 1,
    violationsListIsVisible: true,
  },
}

export default meta
