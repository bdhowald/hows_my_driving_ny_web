import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VehicleFactory } from '__fixtures__/models/Vehicle'

import SocialShareButton from './SocialShareButton'

type Story = StoryObj<typeof SocialShareButton.Twitter>

const meta: Meta<typeof SocialShareButton.Twitter> = {
  title: 'Components/SocialShareButton/TwitterSocialShareButton',
  component: SocialShareButton.Twitter,
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 page-content-container">
            {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
            <Story />
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

const vehicle = VehicleFactory.build({
  state: 'NY',
  plate: 'ABC1234',
  violationsCount: 123,
  uniqueIdentifier: 'a1b2c3d4',
})

export const ReadyToShare: Story = {
  args: {
    vehicle,
  },
}

export default meta
