import { Factory } from 'fishery'

import Violation from 'models/Violation/Violation'

export const ViolationFactory = Factory.define<Violation>(({ sequence }) => ({
  amountDue: undefined,
  dateFirstObserved: '0',
  daysParkingInEffect: 'YYYYYYY',
  feetFromCurb: '0',
  fineAmount: undefined,
  formattedTime: '2024-11-07T22:47:00.000-05:00',
  formattedTimeEastern: '2024-11-07T22:47:00.000-05:00',
  formattedTimeUtc: '2024-11-08T03:47:00.000Z',
  fromDatabases: [
    {
      endpoint: 'https://data.cityofnewyork.us/resource/jt7v-77mi.json',
      name: 'Parking Violations Issued - Fiscal Year 2014',
    },
  ],
  fromHoursInEffect: undefined,
  houseNumber: '8002',
  humanizedDescription: 'No Standing - Bus Stop',
  interestAmount: undefined,
  intersectingStreet: undefined,
  issueDate: '2013-08-30T00:00:00.000',
  issuerCode: '357743',
  issuerCommand: 'T302',
  issuerPrecinct: 68,
  issuingAgency: 'NYPD Traffic',
  judgmentEntryDate: undefined,
  lawSection: '408',
  location: '8002 3rd Ave',
  paymentAmount: undefined,
  penaltyAmount: undefined,
  plateId: 'T327SD',
  plateType: 'PAS',
  reductionAmount: undefined,
  registrationState: 'NY',
  streetCode1: '5280',
  streetCode2: '10580',
  streetCode3: '10630',
  streetName: '3rd Ave',
  subDivision: 'c3',
  summonsImage: undefined,
  summonsNumber: (sequence + 7310127602).toString(),
  toHoursInEffect: undefined,
  vehicleBodyType: '4DSD',
  vehicleColor: 'GY',
  vehicleExpirationDate: '20140203',
  vehicleMake: 'CADIL',
  vehicleYear: '2013',
  violationCode: '19',
  violationCounty: 'Brooklyn',
  violationInFrontOfOrOpposite: 'F',
  violationLegalCode: undefined,
  violationLocation: '0068',
  violationPostCode: '32 -',
  violationPrecinct: 68,
  violationTime: '0211P',
  getBorough: () => 'Brooklyn',
  getLocationDescription: () => '',
  getTotalFined: () => 123,
  getViolationDate: () => '11/07/2024',
  getViolationDateTime: () => '11/07/2024 10:47 PM',
  getViolationTime: () => '10:47 PM',
  isCameraViolation: () => false,
}))

export const BusLaneCameraViolationFactory = ViolationFactory.params({
  humanizedDescription: 'Bus Lane Violation',
  isCameraViolation: () => true,
  violationCode: '05',
})

export const MobileBusLaneCameraViolationFactory = ViolationFactory.params({
  humanizedDescription: 'Mobile Bus Lane Violation',
  isCameraViolation: () => true,
  violationCode: '12',
})

export const RedLightCameraViolationFactory = ViolationFactory.params({
  humanizedDescription: 'Failure to Stop at Red Light',
  isCameraViolation: () => true,
  violationCode: '07',
})

export const SchoolZoneSpeedCameraViolationFactory = ViolationFactory.params({
  humanizedDescription: 'School Zone Speed Camera Violation',
  isCameraViolation: () => true,
  violationCode: '36',
})

export const ViolationInJudgmentFactory = ViolationFactory.params({
  judgmentEntryDate: '2024-11-05',
})
