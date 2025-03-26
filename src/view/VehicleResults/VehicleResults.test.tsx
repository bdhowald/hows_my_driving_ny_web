import React, { useRef } from 'react'
import { Cookies, CookiesProvider } from 'react-cookie'
import { render, renderHook, screen } from '@testing-library/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import VehicleResults from './VehicleResults'

describe('VehicleResults', () => {
  const refreshLookupFunction: () => Promise<void> = () => new Promise(() => {})
  const removeLookupFunction = () => null

  describe('renders without error', () => {
    it('should render successfully with the new-style display', () => {
      const vehicle = VehicleFactory.build()
      const vehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        vehicle,
      }
      const ref = renderHook(() => useRef<HTMLDivElement>(null)).result.current

      render(
        <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
          <VehicleResults
            lookupInFlight={false}
            refreshLookupFunction={refreshLookupFunction}
            removeLookupFunction={removeLookupFunction}
            scrollRef={ref}
            vehicleDisplayResults={[vehicleDisplayResult]}
          />
          ,
        </CookiesProvider>,
      )

      expect(
        screen.getByTestId(`lookup-${vehicle.uniqueIdentifier}`),
      ).toBeInTheDocument()
    })

    it('should render successfully with the old-style display', () => {
      const vehicle = VehicleFactory.build()
      const vehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        vehicle,
      }
      const ref = renderHook(() => useRef<HTMLDivElement>(null)).result.current

      render(
        <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
          <VehicleResults
            lookupInFlight={false}
            refreshLookupFunction={refreshLookupFunction}
            removeLookupFunction={removeLookupFunction}
            scrollRef={ref}
            vehicleDisplayResults={[vehicleDisplayResult]}
          />
          ,
        </CookiesProvider>,
      )

      expect(
        screen.getByTestId(`lookup-${vehicle.uniqueIdentifier}`),
      ).toBeInTheDocument()
    })
  })
})
