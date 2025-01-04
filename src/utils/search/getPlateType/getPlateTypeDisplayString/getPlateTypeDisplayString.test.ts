import getPlateTypesDisplayString from './getPlateTypeDisplayString'

describe('getPlateTypesDisplayString', () => {
  describe('not found', () => {
    it("should return 'No Plate Type' if no plate types are provided", () => {
      expect(getPlateTypesDisplayString(undefined)).toBe('All')
    })

    it("should return 'All' if provided plate types don't match any known plate types", () => {
      const unknownPlateType = ['XXX']

      expect(getPlateTypesDisplayString(unknownPlateType)).toBe('All')
    })

    it("should return 'All' if provided plate types are partial codes for a plate type (no match)", () => {
      const onlyOneCommercialPlateType = ['COM']

      expect(getPlateTypesDisplayString(onlyOneCommercialPlateType)).toBe('All')
    })
  })

  describe('found', () => {
    it("should return 'All-Terrain Vehicle' if provided all all-terrain vehicle plate type codes", () => {
      const allTerrainVehiclePlateTypeCodes = ['ATD', 'ATV']

      expect(getPlateTypesDisplayString(allTerrainVehiclePlateTypeCodes)).toBe(
        'All-Terrain Vehicle',
      )
    })

    it("should return 'Ambulance' if provided all ambulance plate type codes", () => {
      const ambulancePlateTypeCodes = ['AMB']

      expect(getPlateTypesDisplayString(ambulancePlateTypeCodes)).toBe(
        'Ambulance',
      )
    })

    it("should return 'Bus/Vanpool' if provided all bus and vanpool plate type codes", () => {
      const busAndVanpoolPlateTypeCodes = [
        'OMF',
        'OML',
        'OMO',
        'OMR',
        'OMS',
        'OMV',
        'VPL',
      ]

      expect(getPlateTypesDisplayString(busAndVanpoolPlateTypeCodes)).toBe(
        'Bus/Vanpool',
      )
    })

    it("should return 'Commercial' if provided all commercial plate type codes", () => {
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

      expect(getPlateTypesDisplayString(commercialPlateTypeCodes)).toBe(
        'Commercial',
      )
    })

    it("should return 'Coroner/Medical Examiner' if provided all coroner and medical examiner plate type codes", () => {
      const coronerAndMedicalExaminerPlateTypeCodes = ['CME']

      expect(
        getPlateTypesDisplayString(coronerAndMedicalExaminerPlateTypeCodes),
      ).toBe('Coroner/Medical Examiner')
    })

    it("should return 'County Board of Supervisors' if provided all county board of supervisors plate type codes", () => {
      const countyBoardOfSupervisorsPlateTypeCodes = ['CBS']

      expect(
        getPlateTypesDisplayString(countyBoardOfSupervisorsPlateTypeCodes),
      ).toBe('County Board of Supervisors')
    })

    it("should return 'County Clerk' if provided all county clerk plate type codes", () => {
      const countyClerkPlateTypeCodes = ['CCK']

      expect(getPlateTypesDisplayString(countyClerkPlateTypeCodes)).toBe(
        'County Clerk',
      )
    })

    it("should return 'County Legislator' if provided all county legislator plate type codes", () => {
      const countyLegislatorPlateTypeCodes = ['CLG']

      expect(getPlateTypesDisplayString(countyLegislatorPlateTypeCodes)).toBe(
        'County Legislator',
      )
    })

    it("should return 'Dealer' if provided all dealer plate type codes", () => {
      const dealerPlateTypeCodes = ['DLR']

      expect(getPlateTypesDisplayString(dealerPlateTypeCodes)).toBe('Dealer')
    })

    it("should return 'Educator' if provided all educator plate type codes", () => {
      const educatorPlateTypeCodes = ['EDU']

      expect(getPlateTypesDisplayString(educatorPlateTypeCodes)).toBe(
        'Educator',
      )
    })

    it("should return 'Governor's Second Car' if provided all plate type codes for governor's second car", () => {
      const governorsSecondCarPlateTypeCodes = ['GAC', 'GSC']

      expect(getPlateTypesDisplayString(governorsSecondCarPlateTypeCodes)).toBe(
        "Governor's Second Car",
      )
    })

    it("should return 'Hearse' if provided all hearse plate type codes", () => {
      const hearsePlateTypeCodes = ['HIR']

      expect(getPlateTypesDisplayString(hearsePlateTypeCodes)).toBe('Hearse')
    })

    it("should return 'In-Transit Permit' if provided all in-transit permit plate type codes", () => {
      const inTransitPermitPlateTypeCodes = ['ITP']

      expect(getPlateTypesDisplayString(inTransitPermitPlateTypeCodes)).toBe(
        'In-Transit Permit',
      )
    })

    it("should return 'Limited-Use Auto' if provided all limited-use auto plate type codes", () => {
      const limitedUseAutosPlateTypeCodes = ['LUA']

      expect(getPlateTypesDisplayString(limitedUseAutosPlateTypeCodes)).toBe(
        'Limited-Use Auto',
      )
    })

    it("should return 'Medallion Vehicle' if provided all medallion vehicles plate type codes", () => {
      const medallionVehiclePlateTypeCodes = ['OMT']

      expect(getPlateTypesDisplayString(medallionVehiclePlateTypeCodes)).toBe(
        'Medallion Vehicle',
      )
    })

    it("should return 'Medical Doctor' if provided all medical doctor plate type codes", () => {
      const medicalDoctorPlateTypeCodes = ['MED']

      expect(getPlateTypesDisplayString(medicalDoctorPlateTypeCodes)).toBe(
        'Medical Doctor',
      )
    })

    it("should return 'Motorboat' if provided all motorboat plate type codes", () => {
      const motorboatPlateTypeCodes = ['BOT']

      expect(getPlateTypesDisplayString(motorboatPlateTypeCodes)).toBe(
        'Motorboat',
      )
    })

    it("should return 'Motorcycle' if provided all motorcycle plate type codes", () => {
      const motorcyclePlateTypeCodes = [
        'HSM',
        'LMA',
        'LMB',
        'LMC',
        'MCD',
        'MOT',
        'ORM',
      ]

      expect(getPlateTypesDisplayString(motorcyclePlateTypeCodes)).toBe(
        'Motorcycle',
      )
    })

    it("should return 'New York Assembly' if provided all New York Assembly plate type codes", () => {
      const newYorkAssemblyPlateTypeCodes = ['NYA']

      expect(getPlateTypesDisplayString(newYorkAssemblyPlateTypeCodes)).toBe(
        'New York Assembly',
      )
    })

    it("should return 'New York City Council' if provided all New York City Council plate type codes", () => {
      const newYorkCityCouncilPlateTypeCodes = ['NYC']

      expect(getPlateTypesDisplayString(newYorkCityCouncilPlateTypeCodes)).toBe(
        'New York City Council',
      )
    })

    it("should return 'New York Senate' if provided all New York Senate plate type codes", () => {
      const newYorkSenatePlateTypeCodes = ['NYS']

      expect(getPlateTypesDisplayString(newYorkSenatePlateTypeCodes)).toBe(
        'New York Senate',
      )
    })

    it("should return 'Passenger' if provided all passenger plate type codes", () => {
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

      expect(getPlateTypesDisplayString(passengerPlateTypeCodes)).toBe(
        'Passenger',
      )
    })

    it("should return 'Political Subdivision' if provided all political subdivision plate type codes", () => {
      const politicalSubdivisionPlateTypeCodes = ['PSD']

      expect(
        getPlateTypesDisplayString(politicalSubdivisionPlateTypeCodes),
      ).toBe('Political Subdivision')
    })

    it("should return 'School Car' if provided all school car plate type codes", () => {
      const schoolCarPlateTypeCodes = ['SCL']

      expect(getPlateTypesDisplayString(schoolCarPlateTypeCodes)).toBe(
        'School Car',
      )
    })

    it("should return 'Snowmobile' if provided all snowmobile plate type codes", () => {
      const snowmobilePlateTypeCodes = ['SNO']

      expect(getPlateTypesDisplayString(snowmobilePlateTypeCodes)).toBe(
        'Snowmobile',
      )
    })

    it("should return 'State-owned Vehicle' if provided all state-owned vehicle plate type codes", () => {
      const stateOwnedVehiclePlateTypeCodes = ['STA']

      expect(getPlateTypesDisplayString(stateOwnedVehiclePlateTypeCodes)).toBe(
        'State-owned Vehicle',
      )
    })

    it("should return 'State Court Justice' if provided all state court justice plate type codes", () => {
      const stateCourtJusticePlateTypeCodes = ['JCA', 'JCL', 'JSC', 'SUP']

      expect(getPlateTypesDisplayString(stateCourtJusticePlateTypeCodes)).toBe(
        'State Court Justice',
      )
    })

    it("should return 'Temporary' if provided all temporary plate type codes", () => {
      const temporaryPlateTypeCodes = ['TMP']

      expect(getPlateTypesDisplayString(temporaryPlateTypeCodes)).toBe(
        'Temporary',
      )
    })

    it("should return 'Trailer' if provided all trailer plate type codes", () => {
      const trailerTypeCodes = ['HOU', 'LTR', 'SEM', 'TRA', 'TRL']

      expect(getPlateTypesDisplayString(trailerTypeCodes)).toBe('Trailer')
    })

    it("should return 'U.S. Congress' if provided all U.S. Congress plate type codes", () => {
      const usCongressPlateTypeCodes = ['USC']

      expect(getPlateTypesDisplayString(usCongressPlateTypeCodes)).toBe(
        'U.S. Congress',
      )
    })

    it("should return 'U.S. Senate' if provided all U.S. Senate plate type codes", () => {
      const usSenatePlateTypeCodes = ['USS']

      expect(getPlateTypesDisplayString(usSenatePlateTypeCodes)).toBe(
        'U.S. Senate',
      )
    })

    it("should return 'Volunteer Ambulance Service' if provided all volunteery ambulance service plate type codes", () => {
      const volunteerAmbulanceServicePlateTypeCodes = ['VAS']

      expect(
        getPlateTypesDisplayString(volunteerAmbulanceServicePlateTypeCodes),
      ).toBe('Volunteer Ambulance Service')
    })
  })
})
