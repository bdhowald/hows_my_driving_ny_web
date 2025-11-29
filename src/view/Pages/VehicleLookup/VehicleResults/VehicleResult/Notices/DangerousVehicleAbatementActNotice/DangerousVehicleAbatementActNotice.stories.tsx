import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator/withStyleDisplayDecorator'

import DangerousVehicleAbatementActNotice from './DangerousVehicleAbatementActNotice'

const meta: Meta<typeof DangerousVehicleAbatementActNotice> = {
  title: 'Components/VehicleResults/VehicleResult/DangerousVehicleAbatementAct',
  component: DangerousVehicleAbatementActNotice,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof DangerousVehicleAbatementActNotice>

const ParentHtml = ({
  children,
  useNewStyleDisplay,
}: {
  children: ReactNode
  useNewStyleDisplay: boolean
}) => {
  const newStyleDisplayClassName = useNewStyleDisplay ? 'new-style' : ''

  return (
    <div className="site-container-wrapper">
      <div className="site-container container-fluid">
        <main>
          <div className="row">
            <div
              className={`col-md-12 vehicle-lookup-content-container ${newStyleDisplayClassName}`}
            >
              <div className={`vehicles ${newStyleDisplayClassName}`}>
                <div className="vehicle card ">
                  <ul className="list-group-flush list-group">{children}</ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// Red light camera-eligible
export const RedLightCameraEligibleNewStyleDisplay: Story = {
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
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}

export const RedLightCameraEligibleOldStyleDisplay: Story = {
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
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

// Speed camera-eligible
export const SpeedCameraEligibleNewStyleDisplay: Story = {
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
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}

export const SpeedCameraEligibleOldStyleDisplay: Story = {
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
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const RedLightCameraAndSpeedCameraEligibleNewStyleDisplay: Story = {
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
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}

export const RedLightCameraAndSpeedCameraEligibleOldStyleDisplay: Story = {
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
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export default meta
