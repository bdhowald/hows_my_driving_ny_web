import React from 'react'
import { Cookies, CookiesProvider } from 'react-cookie'
import { render, screen } from '@testing-library/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import LookupInfo from './LookupInfo'

describe('LookupInfo', () => {
  describe('renders without error', () => {
    describe('new-style display', () => {
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

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('Plate:')).toBeInTheDocument()
        expect(screen.getByText(plate)).toBeInTheDocument()

        expect(screen.getByText('State:')).toBeInTheDocument()
        expect(screen.getByText(state)).toBeInTheDocument()

        expect(screen.getByText('Violations:')).toBeInTheDocument()

        if (vehicle.violationsCount) {
          if (vehicle.previousViolationCount) {
            const numNewViolations =
              vehicle.violationsCount - vehicle.previousViolationCount
            if (numNewViolations === 0) {
              expect(
                screen.getByText(vehicle.violationsCount, {
                  selector: 'div.violation-total',
                }),
              ).toBeInTheDocument()
            } else {
              expect(
                screen.getByText(
                  `(${numNewViolations} new) ${vehicle.violationsCount}`,
                ),
              ).toBeInTheDocument()
            }
          } else {
            expect(
              screen.getByText(vehicle.violationsCount, {
                selector: 'div.violation-total',
              }),
            ).toBeInTheDocument()
          }
        }

        expect(screen.getByText('Lookups:')).toBeInTheDocument()
        expect(screen.getByText(vehicle.timesQueried)).toBeInTheDocument()
      })
    })

    describe('old-style display', () => {
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

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('Plate:')).toBeInTheDocument()
        expect(screen.getByText(plate)).toBeInTheDocument()

        expect(screen.getByText('State:')).toBeInTheDocument()
        expect(screen.getByText(state)).toBeInTheDocument()

        expect(screen.getByText('Violations:')).toBeInTheDocument()

        if (vehicle.violationsCount) {
          if (vehicle.previousViolationCount) {
            const numNewViolations =
              vehicle.violationsCount - vehicle.previousViolationCount
            if (numNewViolations === 0) {
              expect(
                screen.getByText(vehicle.violationsCount, {
                  selector: 'div.violation-total',
                }),
              ).toBeInTheDocument()
            } else {
              expect(
                screen.getByText(
                  `(${numNewViolations} new) ${vehicle.violationsCount}`,
                ),
              ).toBeInTheDocument()
            }
          } else {
            expect(
              screen.getByText(vehicle.violationsCount, {
                selector: 'div.violation-total',
              }),
            ).toBeInTheDocument()
          }
        }

        expect(screen.getByText('Lookups:')).toBeInTheDocument()
        expect(screen.getByText(vehicle.timesQueried)).toBeInTheDocument()
      })
    })
  })

  describe('render the correct language', () => {
    describe('new-style display', () => {
      it("should describe the region as 'State' when it is a U.S. state", () => {
        const vehicle = VehicleFactory.build({
          state: 'NY',
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('State:')).toBeInTheDocument()

        expect(screen.queryByText('Province:')).not.toBeInTheDocument()
        expect(screen.queryByText('Region:')).not.toBeInTheDocument()
        expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
      })

      it("should describe the region as 'Province' when it is a Canadian province", () => {
        const vehicle = VehicleFactory.build({
          state: 'AB',
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('Province:')).toBeInTheDocument()

        expect(screen.queryByText('State:')).not.toBeInTheDocument()
        expect(screen.queryByText('Region:')).not.toBeInTheDocument()
        expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
      })

      it("should describe the region as 'Territory' when it is a U.S. territory", () => {
        const vehicle = VehicleFactory.build({
          state: 'GU',
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('Territory:')).toBeInTheDocument()

        expect(screen.queryByText('Province:')).not.toBeInTheDocument()
        expect(screen.queryByText('State:')).not.toBeInTheDocument()
        expect(screen.queryByText('Region:')).not.toBeInTheDocument()
      })

      it("should describe the region as 'Territory' when it is a Canadian territory", () => {
        const vehicle = VehicleFactory.build({
          state: 'NT',
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('Territory:')).toBeInTheDocument()

        expect(screen.queryByText('Province:')).not.toBeInTheDocument()
        expect(screen.queryByText('State:')).not.toBeInTheDocument()
        expect(screen.queryByText('Region:')).not.toBeInTheDocument()
      })

      it("should describe the region as 'Region' when it is a District of Columbia plate", () => {
        const vehicle = VehicleFactory.build({
          state: 'DC',
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('Region:')).toBeInTheDocument()

        expect(screen.queryByText('Province:')).not.toBeInTheDocument()
        expect(screen.queryByText('State:')).not.toBeInTheDocument()
        expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
      })

      it("should describe the region as 'Region' when it is a U.S. commonwealth", () => {
        const vehicle = VehicleFactory.build({
          state: 'PR',
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('Region:')).toBeInTheDocument()

        expect(screen.queryByText('Province:')).not.toBeInTheDocument()
        expect(screen.queryByText('State:')).not.toBeInTheDocument()
        expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
      })

      it("should describe the region as 'Region' when it is a country", () => {
        const vehicle = VehicleFactory.build({
          state: 'MX',
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('Region:')).toBeInTheDocument()

        expect(screen.queryByText('Province:')).not.toBeInTheDocument()
        expect(screen.queryByText('State:')).not.toBeInTheDocument()
        expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
      })

      it("should describe the region as 'Region' when it is the U.S. State Dept.", () => {
        const vehicle = VehicleFactory.build({
          state: 'DP',
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('Region:')).toBeInTheDocument()

        expect(screen.queryByText('Province:')).not.toBeInTheDocument()
        expect(screen.queryByText('State:')).not.toBeInTheDocument()
        expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
      })

      it("should describe the region as 'Region' when it is a foreign plate", () => {
        const vehicle = VehicleFactory.build({
          state: 'FO',
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('Region:')).toBeInTheDocument()

        expect(screen.queryByText('Province:')).not.toBeInTheDocument()
        expect(screen.queryByText('State:')).not.toBeInTheDocument()
        expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
      })

      it("should describe the region as 'Region' when it is an unknown region, e.g. '99'", () => {
        const vehicle = VehicleFactory.build({
          state: '99',
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('Region:')).toBeInTheDocument()

        expect(screen.queryByText('Province:')).not.toBeInTheDocument()
        expect(screen.queryByText('State:')).not.toBeInTheDocument()
        expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
      })

      it('should not show fines fields when there are no violations', () => {
        const vehicle = VehicleFactory.build({
          violations: [],
          violationsCount: 0,
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.queryByText('Fined:')).not.toBeInTheDocument()
        expect(screen.queryByText('Owed:')).not.toBeInTheDocument()
        expect(screen.queryByText('In judgment:')).not.toBeInTheDocument()
        expect(screen.queryByText('Interest:')).not.toBeInTheDocument()
        expect(screen.queryByText('Penalties:')).not.toBeInTheDocument()
        expect(screen.queryByText('Reductions:')).not.toBeInTheDocument()
        expect(screen.queryByText('Paid:')).not.toBeInTheDocument()
        expect(screen.queryByText('Total:')).not.toBeInTheDocument()
      })

      it('should show plate types when they are present on a lookup', () => {
        const vehicle = VehicleFactory.build({
          plateTypes: ['NYS'],
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('Plate type:')).toBeInTheDocument()
        expect(screen.getByText('New York Senate')).toBeInTheDocument()
      })

      it('should not show the previous lookup field when there are no previous lookups', () => {
        const vehicle = VehicleFactory.build({
          previousLookupDate: undefined,
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.queryByText('Last Queried:')).not.toBeInTheDocument()
      })

      it('should show the previous lookup field when there is a previous lookup', () => {
        const vehicle = VehicleFactory.build({
          previousLookupDate: '2023-07-12T13:17:54.000Z',
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.queryByText('Last Queried:')).toBeInTheDocument()
      })

      it('should show the number of new violations since a previous lookup', () => {
        const vehicle = VehicleFactory.build({
          previousLookupDate: '2023-07-12T13:17:54.000Z',
          previousViolationCount: 2,
          violationsCount: 3,
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.queryByText('(1 new) 3')).toBeInTheDocument()
      })
    })

    describe('old-style display', () => {
      it("should describe the region as 'State' when it is a U.S. state", () => {
        const vehicle = VehicleFactory.build({
          state: 'NY',
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('State:')).toBeInTheDocument()

        expect(screen.queryByText('Province:')).not.toBeInTheDocument()
        expect(screen.queryByText('Region:')).not.toBeInTheDocument()
        expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
      })

      it("should describe the region as 'Province' when it is a Canadian province", () => {
        const vehicle = VehicleFactory.build({
          state: 'AB',
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('Province:')).toBeInTheDocument()

        expect(screen.queryByText('State:')).not.toBeInTheDocument()
        expect(screen.queryByText('Region:')).not.toBeInTheDocument()
        expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
      })

      it("should describe the region as 'Territory' when it is a U.S. territory", () => {
        const vehicle = VehicleFactory.build({
          state: 'GU',
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('Territory:')).toBeInTheDocument()

        expect(screen.queryByText('Province:')).not.toBeInTheDocument()
        expect(screen.queryByText('State:')).not.toBeInTheDocument()
        expect(screen.queryByText('Region:')).not.toBeInTheDocument()
      })

      it("should describe the region as 'Territory' when it is a Canadian territory", () => {
        const vehicle = VehicleFactory.build({
          state: 'NT',
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('Territory:')).toBeInTheDocument()

        expect(screen.queryByText('Province:')).not.toBeInTheDocument()
        expect(screen.queryByText('State:')).not.toBeInTheDocument()
        expect(screen.queryByText('Region:')).not.toBeInTheDocument()
      })

      it("should describe the region as 'Region' when it is a District of Columbia plate", () => {
        const vehicle = VehicleFactory.build({
          state: 'DC',
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('Region:')).toBeInTheDocument()

        expect(screen.queryByText('Province:')).not.toBeInTheDocument()
        expect(screen.queryByText('State:')).not.toBeInTheDocument()
        expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
      })

      it("should describe the region as 'Region' when it is a U.S. commonwealth", () => {
        const vehicle = VehicleFactory.build({
          state: 'PR',
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('Region:')).toBeInTheDocument()

        expect(screen.queryByText('Province:')).not.toBeInTheDocument()
        expect(screen.queryByText('State:')).not.toBeInTheDocument()
        expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
      })

      it("should describe the region as 'Region' when it is a country", () => {
        const vehicle = VehicleFactory.build({
          state: 'MX',
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('Region:')).toBeInTheDocument()

        expect(screen.queryByText('Province:')).not.toBeInTheDocument()
        expect(screen.queryByText('State:')).not.toBeInTheDocument()
        expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
      })

      it("should describe the region as 'Region' when it is the U.S. State Dept.", () => {
        const vehicle = VehicleFactory.build({
          state: 'DP',
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('Region:')).toBeInTheDocument()

        expect(screen.queryByText('Province:')).not.toBeInTheDocument()
        expect(screen.queryByText('State:')).not.toBeInTheDocument()
        expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
      })

      it("should describe the region as 'Region' when it is a foreign plate", () => {
        const vehicle = VehicleFactory.build({
          state: 'FO',
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('Region:')).toBeInTheDocument()

        expect(screen.queryByText('Province:')).not.toBeInTheDocument()
        expect(screen.queryByText('State:')).not.toBeInTheDocument()
        expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
      })

      it("should describe the region as 'Region' when it is an unknown region, e.g. '99'", () => {
        const vehicle = VehicleFactory.build({
          state: '99',
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('Region:')).toBeInTheDocument()

        expect(screen.queryByText('Province:')).not.toBeInTheDocument()
        expect(screen.queryByText('State:')).not.toBeInTheDocument()
        expect(screen.queryByText('Territory:')).not.toBeInTheDocument()
      })

      it('should not show fines fields when there are no violations', () => {
        const vehicle = VehicleFactory.build({
          violations: [],
          violationsCount: 0,
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.queryByText('Fined:')).not.toBeInTheDocument()
        expect(screen.queryByText('Owed:')).not.toBeInTheDocument()
        expect(screen.queryByText('In judgment:')).not.toBeInTheDocument()
        expect(screen.queryByText('Interest:')).not.toBeInTheDocument()
        expect(screen.queryByText('Penalties:')).not.toBeInTheDocument()
        expect(screen.queryByText('Reductions:')).not.toBeInTheDocument()
        expect(screen.queryByText('Paid:')).not.toBeInTheDocument()
        expect(screen.queryByText('Total:')).not.toBeInTheDocument()
      })

      it('should show plate types when they are present on a lookup', () => {
        const vehicle = VehicleFactory.build({
          plateTypes: ['NYS'],
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.getByText('Plate type:')).toBeInTheDocument()
        expect(screen.getByText('New York Senate')).toBeInTheDocument()
      })

      it('should not show the previous lookup field when there are no previous lookups', () => {
        const vehicle = VehicleFactory.build({
          previousLookupDate: undefined,
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.queryByText('Last Queried:')).not.toBeInTheDocument()
      })

      it('should show the previous lookup field when there is a previous lookup', () => {
        const vehicle = VehicleFactory.build({
          previousLookupDate: '2023-07-12T13:17:54.000Z',
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.queryByText('Last Queried:')).toBeInTheDocument()
      })

      it('should show the number of new violations since a previous lookup', () => {
        const vehicle = VehicleFactory.build({
          previousLookupDate: '2023-07-12T13:17:54.000Z',
          previousViolationCount: 2,
          violationsCount: 3,
        })

        render(
          <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
            <LookupInfo vehicle={vehicle} />
          </CookiesProvider>,
        )

        expect(screen.queryByText('(1 new) 3')).toBeInTheDocument()
      })
    })
  })
})
