import getPlateTypesName from './getPlateTypeName'

describe('getPlateTypesName', () => {
  describe('not found', () => {
    it("should return 'none' if no plate types are provided", () => {
      expect(getPlateTypesName(undefined)).toBe('none')
    })

    it("should return 'none' if provided plate types don't match any known plate types", () => {
      const unknownPlateType = ['XXX']

      expect(getPlateTypesName(unknownPlateType)).toBe('none')
    })

    it("should return 'none' if provided plate types are partial codes for a plate type", () => {
      const onlyOneCommercialPlateType = ['COM']

      expect(getPlateTypesName(onlyOneCommercialPlateType)).toBe('none')
    })
  })

  describe('found', () => {
    it("should return 'allTerrainVehicle' if provided all all-terrain vehicle plate type codes", () => {
      const allTerrainVehiclePlateTypeCodes = ['ATD', 'ATV']

      expect(getPlateTypesName(allTerrainVehiclePlateTypeCodes)).toBe(
        'allTerrainVehicle',
      )
    })

    it("should return 'ambulance' if provided all ambulance plate type codes", () => {
      const ambulancePlateTypeCodes = ['AMB']

      expect(getPlateTypesName(ambulancePlateTypeCodes)).toBe('ambulance')
    })

    it("should return 'busVanpool' if provided all bus and vanpool plate type codes", () => {
      const busAndVanpoolPlateTypeCodes = [
        'OMF',
        'OML',
        'OMO',
        'OMR',
        'OMS',
        'OMV',
        'VPL',
      ]

      expect(getPlateTypesName(busAndVanpoolPlateTypeCodes)).toBe('busVanpool')
    })

    it("should return 'commercial' if provided all commercial plate type codes", () => {
      const commercialPlateTypeCodes = [
        'AGC',
        'APP',
        'CHC',
        'CMB',
        'COM',
        'CSP',
        'FAR',
        'HAC',
        'IRP',
        'LOC',
        'ORC',
        'RGC',
        'SPC',
        'STG',
        'THC',
        'TRC',
      ]

      expect(getPlateTypesName(commercialPlateTypeCodes)).toBe('commercial')
    })

    it("should return 'coronerMedicalExaminer' if provided all coroner and medical examiner plate type codes", () => {
      const coronerAndMedicalExaminerPlateTypeCodes = ['CME']

      expect(getPlateTypesName(coronerAndMedicalExaminerPlateTypeCodes)).toBe(
        'coronerMedicalExaminer',
      )
    })

    it("should return 'countyBoardOfSupervisors' if provided all county board of supervisors plate type codes", () => {
      const countyBoardOfSupervisorsPlateTypeCodes = ['CBS']

      expect(getPlateTypesName(countyBoardOfSupervisorsPlateTypeCodes)).toBe(
        'countyBoardOfSupervisors',
      )
    })

    it("should return 'countyClerk' if provided all county clerk plate type codes", () => {
      const countyClerkPlateTypeCodes = ['CCK']

      expect(getPlateTypesName(countyClerkPlateTypeCodes)).toBe('countyClerk')
    })

    it("should return 'countyLegislator' if provided all county legislator plate type codes", () => {
      const countyLegislatorPlateTypeCodes = ['CLG']

      expect(getPlateTypesName(countyLegislatorPlateTypeCodes)).toBe(
        'countyLegislator',
      )
    })

    it("should return 'dealer' if provided all dealer plate type codes", () => {
      const dealerPlateTypeCodes = ['DLR']

      expect(getPlateTypesName(dealerPlateTypeCodes)).toBe('dealer')
    })

    it("should return 'educator' if provided all educator plate type codes", () => {
      const educatorPlateTypeCodes = ['EDU']

      expect(getPlateTypesName(educatorPlateTypeCodes)).toBe('educator')
    })

    it("should return 'governorsSecondCar' if provided all plate type codes for governor's second car", () => {
      const governorsSecondCarPlateTypeCodes = ['GAC', 'GSC']

      expect(getPlateTypesName(governorsSecondCarPlateTypeCodes)).toBe(
        'governorsSecondCar',
      )
    })

    it("should return 'hearse' if provided all hearse plate type codes", () => {
      const hearsePlateTypeCodes = ['HIR']

      expect(getPlateTypesName(hearsePlateTypeCodes)).toBe('hearse')
    })

    it("should return 'inTransitPermit' if provided all in-transit permit plate type codes", () => {
      const inTransitPermitPlateTypeCodes = ['ITP']

      expect(getPlateTypesName(inTransitPermitPlateTypeCodes)).toBe(
        'inTransitPermit',
      )
    })

    it("should return 'limitedUseAuto' if provided all limited-use auto plate type codes", () => {
      const limitedUseAutosPlateTypeCodes = ['LUA']

      expect(getPlateTypesName(limitedUseAutosPlateTypeCodes)).toBe(
        'limitedUseAuto',
      )
    })

    it("should return 'medallionVehicle' if provided all medallion vehicles plate type codes", () => {
      const medallionVehiclePlateTypeCodes = ['OMT']

      expect(getPlateTypesName(medallionVehiclePlateTypeCodes)).toBe(
        'medallionVehicle',
      )
    })

    it("should return 'medicalDoctor' if provided all medical doctor plate type codes", () => {
      const medicalDoctorPlateTypeCodes = ['MED']

      expect(getPlateTypesName(medicalDoctorPlateTypeCodes)).toBe(
        'medicalDoctor',
      )
    })

    it("should return 'motorboat' if provided all motorboat plate type codes", () => {
      const motorboatPlateTypeCodes = ['BOT']

      expect(getPlateTypesName(motorboatPlateTypeCodes)).toBe('motorboat')
    })

    it("should return 'motorcycle' if provided all motorcycle plate type codes", () => {
      const motorcyclePlateTypeCodes = [
        'HSM',
        'LMA',
        'LMB',
        'LMC',
        'MCD',
        'MOT',
        'ORM',
      ]

      expect(getPlateTypesName(motorcyclePlateTypeCodes)).toBe('motorcycle')
    })

    it("should return 'newYorkAssembly' if provided all New York Assembly plate type codes", () => {
      const newYorkAssemblyPlateTypeCodes = ['NYA']

      expect(getPlateTypesName(newYorkAssemblyPlateTypeCodes)).toBe(
        'newYorkAssembly',
      )
    })

    it("should return 'newYorkCityCouncil' if provided all New York City Council plate type codes", () => {
      const newYorkCityCouncilPlateTypeCodes = ['NYC']

      expect(getPlateTypesName(newYorkCityCouncilPlateTypeCodes)).toBe(
        'newYorkCityCouncil',
      )
    })

    it("should return 'newYorkSenate' if provided all New York Senate plate type codes", () => {
      const newYorkSenatePlateTypeCodes = ['NYS']

      expect(getPlateTypesName(newYorkSenatePlateTypeCodes)).toBe(
        'newYorkSenate',
      )
    })

    it("should return 'passenger' if provided all passenger plate type codes", () => {
      const passengerPlateTypeCodes = [
        'AGR',
        'ARG',
        'AYG',
        'BOB',
        'CMH',
        'FPW',
        'GSM',
        'HAM',
        'HIS',
        'JWV',
        'MCL',
        'NLM',
        'ORG',
        'PAS',
        'PHS',
        'PPH',
        'RGL',
        'SOS',
        'SPO',
        'SRF',
        'WUG',
      ]

      expect(getPlateTypesName(passengerPlateTypeCodes)).toBe('passenger')
    })

    it("should return 'politicalSubdivision' if provided all political subdivision plate type codes", () => {
      const politicalSubdivisionPlateTypeCodes = ['PSD']

      expect(getPlateTypesName(politicalSubdivisionPlateTypeCodes)).toBe(
        'politicalSubdivision',
      )
    })

    it("should return 'schoolCar' if provided all school car plate type codes", () => {
      const schoolCarPlateTypeCodes = ['SCL']

      expect(getPlateTypesName(schoolCarPlateTypeCodes)).toBe('schoolCar')
    })

    it("should return 'snowmobile' if provided all snowmobile plate type codes", () => {
      const snowmobilePlateTypeCodes = ['SNO']

      expect(getPlateTypesName(snowmobilePlateTypeCodes)).toBe('snowmobile')
    })

    it("should return 'stateOwnedVehicle' if provided all state-owned vehicle plate type codes", () => {
      const stateOwnedVehiclePlateTypeCodes = ['STA']

      expect(getPlateTypesName(stateOwnedVehiclePlateTypeCodes)).toBe(
        'stateOwnedVehicle',
      )
    })

    it("should return 'stateCourtJustice' if provided all state court justice plate type codes", () => {
      const stateCourtJusticePlateTypeCodes = ['JCA', 'JCL', 'JSC', 'SUP']

      expect(getPlateTypesName(stateCourtJusticePlateTypeCodes)).toBe(
        'stateCourtJustice',
      )
    })

    it("should return 'temporary' if provided all temporary plate type codes", () => {
      const temporaryPlateTypeCodes = ['TMP']

      expect(getPlateTypesName(temporaryPlateTypeCodes)).toBe('temporary')
    })

    it("should return 'trailer' if provided all trailer plate type codes", () => {
      const trailerTypeCodes = ['HOU', 'LTR', 'SEM', 'TRA', 'TRL']

      expect(getPlateTypesName(trailerTypeCodes)).toBe('trailer')
    })

    it("should return 'usCongress' if provided all U.S. Congress plate type codes", () => {
      const usCongressPlateTypeCodes = ['USC']

      expect(getPlateTypesName(usCongressPlateTypeCodes)).toBe('usCongress')
    })

    it("should return 'usSenate' if provided all U.S. Senate plate type codes", () => {
      const usSenatePlateTypeCodes = ['USS']

      expect(getPlateTypesName(usSenatePlateTypeCodes)).toBe('usSenate')
    })

    it("should return 'volunteerAmbulanceService' if provided all volunteery ambulance service plate type codes", () => {
      const volunteerAmbulanceServicePlateTypeCodes = ['VAS']

      expect(getPlateTypesName(volunteerAmbulanceServicePlateTypeCodes)).toBe(
        'volunteerAmbulanceService',
      )
    })
  })
})
