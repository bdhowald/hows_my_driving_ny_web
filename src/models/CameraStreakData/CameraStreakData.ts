type CameraStreakDataComponent = {
  maxStreak: number
  streakEnd: string | null
  streakStart: string | null
  total: number
}

type CameraStreakData = {
  cameraViolations: CameraStreakDataComponent
  redLightCameraViolations: CameraStreakDataComponent
  schoolZoneSpeedCameraViolations: CameraStreakDataComponent
}

export default CameraStreakData
