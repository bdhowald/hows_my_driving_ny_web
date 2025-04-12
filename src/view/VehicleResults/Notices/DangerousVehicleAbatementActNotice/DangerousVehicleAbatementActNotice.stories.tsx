import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import DangerousVehicleAbatementActNotice from './DangerousVehicleAbatementActNotice'

const meta: Meta<typeof DangerousVehicleAbatementActNotice> = {
  title: 'Components/VehicleResults/DangerousVehicleAbatementAct',
  component: DangerousVehicleAbatementActNotice,
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="vehicles">
              <div className="vehicle card">
                <ul className="list-group-flush list-group">
                  {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                  <Story />
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

type Story = StoryObj<typeof DangerousVehicleAbatementActNotice>

export const RedLightCameraEligible: Story = {
  args: {
    vehicle: VehicleFactory.build({
      cameraStreakData: {
        cameraViolations: {
          maxStreak: 8,
          streakEnd: '2024-10-12T16:51:00.000-04:00',
          streakStart: '2023-10-24T14:39:00.000-04:00',
          total: 13,
        },
        redLightCameraViolations: {
          maxStreak: 7,
          streakEnd: '2024-05-06T14:59:00.000-04:00',
          streakStart: '2023-06-27T12:43:00.000-04:00',
          total: 9,
        },
        schoolZoneSpeedCameraViolations: {
          maxStreak: 2,
          streakEnd: '2024-10-07T10:02:00.000-04:00',
          streakStart: '2023-12-31T15:34:00.000-05:00',
          total: 4,
        },
      },
    }),
  },
}
export const SpeedCameraEligible: Story = {
  args: {
    vehicle: VehicleFactory.build({
      cameraStreakData: {
        cameraViolations: {
          maxStreak: 21,
          streakEnd: '2024-10-12T16:51:00.000-04:00',
          streakStart: '2023-10-24T14:39:00.000-04:00',
          total: 30,
        },
        redLightCameraViolations: {
          maxStreak: 2,
          streakEnd: '2024-05-06T14:59:00.000-04:00',
          streakStart: '2023-06-27T12:43:00.000-04:00',
          total: 3,
        },
        schoolZoneSpeedCameraViolations: {
          maxStreak: 20,
          streakEnd: '2024-10-07T10:02:00.000-04:00',
          streakStart: '2023-12-31T15:34:00.000-05:00',
          total: 27,
        },
      },
    }),
  },
}
export const RedLightCameraAndSpeedCameraEligible: Story = {
  args: {
    vehicle: VehicleFactory.build({
      cameraStreakData: {
        cameraViolations: {
          maxStreak: 25,
          streakEnd: '2024-10-12T16:51:00.000-04:00',
          streakStart: '2023-10-24T14:39:00.000-04:00',
          total: 36,
        },
        redLightCameraViolations: {
          maxStreak: 7,
          streakEnd: '2024-05-06T14:59:00.000-04:00',
          streakStart: '2023-06-27T12:43:00.000-04:00',
          total: 9,
        },
        schoolZoneSpeedCameraViolations: {
          maxStreak: 20,
          streakEnd: '2024-10-07T10:02:00.000-04:00',
          streakStart: '2023-12-31T15:34:00.000-05:00',
          total: 27,
        },
      },
    }),
  },
}

export default meta
