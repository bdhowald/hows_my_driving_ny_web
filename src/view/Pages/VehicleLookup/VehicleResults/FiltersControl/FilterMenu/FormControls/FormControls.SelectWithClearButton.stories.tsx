import * as React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import FormControls from './FormControls'

const meta: Meta<typeof FormControls.SelectWithClearButton> = {
  title:
    'Components/VehicleResults/FiltersControl/FilterMenu/FormControls/SelectWithClearButton',
  component: FormControls.SelectWithClearButton,
  args: {
    children: (
      <>
        <option value="">Choose Door...</option>
        <option key="1" value="1">
          1
        </option>
        <option key="2" value="2">
          2
        </option>
        <option key="3" value="3">
          3
        </option>
      </>
    ),
    className: 'form-control',
  },
  decorators: [
    (Story) => (
      <div
        role="dialog"
        aria-modal="true"
        className="offcanvas offcanvas-start show"
        tabIndex={-1}
        style={{ visibility: 'visible' }}
      >
        <div className="offcanvas-body">
          <div className="filter-controls-menu">
            <div className="filter-controls-menu-controls">
              <form>
                <div>
                  <div className="input-group mb-2">
                    <span
                      className="input-group-text"
                      id="filter-results-field-label"
                    >
                      Field
                    </span>
                    {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                    <Story />
                  </div>
                </div>
              </form>
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

type Story = StoryObj<typeof FormControls.SelectWithClearButton>

export const Blank: Story = {}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: '2',
  },
}

export default meta
