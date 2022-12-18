const LOCALE_ARGS: {
  day: '2-digit', month: '2-digit', year: 'numeric'
} = {
  year: 'numeric', month: '2-digit', day: '2-digit'
}

export class Violation {
  amountDue: number
  dateFirstObserved: string
  feetFromCurb: string
  fineAmount: number
  formattedTime: string
  fromHoursInEffect: string
  houseNumber: string
  humanizedDescription: string
  interestAmount: number
  intersectingStreet: string
  issueDate: string
  issuerCode: string
  issuerCommand: string
  issuerPrecinct: string
  issuingAgency: string
  lawSection: string
  location: string
  paymentAmount: number
  penaltyAmount: number
  plateId: string
  plateType: string
  reductionAmount: number
  registrationState: string
  streetCode1: string
  streetCode2: string
  streetCode3: string
  streetName: string
  subDivision: string
  summonsImage: {
    url: string
    description: string
  }
  summonsNumber: string
  toHoursInEffect: string
  vehicleBodyType: string
  vehicleColor: string
  vehicleExpirationDate: string
  vehicleMake: string
  vehicleYear: string
  violationCode: string
  violationCounty: string
  violationInFrontOfOrOpposite: string
  violationLegalCode: string
  violationLocation: string
  violationPostCode: string
  violationPrecinct: number
  violationTime: string

  constructor(data: Violation) {
    this.amountDue = data.amountDue
    this.dateFirstObserved = data.dateFirstObserved
    this.feetFromCurb = data.feetFromCurb
    this.fineAmount = data.fineAmount
    this.formattedTime = data.formattedTime
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
    this.lawSection = data.lawSection
    this.location = data.location
    this.paymentAmount = data.paymentAmount
    this.penaltyAmount = data.penaltyAmount
    this.plateId = data.plateId
    this.plateType = data.plateType
    this.reductionAmount = data.reductionAmount
    this.registrationState = data.registrationState
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
    return `${this.location == null ? '' : ('(' + this.location + ')')}`
  }

  getTotalFined(): number | null {
    if (!this.fineAmount) {
      return null
    }
  
    const fineAmount = this.fineAmount
    const interestAmount = this.interestAmount ?? 0
    const penaltyAmount = this.penaltyAmount ?? 0
    const reductionAmount = this.reductionAmount ?? 0
  
    return (fineAmount + interestAmount + penaltyAmount - reductionAmount)
  }

  getViolationTime(): string {
    return Date.parse(this.formattedTime)
      ? new Date(this.formattedTime).toLocaleDateString('en-US', LOCALE_ARGS)
      : 'N/A'
  }
}