import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import PlateSearchInput from './PlateSearchInput'

const meta: Meta<typeof PlateSearchInput> = {
  title: 'Components/Search/PlateSearchInput',
  component: PlateSearchInput,
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron">
              <div className="row">
                <form className="form">
                  <div className="form-row">
                    <div className="col-md">
                      <div className="form-group">
                        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                        <Story />
                      </div>
                    </div>
                  </div>
                </form>
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

type Story = StoryObj<typeof PlateSearchInput>

const onChangeFunction = () => null

export const NoPlate: Story = {
  args: {
    currentLookup: {
      plateId: undefined,
      plateType: undefined,
      state: 'NY',
    },
    onChangeFunction,
  },
}
export const PlateEntered: Story = {
  args: {
    currentLookup: {
      plateId: 'ABC1234',
      plateType: undefined,
      state: 'NY',
    },
    onChangeFunction,
  },
}

export default meta
