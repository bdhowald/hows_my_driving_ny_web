import React from 'react'
import { render, screen } from '@testing-library/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import Body from './Body'

describe('Body', () => {
  describe('renders without error', () => {
    it('should render successfully when showViolationsList is true', () => {
      const vehicle = VehicleFactory.build()

      render(<Body showViolationsList={true} vehicle={vehicle} />)

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

      render(<Body showViolationsList={false} vehicle={vehicle} />)

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

  it('should show the Dangerous Vehicle Abatement Act warning when the vehicle warrants it', () => {
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
      <Body
        showViolationsList={false}
        vehicle={vehicleEligibleForDangerousVehicleAbatementActWarning}
      />,
    )

    expect(
      screen.getByText('Dangerous Vehicle Abatement Act'),
    ).toBeInTheDocument()
  })
})
