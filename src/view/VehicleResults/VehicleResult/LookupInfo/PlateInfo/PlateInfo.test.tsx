import React from 'react'
import { render, screen } from '@testing-library/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import PlateInfo from './PlateInfo'

describe('PlateInfo', () => {
  describe('renders without error', () => {
    it('should render the details of the plate itself', () => {
      render(<PlateInfo vehicle={VehicleFactory.build()} />)
    })
  })

  describe('plate types', () => {
    it('should show the correct plate types when they are present on a lookup', () => {
      const vehicle = VehicleFactory.build({
        plateTypes: ['NYS'],
      })

      render(<PlateInfo vehicle={vehicle} />)

      expect(screen.getByText('Plate type:')).toBeInTheDocument()
      expect(screen.getByText('New York Senate')).toBeInTheDocument()
    })

    it("should show 'All' when they are present on a lookup", () => {
      const vehicle = VehicleFactory.build({
        plateTypes: [],
      })

      render(<PlateInfo vehicle={vehicle} />)

      expect(screen.getByText('Plate type:')).toBeInTheDocument()
      expect(screen.getByText('All')).toBeInTheDocument()
    })
  })

  describe('lookup dates', () => {
    describe('current lookup date', () => {
      it('should show the lookup date of the current lookup', () => {
        const vehicle = VehicleFactory.build({
          lookupDate: '2025-08-31T12:43:27.000Z',
        })

        render(<PlateInfo vehicle={vehicle} />)

        expect(screen.getByText('Queried On:')).toBeInTheDocument()
        expect(screen.getByText('08/31/2025')).toBeInTheDocument()
      })

      it("should show 'Now' as the lookup date of the current lookup if it was created in the past five minutes", () => {
        jest.useFakeTimers().setSystemTime(new Date('2025-08-31T12:43:27.000Z'))

        const vehicle = VehicleFactory.build({
          lookupDate: '2025-08-31T12:41:18.000Z',
        })

        render(<PlateInfo vehicle={vehicle} />)

        expect(screen.getByText('Queried On:')).toBeInTheDocument()
        expect(screen.getByText('Now')).toBeInTheDocument()
      })
    })

    describe('previous lookup info', () => {
      it('should not show the previous lookup field when there are no previous lookups', () => {
        const vehicle = VehicleFactory.build({
          previousLookupDate: undefined,
        })

        render(<PlateInfo vehicle={vehicle} />)

        expect(screen.queryByText('Prev. Queried:')).not.toBeInTheDocument()
      })

      it('should show the previous lookup field when there is a previous lookup', () => {
        const vehicle = VehicleFactory.build({
          previousLookupDate: '2023-07-12T13:17:54.000Z',
        })

        render(<PlateInfo vehicle={vehicle} />)

        expect(screen.queryByText('Prev. Queried:')).toBeInTheDocument()
      })
    })
  })

  describe('render the correct verbiage for the regions', () => {
    it("should describe the region as 'State' when it is a U.S. state", () => {
      const vehicle = VehicleFactory.build({
        state: 'NY',
      })

      render(<PlateInfo vehicle={vehicle} />)

      expect(screen.getByText('State:')).toBeInTheDocument()

      expect(screen.queryByText('Province:')).not.toBeInTheDocument()
      expect(screen.queryByText('Region:')).not.toBeInTheDocument()
      expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
    })

    it("should describe the region as 'Province' when it is a Canadian province", () => {
      const vehicle = VehicleFactory.build({
        state: 'AB',
      })

      render(<PlateInfo vehicle={vehicle} />)

      expect(screen.getByText('Province:')).toBeInTheDocument()

      expect(screen.queryByText('State:')).not.toBeInTheDocument()
      expect(screen.queryByText('Region:')).not.toBeInTheDocument()
      expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
    })

    it("should describe the region as 'Territory' when it is a U.S. territory", () => {
      const vehicle = VehicleFactory.build({
        state: 'GU',
      })

      render(<PlateInfo vehicle={vehicle} />)

      expect(screen.getByText('Territory:')).toBeInTheDocument()

      expect(screen.queryByText('Province:')).not.toBeInTheDocument()
      expect(screen.queryByText('State:')).not.toBeInTheDocument()
      expect(screen.queryByText('Region:')).not.toBeInTheDocument()
    })

    it("should describe the region as 'Territory' when it is a Canadian territory", () => {
      const vehicle = VehicleFactory.build({
        state: 'NT',
      })

      render(<PlateInfo vehicle={vehicle} />)

      expect(screen.getByText('Territory:')).toBeInTheDocument()

      expect(screen.queryByText('Province:')).not.toBeInTheDocument()
      expect(screen.queryByText('State:')).not.toBeInTheDocument()
      expect(screen.queryByText('Region:')).not.toBeInTheDocument()
    })

    it("should describe the region as 'Region' when it is a District of Columbia plate", () => {
      const vehicle = VehicleFactory.build({
        state: 'DC',
      })

      render(<PlateInfo vehicle={vehicle} />)

      expect(screen.getByText('Region:')).toBeInTheDocument()

      expect(screen.queryByText('Province:')).not.toBeInTheDocument()
      expect(screen.queryByText('State:')).not.toBeInTheDocument()
      expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
    })

    it("should describe the region as 'Region' when it is a U.S. commonwealth", () => {
      const vehicle = VehicleFactory.build({
        state: 'PR',
      })

      render(<PlateInfo vehicle={vehicle} />)

      expect(screen.getByText('Region:')).toBeInTheDocument()

      expect(screen.queryByText('Province:')).not.toBeInTheDocument()
      expect(screen.queryByText('State:')).not.toBeInTheDocument()
      expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
    })

    it("should describe the region as 'Region' when it is a country", () => {
      const vehicle = VehicleFactory.build({
        state: 'MX',
      })

      render(<PlateInfo vehicle={vehicle} />)

      expect(screen.getByText('Region:')).toBeInTheDocument()

      expect(screen.queryByText('Province:')).not.toBeInTheDocument()
      expect(screen.queryByText('State:')).not.toBeInTheDocument()
      expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
    })

    it("should describe the region as 'Region' when it is the U.S. State Dept.", () => {
      const vehicle = VehicleFactory.build({
        state: 'DP',
      })

      render(<PlateInfo vehicle={vehicle} />)

      expect(screen.getByText('Region:')).toBeInTheDocument()

      expect(screen.queryByText('Province:')).not.toBeInTheDocument()
      expect(screen.queryByText('State:')).not.toBeInTheDocument()
      expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
    })

    it("should describe the region as 'Region' when it is a foreign plate", () => {
      const vehicle = VehicleFactory.build({
        state: 'FO',
      })

      render(<PlateInfo vehicle={vehicle} />)

      expect(screen.getByText('Region:')).toBeInTheDocument()

      expect(screen.queryByText('Province:')).not.toBeInTheDocument()
      expect(screen.queryByText('State:')).not.toBeInTheDocument()
      expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
    })

    it("should describe the region as 'Region' when it is an unknown region, e.g. '99'", () => {
      const vehicle = VehicleFactory.build({
        state: '99',
      })

      render(<PlateInfo vehicle={vehicle} />)

      expect(screen.getByText('Region:')).toBeInTheDocument()

      expect(screen.queryByText('Province:')).not.toBeInTheDocument()
      expect(screen.queryByText('State:')).not.toBeInTheDocument()
      expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
    })
  })
})
