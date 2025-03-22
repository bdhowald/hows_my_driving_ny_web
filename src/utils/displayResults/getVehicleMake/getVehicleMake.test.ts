import getVehicleMake from './getVehicleMake'

describe('getVehicleMake', () => {
  test.each([
    // Blank
    {
      makeish: '',
      outputMake: 'Unknown Make',
    },

    // Not a make
    {
      makeish: 'Not a make',
      outputMake: 'Unknown Make',
    },

    // Acura
    {
      makeish: 'ACUR',
      outputMake: 'Acura',
    },
    {
      makeish: 'ACURA',
      outputMake: 'Acura',
    },
    {
      makeish: 'Acura',
      outputMake: 'Acura',
    },

    // Alfa Romeo
    {
      makeish: 'ALFAR',
      outputMake: 'Alfa Romeo',
    },

    // Audi
    {
      makeish: 'AUDI',
      outputMake: 'Audi',
    },

    // Bentley
    {
      makeish: 'BENTL',
      outputMake: 'Bentley',
    },

    // BMW
    {
      makeish: 'BMW',
      outputMake: 'BMW',
    },

    // Buick
    {
      makeish: 'BUICK',
      outputMake: 'Buick',
    },
    {
      makeish: 'Buick',
      outputMake: 'Buick',
    },

    // Cadillac
    {
      makeish: 'CADIL',
      outputMake: 'Cadillac',
    },
    {
      makeish: 'Cadil',
      outputMake: 'Cadillac',
    },

    // Chevrolet
    {
      makeish: 'CHEVR',
      outputMake: 'Chevrolet',
    },
    {
      makeish: 'Chevr',
      outputMake: 'Chevrolet',
    },

    // Chrysler
    {
      makeish: 'CHRY',
      outputMake: 'Chrysler',
    },
    {
      makeish: 'CHRYS',
      outputMake: 'Chrysler',
    },
    {
      makeish: 'Chrys',
      outputMake: 'Chrysler',
    },

    // Citroen
    {
      makeish: 'CITRO',
      outputMake: 'Citroen',
    },

    // Datsun
    {
      makeish: 'DATSU',
      outputMake: 'Datsun',
    },

    // Dodge
    {
      makeish: 'DODGE',
      outputMake: 'Dodge',
    },

    // Ducati
    {
      makeish: 'DUCAT',
      outputMake: 'Ducati',
    },

    // Ferrari
    {
      makeish: 'FERRA',
      outputMake: 'Ferrari',
    },

    // Fiat
    {
      makeish: 'FIAT',
      outputMake: 'Fiat',
    },

    // Ford
    {
      makeish: 'FORD',
      outputMake: 'Ford',
    },
    {
      makeish: 'Ford',
      outputMake: 'Ford',
    },

    // GMC
    {
      makeish: 'GMC',
      outputMake: 'GMC',
    },

    // Harley-Davidson
    {
      makeish: 'HARLE',
      outputMake: 'Harley-Davidson',
    },

    // Hino
    {
      makeish: 'HIN',
      outputMake: 'Hino',
    },
    {
      makeish: 'HINO',
      outputMake: 'Hino',
    },

    // Honda
    {
      makeish: 'HONDA',
      outputMake: 'Honda',
    },
    {
      makeish: 'Honda',
      outputMake: 'Honda',
    },

    // Hummer
    {
      makeish: 'HUMME',
      outputMake: 'Hummer',
    },

    // Hyundai
    {
      makeish: 'HYUN',
      outputMake: 'Hyundai',
    },
    {
      makeish: 'HYUND',
      outputMake: 'Hyundai',
    },

    // Infiniti
    {
      makeish: 'INFI',
      outputMake: 'Infiniti',
    },
    {
      makeish: 'INFIN',
      outputMake: 'Infiniti',
    },
    {
      makeish: 'Infin',
      outputMake: 'Infiniti',
    },

    // International
    {
      makeish: 'INTER',
      outputMake: 'International',
    },

    // Isuzu
    {
      makeish: 'ISUZ',
      outputMake: 'Isuzu',
    },
    {
      makeish: 'ISUZU',
      outputMake: 'Isuzu',
    },

    // Jaguar
    {
      makeish: 'JAGUA',
      outputMake: 'Jaguar',
    },

    // Jeep
    {
      makeish: 'JEEP',
      outputMake: 'Jeep',
    },
    {
      makeish: 'Jeep',
      outputMake: 'Jeep',
    },

    // Kawasaki
    {
      makeish: 'KAWAS',
      outputMake: 'Kawasaki',
    },

    // Kia
    {
      makeish: 'KIA',
      outputMake: 'Kia',
    },

    // Lamborghini
    {
      makeish: 'LAMBO',
      outputMake: 'Lamborghini',
    },
    {
      makeish: 'Lam',
      outputMake: 'Lamborghini',
    },

    // Land Rover
    {
      makeish: 'Land',
      outputMake: 'Land Rover',
    },
    {
      makeish: 'ROVER',
      outputMake: 'Land Rover',
    },

    // Lexus
    {
      makeish: 'LEXU',
      outputMake: 'Lexus',
    },
    {
      makeish: 'LEXUS',
      outputMake: 'Lexus',
    },
    {
      makeish: 'Lexus',
      outputMake: 'Lexus',
    },

    // Lincoln
    {
      makeish: 'LINCO',
      outputMake: 'Lincoln',
    },

    // Mack
    {
      makeish: 'MACK',
      outputMake: 'Mack',
    },

    // Maserati
    {
      makeish: 'MASE',
      outputMake: 'Maserati',
    },

    // Mazda
    {
      makeish: 'MAZD',
      outputMake: 'Mazda',
    },
    {
      makeish: 'MAZDA',
      outputMake: 'Mazda',
    },
    {
      makeish: 'Mazda',
      outputMake: 'Mazda',
    },

    // MCI Coach
    {
      makeish: 'MCI',
      outputMake: 'MCI Coach',
    },

    // Mercedes-Benx
    {
      makeish: 'ME/BE',
      outputMake: 'Mercedes-Benz',
    },

    // Mercury
    {
      makeish: 'MERCU',
      outputMake: 'Mercury',
    },

    // Mini Cooper
    {
      makeish: 'MINI',
      outputMake: 'Mini Cooper',
    },

    // Mitsubishi
    {
      makeish: 'MITS',
      outputMake: 'Mitsubishi',
    },
    {
      makeish: 'MITSU',
      outputMake: 'Mitsubishi',
    },
    {
      makeish: 'Mitsu',
      outputMake: 'Mitsubishi',
    },

    // Nissan
    {
      makeish: 'NISSA',
      outputMake: 'Nissan',
    },
    {
      makeish: 'Nissa',
      outputMake: 'Nissan',
    },

    // Oldsmobile
    {
      makeish: 'OLDSM',
      outputMake: 'Oldsmobile',
    },

    // Peterbilt
    {
      makeish: 'PETER',
      outputMake: 'Peterbilt',
    },

    // Peugeot
    {
      makeish: 'PEUGE',
      outputMake: 'Peugeot',
    },

    // Plymouth
    {
      makeish: 'PLYMO',
      outputMake: 'Plymouth',
    },

    // Pontiac
    {
      makeish: 'PONTI',
      outputMake: 'Pontiac',
    },

    // Porsche
    {
      makeish: 'PORSC',
      outputMake: 'Porsche',
    },

    // Prevost
    {
      makeish: 'PREVO',
      outputMake: 'Prevost',
    },

    // Revel
    {
      makeish: 'REVEL',
      outputMake: 'Revel',
    },

    // Saab
    {
      makeish: 'SAAB',
      outputMake: 'Saab',
    },

    // Saturn
    {
      makeish: 'SATUR',
      outputMake: 'Saturn',
    },

    // Scion
    {
      makeish: 'SCION',
      outputMake: 'Scion',
    },

    // Smart
    {
      makeish: 'SMART',
      outputMake: 'Smart',
    },

    // Sterling
    {
      makeish: 'STERL',
      outputMake: 'Sterling',
    },

    // Subaru
    {
      makeish: 'SUBA',
      outputMake: 'Subaru',
    },
    {
      makeish: 'SUBAR',
      outputMake: 'Subaru',
    },
    {
      makeish: 'Subar',
      outputMake: 'Subaru',
    },

    // Suzuki
    {
      makeish: 'SUZUK',
      outputMake: 'Suzuki',
    },

    // Tesla
    {
      makeish: 'TESLA',
      outputMake: 'Tesla',
    },

    // Thomas Built Buses
    {
      makeish: 'THOMA',
      outputMake: 'Thomas Built Buses',
    },

    // Toyota
    {
      makeish: 'TOYOT',
      outputMake: 'Toyota',
    },
    {
      makeish: 'Toyot',
      outputMake: 'Toyota',
    },

    // Triumph
    {
      makeish: 'TRIUM',
      outputMake: 'Triumph',
    },

    // Truck
    {
      makeish: 'FRUEH',
      outputMake: 'Freight',
    },

    // UD Truck
    {
      makeish: 'UD',
      outputMake: 'UD Truck',
    },

    // Utility Vehicle
    {
      makeish: 'UTILI',
      outputMake: 'Utility Vehicle',
    },

    // Van
    {
      makeish: 'VANHO',
      outputMake: 'Van',
    },

    // Vespa
    {
      makeish: 'VESPA',
      outputMake: 'Vespa',
    },

    // Volkswagen
    {
      makeish: 'VOLK',
      outputMake: 'Volkswagen',
    },
    {
      makeish: 'VOLKS',
      outputMake: 'Volkswagen',
    },

    // Volvo
    {
      makeish: 'VOLV',
      outputMake: 'Volvo',
    },
    {
      makeish: 'VOLVO',
      outputMake: 'Volvo',
    },

    // Yamaha
    {
      makeish: 'YAMAH',
      outputMake: 'Yamaha',
    },
  ])(
    'successfully detects $outputMake from $makeish',
    ({ makeish, outputMake }) => {
      const make = getVehicleMake(makeish)

      if (!make) {
        fail('make is not defined')
      }

      expect(make).toBe(outputMake)
    },
  )
})
