import Violation, { RawViolationData } from './Violation'

describe('Violation', () => {
  describe('functions', () => {
    describe('getBorough', () => {
      it('should return violation.violationCounty when it is present', () => {
        const violation = new Violation({
          violationCounty: 'Brooklyn',
        } as RawViolationData)

        expect(violation.getBorough()).toEqual('Brooklyn')
      })

      it("should return 'N/A' when it is present", () => {
        const violation = new Violation({} as RawViolationData)

        expect(violation.getBorough()).toEqual('N/A')
      })
    })

    describe('getLocationDescription', () => {
      it('should return violation.location when violation.location is present', () => {
        const location = '123 Fake Street'
        const violation = new Violation({ location } as RawViolationData)

        expect(violation.getLocationDescription()).toEqual(location)
      })

      it("should return 'N/A' when it is present", () => {
        const violation = new Violation({} as RawViolationData)

        expect(violation.getLocationDescription()).toEqual('')
      })
    })

    describe('getTotalFined', () => {
      it('should return null when fineAmount is null', () => {
        const violation = new Violation({} as RawViolationData)

        expect(violation.getTotalFined()).toEqual(null)
      })

      it('should return fineAmount when it is present and the only fine field present', () => {
        const fineAmount = 12.34
        const violation = new Violation({ fineAmount } as RawViolationData)

        expect(violation.getTotalFined()).toEqual(fineAmount)
      })

      it('should return fineAmount + interestAmount when those fields are the only fine fields present', () => {
        const fineAmount = 12.34
        const interestAmount = 1.5

        const violation = new Violation({
          fineAmount,
          interestAmount,
        } as RawViolationData)

        expect(violation.getTotalFined()).toEqual(fineAmount + interestAmount)
      })

      it('should return fineAmount + penaltyAmount when those fields are the only fine fields present', () => {
        const fineAmount = 12.34
        const penaltyAmount = 10.0

        const violation = new Violation({
          fineAmount,
          penaltyAmount,
        } as RawViolationData)

        expect(violation.getTotalFined()).toEqual(fineAmount + penaltyAmount)
      })

      it('should return fineAmount - reductionAmount when those fields are the only fields present', () => {
        const fineAmount = 12.34
        const reductionAmount = 5.0

        const violation = new Violation({
          fineAmount,
          reductionAmount,
        } as RawViolationData)

        expect(violation.getTotalFined()).toEqual(fineAmount - reductionAmount)
      })

      it('should return fineAmount + interestAmount + penaltyAmount when those fields are the only fine fields present', () => {
        const fineAmount = 12.34
        const interestAmount = 1.5
        const penaltyAmount = 10.0

        const violation = new Violation({
          fineAmount,
          interestAmount,
          penaltyAmount,
        } as RawViolationData)

        expect(violation.getTotalFined()).toEqual(
          fineAmount + interestAmount + penaltyAmount,
        )
      })

      it('should return fineAmount + interestAmount - reductionAmount when those fields are the only fine fields present', () => {
        const fineAmount = 12.34
        const interestAmount = 1.5
        const reductionAmount = 5.0

        const violation = new Violation({
          fineAmount,
          interestAmount,
          reductionAmount,
        } as RawViolationData)

        expect(violation.getTotalFined()).toEqual(
          fineAmount + interestAmount - reductionAmount,
        )
      })

      it('should return fineAmount + penaltyAmount - reductionAmount when those fields are the only fine fields present', () => {
        const fineAmount = 12.34
        const penaltyAmount = 10.0
        const reductionAmount = 5.0

        const violation = new Violation({
          fineAmount,
          penaltyAmount,
          reductionAmount,
        } as RawViolationData)

        expect(violation.getTotalFined()).toEqual(
          fineAmount + penaltyAmount - reductionAmount,
        )
      })

      it('should return fineAmount + interestAmount + penaltyAmount - reductionAmount when those fields are present', () => {
        const fineAmount = 12.34
        const interestAmount = 1.5
        const penaltyAmount = 10.0
        const reductionAmount = 5.0

        const violation = new Violation({
          fineAmount,
          interestAmount,
          penaltyAmount,
          reductionAmount,
        } as RawViolationData)

        expect(violation.getTotalFined()).toEqual(
          fineAmount + interestAmount + penaltyAmount - reductionAmount,
        )
      })
    })

    describe('getViolationDate', () => {
      it("should return 'N/A' when formattedTime is null", () => {
        const violation = new Violation({} as RawViolationData)

        expect(violation.getViolationDate()).toEqual('N/A')
      })

      it("should return 'N/A' when formattedTime is not a valid time", () => {
        const formattedTime = 'Not a real time'
        const violation = new Violation({ formattedTime } as RawViolationData)

        expect(violation.getViolationDate()).toEqual('N/A')
      })

      it('should return the date formatted in a U.S. locale string when formattedTime is a valid time', () => {
        const formattedTime = '2024-07-24T14:11:00.000-04:00'
        const violation = new Violation({ formattedTime } as RawViolationData)

        expect(violation.getViolationDate()).toEqual('07/24/2024')
      })
    })

    describe('getViolationDateTime', () => {
      it("should return 'N/A' when formattedTime is null", () => {
        const violation = new Violation({} as RawViolationData)

        expect(violation.getViolationDateTime()).toEqual('N/A')
      })

      it("should return 'N/A' when formattedTime is not a valid time", () => {
        const formattedTime = 'Not a real time'
        const violation = new Violation({ formattedTime } as RawViolationData)

        expect(violation.getViolationDateTime()).toEqual('N/A')
      })

      it('should return the time formatted in a U.S. locale string when formattedTime is a valid time', () => {
        const formattedTime = '2024-07-24T14:11:00.000-04:00'
        const violation = new Violation({ formattedTime } as RawViolationData)

        expect(violation.getViolationDateTime()).toEqual('07/24/2024 2:11 PM')
      })
    })

    describe('getViolationTime', () => {
      it("should return 'N/A' when formattedTime is null", () => {
        const violation = new Violation({} as RawViolationData)

        expect(violation.getViolationTime()).toEqual('N/A')
      })

      it("should return 'N/A' when formattedTime is not a valid time", () => {
        const formattedTime = 'Not a real time'
        const violation = new Violation({ formattedTime } as RawViolationData)

        expect(violation.getViolationTime()).toEqual('N/A')
      })

      it('should return the time formatted in a U.S. locale string when formattedTime is a valid time', () => {
        const formattedTime = '2024-07-24T14:11:00.000-04:00'
        const violation = new Violation({ formattedTime } as RawViolationData)

        expect(violation.getViolationTime()).toEqual('2:11 PM')
      })
    })

    describe('isCameraViolation', () => {
      it("should return false for a 'No Standing - Bus Stop' violation", () => {
        const violation = new Violation({
          violationCode: '19',
        } as RawViolationData)

        expect(violation.isCameraViolation()).toEqual(false)
      })

      it('should return true for a bus lane camera violation', () => {
        const violation = new Violation({
          violationCode: '5',
        } as RawViolationData)

        expect(violation.isCameraViolation()).toEqual(true)
      })

      it('should return true for a red light camera violation', () => {
        const violation = new Violation({
          violationCode: '7',
        } as RawViolationData)

        expect(violation.isCameraViolation()).toEqual(true)
      })

      it('should return true for a mobile bus lane camera violation', () => {
        const violation = new Violation({
          violationCode: '12',
        } as RawViolationData)

        expect(violation.isCameraViolation()).toEqual(true)
      })

      it('should return true for a mobile MTA bus stop camera violation', () => {
        const violation = new Violation({
          humanizedDescription: 'Mobile MTA Bus Stop Violation',
          violationCode: '43',
        } as RawViolationData)

        expect(violation.isCameraViolation()).toEqual(true)
      })

      it('should return true for a mobile MTA bus stop camera violation', () => {
        const violation = new Violation({
          humanizedDescription: 'Mobile MTA Double Parking Violation',
          violationCode: '15',
        } as RawViolationData)

        expect(violation.isCameraViolation()).toEqual(true)
      })

      it('should return true for a school zone speed camera violation', () => {
        const violation = new Violation({
          violationCode: '36',
        } as RawViolationData)

        expect(violation.isCameraViolation()).toEqual(true)
      })

      it('should return the time formatted in a U.S. locale string when formattedTime is a valid time', () => {
        const formattedTime = '2024-07-24T14:11:00.000-04:00'
        const violation = new Violation({ formattedTime } as RawViolationData)

        expect(violation.getViolationTime()).toEqual('2:11 PM')
      })
    })
  })
})
