import L10N from 'constants/display'
import {
  BUS_LANE_CAMERA_VIOLATION_CODE,
  MOBILE_BUS_LANE_CAMERA_VIOLATION_CODE,
  MOBILE_MTA_BUS_STOP_VIOLATION_CODE,
  MOBILE_MTA_BUS_STOP_VIOLATION_HUMANIZED_DESCRIPTION,
  MOBILE_MTA_DOUBLE_PARKING_VIOLATION_CODE,
  MOBILE_MTA_DOUBLE_PARKING_VIOLATION_HUMANIZED_DESCRIPTION,
  RED_LIGHT_CAMERA_VIOLATION_CODE,
  SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_CODE,
} from 'constants/violations'

export type RawViolationData = {
  amountDue: number | undefined
  dateFirstObserved: string
  feetFromCurb: string | undefined
  fineAmount: number | undefined
  formattedTime: string
  fromDatabases: Array<{
    dataUpdatedAt: string
    endpoint: string
    name: string
  }>
  fromHoursInEffect: string | undefined
  houseNumber: string | undefined
  humanizedDescription: string
  interestAmount: number | undefined
  intersectingStreet: string | undefined
  issueDate: string
  issuerCode: string | undefined
  issuerCommand: string | undefined
  issuerPrecinct: number | undefined
  issuingAgency: string | undefined
  judgmentEntryDate: string | undefined
  lawSection: string | undefined
  location: string | undefined
  paymentAmount: number | undefined
  penaltyAmount: number | undefined
  plateId: string
  plateType: string
  reductionAmount: number | undefined
  registrationState: string
  sanitized: {
    issuingAgency: string | undefined
    vehicleBodyType: string | undefined
    violationStatus: string | undefined
  }
  streetCode1: string | undefined
  streetCode2: string | undefined
  streetCode3: string | undefined
  streetName: string | undefined
  subDivision: string | undefined
  summonsImage:
    | {
        url: string
        description: string
      }
    | undefined
  summonsNumber: string
  toHoursInEffect: string | undefined
  vehicleBodyType: string | undefined
  vehicleColor: string | undefined
  vehicleExpirationDate: string | undefined
  vehicleMake: string | undefined
  vehicleYear: string | undefined
  violationCode: string
  violationCounty: string | undefined
  violationInFrontOfOrOpposite: string | undefined
  violationLegalCode: string | undefined
  violationLocation: string | undefined
  violationPostCode: string | undefined
  violationPrecinct: number | undefined
  violationStatus: string | undefined
  violationTime: string | undefined
}

class Violation {
  amountDue: number | undefined
  dateFirstObserved: string
  feetFromCurb: string | undefined
  fineAmount: number | undefined
  formattedTime: string
  fromDatabases: Array<{
    dataUpdatedAt: string
    endpoint: string
    name: string
  }>
  fromHoursInEffect: string | undefined
  houseNumber: string | undefined
  humanizedDescription: string
  interestAmount: number | undefined
  intersectingStreet: string | undefined
  issueDate: string
  issuerCode: string | undefined
  issuerCommand: string | undefined
  issuerPrecinct: number | undefined
  issuingAgency: string | undefined
  judgmentEntryDate: string | undefined
  lawSection: string | undefined
  location: string | undefined
  paymentAmount: number | undefined
  penaltyAmount: number | undefined
  plateId: string
  plateType: string
  reductionAmount: number | undefined
  registrationState: string
  sanitized: {
    issuingAgency: string | undefined
    vehicleBodyType: string | undefined
    violationStatus: string | undefined
  }
  streetCode1: string | undefined
  streetCode2: string | undefined
  streetCode3: string | undefined
  streetName: string | undefined
  subDivision: string | undefined
  summonsImage:
    | {
        url: string
        description: string
      }
    | undefined
  summonsNumber: string
  toHoursInEffect: string | undefined
  vehicleBodyType: string | undefined
  vehicleColor: string | undefined
  vehicleExpirationDate: string | undefined
  vehicleMake: string | undefined
  vehicleYear: string | undefined
  violationCode: string
  violationCounty: string | undefined
  violationInFrontOfOrOpposite: string | undefined
  violationLegalCode: string | undefined
  violationLocation: string | undefined
  violationPostCode: string | undefined
  violationPrecinct: number | undefined
  violationStatus: string | undefined
  violationTime: string | undefined

  constructor(data: RawViolationData) {
    this.amountDue = data.amountDue
    this.dateFirstObserved = data.dateFirstObserved
    this.feetFromCurb = data.feetFromCurb
    this.fineAmount = data.fineAmount
    this.formattedTime = data.formattedTime
    this.fromDatabases = data.fromDatabases
    this.fromHoursInEffect = data.fromHoursInEffect
    this.houseNumber = data.houseNumber
    this.humanizedDescription = data.humanizedDescription
    this.interestAmount = data.interestAmount
    this.intersectingStreet = data.intersectingStreet
    this.issueDate = data.issueDate
    this.issuerCode = data.issuerCode
    this.issuerCommand = data.issuerCommand
    this.issuerPrecinct = data.issuerPrecinct
    this.issuingAgency = data.issuingAgency
    this.judgmentEntryDate = data.judgmentEntryDate
    this.lawSection = data.lawSection
    this.location = data.location
    this.paymentAmount = data.paymentAmount
    this.penaltyAmount = data.penaltyAmount
    this.plateId = data.plateId
    this.plateType = data.plateType
    this.reductionAmount = data.reductionAmount
    this.registrationState = data.registrationState
    this.sanitized = data.sanitized
    this.streetCode1 = data.streetCode1
    this.streetCode2 = data.streetCode2
    this.streetCode3 = data.streetCode3
    this.streetName = data.streetName
    this.subDivision = data.subDivision
    this.summonsImage = data.summonsImage
    this.summonsNumber = data.summonsNumber
    this.toHoursInEffect = data.toHoursInEffect
    this.vehicleBodyType = data.vehicleBodyType
    this.vehicleColor = data.vehicleColor
    this.vehicleExpirationDate = data.vehicleExpirationDate
    this.vehicleMake = data.vehicleMake
    this.vehicleYear = data.vehicleYear
    this.violationCode = data.violationCode
    this.violationCounty = data.violationCounty
    this.violationInFrontOfOrOpposite = data.violationInFrontOfOrOpposite
    this.violationLegalCode = data.violationLegalCode
    this.violationLocation = data.violationLocation
    this.violationPostCode = data.violationPostCode
    this.violationPrecinct = data.violationPrecinct
    this.violationTime = data.violationTime
  }

  getBorough(): string {
    return this.violationCounty ?? 'N/A'
  }

  getLocationDescription(): string {
    return this.location ? this.location : ''
  }

  getTotalFined(): number | null {
    if (!this.fineAmount) {
      return null
    }

    const fineAmount = this.fineAmount
    const interestAmount = this.interestAmount ?? 0
    const penaltyAmount = this.penaltyAmount ?? 0
    const reductionAmount = this.reductionAmount ?? 0

    return fineAmount + interestAmount + penaltyAmount - reductionAmount
  }

  getViolationDate(): string {
    return Date.parse(this.formattedTime)
      ? new Date(this.formattedTime).toLocaleDateString(
          'en-US',
          L10N.sitewide.dateFormat,
        )
      : 'N/A'
  }

  getViolationDateTime(): string {
    const datePart = new Date(this.formattedTime).toLocaleDateString(
      'en-US',
      L10N.sitewide.dateFormat,
    )
    const timePart = new Date(this.formattedTime).toLocaleTimeString(
      'en-US',
      L10N.sitewide.timeFormat,
    )
    return Date.parse(this.formattedTime) ? `${datePart} ${timePart}` : 'N/A'
  }

  getViolationTime(): string {
    return Date.parse(this.formattedTime)
      ? new Date(this.formattedTime).toLocaleTimeString(
          'en-US',
          L10N.sitewide.timeFormat,
        )
      : 'N/A'
  }

  isCameraViolation(): boolean {
    if (
      [
        BUS_LANE_CAMERA_VIOLATION_CODE,
        MOBILE_BUS_LANE_CAMERA_VIOLATION_CODE,
        RED_LIGHT_CAMERA_VIOLATION_CODE,
        SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_CODE,
      ].includes(this.violationCode)
    ) {
      return true
    }

    if (
      this.violationCode === MOBILE_MTA_BUS_STOP_VIOLATION_CODE &&
      this.humanizedDescription ===
        MOBILE_MTA_BUS_STOP_VIOLATION_HUMANIZED_DESCRIPTION
    ) {
      return true
    }

    if (
      this.violationCode === MOBILE_MTA_DOUBLE_PARKING_VIOLATION_CODE &&
      this.humanizedDescription ===
        MOBILE_MTA_DOUBLE_PARKING_VIOLATION_HUMANIZED_DESCRIPTION
    ) {
      return true
    }

    return false
  }
}

export default Violation
