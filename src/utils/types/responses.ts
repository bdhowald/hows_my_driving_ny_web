export type VehicleLookup = {
  vehicle: Vehicle,
  successfulLookup: boolean,
}

export type Vehicle = {
  cameraStreakData: {
    maxStreak: number,
    streakEnd: string,
    streakStart: string,
  },
  fines: {
    totalFined: number,
    totalOutstanding: number,
    totalPaid: number,
    totalReduced: number,
  },
  plate: string,
  plateTypes: string[],
  previousLookupDate: string,
  previousViolationCount: number,
  state: string,
  timesQueried: number,
  violations: Violation[],
  violationsCount: number,
}

export type VehicleQueryResponse = {
  data: VehicleLookup[]
}

export type Violation = {
  amountDue: number,
  dateFirstObserved: string,
  feetFromCurb: string,
  fineAmount: number,
  formattedTime: string,
  toHoursInEffect: string,
  houseNumber: string,
  humanizedDescription: string,
  interestAmount: number,
  intersectingStreet: string,
  issueDate: string,
  issuerCode: string,
  issuerCommand: string,
  issuerPrecinct: null,
  issuingAgency: string,
  lawSection: string,
  location: string,
  paymentAmount: number,
  penaltyAmount: number,
  plateId: string,
  plateType: string,
  reductionAmount: number,
  registrationState: string,
  streetCode1: string,
  streetCode2: string,
  streetCode3: string,
  streetName: string,
  subDivision: string,
  summonsImage: {
    url: string,
    description: string
  },
  summonsNumber: string,
  vehicleBodyType: string,
  vehicleColor: string,
  vehicleExpirationDate: string,
  vehicleMake: string,
  vehicleYear: string,
  violationCode: string,
  violationCounty: string,
  violationInFrontOfOrOpposite: string,
  violationLegalCode: string,
  violationLocation: string,
  violationPostCode: string,
  violationPrecinct: number,
  violationTime: string,
}