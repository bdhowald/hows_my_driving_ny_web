import { Violation } from 'models/Violation'

export type VehicleLookup = {
  vehicle: Vehicle,
  successfulLookup: boolean,
}

export type Vehicle = {
  cameraStreakData: {
    cameraViolations: {
      maxStreak: number,
      streakEnd: string,
      streakStart: string,
    },
    redLightCameraViolations: {
      maxStreak: number,
      streakEnd: string,
      streakStart: string,
    },
    schoolZoneSpeedCameraViolations: {
      maxStreak: number,
      streakEnd: string,
      streakStart: string,
    },
  },
  expandResults?: boolean,
  fines: {
    totalFined: number,
    totalInJudgment: number,
    totalOutstanding: number,
    totalPaid: number,
    totalReduced: number,
  },
  fromPreviousLookupUniqueIdentifier?: boolean,
  plate: string,
  plateTypes: string[],
  previousLookupDate: string,
  previousViolationCount: number,
  rectifiedPlate: string,
  state: string,
  timesQueried: number,
  uniqueIdentifier: string,
  violations: Violation[],
  violationsCount: number,
}

export type VehicleQueryResponse = {
  data: VehicleLookup[]
}
