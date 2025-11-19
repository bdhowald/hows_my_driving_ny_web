import * as React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import FormControls from './FormControls'

const meta: Meta<typeof FormControls.InputWithClearButton> = {
  title:
    'Components/VehicleResults/FiltersControl/FilterMenu/FormControls/InputWithClearButton',
  component: FormControls.InputWithClearButton,
  args: {
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

type Story = StoryObj<typeof FormControls.InputWithClearButton>

export const Blank: Story = {}

export const WithPlaceholderText: Story = {
  args: {
    placeholder: 'some placeholder text',
  },
}

export const WithText: Story = {
  args: {
    defaultValue: 'some text',
  },
}

export default meta
