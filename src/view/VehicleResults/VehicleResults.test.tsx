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
        isSuccessfulLookup: true,
        vehicle,
      }
      const ref = renderHook(() => useRef<HTMLDivElement>(null)).result.current

      render(
        <CookiesProvider cookies={new Cookies('useNewStyleDisplay=true;')}>
          <VehicleResults
            existingQueriesInFlight={false}
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
        isSuccessfulLookup: true,
        vehicle,
      }
      const ref = renderHook(() => useRef<HTMLDivElement>(null)).result.current

      render(
        <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
          <VehicleResults
            existingQueriesInFlight={false}
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

    it('should render a shimmer component when existing queries are in flight', () => {
      const vehicle = VehicleFactory.build()
      const vehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle,
      }
      const ref = renderHook(() => useRef<HTMLDivElement>(null)).result.current

      render(
        <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
          <VehicleResults
            existingQueriesInFlight={true}
            lookupInFlight={false}
            refreshLookupFunction={refreshLookupFunction}
            removeLookupFunction={removeLookupFunction}
            scrollRef={ref}
            vehicleDisplayResults={[vehicleDisplayResult]}
          />
          ,
        </CookiesProvider>,
      )

      expect(screen.getByTestId('shimmer-loader')).toBeInTheDocument()
    })

    it('should render a shimmer component when a new query is in flight', () => {
      const vehicle = VehicleFactory.build()
      const vehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle,
      }
      const ref = renderHook(() => useRef<HTMLDivElement>(null)).result.current

      render(
        <CookiesProvider cookies={new Cookies('useNewStyleDisplay=false;')}>
          <VehicleResults
            existingQueriesInFlight={false}
            lookupInFlight={true}
            refreshLookupFunction={refreshLookupFunction}
            removeLookupFunction={removeLookupFunction}
            scrollRef={ref}
            vehicleDisplayResults={[vehicleDisplayResult]}
          />
          ,
        </CookiesProvider>,
      )

      expect(screen.getByTestId('shimmer-loader')).toBeInTheDocument()
    })
  })
})
