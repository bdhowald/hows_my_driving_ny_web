import React from 'react'
import { render, screen } from '@testing-library/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import LookupInfo from './LookupInfo'

describe('LookupInfo', () => {
  describe('renders without error', () => {
    test.each([
      {
        vehicleParams: {
          previousLookupDate: '2023-07-12T13:17:54.000Z',
          violations: [],
          violationsCount: 0,
        },
        when: 'a vehicle has no violations',
      },
      {
        vehicleParams: {
          violationsCount: 7,
        },
        when: 'a vehicle has violations',
      },
      {
        vehicleParams: {
          previousLookupDate: undefined,
        },
        when: 'a vehicle has no previous lookups',
      },
      {
        vehicleParams: {
          previousLookupDate: '2023-07-12T13:17:54.000Z',
          previousViolationCount: 3,
          timesQueried: 2,
        },
        when: 'a vehicle a previous lookup and violations',
      },
      {
        vehicleParams: {
          previousLookupDate: '2023-07-12T13:17:54.000Z',
          previousViolationCount: 2,
        },
        when: 'a vehicle has new violations since its most recent lookups',
      },
    ])('renders successfully when $when', ({ vehicleParams }) => {
      const state = 'NY'
      const plate = 'ABC1234'

      const vehicle = VehicleFactory.build({
        ...vehicleParams,
        ...{
          plate,
          state,
        },
      })

      render(<LookupInfo vehicle={vehicle} />)

      expect(screen.getByText('Plate:')).toBeInTheDocument()
      expect(screen.getByText(plate)).toBeInTheDocument()

      expect(screen.getByText('Region:')).toBeInTheDocument()
      expect(screen.getByText(state)).toBeInTheDocument()

      expect(screen.getByText('Violations:')).toBeInTheDocument()
      if (vehicle.violationsCount) {
        if (vehicle.previousViolationCount) {
          const numNewViolations =
            vehicle.violationsCount - vehicle.previousViolationCount
          if (numNewViolations === 0) {
            expect(
              screen.getByText(vehicle.violationsCount),
            ).toBeInTheDocument()
          } else {
            expect(
              screen.getByText(
                `${vehicle.violationsCount} (${numNewViolations} new)`,
              ),
            ).toBeInTheDocument()
          }
        } else {
          expect(screen.getByText(vehicle.violationsCount)).toBeInTheDocument()
        }
      }

      expect(screen.getByText('Lookups:')).toBeInTheDocument()
      expect(screen.getByText(vehicle.timesQueried)).toBeInTheDocument()
    })
  })

  describe('render the correct language', () => {
    it('should not show fines fields when there are no violations', () => {
      const vehicle = VehicleFactory.build({
        violations: [],
        violationsCount: 0,
      })

      render(<LookupInfo vehicle={vehicle} />)

      expect(screen.queryByText('Fined:')).not.toBeInTheDocument()
      expect(screen.queryByText('Owed:')).not.toBeInTheDocument()
      expect(screen.queryByText('In judgment:')).not.toBeInTheDocument()
      expect(screen.queryByText('Interest:')).not.toBeInTheDocument()
      expect(screen.queryByText('Penalties:')).not.toBeInTheDocument()
      expect(screen.queryByText('Reductions:')).not.toBeInTheDocument()
      expect(screen.queryByText('Paid:')).not.toBeInTheDocument()
      expect(screen.queryByText('Total:')).not.toBeInTheDocument()
    })

    it('should not show plate types when they are present on a lookup', () => {
      const vehicle = VehicleFactory.build({
        plateTypes: ['NYS'],
      })

      render(<LookupInfo vehicle={vehicle} />)

      expect(screen.getByText('Plate type:')).toBeInTheDocument()
      expect(screen.getByText('New York Senate')).toBeInTheDocument()
    })

    it('should not show the previous lookup field when there are no previous lookups', () => {
      const vehicle = VehicleFactory.build({
        previousLookupDate: undefined,
      })

      render(<LookupInfo vehicle={vehicle} />)

      expect(screen.queryByText('Previous:')).not.toBeInTheDocument()
    })

    it('should show the previous lookup field when there is a previous lookup', () => {
      const vehicle = VehicleFactory.build({
        previousLookupDate: '2023-07-12T13:17:54.000Z',
      })

      render(<LookupInfo vehicle={vehicle} />)

      expect(screen.queryByText('Previous:')).toBeInTheDocument()
    })

    it('should show the number of new violations since a previous lookup', () => {
      const vehicle = VehicleFactory.build({
        previousLookupDate: '2023-07-12T13:17:54.000Z',
        previousViolationCount: 2,
        violationsCount: 3,
      })

      render(<LookupInfo vehicle={vehicle} />)

      expect(screen.queryByText('3 (1 new)')).toBeInTheDocument()
    })
  })
})
