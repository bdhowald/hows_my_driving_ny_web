import Make from 'constants/makes'

const getVehicleMake = (makeish: string | undefined): Make => {
  switch (makeish) {
    case 'ACUR':
    case 'ACURA':
    case 'Acura':
      return Make.ACURA

    case 'ALFAR':
      return Make.ALFA_ROMEO

    case 'AUDI':
      return Make.AUDI

    case 'BENTL':
      return Make.BENTLEY

    case 'BMW':
      return Make.BMW

    case 'BUICK':
    case 'Buick':
      return Make.BUICK

    case 'CADIL':
    case 'Cadil':
      return Make.CADILLAC

    case 'CHEVR':
    case 'Chevr':
      return Make.CHEVROLET

    case 'CHRY':
    case 'CHRYS':
    case 'Chrys':
      return Make.CHRYSLER

    case 'CITRO':
      return Make.CITROEN

    case 'DATSU':
      return Make.DATSUN

    case 'DODGE':
      return Make.DODGE

    case 'DUCAT':
      return Make.DUCATI

    case 'FERRA':
      return Make.FERRARI

    case 'FIAT':
      return Make.FIAT

    case 'FORD':
    case 'Ford':
      return Make.FORD

    case 'FRUEH':
      return Make.FREIGHT

    case 'GMC':
      return Make.GMC

    case 'HARLE':
      return Make.HARLEY_DAVIDSON

    case 'HIN':
    case 'HINO':
      return Make.HINO

    case 'HONDA':
    case 'Honda':
      return Make.HONDA

    case 'HUMME':
      return Make.HUMMER

    case 'HYUN':
    case 'HYUND':
      return Make.HYUNDAI

    case 'INFI':
    case 'INFIN':
    case 'Infin':
      return Make.INFINITI

    case 'INTER':
      return Make.INTERNATIONAL

    case 'ISUZ':
    case 'ISUZU':
      return Make.ISUZU

    case 'JAGUA':
      return Make.JAGUAR

    case 'JEEP':
    case 'Jeep':
      return Make.JEEP

    case 'KAWAS':
      return Make.KAWASAKI

    case 'KIA':
      return Make.KIA

    case 'LAMBO':
    case 'Lam':
      return Make.LAMBORGHINI

    case 'Land':
    case 'ROVER':
      return Make.LAND_ROVER

    case 'LEXU':
    case 'LEXUS':
    case 'Lexus':
      return Make.LEXUS

    case 'LINCO':
      return Make.LINCOLN

    case 'MACK':
      return Make.MACK

    case 'MASE':
      return Make.MASERATI

    case 'MAZD':
    case 'MAZDA':
    case 'Mazda':
      return Make.MAZDA

    case 'MCI':
      return Make.MCI_COACH

    case 'ME/BE':
      return Make.MERCEDES_BENZ

    case 'MERCU':
      return Make.MERCURY

    case 'MINI':
      return Make.MINI_COOPER

    case 'MITS':
    case 'MITSU':
    case 'Mitsu':
      return Make.MITSUBISHI

    case 'NISSA':
    case 'Nissa':
      return Make.NISSAN

    case 'OLDSM':
      return Make.OLDSMOBILE

    case 'PETER':
      return Make.PETERBILT

    case 'PEUGE':
      return Make.PEUGEOT

    case 'PLYMO':
      return Make.PLYMOUTH

    case 'PONTI':
      return Make.PONTIAC

    case 'PORSC':
      return Make.PORSCHE

    case 'PREVO':
      return Make.PREVOST

    case 'REVEL':
      return Make.REVEL

    case 'SAAB':
      return Make.SAAB

    case 'SATUR':
      return Make.SATURN

    case 'SCION':
      return Make.SCION

    case 'SMART':
      return Make.SMART

    case 'STERL':
      return Make.STERLING

    case 'SUBA':
    case 'SUBAR':
    case 'Subar':
      return Make.SUBARU

    case 'SUZUK':
      return Make.SUZUKI

    case 'TESLA':
      return Make.TESLA

    case 'THOMA':
      return Make.THOMAS_BUILT_BUSES

    case 'TRIUM':
      return Make.TRIUMPH

    case 'TOYOT':
    case 'Toyot':
      return Make.TOYOTA

    case 'UD':
      return Make.UD_TRUCK

    case 'UTILI':
      return Make.UTILITY_VEHICLE

    case 'VANHO':
      return Make.VAN

    case 'VESPA':
      return Make.VESPA

    case 'VOLK':
    case 'VOLKS':
      return Make.VOLKSWAGEN

    case 'VOLV':
    case 'VOLVO':
      return Make.VOLVO

    case 'YAMAH':
      return Make.YAMAH

    default:
      return Make.UNKNOWN_MAKE
  }
}

export default getVehicleMake
