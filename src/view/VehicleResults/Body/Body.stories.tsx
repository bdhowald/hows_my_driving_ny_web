import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import Body from './Body'

const meta: Meta<typeof Body> = {
  title: 'Components/VehicleResults/Body',
  component: Body,
  decorators: [
    (Story) => (
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
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof Body>

const vehicleEligibleForDangerousVehicleAbatementActNotice = VehicleFactory.build({
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
})

const vehicleIneligibleForDangerousVehicleAbatementActNotice = VehicleFactory.build({
  cameraStreakData: {
    cameraViolations: {
      maxStreak: 0,
      streakEnd: null,
      streakStart: null,
    },
    redLightCameraViolations: {
      maxStreak: 0,
      streakEnd: null,
      streakStart: null,
    },
    schoolZoneSpeedCameraViolations: {
      maxStreak: 0,
      streakEnd: null,
      streakStart: null,
    },
  },
})

export const ViolationsListHidden: Story = {
  args: {
    showViolationsList: false,
    vehicle: vehicleIneligibleForDangerousVehicleAbatementActNotice,
  },
}
export const ViolationsListVisible: Story = {
  args: {
    showViolationsList: true,
    vehicle: vehicleIneligibleForDangerousVehicleAbatementActNotice,
  },
}
export const ViolationsListHiddenWithDangerousVehicleAbatementAct: Story = {
  args: {
    showViolationsList: false,
    vehicle: vehicleEligibleForDangerousVehicleAbatementActNotice,
  },
}
export const ViolationsListVisibleWithDangerousVehicleAbatementAct: Story = {
  args: {
    showViolationsList: true,
    vehicle: vehicleEligibleForDangerousVehicleAbatementActNotice,
  },
}
export const NoViolations: Story = {
  args: {
    showViolationsList: true,
    vehicle: VehicleFactory.build({
      cameraStreakData: {
        cameraViolations: {
          maxStreak: 0,
          streakEnd: null,
          streakStart: null,
        },
        redLightCameraViolations: {
          maxStreak: 0,
          streakEnd: null,
          streakStart: null,
        },
        schoolZoneSpeedCameraViolations: {
          maxStreak: 0,
          streakEnd: null,
          streakStart: null,
        },
      },
      violations: [],
      violationsCount: 0,
    }),
  },
}

export default meta
