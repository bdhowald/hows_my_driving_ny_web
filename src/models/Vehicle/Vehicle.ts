import CameraStreakData from 'models/CameraStreakData/CameraStreakData'
import VehicleFineData from 'models/VehicleFineData/VehicleFineData'
import Violation from 'models/Violation/Violation'

type Vehicle = {
  cameraStreakData: CameraStreakData
  expandResults?: boolean
  fines: VehicleFineData
  fromPreviousLookupUniqueIdentifier?: boolean
  lookupDate: string
  plate: string
  plateTypes: string[] | undefined
  previousLookupDate: string | undefined
  previousViolationCount: number | undefined
  rectifiedPlate: string
  state: string
  timesQueried: number
  tweetParts: string[]
  uniqueIdentifier: string
  violations: Violation[]
  violationsCount: number
}

export default Vehicle
