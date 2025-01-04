import { Factory } from 'fishery'

import CameraStreakData from 'models/CameraStreakData/CameraStreakData'

export type CameraStreakDataTransientParams = {
  eligibleByRedLightCameraViolations?: boolean
  eligibleBySpeedCameraViolations?: boolean
  noCameraData?: boolean
}

const noCameraViolations = {
  cameraViolations: {
    maxStreak: 0,
    streakEnd: null,
    streakStart: null,
    total: 0,
  },
  redLightCameraViolations: {
    maxStreak: 0,
    streakEnd: null,
    streakStart: null,
    total: 0,
  },
  schoolZoneSpeedCameraViolations: {
    maxStreak: 0,
    streakEnd: null,
    streakStart: null,
    total: 0,
  },
}

const redLightCameraViolationsForDvaaEligibleVehicle = {
  ...{
    maxStreak: 7,
    streakEnd: '2024-05-06T14:59:00.000-04:00',
    streakStart: '2023-06-27T12:43:00.000-04:00',
    total: 12,
  },
}
const redLightCameraViolationsForDvaaNonEligibleVehicle = {
  ...{
    maxStreak: 3,
    streakEnd: '2024-05-06T14:59:00.000-04:00',
    streakStart: '2023-06-27T12:43:00.000-04:00',
    total: 7,
  },
}

const speedCameraViolationsForDvaaEligibleVehicle = {
  ...{
    maxStreak: 17,
    streakEnd: '2024-10-07T10:02:00.000-04:00',
    streakStart: '2023-12-31T15:34:00.000-05:00',
    total: 22,
  },
}
const speedCameraViolationsForDvaaNonEligibleVehicle = {
  ...{
    maxStreak: 9,
    streakEnd: '2024-10-07T10:02:00.000-04:00',
    streakStart: '2023-12-31T15:34:00.000-05:00',
    total: 12,
  },
}

const dvaaEligibleByRedLightCameraViolations = {
  cameraViolations: {
    maxStreak: 16,
    streakEnd: '2024-10-12T16:51:00.000-04:00',
    streakStart: '2023-10-24T14:39:00.000-04:00',
    total:
      redLightCameraViolationsForDvaaEligibleVehicle.total +
      speedCameraViolationsForDvaaNonEligibleVehicle.total,
  },
  redLightCameraViolations: redLightCameraViolationsForDvaaEligibleVehicle,
  schoolZoneSpeedCameraViolations:
    speedCameraViolationsForDvaaNonEligibleVehicle,
}
const dvaaEligibleBySpeedCameraViolations = {
  cameraViolations: {
    maxStreak: 16,
    streakEnd: '2024-10-12T16:51:00.000-04:00',
    streakStart: '2023-10-24T14:39:00.000-04:00',
    total:
      redLightCameraViolationsForDvaaNonEligibleVehicle.total +
      speedCameraViolationsForDvaaEligibleVehicle.total,
  },
  redLightCameraViolations: redLightCameraViolationsForDvaaNonEligibleVehicle,
  schoolZoneSpeedCameraViolations: speedCameraViolationsForDvaaEligibleVehicle,
}
const dvaaEligibleByRedLightAndSpeedCameraViolations = {
  cameraViolations: {
    maxStreak: 20,
    streakEnd: '2024-10-12T16:51:00.000-04:00',
    streakStart: '2023-10-24T14:39:00.000-04:00',
    total:
      redLightCameraViolationsForDvaaEligibleVehicle.total +
      speedCameraViolationsForDvaaEligibleVehicle.total,
  },
  redLightCameraViolations: redLightCameraViolationsForDvaaEligibleVehicle,
  schoolZoneSpeedCameraViolations: speedCameraViolationsForDvaaEligibleVehicle,
}

export const CameraStreakDataFactory = Factory.define<
  CameraStreakData,
  CameraStreakDataTransientParams
>(({ transientParams }) => {
  if (transientParams.noCameraData) {
    return noCameraViolations
  }

  if (
    transientParams.eligibleByRedLightCameraViolations &&
    transientParams.eligibleBySpeedCameraViolations
  ) {
    return dvaaEligibleByRedLightAndSpeedCameraViolations
  }

  if (transientParams.eligibleByRedLightCameraViolations) {
    return dvaaEligibleByRedLightCameraViolations
  }

  if (transientParams.eligibleBySpeedCameraViolations) {
    return dvaaEligibleBySpeedCameraViolations
  }

  return {
    cameraViolations: {
      maxStreak: 5,
      streakEnd: '2024-10-12T16:51:00.000-04:00',
      streakStart: '2023-10-24T14:39:00.000-04:00',
      total: 9,
    },
    redLightCameraViolations: {
      maxStreak: 2,
      streakEnd: '2024-05-06T14:59:00.000-04:00',
      streakStart: '2023-06-27T12:43:00.000-04:00',
      total: 4,
    },
    schoolZoneSpeedCameraViolations: {
      maxStreak: 4,
      streakEnd: '2024-10-07T10:02:00.000-04:00',
      streakStart: '2023-12-31T15:34:00.000-05:00',
      total: 5,
    },
  }
})
