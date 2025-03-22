import getVehicleBodyType from './getVehicleBodyType'

describe('getVehicleBodyType', () => {
  test.each([
    // Blank
    {
      bodyTypeish: '',
      outputBodyType: 'Unknown Body Type',
    },

    // Boat
    {
      bodyTypeish: 'BOAT',
      outputBodyType: 'Boat',
    },

    // Convertible
    {
      bodyTypeish: 'BU',
      outputBodyType: 'Bus',
    },
    {
      bodyTypeish: 'BUS',
      outputBodyType: 'Bus',
    },

    // Convertible
    {
      bodyTypeish: 'CON',
      outputBodyType: 'Convertible',
    },
    {
      bodyTypeish: 'CONV',
      outputBodyType: 'Convertible',
    },

    // Commercial Vehicle
    {
      bodyTypeish: 'CV',
      outputBodyType: 'Commercial Vehicle',
    },

    // Dump Truck
    {
      bodyTypeish: 'DUMP',
      outputBodyType: 'Dump Truck',
    },

    // Flatbed Truck
    {
      bodyTypeish: 'FLAT',
      outputBodyType: 'Flatbed Truck',
    },

    // Hatchback
    {
      bodyTypeish: '5D',
      outputBodyType: 'Hatchback',
    },
    {
      bodyTypeish: 'HATC',
      outputBodyType: 'Hatchback',
    },
    {
      bodyTypeish: 'HB',
      outputBodyType: 'Hatchback',
    },

    // Hearse
    {
      bodyTypeish: 'HRSE',
      outputBodyType: 'Hearse',
    },

    // Limousine
    {
      bodyTypeish: 'LIM',
      outputBodyType: 'Limousine',
    },

    // Moped
    {
      bodyTypeish: 'MOPD',
      outputBodyType: 'Moped',
    },
    {
      bodyTypeish: 'MP',
      outputBodyType: 'Moped',
    },

    // Motorcycle
    {
      bodyTypeish: 'MC',
      outputBodyType: 'Motorcycle',
    },
    {
      bodyTypeish: 'MCY',
      outputBodyType: 'Motorcycle',
    },
    {
      bodyTypeish: 'MOT',
      outputBodyType: 'Motorcycle',
    },
    {
      bodyTypeish: 'MOTO',
      outputBodyType: 'Motorcycle',
    },

    // Pickup
    {
      bodyTypeish: 'P-U',
      outputBodyType: 'Pickup Truck',
    },
    {
      bodyTypeish: 'PICK',
      outputBodyType: 'Pickup Truck',
    },
    {
      bodyTypeish: 'PK',
      outputBodyType: 'Pickup Truck',
    },
    {
      bodyTypeish: 'PKUP',
      outputBodyType: 'Pickup Truck',
    },

    // Refrigeration Truck
    {
      bodyTypeish: 'REF',
      outputBodyType: 'Refrigeration Truck',
    },
    {
      bodyTypeish: 'REFG',
      outputBodyType: 'Refrigeration Truck',
    },

    // RV
    {
      bodyTypeish: 'H/WH',
      outputBodyType: 'RV',
    },
    {
      bodyTypeish: 'RV',
      outputBodyType: 'RV',
    },

    // Sedan
    {
      bodyTypeish: '2 DR',
      outputBodyType: 'Sedan',
    },
    {
      bodyTypeish: '2D',
      outputBodyType: 'Sedan',
    },
    {
      bodyTypeish: '2DSD',
      outputBodyType: 'Sedan',
    },
    {
      bodyTypeish: '2S',
      outputBodyType: 'Sedan',
    },
    {
      bodyTypeish: '4 DR',
      outputBodyType: 'Sedan',
    },
    {
      bodyTypeish: '4D',
      outputBodyType: 'Sedan',
    },
    {
      bodyTypeish: '4DOO',
      outputBodyType: 'Sedan',
    },
    {
      bodyTypeish: '4DSD',
      outputBodyType: 'Sedan',
    },
    {
      bodyTypeish: '4DSE',
      outputBodyType: 'Sedan',
    },
    {
      bodyTypeish: '4DSW',
      outputBodyType: 'Sedan',
    },
    {
      bodyTypeish: '4S',
      outputBodyType: 'Sedan',
    },
    {
      bodyTypeish: 'COUP',
      outputBodyType: 'Sedan',
    },
    {
      bodyTypeish: 'FODO',
      outputBodyType: 'Sedan',
    },
    {
      bodyTypeish: 'FOUR',
      outputBodyType: 'Sedan',
    },
    {
      bodyTypeish: 'PASS',
      outputBodyType: 'Sedan',
    },
    {
      bodyTypeish: 'SD',
      outputBodyType: 'Sedan',
    },
    {
      bodyTypeish: 'SDN',
      outputBodyType: 'Sedan',
    },
    {
      bodyTypeish: 'SEDA',
      outputBodyType: 'Sedan',
    },
    {
      bodyTypeish: 'SEDN',
      outputBodyType: 'Sedan',
    },
    {
      bodyTypeish: 'TWOD',
      outputBodyType: 'Sedan',
    },

    // Semi Trailer
    {
      bodyTypeish: 'SEMI',
      outputBodyType: 'Semi Trailer',
    },

    // Snowmobile
    {
      bodyTypeish: 'MOBL',
      outputBodyType: 'Snowmobile',
    },

    // Stake Truck
    {
      bodyTypeish: 'ST',
      outputBodyType: 'Stake Truck',
    },
    {
      bodyTypeish: 'STAK',
      outputBodyType: 'Stake Truck',
    },

    // Station Wagon
    {
      bodyTypeish: 'SW',
      outputBodyType: 'Station Wagon',
    },
    {
      bodyTypeish: 'WAGN',
      outputBodyType: 'Station Wagon',
    },
    {
      bodyTypeish: 'WG',
      outputBodyType: 'Station Wagon',
    },

    // SUV
    {
      bodyTypeish: '4H',
      outputBodyType: 'SUV',
    },
    {
      bodyTypeish: '4W',
      outputBodyType: 'SUV',
    },
    {
      bodyTypeish: 'LL',
      outputBodyType: 'SUV',
    },
    {
      bodyTypeish: 'SPOR',
      outputBodyType: 'SUV',
    },
    {
      bodyTypeish: 'SU',
      outputBodyType: 'SUV',
    },
    {
      bodyTypeish: 'SUBN',
      outputBodyType: 'SUV',
    },
    {
      bodyTypeish: 'SUBU',
      outputBodyType: 'SUV',
    },
    {
      bodyTypeish: 'SV',
      outputBodyType: 'SUV',
    },

    // Tank Truck
    {
      bodyTypeish: 'TANK',
      outputBodyType: 'Tank Truck',
    },

    // Taxi
    {
      bodyTypeish: 'TAXI',
      outputBodyType: 'Taxi',
    },

    // Tow Truck
    {
      bodyTypeish: 'TOW',
      outputBodyType: 'Tow Truck',
    },

    // Traction Engine
    {
      bodyTypeish: 'TR/E',
      outputBodyType: 'Traction Engine',
    },

    // Tractor
    {
      bodyTypeish: 'TRAC',
      outputBodyType: 'Tractor',
    },

    // Tractor Crane
    {
      bodyTypeish: 'T/CR',
      outputBodyType: 'Tractor Crane',
    },

    // Trailer
    {
      bodyTypeish: 'TLR',
      outputBodyType: 'Trailer',
    },
    {
      bodyTypeish: 'TRAI',
      outputBodyType: 'Trailer',
    },
    {
      bodyTypeish: 'TRL',
      outputBodyType: 'Trailer',
    },
    {
      bodyTypeish: 'TRLR',
      outputBodyType: 'Trailer',
    },

    // Truck
    {
      bodyTypeish: 'DELV',
      outputBodyType: 'Truck',
    },
    {
      bodyTypeish: 'SWT',
      outputBodyType: 'Truck',
    },
    {
      bodyTypeish: 'TK',
      outputBodyType: 'Truck',
    },
    {
      bodyTypeish: 'TR',
      outputBodyType: 'Truck',
    },
    {
      bodyTypeish: 'TRC',
      outputBodyType: 'Truck',
    },
    {
      bodyTypeish: 'TRK',
      outputBodyType: 'Truck',
    },
    {
      bodyTypeish: 'TRT',
      outputBodyType: 'Truck',
    },
    {
      bodyTypeish: 'TRUC',
      outputBodyType: 'Truck',
    },
    {
      bodyTypeish: 'Truc',
      outputBodyType: 'Truck',
    },

    // Truck Crane
    {
      bodyTypeish: 'TR/C',
      outputBodyType: 'Truck Crane',
    },

    // Utility Vehicle
    {
      bodyTypeish: 'UT',
      outputBodyType: 'Utility Vehicle',
    },
    {
      bodyTypeish: 'UTIL',
      outputBodyType: 'Utility Vehicle',
    },

    // Van
    {
      bodyTypeish: 'PV',
      outputBodyType: 'Van',
    },
    {
      bodyTypeish: 'VA',
      outputBodyType: 'Van',
    },
    {
      bodyTypeish: 'VAN',
      outputBodyType: 'Van',
    },
    {
      bodyTypeish: 'Van',
      outputBodyType: 'Van',
    },
    {
      bodyTypeish: 'VN',
      outputBodyType: 'Van',
    },
  ])(
    'successfully detects $outputBodyType from $bodyTypeish',
    ({ bodyTypeish, outputBodyType }) => {
      const make = getVehicleBodyType(bodyTypeish)

      if (!make) {
        fail('make is not defined')
      }

      expect(make).toBe(outputBodyType)
    },
  )
})
