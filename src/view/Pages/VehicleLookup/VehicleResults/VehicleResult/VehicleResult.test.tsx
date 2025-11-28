import React from 'react'
import { render, screen } from '@testing-library/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { SettingsContext } from 'context/SettingsContext/SettingsContext'

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
    const mockedSettings = {
      getSetting: jest.fn(),
      removeSetting: jest.fn(),
      updateSetting: jest.fn(),
    }

    render(
      <SettingsContext.Provider value={mockedSettings}>
        <VehicleResult
          index={0}
          refreshLookupFunction={refreshLookupFunction}
          removeLookupFunction={removeLookupFunction}
          showViolationsList={true}
          vehicleDisplayResult={vehicleDisplayResult}
        />
      </SettingsContext.Provider>,
    )

    const vehicleResult = screen.getByTestId(
      `lookup-${vehicle.uniqueIdentifier}`,
    )
    expect(vehicleResult).toBeInTheDocument()
  })

  describe('new-style display', () => {
    it('shows the violation list when `showViolationsList` is true', () => {
      const mockedSettings = {
        getSetting: jest.fn().mockReturnValueOnce(true),
        removeSetting: jest.fn(),
        updateSetting: jest.fn(),
      }

      render(
        <SettingsContext.Provider value={mockedSettings}>
          <VehicleResult
            index={0}
            refreshLookupFunction={refreshLookupFunction}
            removeLookupFunction={removeLookupFunction}
            showViolationsList={true}
            vehicleDisplayResult={vehicleDisplayResult}
          />
        </SettingsContext.Provider>,
      )

      const violationCardList = screen.getByTestId('violation-card-list')
      expect(violationCardList).toBeInTheDocument()
    })

    it('hides the violation list when `showViolationsList` is false', () => {
      const mockedSettings = {
        getSetting: jest.fn().mockReturnValueOnce(true),
        removeSetting: jest.fn(),
        updateSetting: jest.fn(),
      }

      render(
        <SettingsContext.Provider value={mockedSettings}>
          <VehicleResult
            index={0}
            refreshLookupFunction={refreshLookupFunction}
            removeLookupFunction={removeLookupFunction}
            showViolationsList={false}
            vehicleDisplayResult={vehicleDisplayResult}
          />
        </SettingsContext.Provider>,
      )

      const violationCardList = screen.queryByTestId('violation-card-list')
      expect(violationCardList).toBeNull()
    })
  })

  describe('old-style display', () => {
    it('shows the violation list when `showViolationsList` is true', () => {
      const mockedSettings = {
        getSetting: jest.fn().mockReturnValueOnce(false),
        removeSetting: jest.fn(),
        updateSetting: jest.fn(),
      }

      render(
        <SettingsContext.Provider value={mockedSettings}>
          <VehicleResult
            index={0}
            refreshLookupFunction={refreshLookupFunction}
            removeLookupFunction={removeLookupFunction}
            showViolationsList={true}
            vehicleDisplayResult={vehicleDisplayResult}
          />
        </SettingsContext.Provider>,
      )

      const violationCardList = screen.getByTestId('vehicle-violations-list')
      expect(violationCardList).toBeInTheDocument()
    })

    it('hides the violation list when `showViolationsList` is false', () => {
      const mockedSettings = {
        getSetting: jest.fn().mockReturnValueOnce(false),
        removeSetting: jest.fn(),
        updateSetting: jest.fn(),
      }

      render(
        <SettingsContext.Provider value={mockedSettings}>
          <VehicleResult
            index={0}
            refreshLookupFunction={refreshLookupFunction}
            removeLookupFunction={removeLookupFunction}
            showViolationsList={false}
            vehicleDisplayResult={vehicleDisplayResult}
          />
        </SettingsContext.Provider>,
      )

      const violationCardList = screen.queryByTestId('vehicle-violations-list')
      expect(violationCardList).toBeNull()
    })
  })
})
