import * as React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import FormControls from './FormControls'

const meta: Meta<typeof FormControls.RangeWithCheckboxControl> = {
  title:
    'Components/VehicleResults/FiltersControl/FilterMenu/FormControls/RangeWithCheckboxControl',
  component: FormControls.RangeWithCheckboxControl,
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
                  <div className="input-group mb-5">
                    {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                    <Story></Story>
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

type Story = StoryObj<typeof FormControls.RangeWithCheckboxControl>

const id = 'range-slider'
const labelText = 'More balloons than'

export const Disabled: Story = {
  args: {
    enabled: false,
    id,
    labelText,
    maxValue: 100,
  },
}

export const Enabled: Story = {
  args: {
    enabled: true,
    id,
    labelText,
    maxValue: 100,
  },
}

export const WithInitialValue: Story = {
  args: {
    enabled: true,
    id,
    initialValue: 27,
    labelText,
    maxValue: 100,
  },
}

export const WithMinValue: Story = {
  args: {
    enabled: true,
    id,
    labelText,
    minValue: -25,
    maxValue: 100,
  },
}

export default meta
