import React from 'react'
import { Cookies, CookiesProvider } from 'react-cookie'
import { render, renderHook, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import VehicleResult from './VehicleResult'

describe('VehicleResult', () => {
  const refreshLookupFunction = jest.fn()
  const removeLookupFunction = jest.fn()

  const vehicle = VehicleFactory.build()

  const vehicleDisplayResult = {
    expandResults: false,
    fromPreviousLookupUniqueIdentifier: false,
    isSuccessfulLookup: true,
    vehicle: VehicleFactory.build(),
  } as const

  it('renders successfully', () => {
    render(
      <VehicleResult
        index={0}
        refreshLookupFunction={refreshLookupFunction}
        removeLookupFunction={removeLookupFunction}
        showViolationsList={true}
        vehicleDisplayResult={vehicleDisplayResult}
      />,
    )

    const vehicleResult = screen.getByTestId(
      `lookup-${vehicle.uniqueIdentifier}`,
    )
    expect(vehicleResult).toBeInTheDocument()
  })

  describe('new-style display', () => {
    it('shows the violation list when `showViolationsList` is true', () => {
      render(
        <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
          <VehicleResult
            index={0}
            refreshLookupFunction={refreshLookupFunction}
            removeLookupFunction={removeLookupFunction}
            showViolationsList={true}
            vehicleDisplayResult={vehicleDisplayResult}
          />
        </CookiesProvider>,
      )

      const violationCardList = screen.getByTestId('violation-card-list')
      expect(violationCardList).toBeInTheDocument()
    })

    it('hides the violation list when `showViolationsList` is false', () => {
      render(
        <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
          <VehicleResult
            index={0}
            refreshLookupFunction={refreshLookupFunction}
            removeLookupFunction={removeLookupFunction}
            showViolationsList={false}
            vehicleDisplayResult={vehicleDisplayResult}
          />
        </CookiesProvider>,
      )

      const violationCardList = screen.queryByTestId('violation-card-list')
      expect(violationCardList).toBeNull()
    })
  })

  describe('old-style display', () => {
    it('shows the violation list when `showViolationsList` is true', () => {
      render(
        <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
          <VehicleResult
            index={0}
            refreshLookupFunction={refreshLookupFunction}
            removeLookupFunction={removeLookupFunction}
            showViolationsList={true}
            vehicleDisplayResult={vehicleDisplayResult}
          />
        </CookiesProvider>,
      )

      const violationCardList = screen.getByTestId('vehicle-violations-list')
      expect(violationCardList).toBeInTheDocument()
    })

    it('hides the violation list when `showViolationsList` is false', () => {
      render(
        <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
          <VehicleResult
            index={0}
            refreshLookupFunction={refreshLookupFunction}
            removeLookupFunction={removeLookupFunction}
            showViolationsList={false}
            vehicleDisplayResult={vehicleDisplayResult}
          />
        </CookiesProvider>,
      )

      const violationCardList = screen.queryByTestId('vehicle-violations-list')
      expect(violationCardList).toBeNull()
    })
  })
})
