import React from 'react'
import { render, screen } from '@testing-library/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { SettingsContext } from 'context/SettingsContext/SettingsContext'

import Body from './Body'

describe('Body', () => {
  describe('renders without error', () => {
    describe('new-style display', () => {
      it('should render successfully when showViolationsList is true', () => {
        const vehicle = VehicleFactory.build()

        const mockedSettings = {
          getSetting: jest.fn().mockReturnValueOnce(true),
          removeSetting: jest.fn(),
          updateSetting: jest.fn(),
        }

        render(
          <SettingsContext.Provider value={mockedSettings}>
            <Body showViolationsList={true} vehicle={vehicle} />
          </SettingsContext.Provider>,
        )

        // LookupInfo element
        expect(screen.getByText('Plate:')).toBeInTheDocument()
        expect(screen.getByText('State:')).toBeInTheDocument()
        expect(screen.getByText('Plate type:')).toBeInTheDocument()
        expect(screen.getByText('Violations:')).toBeInTheDocument()
        expect(screen.getByText('Lookups:')).toBeInTheDocument()

        // ViolationsInspector controls
        expect(screen.getByText('hide violations')).toBeInTheDocument()

        // ViolationsInspector ViolationCard visible
        expect(screen.getByTestId('violation-card-list')).toBeInTheDocument()
      })

      it('should render successfully when showViolationsList is false', () => {
        const vehicle = VehicleFactory.build()

        const mockedSettings = {
          getSetting: jest.fn().mockReturnValueOnce(true),
          removeSetting: jest.fn(),
          updateSetting: jest.fn(),
        }

        render(
          <SettingsContext.Provider value={mockedSettings}>
            <Body showViolationsList={false} vehicle={vehicle} />
          </SettingsContext.Provider>,
        )

        // LookupInfo element
        expect(screen.getByText('Plate:')).toBeInTheDocument()
        expect(screen.getByText('State:')).toBeInTheDocument()
        expect(screen.getByText('Plate type:')).toBeInTheDocument()
        expect(screen.getByText('Violations:')).toBeInTheDocument()
        expect(screen.getByText('Lookups:')).toBeInTheDocument()

        // ViolationsInspector controls
        expect(
          screen.getByText(`show ${vehicle.violationsCount} violations`),
        ).toBeInTheDocument()

        // ViolationsInspector ViolationCard hidden
        expect(
          screen.queryByTestId('violation-card-list'),
        ).not.toBeInTheDocument()
      })
    })

    describe('old-style display', () => {
      it('should render successfully when showViolationsList is true', () => {
        const vehicle = VehicleFactory.build()

        const mockedSettings = {
          getSetting: jest.fn().mockReturnValueOnce(false),
          removeSetting: jest.fn(),
          updateSetting: jest.fn(),
        }

        render(
          <SettingsContext.Provider value={mockedSettings}>
            <Body showViolationsList={true} vehicle={vehicle} />
          </SettingsContext.Provider>,
        )

        // LookupInfo element
        expect(screen.getByText('Plate:')).toBeInTheDocument()
        expect(screen.getByText('State:')).toBeInTheDocument()
        expect(screen.getByText('Plate type:')).toBeInTheDocument()
        expect(screen.getByText('Violations:')).toBeInTheDocument()
        expect(screen.getByText('Lookups:')).toBeInTheDocument()

        // ViolationsInspector controls
        expect(screen.getByText('hide violations')).toBeInTheDocument()

        // ViolationsInspector table visible
        expect(screen.getByRole('table')).toBeInTheDocument()
      })

      it('should render successfully when showViolationsList is false', () => {
        const vehicle = VehicleFactory.build()

        const mockedSettings = {
          getSetting: jest.fn().mockReturnValueOnce(false),
          removeSetting: jest.fn(),
          updateSetting: jest.fn(),
        }

        render(
          <SettingsContext.Provider value={mockedSettings}>
            <Body showViolationsList={false} vehicle={vehicle} />
          </SettingsContext.Provider>,
        )

        // LookupInfo element
        expect(screen.getByText('Plate:')).toBeInTheDocument()
        expect(screen.getByText('State:')).toBeInTheDocument()
        expect(screen.getByText('Plate type:')).toBeInTheDocument()
        expect(screen.getByText('Violations:')).toBeInTheDocument()
        expect(screen.getByText('Lookups:')).toBeInTheDocument()

        // ViolationsInspector controls
        expect(
          screen.getByText(`show ${vehicle.violationsCount} violations`),
        ).toBeInTheDocument()

        // ViolationsInspector table hidden
        expect(screen.queryByRole('table')).not.toBeInTheDocument()
      })
    })
  })

  it('should show the Stop Super Speeders Act warning with the new-style display when the vehicle warrants it', () => {
    const vehicleEligibleForStopSuperSpeedersActWarning = VehicleFactory.build({
      cameraStreakData: {
        schoolZoneSpeedCameraViolations: {
          maxStreak: 20,
          streakEnd: '2024-10-07T10:02:00.000-04:00',
          streakStart: '2023-12-31T15:34:00.000-05:00',
          total: 27,
        },
      },
    })

    const mockedSettings = {
      getSetting: jest.fn().mockReturnValueOnce(true),
      removeSetting: jest.fn(),
      updateSetting: jest.fn(),
    }

    render(
      <SettingsContext.Provider value={mockedSettings}>
        <Body
          showViolationsList={false}
          vehicle={vehicleEligibleForStopSuperSpeedersActWarning}
        />
      </SettingsContext.Provider>,
    )

    expect(screen.getByText('Stop Super Speeders Act')).toBeInTheDocument()
  })

  it('should show the Stop Super Speeders Act warning with the old-style display when the vehicle warrants it', () => {
    const vehicleEligibleForStopSuperSpeedersActWarning = VehicleFactory.build({
      cameraStreakData: {
        schoolZoneSpeedCameraViolations: {
          maxStreak: 20,
          streakEnd: '2024-10-07T10:02:00.000-04:00',
          streakStart: '2023-12-31T15:34:00.000-05:00',
          total: 27,
        },
      },
    })

    const mockedSettings = {
      getSetting: jest.fn().mockReturnValueOnce(false),
      removeSetting: jest.fn(),
      updateSetting: jest.fn(),
    }

    render(
      <SettingsContext.Provider value={mockedSettings}>
        <Body
          showViolationsList={false}
          vehicle={vehicleEligibleForStopSuperSpeedersActWarning}
        />
      </SettingsContext.Provider>,
    )

    expect(screen.getByText('Stop Super Speeders Act')).toBeInTheDocument()
  })
})
