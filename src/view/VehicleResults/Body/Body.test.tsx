import React from 'react'
import { Cookies, CookiesProvider } from 'react-cookie'
import { render, screen } from '@testing-library/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import Body from './Body'

describe('Body', () => {
  describe('renders without error', () => {
    describe('new-style display', () => {
      it('should render successfully when showViolationsList is true', () => {
        const vehicle = VehicleFactory.build()

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <Body showViolationsList={true} vehicle={vehicle} />
          </CookiesProvider>,
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

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <Body showViolationsList={false} vehicle={vehicle} />
          </CookiesProvider>,
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

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <Body showViolationsList={true} vehicle={vehicle} />
          </CookiesProvider>,
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

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <Body showViolationsList={false} vehicle={vehicle} />
          </CookiesProvider>,
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

  it('should show the Dangerous Vehicle Abatement Act warning with the new-style display when the vehicle warrants it', () => {
    const vehicleEligibleForDangerousVehicleAbatementActWarning =
      VehicleFactory.build({
        cameraStreakData: {
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
      })

    render(
      <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
        <Body
          showViolationsList={false}
          vehicle={vehicleEligibleForDangerousVehicleAbatementActWarning}
        />
      </CookiesProvider>,
    )

    expect(
      screen.getByText('Dangerous Vehicle Abatement Act'),
    ).toBeInTheDocument()
  })

  it('should show the Dangerous Vehicle Abatement Act warning with the old-style display when the vehicle warrants it', () => {
    const vehicleEligibleForDangerousVehicleAbatementActWarning =
      VehicleFactory.build({
        cameraStreakData: {
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
      })

    render(
      <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
        <Body
          showViolationsList={false}
          vehicle={vehicleEligibleForDangerousVehicleAbatementActWarning}
        />
      </CookiesProvider>,
    )

    expect(
      screen.getByText('Dangerous Vehicle Abatement Act'),
    ).toBeInTheDocument()
  })
})
