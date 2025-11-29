import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import {
  newStyleDisplayDecorator,
  oldStyleDisplayDecorator,
} from 'tests/utils/withStyleDisplayDecorator/withStyleDisplayDecorator'

import Body from './Body'

const meta: Meta<typeof Body> = {
  title: 'Components/VehicleResults/VehicleResult/Body',
  component: Body,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof Body>

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
                <div className="vehicle card">{children}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

const vehicleEligibleForDangerousVehicleAbatementActNotice =
  VehicleFactory.build({
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

const vehicleIneligibleForDangerousVehicleAbatementActNotice =
  VehicleFactory.build({
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

export const ViolationsListHiddenNewStyleDisplay: Story = {
  args: {
    showViolationsList: false,
    vehicle: vehicleIneligibleForDangerousVehicleAbatementActNotice,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const ViolationsListHiddenOldStyleDisplay: Story = {
  args: {
    showViolationsList: false,
    vehicle: vehicleIneligibleForDangerousVehicleAbatementActNotice,
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const ViolationsListVisibleNewStyleDisplay: Story = {
  args: {
    showViolationsList: true,
    vehicle: vehicleIneligibleForDangerousVehicleAbatementActNotice,
  },
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const ViolationsListVisibleOldStyleDisplay: Story = {
  args: {
    showViolationsList: true,
    vehicle: vehicleIneligibleForDangerousVehicleAbatementActNotice,
  },
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export const ViolationsListHiddenWithDangerousVehicleAbatementActNewStyleDisplay: Story =
  {
    args: {
      showViolationsList: false,
      vehicle: vehicleEligibleForDangerousVehicleAbatementActNotice,
    },
    decorators: [newStyleDisplayDecorator(ParentHtml)],
  }
export const ViolationsListHiddenWithDangerousVehicleAbatementActOldStyleDisplay: Story =
  {
    args: {
      showViolationsList: false,
      vehicle: vehicleEligibleForDangerousVehicleAbatementActNotice,
    },
    decorators: [oldStyleDisplayDecorator(ParentHtml)],
  }

export const ViolationsListVisibleWithDangerousVehicleAbatementActNewStyleDisplay: Story =
  {
    args: {
      showViolationsList: true,
      vehicle: vehicleEligibleForDangerousVehicleAbatementActNotice,
    },
    decorators: [newStyleDisplayDecorator(ParentHtml)],
  }
export const ViolationsListVisibleWithDangerousVehicleAbatementActOldStyleDisplay: Story =
  {
    args: {
      showViolationsList: true,
      vehicle: vehicleEligibleForDangerousVehicleAbatementActNotice,
    },
    decorators: [oldStyleDisplayDecorator(ParentHtml)],
  }

export const NoViolationsNewStyleDisplay: Story = {
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
  decorators: [newStyleDisplayDecorator(ParentHtml)],
}
export const NoViolationsOldStyleDisplay: Story = {
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
  decorators: [oldStyleDisplayDecorator(ParentHtml)],
}

export default meta
