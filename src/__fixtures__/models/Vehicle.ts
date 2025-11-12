import { Factory } from 'fishery'

import CameraStreakData from 'models/CameraStreakData/CameraStreakData'
import Vehicle from 'models/Vehicle/Vehicle'
import Violation from 'models/Violation/Violation'

import {
  CameraStreakDataFactory,
  CameraStreakDataTransientParams,
} from './CameraStreakData'
import { ViolationFactory } from './Violation'

type VehicleTransientParams = {
  numViolations: number
} & CameraStreakDataTransientParams

export const VehicleFactory = Factory.define<Vehicle, VehicleTransientParams>(
  ({ params, transientParams }) => {
    let cameraStreakData: CameraStreakData

    if (transientParams.noCameraData) {
      cameraStreakData = CameraStreakDataFactory.build(
        {},
        { transient: { noCameraData: true } },
      )
    } else if (
      transientParams.eligibleByRedLightCameraViolations &&
      transientParams.eligibleBySpeedCameraViolations
    ) {
      cameraStreakData = CameraStreakDataFactory.build(
        {},
        {
          transient: {
            eligibleByRedLightCameraViolations: true,
            eligibleBySpeedCameraViolations: true,
          },
        },
      )
    } else if (transientParams.eligibleByRedLightCameraViolations) {
      cameraStreakData = CameraStreakDataFactory.build(
        {},
        {
          transient: {
            eligibleByRedLightCameraViolations: true,
          },
        },
      )
    } else if (transientParams.eligibleBySpeedCameraViolations) {
      cameraStreakData = CameraStreakDataFactory.build(
        {},
        {
          transient: {
            eligibleBySpeedCameraViolations: true,
          },
        },
      )
    } else {
      cameraStreakData = CameraStreakDataFactory.build()
    }

    let violations: Violation[]

    if (params.violations) {
      // if we have passed in violations, use them
      violations = params.violations
    } else if (transientParams.numViolations) {
      // if we have a number of violations, use that
      violations = [
        ...Array(transientParams.numViolations)
          .fill(0)
          .map((_) => ViolationFactory.build()),
      ]
    } else {
      // else a default array of violations
      violations = [
        ViolationFactory.build(),
        ViolationFactory.build(),
        ViolationFactory.build(),
      ]
    }

    return {
      cameraStreakData,
      expandResults: false,
      fines: {
        totalFined: 3850,
        totalInJudgment: 0,
        totalOutstanding: 50,
        totalPaid: 3780,
        totalReduced: 20,
      },
      fromPreviousLookupUniqueIdentifier: false,
      lookupDate: '2025-09-01T22:52:02.000-04:00',
      lookupDateEastern: '2025-09-01T22:52:02.000-04:00',
      lookupDateUtc: '2025-09-01T22:52:02.000Z',
      plate: 'ABC1234',
      plateTypes: undefined,
      previousLookupDate: undefined,
      previousViolationCount: undefined,
      rectifiedPlate: 'ABC1234',
      state: 'NY',
      timesQueried: 2,
      tweetParts: ['tweet parts'],
      uniqueIdentifier: 'e5f6g7h8',
      violations,
      violationsCount: params.violations?.length ?? 3,
    }
  },
)
