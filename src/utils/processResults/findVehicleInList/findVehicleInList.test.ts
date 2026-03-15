import { VehicleFactory } from '__fixtures__/models/Vehicle'

import findVehicleInList from './findVehicleInList'

describe('findVehicleInList', () => {
  describe('vehicle is in list', () => {
    it('should return true if the vehicle has the same state and plate', () => {
      const plate = 'ABC1234'
      const plateTypes = undefined
      const state = 'NY'

      const vehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle: VehicleFactory.build({ plate, plateTypes, state }),
      }

      const duplicateVehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle: VehicleFactory.build({ plate, plateTypes, state }),
      }

      expect(
        findVehicleInList(
          [duplicateVehicleDisplayResult],
          vehicleDisplayResult,
        ),
      ).toBeTruthy()
    })

    it('should return true if the vehicle has the same state, plate, and plate types', () => {
      const plate = 'ABC1234'
      const plateTypes = [
        'AGC',
        'APP',
        'CHC',
        'CMB',
        'COM',
        'CSP',
        'FAR',
        'HAC',
        'IRP',
        'LOC',
        'ORC',
        'RGC',
        'SPC',
        'STG',
        'THC',
        'TRC',
      ]
      const state = 'NY'

      const vehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle: VehicleFactory.build({ plate, plateTypes, state }),
      }

      const duplicateVehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle: VehicleFactory.build({ plate, plateTypes, state }),
      }

      expect(
        findVehicleInList(
          [duplicateVehicleDisplayResult],
          vehicleDisplayResult,
        ),
      ).toBeTruthy()
    })
  })

  describe('vehicle is not in list', () => {
    it('should return false if the plate does not match', () => {
      const plateTypes = undefined
      const state = 'NY'

      const vehicle = VehicleFactory.build({
        plate: 'ABC1234',
        plateTypes,
        state,
      })
      const vehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle,
      }

      const duplicateVehicle = VehicleFactory.build({
        plate: 'XXX1234',
        plateTypes,
        state,
      })
      const duplicateVehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle: duplicateVehicle,
      }

      expect(
        findVehicleInList(
          [duplicateVehicleDisplayResult],
          vehicleDisplayResult,
        ),
      ).toBeFalsy()
    })

    it('should return false if the state does not match', () => {
      const plate = 'ABC1234'
      const plateTypes = undefined

      const vehicle = VehicleFactory.build({
        plate,
        plateTypes,
        state: 'NY',
      })
      const vehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle,
      }

      const duplicateVehicle = VehicleFactory.build({
        plate,
        plateTypes,
        state: 'NJ',
      })
      const duplicateVehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle: duplicateVehicle,
      }

      expect(
        findVehicleInList(
          [duplicateVehicleDisplayResult],
          vehicleDisplayResult,
        ),
      ).toBeFalsy()
    })

    it('should return false if the state and plate do not match', () => {
      const plateTypes = undefined

      const vehicle = VehicleFactory.build({
        plate: 'ABC1234',
        plateTypes,
        state: 'NY',
      })
      const vehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle,
      }

      const duplicateVehicle = VehicleFactory.build({
        plate: 'XXX1234',
        plateTypes,
        state: 'NJ',
      })
      const duplicateVehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle: duplicateVehicle,
      }

      expect(
        findVehicleInList(
          [duplicateVehicleDisplayResult],
          vehicleDisplayResult,
        ),
      ).toBeFalsy()
    })

    it('should return false if the state and plate match, but not the plate types', () => {
      const plate = 'ABC1234'
      const state = 'NY'

      const vehicle = VehicleFactory.build({
        plate,
        plateTypes: [
          'AGC',
          'APP',
          'CHC',
          'CMB',
          'COM',
          'CSP',
          'FAR',
          'HAC',
          'IRP',
          'LOC',
          'ORC',
          'RGC',
          'SPC',
          'STG',
          'THC',
          'TRC',
        ],
        state,
      })
      const vehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle,
      }

      const duplicateVehicle = VehicleFactory.build({
        plate,
        plateTypes: undefined,
        state,
      })
      const duplicateVehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle: duplicateVehicle,
      }

      expect(
        findVehicleInList(
          [duplicateVehicleDisplayResult],
          vehicleDisplayResult,
        ),
      ).toBeFalsy()
    })

    it('should return false if queried vehicle is a placeholder for an unsuccessful query', () => {
      const plateTypes = undefined

      const actualVehicle = VehicleFactory.build({
        plate: 'ABC1234',
        plateTypes,
        state: 'NY',
      })

      const actualVehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: true,
        vehicle: actualVehicle,
      }

      const placeholderVehicleDisplayResult = {
        expandResults: false,
        fromPreviousLookupUniqueIdentifier: false,
        isSuccessfulLookup: false as const,
        vehicle: {
          uniqueIdentifier: 'abcd1234',
        },
      }

      expect(
        findVehicleInList(
          [actualVehicleDisplayResult],
          placeholderVehicleDisplayResult,
        ),
      ).toBeFalsy()
    })
  })
})
