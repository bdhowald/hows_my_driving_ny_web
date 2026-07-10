import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { SettingsContext } from 'context/SettingsContext/SettingsContext'

import StopSuperSpeedersActNotice from './StopSuperSpeedersActNotice'

const meta: Meta<typeof StopSuperSpeedersActNotice> = {
  title: 'Components/VehicleResults/VehicleResult/StopSuperSpeedersActNotice',
  component: StopSuperSpeedersActNotice,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof StopSuperSpeedersActNotice>

const mockedSettings = {
  removeSetting: () => null,
  updateSetting: () => null,
}

const mockedSettingsWithNewStyleDisplay = {
  ...mockedSettings,
  getSetting: () => true,
}

const mockedSettingsWithOldStyleDisplay = {
  ...mockedSettings,
  getSetting: () => false,
}

export const EligibleNewStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build({
      cameraStreakData: {
        cameraViolations: {
          maxStreak: 29,
          streakEnd: '2024-10-12T16:51:00.000-04:00',
          streakStart: '2023-10-24T14:39:00.000-04:00',
          total: 29,
        },
        redLightCameraViolations: {
          maxStreak: 7,
          streakEnd: '2024-10-12T16:51:00.000-04:00',
          streakStart: '2023-11-27T12:43:00.000-05:00',
          total: 12,
        },
        schoolZoneSpeedCameraViolations: {
          maxStreak: 17,
          streakEnd: '2024-10-07T10:02:00.000-04:00',
          streakStart: '2023-10-24T14:39:00.000-04:00',
          total: 17,
        },
      },
    }),
  },
  decorators: [
    (Story) => (
      <SettingsContext.Provider value={mockedSettingsWithNewStyleDisplay}>
        <div className="site-container-wrapper">
          <div className="site-container container-fluid">
            <main>
              <div className="row">
                <div className="col-md-12 vehicle-lookup-content-container new-style">
                  <div className="vehicles new-style">
                    <div className="vehicle card">
                      <ul className="list-group-flush list-group">
                        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                        <Story />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </SettingsContext.Provider>
    ),
  ],
}

export const EligibleOldStyleDisplay: Story = {
  args: {
    vehicle: VehicleFactory.build({
      cameraStreakData: {
        cameraViolations: {
          maxStreak: 29,
          streakEnd: '2024-10-12T16:51:00.000-04:00',
          streakStart: '2023-10-24T14:39:00.000-04:00',
          total: 29,
        },
        redLightCameraViolations: {
          maxStreak: 7,
          streakEnd: '2024-10-12T16:51:00.000-04:00',
          streakStart: '2023-11-27T12:43:00.000-05:00',
          total: 12,
        },
        schoolZoneSpeedCameraViolations: {
          maxStreak: 17,
          streakEnd: '2024-10-07T10:02:00.000-04:00',
          streakStart: '2023-10-24T14:39:00.000-04:00',
          total: 17,
        },
      },
    }),
  },
  decorators: [
    (Story) => (
      <SettingsContext.Provider value={mockedSettingsWithOldStyleDisplay}>
        <div className="site-container-wrapper">
          <div className="site-container container-fluid">
            <main>
              <div className="row">
                <div className="col-md-12 vehicle-lookup-content-container">
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
            </main>
          </div>
        </div>
      </SettingsContext.Provider>
    ),
  ],
}

export default meta
