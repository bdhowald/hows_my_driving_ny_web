// const plateTypeMap = [
//   {
//     codes: ['ATD', 'ATV'],
//     displayName: 'All-Terrain Vehicle',
//     key: 'allTerrainVehicle',
//   }, {
//     codes: ['AMB'],
//     displayName: 'Ambulance',
//     key: 'ambulance',
//   }, {
//     codes: ['OMF', 'OML', 'OMO', 'OMR', 'OMS', 'OMV', 'VPL'],
//     displayName: 'Bus/Vanpool',
//     key: 'busVanpool',
//   }, {
//     codes: ['AGC', 'APP', 'CHC', 'CMB', 'COM', 'CSP', 'FAR', 'HAC', 'IRP', 'LOC', 'ORC', 'RGC', 'SPC', 'STG', 'THC', 'TRC'],
//     displayName: 'Commercial',
//     key: 'commercial',
//   }, {
//     codes: ['CME'],
//     displayName: 'Coroner/Medical Examiner',
//     key: 'coronerMedicalExaminer',
//   }, {
//     codes: ['CBS'],
//     displayName: 'County Board of Supervisors',
//     key: 'countyBoardOfSupervisors',
//   }, {
//     codes: ['CCK'],
//     displayName: 'County Clerk',
//     key: 'countyClerk',
//   }, {
//     codes: ['CLG'],
//     displayName: 'County Legislator',
//     key: 'countyLegislator',
//   }, {
//     codes: ['DLR'],
//     displayName: 'Dealer',
//     key: 'dealer', 
//   }, {
//     codes: ['GAC'],
//     displayName: "Governor's Second Car",
//     key: 'governorsSecondCar',
//   }, {
//     codes: ['HIR'],
//     displayName: 'Hearse',
//     key: 'hearse',
//   }, {
//     codes: ['ITP'],
//     displayName: 'In-Transit Permit',
//     key: 'inTransitPermit',
//   }, {
//     codes: ['LUA'],
//     displayName: 'Limited-Use Autos',
//     key: 'limitedUseAutos',
//   }, {
//     codes: ['OMT'],
//     displayName: 'Medallion Vehicle',
//     key: 'medallionVehicle',
//   }, {
//     codes: ['MED'],
//     displayName: 'Medical Doctor',
//     key: 'medicalDoctor',
//   }, {
//     codes: ['BOT'],
//     displayName: 'Motorboat',
//     key: 'motorboat'
//   }, {
//     codes: ['HSM', 'LMA', 'LMB', 'LMC', 'MCD', 'MOT', 'ORM'],
//     displayName: 'Motorcycle',
//     key: 'motorcycle',
//   }, {
//     codes: ['NYA'],
//     displayName: 'New York Assembly',
//     key: 'newYorkAssembly',
//   }, {
//     codes: ['NYC'],
//     displayName: 'New York City Council',
//     key: 'newYorkCityCouncil',
//   }, {
//     codes: ['SRN'],
//     displayName: 'New York Press',
//     key: 'newYorkPress',
//   }, {
//     codes: ['NYS'],
//     displayName: 'New York Senate',
//     key: 'newYorkSenate',
//   }, {
//     codes: [
//       'AGR', 'ARG', 'AYG', 'BOB', 'CMH', 'FPW', 'GSM', 'HAM', 'HIS', 'JWV', 'MCL', 'NLM', 'ORG', 'PAS', 'PHS', 'PPH', 'RGL', 'SOS', 'SPO', 'SRF', 'WUG'
//     ],
//     displayName: 'Passenger',
//     key: 'passenger',
//   }, {
//     codes: ['PSD'],
//     displayName: 'Political Subdivision',
//     key: 'politicalSubdivision',
//   }, {
//     codes: ['SCL'],
//     displayName: 'School Car',
//     key: 'schoolCar',
//   }, {
//     codes: ['SNO'],
//     displayName: 'Snowmobile',
//     key: 'snowmobile',
//   }, {
//     codes: ['STA'],
//     displayName: 'State-owned Vehicle',
//     key: 'stateOwnedVehicle'
//   }, {
//     codes: ['JCA', 'JCL', 'JSC', 'SUP'],
//     displayName: 'State Court Justice',
//     key: 'stateCourtJustice',
//   }, {
//     codes: ['HOU', 'LTR', 'SEM', 'TRA', 'TRL'],
//     displayName: 'Trailer',
//     key: 'trailer',
//   }, {
//     codes: ['USC'],
//     displayName: 'U.S. Congress',
//     key: 'usCongress',
//   }, {
//     codes: ['USS'],
//     displayName: 'U.S. Senate',
//     key: 'usSenate',
//   }, {
//     codes: ['VAS'],
//     displayName: 'Volunteer Ambulance Service',
//     key: 'volunteerAmbulanceService',
//   },
// ]

const plateTypes = {
  'allTerrainVehicle': {
    codes: ['ATD', 'ATV'],
    displayName: 'All-Terrain Vehicle',
  },
  'ambulance': {
    codes: ['AMB'],
    displayName: 'Ambulance',
  },
  'busVanpool': {
    codes: ['OMF', 'OML', 'OMO', 'OMR', 'OMS', 'OMV', 'VPL'],
    displayName: 'Bus/Vanpool',
  },
  'commercial': {
    codes: ['AGC', 'APP', 'CHC', 'CMB', 'COM', 'CSP', 'FAR', 'HAC', 'IRP', 'LOC', 'ORC', 'RGC', 'SPC', 'STG', 'THC', 'TRC'],
    displayName: 'Commercial',
  },
  'coronerMedicalExaminer': {
    codes: ['CME'],
    displayName: 'Coroner/Medical Examiner',
  },
  'countyBoardOfSupervisors': {
    codes: ['CBS'],
    displayName: 'County Board of Supervisors',
  },
  'countyClerk': {
    codes: ['CCK'],
    displayName: 'County Clerk',
  },
  'countyLegislator': {
    codes: ['CLG'],
    displayName: 'County Legislator',
  },
  'dealer': {
    codes: ['DLR'],
    displayName: 'Dealer',
  },
  'governorsSecondCar': {
    codes: ['GAC'],
    displayName: "Governor's Second Car",
  },
  'hearse': {
    codes: ['HIR'],
    displayName: 'Hearse',
  },
  'inTransitPermit': {
    codes: ['ITP'],
    displayName: 'In-Transit Permit',
  },
  'limitedUseAutos': {
    codes: ['LUA'],
    displayName: 'Limited-Use Autos',
  },
  'medallionVehicle': {
    codes: ['OMT'],
    displayName: 'Medallion Vehicle',
  },
  'medicalDoctor': {
    codes: ['MED'],
    displayName: 'Medical Doctor',
  },
  'motorboat': {
    codes: ['BOT'],
    displayName: 'Motorboat',
  },
  'motorcycle': {
    codes: ['HSM', 'LMA', 'LMB', 'LMC', 'MCD', 'MOT', 'ORM'],
    displayName: 'Motorcycle',
  },
  'newYorkAssembly': {
    codes: ['NYA'],
    displayName: 'New York Assembly',
  },
  'newYorkCityCouncil': {
    codes: ['NYC'],
    displayName: 'New York City Council',
  },
  'newYorkPress': {
    codes: ['SRN'],
    displayName: 'New York Press',
  },
  'newYorkSenate': {
    codes: ['NYS'],
    displayName: 'New York Senate',
  },
  'none': {
    codes: null,
    displayName: 'No Plate Type',
  },
  'passenger': {
    codes: [
      'AGR', 'ARG', 'AYG', 'BOB', 'CMH', 'FPW', 'GSM', 'HAM', 'HIS', 'JWV', 'MCL', 'NLM', 'ORG', 'PAS', 'PHS', 'PPH', 'RGL', 'SOS', 'SPO', 'SRF', 'WUG'
    ],
    displayName: 'Passenger',
  },
  'politicalSubdivision': {
    codes: ['PSD'],
    displayName: 'Political Subdivision',
  },
  'schoolCar': {
    codes: ['SCL'],
    displayName: 'School Car',
  },
  'snowmobile': {
    codes: ['SNO'],
    displayName: 'Snowmobile',
  },
  'stateOwnedVehicle': {
    codes: ['STA'],
    displayName: 'State-owned Vehicle',
  },
  'stateCourtJustice': {
    codes: ['JCA', 'JCL', 'JSC', 'SUP'],
    displayName: 'State Court Justice',
  },
  'trailer': {
    codes: ['HOU', 'LTR', 'SEM', 'TRA', 'TRL'],
    displayName: 'Trailer',
  },
  'usCongress': {
    codes: ['USC'],
    displayName: 'U.S. Congress',
  },
  'usSenate': {
    codes: ['USS'],
    displayName: 'U.S. Senate',
  },
  'volunteerAmbulanceService': {
    codes: ['VAS'],
    displayName: 'Volunteer Ambulance Service',
  },
}
export default plateTypes
export type PlateType = keyof typeof plateTypes


export const plateTypesToPlateTypeCategoriesMap = {
  'AGC': 'Commercial',
  'AGC,APP,CHC,CMB,COM,CSP,FAR,HAC,IRP,LOC,ORC,RGC,SPC,STG,THC,TRC': 'Commercial',
  'AMB': 'Ambulance',
  'APP': 'Commercial',
  'ARG': 'Passenger',
  'ARG,AYG,BOB,CMH,FPW,GSM,HAM,HIS,JWV,MCL,NLM,ORG,PAS,PHS,PPH,RGL,SOS,SPO,SRF,WUG': 'Passenger',
  'ATD': 'All-Terrain Vehicle',
  'ATD,ATV': 'All-Terrain Vehicle',
  'ATV': 'All-Terrain Vehicle',
  'AYG': 'Passenger',
  'BOB': 'Passenger',
  'BOT': 'Motorboat',
  'CBS': 'County Board of Supervisors',
  'CCK': 'County Clerk',
  'CHC': 'Commercial',
  'CLG': 'County Legislator',
  'CME': 'Coroner/Medical Examiner',
  'CMB': 'Commercial',
  'CMH': 'Passenger',
  'COM': 'Commercial',
  'CSP': 'Commercial',
  'DLR': 'Dealer',
  'FAR': 'Commercial',
  'FPW': 'Passenger',
  'GAC': 'Governor\'s Second Car',
  'GSM': 'Passenger',
  'HAC': 'Commercial',
  'HAM': 'Passenger',
  'HIR': 'Hearse',
  'HIS': 'Passenger',
  'HOU': 'Trailer',
  'HOU,LTR,SEM,TRA,TRL': 'Trailer',
  'HSM': 'Motorcycle',
  'HSM,LMA,LMB,LMC,MCD,MOT,ORM': 'Motorcycle',
  'IRP': 'Commercial',
  'ITP': 'ITP',
  'JCA': 'State Court Justice',
  'JCA,JCL,JSC,SUP': 'State Court Justice',
  'JCL': 'State Court Justice',
  'JSC': 'State Court Justice',
  'JWV': 'Passenger',
  'LOC': 'Commercial',
  'LMA': 'Motorcycle',
  'LMB': 'Motorcycle',
  'LMC': 'Motorcycle',
  'LTR': 'Trailer',
  'LUA': 'Limited-Use Autos',
  'MCD': 'Motorcycle',
  'MCL': 'Passenger',
  'MED': 'Medical Doctor',
  'MOT': 'Motorcycle',
  'NLM': 'Passenger',
  'NYA': 'New York Assembly',
  'NYC': 'New York City Council',
  'NYS': 'New York Senate',
  'OMF': 'Bus/Vanpool',
  'OMF,OML,OMO,OMR,OMS,OMV,VPL': 'Bus/Vanpool',
  'OML': 'Bus/Vanpool',
  'OMO': 'Bus/Vanpool',
  'OMR': 'Bus/Vanpool',
  'OMS': 'Bus/Vanpool',
  'OMT': 'Medallion Vehicle',
  'OMV': 'Bus/Vanpool',
  'ORC': 'Commercial',
  'ORG': 'Passenger',
  'ORM': 'Motorcycle',
  'PAS': 'Passenger',
  'PHS': 'Passenger',
  'PPH': 'Passenger',
  'PSD': 'Political Subdivision',
  'RGC': 'Commercial',
  'RGL': 'Passenger',
  'SCL': 'School Car',
  'SEM': 'Trailer',
  'SNO': 'Snowmobile',
  'SOS': 'Passenger',
  'SPC': 'Commercial',
  'SPO': 'Passenger',
  'SRF': 'Passenger',
  'STA': 'State-owned Vehicle',
  'STG': 'Commercial',
  'SUP': 'State Court Justice',
  'SRN': 'New York Press',
  'THC': 'Commercial',
  'TRA': 'Trailer',
  'TRC': 'Commercial',
  'TRL': 'Trailer',
  'USC': 'U.S. Congress',
  'USS': 'U.S. Senate',
  'VAS': 'Volunteer Ambulance Service',
  'VPL': 'Bus/Vanpool',
  'WUG': 'Passenger',
}

// export type PlateType = keyof typeof plateTypesToPlateTypeCategoriesMap
