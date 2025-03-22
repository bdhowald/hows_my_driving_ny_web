import BodyType from 'constants/bodyTypes'

const getVehicleBodyType = (bodyTypeish: string | undefined): BodyType => {
  switch (bodyTypeish) {
    case 'BOAT':
      return BodyType.BOAT

    case 'BU':
    case 'BUS':
      return BodyType.BUS

    case 'CV':
      return BodyType.COMMERCIAL_VEHICLE

    case 'CON':
    case 'CONV':
      return BodyType.CONVERTIBLE

    case 'DUMP':
      return BodyType.DUMP_TRUCK

    case 'FLAT':
      return BodyType.FLATBED_TRUCK

    case '5D':
    case 'HATC':
    case 'HB':
      return BodyType.HATCHBACK

    case 'HRSE':
      return BodyType.HEARSE

    case 'LIM':
      return BodyType.LIMOUSINE

    case 'MC':
    case 'MCY':
    case 'MOT':
    case 'MOTO':
      return BodyType.MOTORCYCLE

    case 'MOPD':
    case 'MP':
      return BodyType.MOPED

    case 'P-U':
    case 'PICK':
    case 'PK':
    case 'PKUP':
      return BodyType.PICKUP_TRUCK

    case 'REF':
    case 'REFG':
      return BodyType.REFRIGERATION_TRUCK

    case 'H/WH':
    case 'RV':
      return BodyType.RV

    case '2 DR':
    case '2D':
    case '2DSD':
    case '2S':
    case '4 DR':
    case '4D':
    case '4DOO':
    case '4DSD':
    case '4DSE':
    case '4DSW':
    case '4S':
    case 'COUP':
    case 'FODO':
    case 'FOUR':
    case 'PASS':
    case 'SD':
    case 'SDN':
    case 'SEDA':
    case 'SEDN':
    case 'TWOD':
      return BodyType.SEDAN

    case 'SEMI':
      return BodyType.SEMI_TRAILER

    case 'MOBL':
      return BodyType.SNOWMOBILE

    case 'ST':
    case 'STAK':
      return BodyType.STAKE_TRUCK

    case 'SW':
    case 'WAGN':
    case 'WG':
      return BodyType.STATION_WAGON

    case '4H':
    case '4W':
    case 'LL':
    case 'SPOR':
    case 'SU':
    case 'SUBN':
    case 'SUBU':
    case 'SV':
      return BodyType.SUV

    case 'TANK':
      return BodyType.TANK_TRUCK

    case 'TAXI':
      return BodyType.TAXI

    case 'TOW':
      return BodyType.TOW_TRUCK

    case 'TR/E':
      return BodyType.TRACTION_ENGINE

    case 'TRAC':
      return BodyType.TRACTOR

    case 'T/CR':
      return BodyType.TRACTOR_CRANE

    case 'TLR':
    case 'TRAI':
    case 'TRL':
    case 'TRLR':
      return BodyType.TRAILER

    case 'DELV':
    case 'SWT':
    case 'TK':
    case 'TR':
    case 'TRC':
    case 'TRK':
    case 'TRT':
    case 'TRUC':
    case 'Truc':
      return BodyType.TRUCK

    case 'TR/C':
      return BodyType.TRUCK_CRANE

    case 'UT':
    case 'UTIL':
      return BodyType.UTILITY_VEHICLE

    case 'PV':
    case 'VA':
    case 'VAN':
    case 'Van':
    case 'VN':
      return BodyType.VAN

    default:
      return BodyType.UNKNOWN_BODY_TYPE
  }
}

export default getVehicleBodyType
