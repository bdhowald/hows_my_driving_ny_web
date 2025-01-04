import React, { useRef } from 'react'
import { render, renderHook, screen } from '@testing-library/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import VehicleResults from './VehicleResults'

describe('VehicleResults', () => {
  const refreshLookupFunction: () => Promise<void> = () => new Promise(() => {})
  const removeLookupFunction = () => null

  describe('renders without error', () => {
    it('should render successfully', () => {
      const vehicle = VehicleFactory.build()
      const vehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        vehicle,
      }
      const ref = renderHook(() => useRef<HTMLDivElement>(null)).result.current

      render(
        <VehicleResults
          lookupInFlight={false}
          refreshLookupFunction={refreshLookupFunction}
          removeLookupFunction={removeLookupFunction}
          scrollRef={ref}
          vehicleDisplayResults={[vehicleDisplayResult]}
        />,
      )

      expect(
        screen.getByTestId(`lookup-${vehicle.uniqueIdentifier}`),
      ).toBeInTheDocument()
    })
  })
})
